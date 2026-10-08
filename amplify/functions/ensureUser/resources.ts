import { defineFunction } from "@aws-amplify/backend";

export const ensureUser = defineFunction({
  name: "ensureUser",
  resourceGroupName: "data",
});
