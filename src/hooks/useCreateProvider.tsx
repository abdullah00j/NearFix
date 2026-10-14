import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useState } from "react";

const client = generateClient<Schema>();

type CreateApplicationArgs = Schema["createMyProviderApplication"]["args"];
type ProviderApplication = Schema["ProviderApplication"]["type"];

const createProviderApplication = async (
  input: CreateApplicationArgs,
): Promise<ProviderApplication> => {
  const { data, errors } = await client.mutations.createMyProviderApplication(
    input,
    { authMode: "userPool" },
  );

  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join("; "));
  }
  if (!data) {
    throw new Error("No application returned");
  }

  return data;
};

export const useCreateProvider = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProvider = async (
    providerFormData: CreateApplicationArgs,
  ): Promise<ProviderApplication | null> => {
    if (loading) return null;

    setLoading(true);
    setError(null);

    try {
      return await createProviderApplication(providerFormData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create provider",
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createProvider, loading, error };
};
