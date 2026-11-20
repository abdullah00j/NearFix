import { createContext, useCallback, useContext, type ReactNode } from "react";
import type { Schema } from "../../amplify/data/resource";
import type { getProviderWorkspace } from "@/data/PROVIDER/ProviderServices";
import {
  useCurrentProviderQuery,
  useProviderWorkspaceQuery,
} from "@/data/PROVIDER/ProviderQueries";
import { useCurrentUser } from "./UserContext";

/* eslint-disable react-refresh/only-export-components */

type Provider = Schema["NearFixProvider"]["type"];
type ProviderWorkspace = Awaited<ReturnType<typeof getProviderWorkspace>>;

type ProviderContextValue = {
  currentProvider: Provider | null;
  data: ProviderWorkspace | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const ProviderContext = createContext<ProviderContextValue | null>(null);

export const NearfixProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser, role } = useCurrentUser();

  const isProvider = role?.includes("PROVIDER") ?? false;

  const query = useCurrentProviderQuery(
    isProvider ? currentUser?.id : undefined,
  );
  const workspaceQuery = useProviderWorkspaceQuery(query.data?.id);
  const dataError = query.error ?? workspaceQuery.error;
  const { refetch } = query;
  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return (
    <ProviderContext.Provider
      value={{
        currentProvider: isProvider ? (query.data ?? null) : null,
        data: isProvider ? (workspaceQuery.data ?? null) : null,
        loading:
          isProvider &&
          (query.isFetching ||
            (Boolean(query.data) && workspaceQuery.isFetching)),
        error: dataError
          ? dataError instanceof Error
            ? dataError.message
            : "Unable to load provider data."
          : null,
        refresh,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export const useProvider = () => {
  const context = useContext(ProviderContext);

  if (!context) {
    throw new Error("useProvider must be used within a NearfixProvider");
  }

  return context;
};
