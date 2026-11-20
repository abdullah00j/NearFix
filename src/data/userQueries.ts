import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./userKeys";
import { getUserProfileImageUrl, loadCurrentUserProfile } from "./userServices";

export const useCurrentUserProfileQuery = () =>
  useQuery({
    queryKey: userKeys.currentProfile(),
    queryFn: loadCurrentUserProfile,
  });

export const useUserProfileImageUrl = (path: string) =>
  useQuery({
    queryKey: userKeys.profileImage(path),
    queryFn: () => getUserProfileImageUrl(path),
    enabled: Boolean(path),
    staleTime: 30 * 60 * 1000,
  });
