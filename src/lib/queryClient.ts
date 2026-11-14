import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // data is fresh for 1 min
      retry: 1,
      refetchOnWindowFocus: true, // default, shown for clarity
    },
  },
});
