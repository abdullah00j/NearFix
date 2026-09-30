import type { PreTokenGenerationTriggerHandler } from "aws-lambda";
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  AdminListGroupsForUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient();

const NEARFIX_GROUPS = ["CUSTOMER", "PROVIDER", "ADMIN"];

export const handler: PreTokenGenerationTriggerHandler = async (event) => {
  console.log("===== PRE TOKEN GENERATION =====");
  console.log("UserPoolId:", event.userPoolId);
  console.log("Username:", event.userName);

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

  console.log("Existing groups:", existingGroups);

  let role = existingGroups.find((group) => NEARFIX_GROUPS.includes(group));

  if (!role) {
    role = "CUSTOMER";

    console.log("Adding user to CUSTOMER...");

    await client.send(
      new AdminAddUserToGroupCommand({
        UserPoolId: event.userPoolId,
        Username: event.userName,
        GroupName: "CUSTOMER",
      }),
    );

    console.log("Successfully added user to CUSTOMER");
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

  console.log("Groups added to current token:", groupsToOverride);

  return event;
};
