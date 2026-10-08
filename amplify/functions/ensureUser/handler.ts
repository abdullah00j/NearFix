import type { AppSyncResolverHandler } from "aws-lambda";
import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import {
  ConditionalCheckFailedException,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

type EnsureUserEvent = Record<string, never>;

const dynamodb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const cognito = new CognitoIdentityProviderClient({});
const tableName = process.env.NEARFIX_USER_TABLE;
const userPoolId = process.env.COGNITO_USER_POOL_ID;

export const handler: AppSyncResolverHandler<EnsureUserEvent, boolean> = async (
  event,
) => {
  const identity = event.identity;
  if (!identity || !("claims" in identity)) {
    throw new Error("ensureUser requires a Cognito User Pools identity");
  }

  const claims = identity.claims as Record<string, unknown>;
  const id =
    typeof identity.sub === "string" && identity.sub
      ? identity.sub
      : typeof claims.sub === "string"
        ? claims.sub
        : undefined;
  const identityUsername =
    "username" in identity && typeof identity.username === "string"
      ? identity.username
      : undefined;
  const username =
    (typeof claims["cognito:username"] === "string" &&
      claims["cognito:username"]) ||
    identityUsername;
  const owner = username;

  if (!id) {
    throw new Error("Cognito user ID is missing from the AppSync identity");
  }
  if (!username) {
    throw new Error("Cognito username is missing from the AppSync identity");
  }
  if (!tableName) {
    throw new Error("NEARFIX_USER_TABLE is not configured");
  }

  let attributes = claims;
  if (typeof claims.email !== "string" || !claims.email) {
    if (!userPoolId) {
      throw new Error("COGNITO_USER_POOL_ID is not configured");
    }

    const cognitoUser = await cognito.send(
      new AdminGetUserCommand({
        UserPoolId: userPoolId,
        Username: username,
      }),
    );
    attributes = Object.fromEntries(
      (cognitoUser.UserAttributes ?? []).flatMap(({ Name, Value }) =>
        Name && Value ? [[Name, Value]] : [],
      ),
    );
  }

  const email =
    typeof attributes.email === "string" ? attributes.email : undefined;
  if (!email) {
    throw new Error("Email attribute is missing from the Cognito user");
  }

  const displayName =
    (typeof attributes.name === "string" && attributes.name) ||
    email.split("@")[0] ||
    "User";
  const picture =
    typeof attributes.picture === "string" ? attributes.picture : null;
  const now = new Date().toISOString();

  try {
    await dynamodb.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          id,
          __typename: "NearFixUser",
          name: displayName,
          email,
          status: "ACTIVE",
          ...(picture ? { profileImage: picture } : {}),
          isPhoneVerified: false,
          owner,
          createdAt: now,
          updatedAt: now,
        },
        ConditionExpression: "attribute_not_exists(id)",
      }),
    );
  } catch (error) {
    if (!(error instanceof ConditionalCheckFailedException)) {
      console.error("Failed to create NearFixUser", error);
      throw error;
    }

    // Repair the owner on profiles created before the owner claim was stored correctly.
    await dynamodb.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { id },
        UpdateExpression: "SET #owner = :owner",
        ExpressionAttributeNames: { "#owner": "owner" },
        ExpressionAttributeValues: { ":owner": owner },
        ConditionExpression: "attribute_exists(id)",
      }),
    );
  }

  return true;
};
