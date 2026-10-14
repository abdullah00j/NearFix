import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "providerApplicationFiles",

  access: (allow) => ({
    "provider-applications/{entity_id}/*": [
      allow.entity("identity").to(["read", "write", "delete"]),
      allow.groups(["ADMIN"]).to(["read"]),
    ],
  }),
});
