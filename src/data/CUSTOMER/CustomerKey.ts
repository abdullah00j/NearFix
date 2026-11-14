export const providerServiceListingKeys = {
  all: ["customer", "services"] as const,
  lists: () => [...providerServiceListingKeys.all, "list"] as const,
};

export const customerKeys = {
  all: ["customer"] as const,
  liveJoiners: () => [...customerKeys.all, "liveJoiners"] as const,
};
