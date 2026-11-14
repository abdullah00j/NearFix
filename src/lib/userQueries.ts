import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./userKeys";
import { loadCurrentUserProfile } from "./userServices";

export const useCurrentUserProfileQuery = () =>
  useQuery({
    queryKey: userKeys.currentProfile(),
    queryFn: loadCurrentUserProfile,
  });
