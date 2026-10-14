import { Policy, PolicyStatement, type IRole } from "aws-cdk-lib/aws-iam";
import type { Construct } from "constructs";

type InlinePolicyResources = {
  scope: Construct;
  ensureUserRole: IRole | undefined;
  updateProviderApplicationRole: IRole | undefined;
  preTokenGenerationRole: IRole | undefined;
  userPoolArn: string;
  providerApplicationTableArn: string;
  providerTableArn: string;
  userTableArn: string;
};

export function attachInlinePolicies({
  scope,
  ensureUserRole,
  updateProviderApplicationRole,
  preTokenGenerationRole,
  userPoolArn,
  providerApplicationTableArn,
  providerTableArn,
  userTableArn,
}: InlinePolicyResources) {
  ensureUserRole?.attachInlinePolicy(
    new Policy(scope, "EnsureUserCognitoPolicy", {
      statements: [
        new PolicyStatement({
          actions: ["cognito-idp:AdminGetUser"],
          resources: [userPoolArn],
        }),
      ],
    }),
  );

  updateProviderApplicationRole?.attachInlinePolicy(
    new Policy(scope, "UpdateProviderApplicationCognitoPolicy", {
      statements: [
        new PolicyStatement({
          actions: ["cognito-idp:ListUsers", "cognito-idp:AdminAddUserToGroup"],
          resources: [userPoolArn],
        }),
      ],
    }),
  );

  updateProviderApplicationRole?.attachInlinePolicy(
    new Policy(scope, "UpdateProviderApplicationDataPolicy", {
      statements: [
        // Load applications and save their status.
        new PolicyStatement({
          actions: ["dynamodb:GetItem", "dynamodb:UpdateItem"],
          resources: [providerApplicationTableArn],
        }),
        // Find existing providers and create a provider record when needed.
        new PolicyStatement({
          actions: ["dynamodb:Query", "dynamodb:Scan", "dynamodb:PutItem"],
          resources: [providerTableArn, `${providerTableArn}/index/*`],
        }),
        // Set the approved user's active role to PROVIDER.
        new PolicyStatement({
          actions: ["dynamodb:UpdateItem"],
          resources: [userTableArn],
        }),
      ],
    }),
  );

  preTokenGenerationRole?.attachInlinePolicy(
    new Policy(scope, "PreTokenGenerationCognitoPolicy", {
      statements: [
        new PolicyStatement({
          actions: [
            "cognito-idp:AdminListGroupsForUser",
            "cognito-idp:AdminAddUserToGroup",
          ],
          resources: [userPoolArn],
        }),
      ],
    }),
  );
}
