import { useCallback, useEffect } from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { customerKeys, providerServiceListingKeys } from "./CustomerKey";
import {
  getProviderServiceListing,
  observeNewCustomerSignups,
  type CustomerJoinNotice,
} from "./CustomerServices";

const liveCustomerJoinersKey = customerKeys.liveJoiners();

export const useListProviderServices = () =>
  useQuery({
    queryKey: providerServiceListingKeys.lists(),
    queryFn: getProviderServiceListing,
    placeholderData: keepPreviousData,
  });

export const useLiveCustomerJoiner = (currentUserId?: string) => {
  const queryClient = useQueryClient();
  const queryKey = liveCustomerJoinersKey;

  const query = useQuery<CustomerJoinNotice | null>({
    queryKey,
    queryFn: async () => null,
    initialData: null,
    staleTime: Infinity,
  });

  useEffect(() => {
    queryClient.setQueryData(queryKey, null);
    const subscription = observeNewCustomerSignups(currentUserId, (notice) =>
      queryClient.setQueryData(queryKey, notice),
    );
    return () => subscription.unsubscribe();
  }, [currentUserId, queryClient, queryKey]);

  const clearNotice = useCallback(
    () => queryClient.setQueryData(queryKey, null),
    [queryClient, queryKey],
  );

  return {
    notice: query.data,
    clearNotice,
  };
};
