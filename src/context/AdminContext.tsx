import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useCurrentUser } from "./UserContext";
import { useAdminDashboardQuery } from "@/data/ADMIN/AdminQueries";
import type { AdminDashboardData } from "@/data/ADMIN/AdminServices";

/* eslint-disable react-refresh/only-export-components */

type AdminContextValue = {
  data: AdminDashboardData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { role } = useCurrentUser();
  const isAdmin = role?.includes("ADMIN") ?? false;
  const query = useAdminDashboardQuery(isAdmin);
  const { refetch } = query;
  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return (
    <AdminContext.Provider
      value={{
        data: isAdmin ? (query.data ?? null) : null,
        loading: isAdmin && query.isFetching,
        error: isAdmin
          ? query.error instanceof Error
            ? query.error.message
            : query.error
              ? "Unable to load admin data."
              : null
          : null,
        refresh,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }

  return context;
};
