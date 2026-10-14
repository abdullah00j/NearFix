import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncResolverHandler } from "aws-lambda";
import type { Schema } from "../../data/resource";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { env } from "$amplify/env/updateProviderApplication";
import { Logger } from "@aws-lambda-powertools/logger";
import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider";

type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

type UpdateProviderApplicationArg = {
  applicationId: string;
  applicationStatus: ApplicationStatus;
};

const logger = new Logger({
  serviceName: "nearfix-update-provider-application",
});

const { resourceConfig, libraryOptions } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();
const cognito = new CognitoIdentityProviderClient({});
const userPoolId = process.env.COGNITO_USER_POOL_ID;

async function addUserToProviderGroup(userSub: string) {
  if (!userPoolId) {
    throw new Error("COGNITO_USER_POOL_ID is not configured");
  }

  const result = await cognito.send(
    new ListUsersCommand({
      UserPoolId: userPoolId,
      Filter: `sub = "${userSub}"`,
      Limit: 1,
    }),
  );

  const username = result.Users?.[0]?.Username;
  if (!username) {
    throw new Error(`Could not find Cognito user for sub: ${userSub}`);
  }

  await cognito.send(
    new AdminAddUserToGroupCommand({
      UserPoolId: userPoolId,
      Username: username,
      GroupName: "PROVIDER",
    }),
  );
}

export const handler: AppSyncResolverHandler<
  UpdateProviderApplicationArg,
  Schema["ProviderApplication"]["type"] | null
> = async (event, context) => {
  logger.addContext(context);

  try {
    // Verify the caller belongs to the ADMIN group.
    const identity = event.identity;

    if (!identity || !("claims" in identity)) {
      throw new Error("Unauthorized: Cognito identity required");
    }

    const groupsClaim = identity.claims["cognito:groups"];

    const groups = Array.isArray(groupsClaim)
      ? groupsClaim
      : typeof groupsClaim === "string"
        ? groupsClaim.split(",")
        : [];

    if (!groups.includes("ADMIN")) {
      throw new Error("Forbidden: ADMIN access required");
    }

    const { applicationId, applicationStatus } = event.arguments;

    const validStatuses: ApplicationStatus[] = [
      "PENDING",
      "APPROVED",
      "REJECTED",
    ];

    if (!applicationId || !applicationStatus) {
      throw new Error("applicationId and applicationStatus are required");
    }

    if (!validStatuses.includes(applicationStatus)) {
      throw new Error("Invalid application status");
    }

    // Load the application before making changes.
    const { data: application, errors: getErrors } =
      await client.models.ProviderApplication.get(
        { id: applicationId },
        { authMode: "iam" },
      );

    if (getErrors?.length) {
      throw new Error(getErrors.map(({ message }) => message).join("; "));
    }

    if (!application) {
      throw new Error("Provider application not found");
    }

    // PENDING or REJECTED: update the application only.
    if (applicationStatus === "PENDING" || applicationStatus === "REJECTED") {
      const { data, errors } = await client.models.ProviderApplication.update(
        {
          id: applicationId,
          applicationStatus,
        },
        { authMode: "iam" },
      );

      if (errors?.length) {
        throw new Error(errors.map(({ message }) => message).join("; "));
      }

      if (!data) {
        throw new Error("Failed to update provider application");
      }

      logger.info("Provider application status updated", {
        applicationId,
        applicationStatus,
      });

      return data;
    }

    // APPROVED: check whether a provider record already exists.
    const { data: existingProviders, errors: listErrors } =
      await client.models.NearFixProvider.list({
        filter: {
          userId: { eq: application.userId },
        },
        limit: 1,
        authMode: "iam",
      });

    if (listErrors?.length) {
      throw new Error(listErrors.map(({ message }) => message).join("; "));
    }

    // Create the provider only if one does not already exist.
    if (!existingProviders?.length) {
      const { data: provider, errors: providerErrors } =
        await client.models.NearFixProvider.create(
          {
            userId: application.userId,
            businessName: application.businessName,
            serviceArea: application.serviceArea,
            selfie: application.selfie,
            CNICNumber: application.CNICNumber,
            CNICNAME: application.CNICNAME,
            CNICFrontSide: application.CNICFrontSide,
            CNICBackSide: application.CNICBackSide,
            verificationStatus: "APPROVED",
            availabilityStatus: "OFFLINE",
          },
          { authMode: "iam" },
        );

      if (providerErrors?.length) {
        throw new Error(
          providerErrors.map(({ message }) => message).join("; "),
        );
      }

      if (!provider) {
        throw new Error("Failed to create provider record");
      }
    }

    // Set the user's selected role to PROVIDER.
    const { data: updatedUser, errors: userErrors } =
      await client.models.NearFixUser.update(
        {
          id: application.userId,
          activeRole: "PROVIDER",
        },
        { authMode: "iam" },
      );

    if (userErrors?.length) {
      throw new Error(userErrors.map(({ message }) => message).join("; "));
    }

    if (!updatedUser) {
      throw new Error("Failed to update user's active role");
    }

    await addUserToProviderGroup(application.userId);

    // Update application status last.
    const { data: updatedApplication, errors: updateErrors } =
      await client.models.ProviderApplication.update(
        {
          id: applicationId,
          applicationStatus: "APPROVED",
        },
        { authMode: "iam" },
      );

    if (updateErrors?.length) {
      throw new Error(updateErrors.map(({ message }) => message).join("; "));
    }

    if (!updatedApplication) {
      throw new Error("Failed to approve provider application");
    }

    logger.info("Provider application approved", {
      applicationId,
      userId: application.userId,
    });

    return updatedApplication;
  } catch (error) {
    logger.error("Provider application update failed", {
      error: error instanceof Error ? error.message : String(error),
    });

    throw error;
  }
};
