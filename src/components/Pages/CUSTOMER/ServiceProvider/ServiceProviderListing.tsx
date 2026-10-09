import { BriefcaseBusiness } from "lucide-react";
import ProviderCard from "../../../common/ProviderCard";

type Provider = {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  initials: string;
  available: boolean;
  verified: boolean;
};

export default function ServiceProviderListing({
  filteredProviders,
}: {
  filteredProviders: Provider[];
}) {
  return (
    <>
      {filteredProviders.length === 0 ? (
        <div className="rounded-2xl border border-line bg-[var(--panel)] px-5 py-14 text-center">
          <BriefcaseBusiness className="mx-auto text-primary" size={24} />
          <h2 className="mt-3 font-semibold">No providers found</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Try a different search, category, or availability filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProviders.map((provider) => (
            <ProviderCard
              id={provider.id}
              name={provider.name}
              category={provider.category}
              description={provider.description}
              location={provider.location}
              rating={provider.rating}
              reviewCount={provider.reviewCount}
              available={provider.available}
              startingPrice={provider.startingPrice}
              verified={provider.verified}
              initials={provider.initials}
            />
          ))}
        </div>
      )}
    </>
  );
}
