import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  signInWithRedirect,
  signOut,
} from "aws-amplify/auth";
import { getUrl, uploadData } from "aws-amplify/storage";
import type { Schema } from "../../amplify/data/resource";
import { client } from "../lib/amplify";
import { throwModelErrors } from "../lib/errors";

export type UserProfile = Pick<
  Schema["NearFixUser"]["type"],
  "id" | "name" | "email" | "profileImage" | "activeRole" | "language" | "theme"
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
      selectionSet: [
        "id",
        "name",
        "email",
        "profileImage",
        "activeRole",
        "language",
        "theme",
      ],
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

export async function getUserProfileImageUrl(path: string): Promise<string> {
  if (/^https?:\/\//i.test(path)) return path;

  const { url } = await getUrl({ path, options: { expiresIn: 3600 } });
  return url.toString();
}

export async function updateCurrentUserForm(input: {
  userId: string;
  name: string;
}): Promise<UserProfile> {
  const name = input.name.trim();
  if (!name) throw new Error("Name cannot be empty.");

  const { data, errors } = await client.models.NearFixUser.update(
    { id: input.userId, name },
    {
      authMode: "userPool",
      selectionSet: [
        "id",
        "name",
        "email",
        "profileImage",
        "activeRole",
        "language",
        "theme",
      ],
    },
  );
  throwModelErrors(errors, "Unable to update your name.");
  if (!data) throw new Error("Unable to update your name.");
  return data;
}

export async function updateCurrentUserPreference(input: {
  userId: string;
  language?: string;
  theme?: string;
}): Promise<UserProfile> {
  const { data, errors } = await client.models.NearFixUser.update(
    {
      id: input.userId,
      ...(input.language !== undefined ? { language: input.language } : {}),
      ...(input.theme !== undefined ? { theme: input.theme } : {}),
    },
    {
      authMode: "userPool",
      selectionSet: [
        "id",
        "name",
        "email",
        "profileImage",
        "activeRole",
        "language",
        "theme",
      ],
    },
  );
  throwModelErrors(errors, "Unable to save your preferences.");
  if (!data) throw new Error("Unable to save your preferences.");
  return data;
}

export async function uploadCurrentUserProfileImage(
  file: File,
): Promise<UserProfile> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file to use as your profile photo.");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Profile photos must be 5 MB or smaller.");
  }

  const [{ userId }, { identityId }] = await Promise.all([
    getCurrentUser(),
    fetchAuthSession(),
  ]);
  if (!identityId) {
    throw new Error("Your session is not ready for image uploads. Try again.");
  }

  const path = `profile-images/${identityId}/${crypto.randomUUID()}-${encodeURIComponent(file.name)}`;
  await uploadData({
    path,
    data: file,
    options: { contentType: file.type },
  }).result;

  const { data, errors } = await client.models.NearFixUser.update(
    { id: userId, profileImage: path },
    { authMode: "userPool" },
  );
  throwModelErrors(errors, "Unable to save your profile photo.");
  if (!data) throw new Error("Your profile photo was uploaded but not saved.");

  return data;
}
