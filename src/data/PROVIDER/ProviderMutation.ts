import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProviderApplication,
  createService,
  deleteService,
  updateService,
  uploadProviderDocument,
  uploadProviderServiceImage,
} from "./ProviderServices";
import { providerApplicationKeys, serviceListingKeys } from "./ProviderKeys";

// PROVIDER APPLICATION
export const useCreateProviderApplication = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProviderApplication,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: providerApplicationKeys.all,
      });
    },
  });
};

export const useUploadProviderDocument = () =>
  useMutation({ mutationFn: uploadProviderDocument });

export const useUploadProviderServiceImage = () =>
  useMutation({ mutationFn: uploadProviderServiceImage });

// PROVIDER SERVICES
export const useCreateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: serviceListingKeys.lists(),
      });
    },
  });
};

export const useUpdateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: serviceListingKeys.lists(),
      });
    },
  });
};

export const useDeleteService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: serviceListingKeys.lists(),
      }),
  });
};
