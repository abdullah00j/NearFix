import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  signInWithRedirect,
  signOut,
} from "aws-amplify/auth";
import type { Schema } from "../../amplify/data/resource";
import { client } from "./amplify";
import { throwModelErrors } from "./errors";

export type UserProfile = Pick<
  Schema["NearFixUser"]["type"],
  "id" | "name" | "email" | "profileImage" | "activeRole"
>;

export async function getCurrentAuthSession(forceRefresh = false) {
  const session = await fetchAuthSession({ forceRefresh });
  const groups = session.tokens?.idToken?.payload["cognito:groups"];
  return {
    authenticated: Boolean(session.tokens),
    groups: Array.isArray(groups)
      ? groups.filter((group): group is string => typeof group === "string")
      : [],
  };
}

export async function signInWithGoogle() {
  return signInWithRedirect({ provider: "Google" });
}

export async function signOutCurrentUser() {
  return signOut();
}

async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, errors } = await client.models.NearFixUser.get(
    { id: userId },
    {
      authMode: "userPool",
      selectionSet: ["id", "name", "email", "profileImage", "activeRole"],
    },
  );

  throwModelErrors(errors, "Unable to load your user profile.");
  return data;
}

export async function loadCurrentUserProfile(): Promise<UserProfile> {
  const { userId } = await getCurrentUser();
  let profile = await getUserProfile(userId);

  if (!profile) {
    const attributes = await fetchUserAttributes();
    if (!attributes.email) {
      throw new Error("The signed-in Cognito user does not have an email.");
    }

    const { data, errors } = await client.mutations.ensureUser(
      {},
      { authMode: "userPool" },
    );
    throwModelErrors(errors, "The user profile could not be created.");
    if (!data) throw new Error("The user profile could not be created.");

    profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error("The user profile was not found after creation.");
    }
  }

  return profile;
}
