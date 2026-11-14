export const serviceListingKeys = {
  all: ["provider", "services"] as const,
  lists: () => [...serviceListingKeys.all, "list"] as const,
};

export const providerApplicationKeys = {
  all: ["provider", "applications"] as const,
  lists: () => [...providerApplicationKeys.all, "list"] as const,
  status: (userId: string) =>
    [...providerApplicationKeys.all, "status", userId] as const,
};

export const providerProfileKeys = {
  all: ["provider", "profile"] as const,
  current: (userId: string) => [...providerProfileKeys.all, userId] as const,
  workspace: (providerId: string) =>
    [...providerProfileKeys.all, "workspace", providerId] as const,
  document: (path: string) =>
    [...providerProfileKeys.all, "document", path] as const,
};
