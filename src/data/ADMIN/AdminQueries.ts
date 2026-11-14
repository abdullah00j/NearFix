import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminDashboardData,
  getAdminDocumentUrl,
  observeAdminProviderApplications,
} from "./AdminServices";
import { adminKeys } from "./AdminKeys";
import type { AdminDashboardData } from "./AdminServices";
import type { ProviderApplication } from "./AdminTypes";

export const useAdminDashboardQuery = (enabled = true) =>
  useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: getAdminDashboardData,
    enabled,
  });

export const useAdminDocumentUrl = (path?: string | null) =>
  useQuery({
    queryKey: adminKeys.document(path ?? ""),
    queryFn: () => getAdminDocumentUrl(path!),
    enabled: Boolean(path),
    staleTime: 45_000,
  });

export const useLiveAdminProviderApplications = (
  users: AdminDashboardData["users"],
) => {
  const queryClient = useQueryClient();
  const query = useQuery<ProviderApplication[]>({
    queryKey: adminKeys.providerApplications(),
    queryFn: async () =>
      queryClient.getQueryData<AdminDashboardData>(adminKeys.dashboard())
        ?.providerApplications ?? [],
  });

  useEffect(() => {
    const usersById = new Map(users.map((user) => [user.id, user]));
    const subscription = observeAdminProviderApplications((items) => {
      const applications = items
        .filter(
          (application) =>
            application.applicationStatus === "PENDING" ||
            application.applicationStatus === "REJECTED",
        )
        .map((application) => {
          const user = usersById.get(application.userId);
          return {
            ...application,
            selfie: application.selfie ?? null,
            CNICNumber: application.CNICNumber ?? null,
            CNICNAME: application.CNICNAME ?? null,
            CNICFrontSide: application.CNICFrontSide ?? null,
            CNICBackSide: application.CNICBackSide ?? null,
            owner: application.owner ?? null,
            users: user
              ? {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  profileImage: user.profileImage ?? null,
                }
              : null,
          };
        });
      queryClient.setQueryData(adminKeys.providerApplications(), applications);
    });

    return () => subscription.unsubscribe();
  }, [queryClient, users]);

  return query;
};
