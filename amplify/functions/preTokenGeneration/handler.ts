import type { PreTokenGenerationTriggerHandler } from "aws-lambda";
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  AdminListGroupsForUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Logger } from "@aws-lambda-powertools/logger";

const client = new CognitoIdentityProviderClient();

const NEARFIX_GROUPS = ["CUSTOMER", "PROVIDER", "ADMIN"];

const logger = new Logger({
  serviceName: "nearfix-pre-token-generation-service",
});

export const handler: PreTokenGenerationTriggerHandler = async (event) => {
  logger.info("===== PRE TOKEN GENERATION =====");
  logger.info("UserPoolId:", event.userPoolId);
  logger.info("Username:", event.userName);

  const existing = await client.send(
    new AdminListGroupsForUserCommand({
      UserPoolId: event.userPoolId,
      Username: event.userName,
    }),
  );

  const existingGroups =
    existing.Groups?.map((group) => group.GroupName).filter(
      (group): group is string => !!group,
    ) ?? [];

  logger.info("Existing groups:", { existingGroups });

  let role = existingGroups.find((group) => NEARFIX_GROUPS.includes(group));

  if (!role) {
    role = "CUSTOMER";

    logger.info("Adding user to CUSTOMER...");

    await client.send(
      new AdminAddUserToGroupCommand({
        UserPoolId: event.userPoolId,
        Username: event.userName,
        GroupName: "CUSTOMER",
      }),
    );

    logger.info("Successfully added user to CUSTOMER");
  }

  // Add CUSTOMER to the token being generated RIGHT NOW.
  const groupsToOverride = [
    ...existingGroups.filter((group) => !NEARFIX_GROUPS.includes(group)),
    role,
  ];

  event.response = {
    ...event.response,

    claimsOverrideDetails: {
      ...event.response.claimsOverrideDetails,

      groupOverrideDetails: {
        ...event.response.claimsOverrideDetails?.groupOverrideDetails,

        groupsToOverride,
      },
    },
  };

  logger.info("Groups added to current token:", { groupsToOverride });

  return event;
};
