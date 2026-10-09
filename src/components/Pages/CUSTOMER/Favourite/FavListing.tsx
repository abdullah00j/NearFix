import { Heart } from "lucide-react";
import ProviderCard from "../../../common/ProviderCard";

type FavouriteProvider = {
  id: string;
  name: string;
  service: string;
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  initials: string;
};

interface FavListingProps {
  filteredFavourites: FavouriteProvider[];
  favourites: FavouriteProvider[];
  onRemoveFavourite: (id: string) => void;
}

export default function FavListing({
  filteredFavourites,
  favourites,
  onRemoveFavourite,
}: FavListingProps) {
  return (
    <>
      {filteredFavourites.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-line bg-[var(--panel)] px-5 py-14 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-panel-soft text-primary">
            <Heart size={22} />
          </span>
          <h2 className="mt-4 font-semibold">
            {favourites.length === 0
              ? "No favourite providers yet"
              : "No matching favourites"}
          </h2>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
            {favourites.length === 0
              ? "Save providers you like and they’ll be easy to find here."
              : "Try a different search or select another service category."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredFavourites.map((provider) => (
            <div key={provider.id} className="relative">
              <ProviderCard
                id={provider.id}
                name={provider.name}
                description={provider.description}
                location={provider.location}
                rating={provider.rating}
                reviewCount={provider.reviewCount}
                startingPrice={provider.startingPrice}
                initials={provider.initials}
              />
              <button
                type="button"
                onClick={() => onRemoveFavourite(provider.id)}
                aria-label={`Remove ${provider.name} from favourites`}
                className="absolute right-4 top-4 rounded-full bg-[var(--panel)] p-2 text-primary shadow-sm hover:bg-panel-soft"
              >
                <Heart size={17} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
