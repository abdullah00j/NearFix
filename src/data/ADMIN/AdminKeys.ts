export const adminKeys = {
  all: ["admin"] as const,
  dashboard: () => [...adminKeys.all, "dashboard"] as const,
  providerApplications: () =>
    [...adminKeys.all, "providerApplications"] as const,
  document: (path: string) => [...adminKeys.all, "document", path] as const,
};
