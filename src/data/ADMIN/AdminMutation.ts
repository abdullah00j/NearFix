import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminKeys } from "./AdminKeys";
import {
  createAdminCategory,
  markAdminNotificationRead,
  reviewProviderApplication,
  updateAdminCategory,
  updateAdminService,
  updateAdminUserStatus,
} from "./AdminServices";

export const useUpdateAdminUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdminUserStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() }),
  });
};

export const useCreateAdminCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdminCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() }),
  });
};

export const useUpdateAdminCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdminCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() }),
  });
};

export const useUpdateAdminService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdminService,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() }),
  });
};

export const useMarkAdminNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAdminNotificationRead,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() }),
  });
};

export const useReviewProviderApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewProviderApplication,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
      void queryClient.invalidateQueries({
        queryKey: adminKeys.providerApplications(),
      });
    },
  });
};
