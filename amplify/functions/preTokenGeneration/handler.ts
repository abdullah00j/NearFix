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

  const hasNearfixGroup = existingGroups.some((group) =>
    NEARFIX_GROUPS.includes(group),
  );
  let groupsToOverride = existingGroups;

  if (!hasNearfixGroup) {
    logger.info("Adding user to CUSTOMER");
    await client.send(
      new AdminAddUserToGroupCommand({
        UserPoolId: event.userPoolId,
        Username: event.userName,
        GroupName: "CUSTOMER",
      }),
    );
    groupsToOverride = [...existingGroups, "CUSTOMER"];
  }

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

  logger.info("Groups in token:", { groupsToOverride });

  return event;
};
