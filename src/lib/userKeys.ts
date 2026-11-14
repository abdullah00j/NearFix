export const userKeys = {
  all: ["user"] as const,
  currentProfile: () => [...userKeys.all, "currentProfile"] as const,
};
