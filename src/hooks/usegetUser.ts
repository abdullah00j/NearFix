import { useCallback, useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

const getUserProfile = async (userId: string) => {
  const { data, errors } = await client.models.NearFixUser.get(
    { id: userId },
    {
      authMode: "userPool",
      selectionSet: ["id", "name", "email", "profileImage"],
    },
  );

  if (errors?.length) {
    throw new Error(errors.map(({ message }) => message).join("; "));
  }

  return data;
};

type UserProfile = Pick<
  Schema["NearFixUser"]["type"],
  "id" | "name" | "email" | "profileImage"
>;

const loadCurrentUserProfile = async (): Promise<UserProfile> => {
  const { userId } = await getCurrentUser();
  let data = await getUserProfile(userId);

  if (!data) {
    const attributes = await fetchUserAttributes();
    if (!attributes.email) {
      throw new Error("The signed-in Cognito user does not have an email.");
    }

    const { data: ensured, errors } = await client.mutations.ensureUser(
      {},
      { authMode: "userPool" },
    );

    if (errors?.length) {
      throw new Error(errors.map(({ message }) => message).join("; "));
    }
    if (!ensured) {
      throw new Error("The user profile could not be created.");
    }

    data = await getUserProfile(userId);
    if (!data) {
      throw new Error("The user profile was not found after creation.");
    }
  }

  return data;
};

export const useGetUser = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const profile = await loadCurrentUserProfile();
      setUser(profile);
      return profile;
    } catch (err) {
      const profileError =
        err instanceof Error ? err : new Error("Failed to get user profile");

      setError(profileError);
      setUser(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        const profile = await loadCurrentUserProfile();
        if (!cancelled) setUser(profile);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to get user profile"),
          );
          setUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    user,
    loading,
    error,
    refetch,
  };
};
