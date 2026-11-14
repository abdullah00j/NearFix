import { client } from "../../lib/amplify";
import { throwModelErrors } from "../../lib/errors";

export type CustomerJoinNotice = {
  id: string;
  name: string;
  email: string;
};

export type PublicProviderService = {
  id: string;
  description: string | null;
  price: number;
  category: string;
  pricingType: "PER_TASK" | "PER_HOUR" | "PER_PRODUCT" | "PER_DAY" | null;
  isActive: boolean | null;
  providerId: string;
  provider: {
    businessName: string | null;
    bio: string | null;
    experience: string | null;
    serviceArea: string | null;
    verificationStatus:
      "PENDING" | "APPROVED" | "REJECTED" | "CHANGE_REQUESTED";
    availabilityStatus: "ONLINE" | "OFFLINE" | "BUSY";
  } | null;
};

export async function getProviderServiceListing(): Promise<
  PublicProviderService[]
> {
  const [serviceResult, providerResult] = await Promise.all([
    client.models.ProviderService.list({
      limit: 200,
      selectionSet: [
        "id",
        "description",
        "price",
        "category",
        "pricingType",
        "isActive",
        "providerId",
      ] as const,
    }),
    client.models.NearFixProvider.list({
      limit: 200,
      selectionSet: [
        "id",
        "businessName",
        "bio",
        "experience",
        "serviceArea",
        "verificationStatus",
        "availabilityStatus",
      ] as const,
    }),
  ]);

  throwModelErrors(serviceResult.errors, "Unable to fetch services.");
  throwModelErrors(providerResult.errors, "Unable to fetch providers.");

  const providersById = new Map<
    string,
    NonNullable<typeof providerResult.data>[number]
  >(
    (providerResult.data ?? [])
      .filter((provider) => provider !== null)
      .map((provider) => [provider.id, provider]),
  );

  return (serviceResult.data ?? [])
    .filter((service) => service !== null)
    .map((service) => {
      const provider = providersById.get(service.providerId);

      return {
        id: service.id,
        description: service.description,
        price: service.price,
        category: service.category,
        pricingType: service.pricingType,
        isActive: service.isActive,
        providerId: service.providerId,
        provider: provider
          ? {
              businessName: provider.businessName,
              bio: provider.bio,
              experience: provider.experience,
              serviceArea: provider.serviceArea,
              verificationStatus: provider.verificationStatus,
              availabilityStatus: provider.availabilityStatus,
            }
          : null,
      };
    });
}

export function observeNewCustomerSignups(
  currentUserId: string | undefined,
  onJoin: (customer: CustomerJoinNotice) => void,
) {
  const knownIds = new Set<string>();
  let hasInitialSnapshot = false;

  return client.models.NearFixUser.observeQuery({
    authMode: "userPool",
  }).subscribe({
    next: ({ items, isSynced }) => {
      if (!hasInitialSnapshot) {
        if (isSynced) {
          items.forEach((user) => knownIds.add(user.id));
          hasInitialSnapshot = true;
        }
        return;
      }

      const newCustomer = items.find(
        (user) =>
          !knownIds.has(user.id) &&
          user.id !== currentUserId &&
          user.activeRole !== "PROVIDER",
      );
      items.forEach((user) => knownIds.add(user.id));

      if (newCustomer) {
        onJoin({
          id: newCustomer.id,
          name: newCustomer.name,
          email: newCustomer.email,
        });
      }
    },
  });
}
