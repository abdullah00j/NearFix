import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getCurrentProvider,
  getCurrentProviderApplicationStatus,
  getProviderDocumentUrl,
  getProviderWorkspace,
  getServiceList,
} from "./ProviderServices";
import {
  providerApplicationKeys,
  providerProfileKeys,
  serviceListingKeys,
} from "./ProviderKeys";

export const useListServices = () =>
  useQuery({
    queryKey: serviceListingKeys.lists(),
    queryFn: getServiceList,
    placeholderData: keepPreviousData,
  });

export const useCurrentProviderQuery = (userId?: string | null) =>
  useQuery({
    queryKey: providerProfileKeys.current(userId ?? "anonymous"),
    queryFn: () => getCurrentProvider(userId!),
    enabled: Boolean(userId),
  });

export const useProviderWorkspaceQuery = (providerId?: string | null) =>
  useQuery({
    queryKey: providerProfileKeys.workspace(providerId ?? "anonymous"),
    queryFn: () => getProviderWorkspace(providerId!),
    enabled: Boolean(providerId),
  });

export const useProviderApplicationStatusQuery = (userId?: string | null) =>
  useQuery({
    queryKey: providerApplicationKeys.status(userId ?? "anonymous"),
    queryFn: () => getCurrentProviderApplicationStatus(userId!),
    enabled: Boolean(userId),
  });

export const useProviderDocumentUrl = (path?: string | null) =>
  useQuery({
    queryKey: providerProfileKeys.document(path ?? ""),
    queryFn: () => getProviderDocumentUrl(path!),
    enabled: Boolean(path),
    staleTime: 45_000,
  });
