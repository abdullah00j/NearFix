import { defineAuth, secret } from "@aws-amplify/backend";
import { preTokenGeneration } from "../functions/preTokenGeneration/resources";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
        scopes: ["email", "profile"],
        attributeMapping: {
          email: "email",
          fullname: "name",
          profilePicture: "picture",
        },
      },
      callbackUrls: [
        "http://localhost:8081",
        "http://localhost:5173/",
        "nearfixapp://callback/",
      ],

      logoutUrls: [
        "http://localhost:8081",
        "http://localhost:5173/",
        "nearfixapp://signout/",
      ],
    },
  },

  groups: ["ADMIN", "PROVIDER", "CUSTOMER"],

  triggers: {
    preTokenGeneration,
  },
});
