import { Heart } from "lucide-react";
import CustomerPageHeader from "../Shared/CustomerPageHeader";

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
    <CustomerPageHeader
      icon={<Heart size={16} />}
      eyebrow="Your shortlist"
      title="Favourite services"
      description="Keep your go-to local professionals close at hand."
      summary={
        <span className="self-start rounded-xl border border-line bg-panel-soft px-3 py-2 text-sm text-[var(--muted)] sm:self-auto">
          {favourites.length} saved{" "}
          {favourites.length === 1 ? "provider" : "providers"}
        </span>
      }
    />
  );
}
