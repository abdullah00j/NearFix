import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "./userKeys";
import {
  updateCurrentUserForm,
  updateCurrentUserPreference,
  uploadCurrentUserProfileImage,
} from "./userServices";

export const useUpdateCurrentUserPreference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCurrentUserPreference,
    onSuccess: (profile) => {
      queryClient.setQueryData(userKeys.currentProfile(), profile);
    },
  });
};

export const useUpdateCurrentUserForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCurrentUserForm,
    onSuccess: (profile) => {
      queryClient.setQueryData(userKeys.currentProfile(), profile);
    },
  });
};

export const useUploadCurrentUserProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadCurrentUserProfileImage,
    onSuccess: (profile) => {
      queryClient.setQueryData(userKeys.currentProfile(), profile);
    },
  });
};
