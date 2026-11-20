export const userKeys = {
  all: ["user"] as const,
  currentProfile: () => [...userKeys.all, "currentProfile"] as const,
  profileImage: (path: string) =>
    [...userKeys.all, "profileImage", path] as const,
};
