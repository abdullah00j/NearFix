import { useMemo, useState } from "react";
import ServiceProviderHeader from "../../components/Pages/CUSTOMER/ServiceProvider/ServiceProviderHeader";
import ServiceProviderBar from "../../components/Pages/CUSTOMER/ServiceProvider/ServiceProviderBar";
import ServiceProviderListing from "../../components/Pages/CUSTOMER/ServiceProvider/ServiceProviderListing";

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

const providers: Provider[] = [
  {
    id: "provider-1",
    name: "Jordan's Home Services",
    category: "Plumbing",
    description:
      "Reliable plumbing repairs, installations, and maintenance for your home.",
    location: "Brooklyn, NY",
    rating: 4.9,
    reviewCount: 128,
    startingPrice: 65,
    initials: "JH",
    available: true,
    verified: true,
  },
  {
    id: "provider-2",
    name: "Bright & Tidy",
    category: "Home Cleaning",
    description:
      "Flexible one-time and recurring cleaning to keep your home feeling fresh.",
    location: "Manhattan, NY",
    rating: 4.8,
    reviewCount: 96,
    startingPrice: 90,
    initials: "BT",
    available: true,
    verified: true,
  },
  {
    id: "provider-3",
    name: "Harbor Electric",
    category: "Electrical",
    description:
      "Licensed help with lighting, wiring, switches, and electrical repairs.",
    location: "Queens, NY",
    rating: 4.9,
    reviewCount: 74,
    startingPrice: 80,
    initials: "HE",
    available: false,
    verified: true,
  },
  {
    id: "provider-4",
    name: "Fresh Coat Studio",
    category: "Painting",
    description:
      "Interior painting and touch-ups with a clean finish and clear estimates.",
    location: "Brooklyn, NY",
    rating: 4.7,
    reviewCount: 58,
    startingPrice: 120,
    initials: "FC",
    available: true,
    verified: true,
  },
  {
    id: "provider-5",
    name: "FixRight Assembly",
    category: "Furniture Assembly",
    description:
      "Furniture assembly and wall mounting, handled carefully from start to finish.",
    location: "Bronx, NY",
    rating: 4.8,
    reviewCount: 61,
    startingPrice: 55,
    initials: "FR",
    available: false,
    verified: false,
  },
  {
    id: "provider-6",
    name: "NeatNest Cleaning",
    category: "Home Cleaning",
    description:
      "Friendly neighborhood cleaners for kitchens, bathrooms, and whole-home resets.",
    location: "Queens, NY",
    rating: 4.6,
    reviewCount: 43,
    startingPrice: 75,
    initials: "NN",
    available: true,
    verified: true,
  },
];

export default function ServiceProvidersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [availableOnly, setAvailableOnly] = useState(false);

  const categories = useMemo(
    () => [
      "All categories",
      ...new Set(providers.map(({ category }) => category)),
    ],
    [],
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
        (!availableOnly || provider.available)
      );
    });
  }, [availableOnly, category, search]);

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

      <ServiceProviderListing filteredProviders={filteredProviders} />

      <p className="text-center text-xs text-[var(--muted)]">
        Sample provider listings shown for this prototype.
      </p>
    </section>
  );
}
