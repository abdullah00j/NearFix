import { useMemo, useState } from "react";

import FavHeader from "../../components/Pages/CUSTOMER/Favourite/FavHeader";
import FavBar from "../../components/Pages/CUSTOMER/Favourite/FavBar";
import FavListing from "../../components/Pages/CUSTOMER/Favourite/FavListing";

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

type CategoryFilter = string;

const initialFavourites: FavouriteProvider[] = [
  {
    id: "provider-1",
    name: "Jordan's Home Services",
    service: "Plumbing",
    description:
      "Reliable plumbing repairs, installations, and maintenance for your home.",
    location: "Brooklyn, NY",
    rating: 4.9,
    reviewCount: 128,
    startingPrice: 65,
    initials: "JH",
  },
  {
    id: "provider-2",
    name: "Bright & Tidy",
    service: "Home Cleaning",
    description:
      "Thoughtful home cleaning with flexible one-time and recurring visits.",
    location: "Manhattan, NY",
    rating: 4.8,
    reviewCount: 96,
    startingPrice: 90,
    initials: "BT",
  },
  {
    id: "provider-3",
    name: "Harbor Electric",
    service: "Electrical",
    description:
      "Licensed help with lighting, wiring, switches, and electrical repairs.",
    location: "Queens, NY",
    rating: 4.9,
    reviewCount: 74,
    startingPrice: 80,
    initials: "HE",
  },
  {
    id: "provider-4",
    name: "FixRight Assembly",
    service: "Furniture Assembly",
    description:
      "Careful furniture assembly and mounting for a hassle-free setup.",
    location: "Bronx, NY",
    rating: 4.7,
    reviewCount: 61,
    startingPrice: 55,
    initials: "FR",
  },
];

export default function FavouritePage() {
  const [favourites, setFavourites] = useState(initialFavourites);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("All services");

  const categories = useMemo(
    () => [
      "All services",
      ...new Set(favourites.map(({ service }) => service)),
    ],
    [favourites],
  );

  const filteredFavourites = useMemo(() => {
    const query = search.trim().toLowerCase();

    return favourites.filter((provider) => {
      const matchesCategory =
        activeCategory === "All services" ||
        provider.service === activeCategory;
      const matchesSearch =
        !query ||
        [
          provider.name,
          provider.service,
          provider.description,
          provider.location,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, favourites, search]);

  const removeFavourite = (id: string) => {
    setFavourites((current) =>
      current.filter((provider) => provider.id !== id),
    );
  };

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <FavHeader favourites={favourites} />

      <FavBar
        activeCategory={activeCategory}
        categories={categories}
        setActiveCategory={setActiveCategory}
        search={search}
        setSearch={setSearch}
      />

      <FavListing
        filteredFavourites={filteredFavourites}
        favourites={favourites}
        onRemoveFavourite={removeFavourite}
      />
    </section>
  );
}
