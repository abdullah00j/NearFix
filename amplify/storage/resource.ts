import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "providerApplicationFiles",

  access: (allow) => ({
    "profile-images/{entity_id}/*": [
      allow.entity("identity").to(["read", "write", "delete"]),
      allow.authenticated.to(["read"]),
    ],
    "provider-applications/{entity_id}/*": [
      allow.entity("identity").to(["read", "write", "delete"]),
      allow.groups(["ADMIN"]).to(["read"]),
    ],
  }),
});
