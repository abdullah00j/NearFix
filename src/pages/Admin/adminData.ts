import { useCallback, useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { generateClient as generateGraphqlClient } from "aws-amplify/api";
import type { Schema } from "../../../amplify/data/resource";

export const adminClient = generateClient<Schema>();
export const adminGraphqlClient = generateGraphqlClient();

export type AdminDashboardData = {
  users: Schema["NearFixUser"]["type"][];
  providers: Schema["NearFixProvider"]["type"][];
  bookings: Schema["Booking"]["type"][];
  categories: Schema["Category"]["type"][];
};

export function throwModelErrors(
  errors: readonly { message?: string | null }[] | undefined,
  fallback: string,
) {
  if (errors?.length) {
    throw new Error(
      errors.map((error) => error.message ?? fallback).join("; "),
    );
  }
}

export function useAdminData<T>(loader: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await loader());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load admin data.",
      );
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    let cancelled = false;
    loader()
      .then((records) => {
        if (!cancelled) setData(records);
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load admin data.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [loader]);

  return { data, loading, error, refresh };
}

export function nonNullRecords<T>(records: (T | null)[] | null | undefined) {
  return (records ?? []).filter((record): record is T => record !== null);
}
