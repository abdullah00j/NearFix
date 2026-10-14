import { defineFunction } from "@aws-amplify/backend";

export const createProviderApplication = defineFunction({
  name: "createProviderApplication",
  resourceGroupName: "data",
});

// When this gets deployed, Amplify creates the Lambda and a new IAM role for
//  it, with only basic permissions (like writing logs to CloudWatch). At this
//  point the role can’t call anything else.

// You define the function and deploy, and Amplify creates the Lambda along with its execution role.
// When the Lambda runs, AWS uses that role to give it temporary credentials (its identity).
// The role starts with only basic permissions (like writing logs). Other permissions are added in
// other files: allow.resource(myFunction) in data/resource.ts for your Amplify data, and addToRolePolicy
// in backend.ts for other AWS services like S3.
