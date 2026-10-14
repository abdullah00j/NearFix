import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { AppSyncResolverHandler } from "aws-lambda";
import type { Schema } from "../../data/resource";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { env } from "$amplify/env/createProviderApplication";
import { Logger } from "@aws-lambda-powertools/logger";

type CreateProviderApplicationArguments = {
  businessName: string;
  serviceArea: string;
  selfie?: string | null;
  CNICNumber?: string | null;
  CNICNAME?: string | null;
  CNICFrontSide?: string | null;
  CNICBackSide?: string | null;
};

const logger = new Logger({
  serviceName: "nearfix-create-provider-application",
});

const { resourceConfig, libraryOptions } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

export const handler: AppSyncResolverHandler<
  CreateProviderApplicationArguments,
  Schema["ProviderApplication"]["type"] | null
> = async (event, context) => {
  logger.addContext(context);

  try {
    const identity = event.identity;

    if (!identity || !("sub" in identity) || typeof identity.sub !== "string") {
      throw new Error("A signed-in Cognito user is required");
    }

    const businessName = event.arguments.businessName.trim();
    const serviceArea = event.arguments.serviceArea.trim();

    if (!businessName || !serviceArea) {
      throw new Error("Business name and service area are required");
    }

    const { data, errors } = await client.models.ProviderApplication.create(
      {
        userId: identity.sub,
        businessName,
        serviceArea,
        selfie: event.arguments.selfie || undefined,
        CNICNumber: event.arguments.CNICNumber || undefined,
        CNICNAME: event.arguments.CNICNAME || undefined,
        CNICFrontSide: event.arguments.CNICFrontSide || undefined,
        CNICBackSide: event.arguments.CNICBackSide || undefined,
        applicationStatus: "PENDING",
      },
      { authMode: "iam" },
    );

    if (errors?.length) {
      throw new Error(
        `Failed to create provider application: ${errors
          .map(({ message }) => message)
          .join("; ")}`,
      );
    }

    if (!data) {
      throw new Error("Provider application creation returned no record");
    }

    logger.info("Provider application created", {
      userId: identity.sub,
    });

    return data;
  } catch (error) {
    logger.error("Provider application creation failed", {
      error: error instanceof Error ? error.message : String(error),
    });

    throw error;
  }
};
