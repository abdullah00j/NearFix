import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { preTokenGeneration } from "./functions/preTokenGeneration/resources";
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  preTokenGeneration,
});

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
