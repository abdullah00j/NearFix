import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { generateClient } from "aws-amplify/data";
import { useCurrentUser } from "../../context/UserContext";
import type { Schema } from "../../../amplify/data/resource";

export const providerClient = generateClient<Schema>();

export type ProviderWorkspace = {
  provider: Schema["NearFixProvider"]["type"] | null;
  services: Schema["ProviderService"]["type"][];
  bookings: {
    id: string;
    providerServiceId: string;
    status?:
      "PENDING" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELED" | null;
    scheduledAt?: string | null;
    completedAt?: string | null;
    updatedAt: string;
    createdAt: string;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment?: string | null;
    bookingId: string;
    reviewerId: string;
    createdAt: string;
    type?: "CUSTOMER_TO_PROVIDER" | "PROVIDER_TO_CUSTOMER" | null;
  }[];
  categories: Schema["Category"]["type"][];
};

function throwModelErrors(
  errors: readonly { message?: string | null }[] | undefined,
  fallback: string,
) {
  if (errors?.length) {
    throw new Error(
      errors.map((error) => error.message ?? fallback).join("; "),
    );
  }
}

function nonNullRecords<T>(records: (T | null)[] | null | undefined) {
  return (records ?? []).filter((record): record is T => record !== null);
}

export async function loadProviderWorkspace(
  userId: string,
): Promise<ProviderWorkspace> {
  const providerResult = await providerClient.models.NearFixProvider.list({
    limit: 10,
    filter: { userId: { eq: userId } },
  });
  throwModelErrors(
    providerResult.errors,
    "Unable to load your provider profile.",
  );
  const provider = nonNullRecords(providerResult.data)[0] ?? null;

  if (!provider) {
    return {
      provider: null,
      services: [],
      bookings: [],
      reviews: [],
      categories: [],
    };
  }

  const [servicesResult, bookingsResult, reviewsResult, categoriesResult] =
    await Promise.all([
      providerClient.models.ProviderService.list({
        limit: 200,
        filter: { providerId: { eq: provider.id } },
      }),
      providerClient.models.Booking.list({
        limit: 200,
        filter: { providerId: { eq: provider.id } },
        selectionSet: [
          "id",
          "providerServiceId",
          "status",
          "scheduledAt",
          "completedAt",
          "updatedAt",
          "createdAt",
        ] as const,
      }),
      providerClient.models.Reviews.list({
        limit: 200,
        filter: { revieweeId: { eq: provider.id } },
        selectionSet: [
          "id",
          "rating",
          "comment",
          "bookingId",
          "reviewerId",
          "createdAt",
          "type",
        ] as const,
      }),
      providerClient.models.Category.list({ limit: 200 }),
    ]);

  throwModelErrors(servicesResult.errors, "Unable to load your services.");
  throwModelErrors(bookingsResult.errors, "Unable to load your bookings.");
  throwModelErrors(reviewsResult.errors, "Unable to load your reviews.");
  throwModelErrors(
    categoriesResult.errors,
    "Unable to load service categories.",
  );

  return {
    provider,
    services: nonNullRecords(servicesResult.data),
    bookings: nonNullRecords(bookingsResult.data),
    reviews: nonNullRecords(reviewsResult.data).filter(
      (review) => review.type === "CUSTOMER_TO_PROVIDER",
    ),
    categories: nonNullRecords(categoriesResult.data).filter(
      (category) => category.isActive,
    ),
  };
}

type ProviderWorkspaceContextValue = {
  data: ProviderWorkspace | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const ProviderWorkspaceContext =
  createContext<ProviderWorkspaceContextValue | null>(null);

export function ProviderWorkspaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useCurrentUser();
  const userId = currentUser?.id;
  const [data, setData] = useState<ProviderWorkspace | null>(null);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!userId) {
      setData(null);
      setError("Your user profile is not available. Please sign in again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      setData(await loadProviderWorkspace(userId));
      setLoadedUserId(userId);
    } catch (loadError) {
      setLoadedUserId(userId);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load provider data.",
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    let cancelled = false;
    if (!userId) {
      return;
    }

    loadProviderWorkspace(userId)
      .then((workspace) => {
        if (!cancelled) {
          setData(workspace);
          setLoadedUserId(userId);
          setError(null);
        }
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setLoadedUserId(userId);
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load provider data.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const value = {
    data: userId && loadedUserId === userId ? data : null,
    loading: userId ? loading || loadedUserId !== userId : false,
    error: userId
      ? loadedUserId === userId
        ? error
        : null
      : "Your user profile is not available. Please sign in again.",
    refresh,
  };

  return createElement(ProviderWorkspaceContext.Provider, { value }, children);
}

export function useProviderWorkspace() {
  const context = useContext(ProviderWorkspaceContext);
  if (!context) {
    throw new Error(
      "useProviderWorkspace must be used within a ProviderWorkspaceProvider",
    );
  }
  return context;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatProviderDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}
