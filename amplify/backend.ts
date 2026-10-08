import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { preTokenGeneration } from "./functions/preTokenGeneration/resources";
import { ensureUser } from "./functions/ensureUser/resources";
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  preTokenGeneration,
  ensureUser,
});

// Cognito's CloudFormation handler can reject User Pool updates when the
// unchanged standard email schema is included in the update template.
backend.auth.resources.cfnResources.cfnUserPool.addPropertyDeletionOverride(
  "Schema",
);

const userTable = backend.data.resources.tables["NearFixUser"];
userTable.grantReadWriteData(backend.ensureUser.resources.lambda);
backend.ensureUser.addEnvironment("NEARFIX_USER_TABLE", userTable.tableName);
backend.ensureUser.addEnvironment(
  "COGNITO_USER_POOL_ID",
  backend.auth.resources.userPool.userPoolId,
);
backend.ensureUser.resources.lambda.role?.attachInlinePolicy(
  new Policy(backend.stack, "EnsureUserCognitoPolicy", {
    statements: [
      new PolicyStatement({
        actions: ["cognito-idp:AdminGetUser"],
        resources: [backend.auth.resources.userPool.userPoolArn],
      }),
    ],
  }),
);

backend.preTokenGeneration.resources.lambda.role?.attachInlinePolicy(
  new Policy(backend.stack, "PreTokenGenerationCognitoPolicy", {
    statements: [
      new PolicyStatement({
        actions: [
          "cognito-idp:AdminListGroupsForUser",
          "cognito-idp:AdminAddUserToGroup",
        ],
        resources: [backend.auth.resources.userPool.userPoolArn],
      }),
    ],
  }),
);
