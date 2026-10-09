import { Heart } from "lucide-react";

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

interface FavHeaderProps {
  favourites: FavouriteProvider[];
}

export default function FavHeader({ favourites }: FavHeaderProps) {
  return (
    <>
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <Heart size={16} />
            Your shortlist
          </p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Favourite services
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
            Keep your go-to local professionals close at hand.
          </p>
        </div>
        <span className="self-start rounded-xl border border-line bg-panel-soft px-3 py-2 text-sm text-[var(--muted)] sm:self-auto">
          {favourites.length} saved{" "}
          {favourites.length === 1 ? "provider" : "providers"}
        </span>
      </header>
    </>
  );
}
