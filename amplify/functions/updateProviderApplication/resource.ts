import { defineFunction } from "@aws-amplify/backend";

export const updateProviderApplication = defineFunction({
  name: "updateProviderApplication",
  resourceGroupName: "data",
});
