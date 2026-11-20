import { useMemo, useState } from "react";
import ServiceProviderHeader from "../../components/Pages/CUSTOMER/ServiceProvider/ServiceProviderHeader";
import ServiceProviderBar from "../../components/Pages/CUSTOMER/ServiceProvider/ServiceProviderBar";
import ServiceProviderListing from "../../components/Pages/CUSTOMER/ServiceProvider/ServiceProviderListing";
import { useListProviderServices } from "@/data/CUSTOMER/CustomerQueries";
import ServiceProvidersPageSkeleton from "./CustomerSkeleton/ServiceProvidersPageSkeleton";

type ProviderListing = {
  id: string;
  serviceId: string;
  name: string;
  category: string;
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  initials: string;
  verified: boolean;
  imageUrl: string | null;
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function ServiceProvidersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [availableOnly, setAvailableOnly] = useState(false);
  const { data, error, isLoading } = useListProviderServices();

  const providers = useMemo<ProviderListing[]>(
    () =>
      (data ?? [])
        .filter(
          (service) =>
            service !== null &&
            service.isActive &&
            service.provider?.verificationStatus === "APPROVED",
        )
        .map((service) => {
          const provider = service.provider;
          const name = provider?.businessName || "NearFix provider";

          return {
            id: service.providerId,
            serviceId: service.id,
            name,
            category: service.category,
            description:
              service.description ||
              "Contact this provider for service details.",
            location: provider?.serviceArea || "Service area not provided",
            rating: 0,
            reviewCount: 0,
            startingPrice: service.price,
            initials: getInitials(name) || "NF",
            verified: provider?.verificationStatus === "APPROVED",
            imageUrl: service.imageUrl,
          };
        }),
    [data],
  );

  const categories = useMemo(
    () => [
      "All categories",
      ...new Set(providers.map(({ category }) => category)),
    ],
    [providers],
  );

  const filteredProviders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return providers.filter((provider) => {
      const matchesCategory =
        category === "All categories" || provider.category === category;
      const matchesSearch =
        !query ||
        [
          provider.name,
          provider.category,
          provider.description,
          provider.location,
        ].some((value) => value.toLowerCase().includes(query));

      return (
        matchesCategory &&
        matchesSearch &&
        (!availableOnly || provider.verified)
      );
    });
  }, [availableOnly, category, providers, search]);

  if (isLoading) return <ServiceProvidersPageSkeleton />;

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <ServiceProviderHeader providerCount={filteredProviders.length} />

      <ServiceProviderBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        availableOnly={availableOnly}
        setAvailableOnly={setAvailableOnly}
      />

      {error ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-700 dark:text-rose-300"
        >
          {error instanceof Error
            ? error.message
            : "Unable to load service providers."}
        </div>
      ) : (
        <ServiceProviderListing filteredProviders={filteredProviders} />
      )}
    </section>
  );
}
