import { useCurrentUserProfileQuery } from "@/lib/userQueries";

export const useGetUser = () => {
  const query = useCurrentUserProfileQuery();

  return {
    user: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error : null,
    refetch: async () => {
      const result = await query.refetch();
      return result.data ?? null;
    },
  };
};
