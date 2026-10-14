import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { preTokenGeneration } from "./functions/preTokenGeneration/resources";
import { ensureUser } from "./functions/ensureUser/resources";
import { storage } from "./storage/resource";
import { createProviderApplication } from "./functions/CreateProviderApplication/resource";
import { updateProviderApplication } from "./functions/updateProviderApplication/resource";
import { attachInlinePolicies } from "./iam-policies";
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  storage,
  preTokenGeneration,
  //LAMBDA
  ensureUser,
  createProviderApplication,
  updateProviderApplication,
});

// Cognito's CloudFormation handler can reject User Pool updates when the
// unchanged standard email schema is included in the update template.
backend.auth.resources.cfnResources.cfnUserPool.addPropertyDeletionOverride(
  "Schema",
);

const userTable = backend.data.resources.tables["NearFixUser"];
userTable.grantReadWriteData(backend.ensureUser.resources.lambda);

// Configure the ensureUser Lambda with its table name and Cognito user-pool ID.
backend.ensureUser.addEnvironment("NEARFIX_USER_TABLE", userTable.tableName);
backend.ensureUser.addEnvironment(
  "COGNITO_USER_POOL_ID",
  backend.auth.resources.userPool.userPoolId,
);

backend.updateProviderApplication.addEnvironment(
  "COGNITO_USER_POOL_ID",
  backend.auth.resources.userPool.userPoolId,
);

attachInlinePolicies({
  scope: backend.stack,
  ensureUserRole: backend.ensureUser.resources.lambda.role,
  updateProviderApplicationRole:
    backend.updateProviderApplication.resources.lambda.role,
  preTokenGenerationRole: backend.preTokenGeneration.resources.lambda.role,
  userPoolArn: backend.auth.resources.userPool.userPoolArn,
  providerApplicationTableArn:
    backend.data.resources.tables["ProviderApplication"].tableArn,
  providerTableArn: backend.data.resources.tables["NearFixProvider"].tableArn,
  userTableArn: userTable.tableArn,
});
