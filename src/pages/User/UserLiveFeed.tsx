import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Armchair,
  ChevronDown,
  Clock3,
  Droplet,
  Heart,
  MapPin,
  Paintbrush,
  Search,
  ShieldCheck,
  Star,
  Sparkles,
  Zap,
  Wrench,
} from "lucide-react";

type ServiceCategory =
  | "All services"
  | "Plumbing"
  | "Electrical"
  | "Cleaning"
  | "Painting"
  | "Assembly";

type ProviderCard = {
  id: string;
  name: string;
  category: Exclude<ServiceCategory, "All services">;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  startingPrice: number;
  responseTime: string;
  initials: string;
  availableToday: boolean;
  verified: boolean;
};

const categories: { label: ServiceCategory; icon: typeof Wrench }[] = [
  { label: "All services", icon: Wrench },
  { label: "Plumbing", icon: Droplet },
  { label: "Electrical", icon: Zap },
  { label: "Cleaning", icon: Sparkles },
  { label: "Painting", icon: Paintbrush },
  { label: "Assembly", icon: Armchair },
];

const providers: ProviderCard[] = [
  {
    id: "provider-1",
    name: "Jordan's Home Services",
    category: "Plumbing",
    description:
      "From leaky faucets to full installations, get dependable plumbing help from a local pro.",
    location: "Brooklyn, NY",
    rating: 4.9,
    reviews: 128,
    startingPrice: 65,
    responseTime: "Usually responds in 10 min",
    initials: "JH",
    availableToday: true,
    verified: true,
  },
  {
    id: "provider-2",
    name: "Bright & Tidy",
    category: "Cleaning",
    description:
      "A fresh, comfortable home with flexible one-time and recurring cleaning visits.",
    location: "Manhattan, NY",
    rating: 4.8,
    reviews: 96,
    startingPrice: 90,
    responseTime: "Usually responds in 20 min",
    initials: "BT",
    availableToday: true,
    verified: true,
  },
  {
    id: "provider-3",
    name: "Harbor Electric",
    category: "Electrical",
    description:
      "Licensed help for lighting, wiring, switches, and everyday electrical repairs.",
    location: "Queens, NY",
    rating: 4.9,
    reviews: 74,
    startingPrice: 80,
    responseTime: "Usually responds in 15 min",
    initials: "HE",
    availableToday: false,
    verified: true,
  },
  {
    id: "provider-4",
    name: "Fresh Coat Studio",
    category: "Painting",
    description:
      "Careful interior painting and touch-ups with a clean finish and clear estimates.",
    location: "Brooklyn, NY",
    rating: 4.7,
    reviews: 58,
    startingPrice: 120,
    responseTime: "Usually responds in 30 min",
    initials: "FC",
    availableToday: true,
    verified: true,
  },
  {
    id: "provider-5",
    name: "FixRight Assembly",
    category: "Assembly",
    description:
      "Furniture assembly and wall mounting, handled carefully from start to finish.",
    location: "Bronx, NY",
    rating: 4.8,
    reviews: 61,
    startingPrice: 55,
    responseTime: "Usually responds in 25 min",
    initials: "FR",
    availableToday: false,
    verified: false,
  },
  {
    id: "provider-6",
    name: "NeatNest Cleaning",
    category: "Cleaning",
    description:
      "Friendly neighborhood cleaners for kitchens, bathrooms, and whole-home resets.",
    location: "Queens, NY",
    rating: 4.6,
    reviews: 43,
    startingPrice: 75,
    responseTime: "Usually responds in 1 hour",
    initials: "NN",
    availableToday: true,
    verified: true,
  },
];

export default function UserLiveFeed() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory>("All services");
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [savedProviders, setSavedProviders] = useState<string[]>([
    "provider-2",
  ]);

  const filteredProviders = useMemo(() => {
    const query = search.trim().toLowerCase();
    const locationQuery = location.trim().toLowerCase();

    return providers.filter((provider) => {
      const matchesCategory =
        selectedCategory === "All services" ||
        provider.category === selectedCategory;
      const matchesSearch =
        !query ||
        [
          provider.name,
          provider.category,
          provider.description,
          provider.location,
        ].some((value) => value.toLowerCase().includes(query));
      const matchesLocation =
        !locationQuery ||
        provider.location.toLowerCase().includes(locationQuery);
      const matchesAvailability =
        !availableTodayOnly || provider.availableToday;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesLocation &&
        matchesAvailability
      );
    });
  }, [availableTodayOnly, location, search, selectedCategory]);

  const toggleSaved = (providerId: string) => {
    setSavedProviders((current) =>
      current.includes(providerId)
        ? current.filter((id) => id !== providerId)
        : [...current, providerId],
    );
  };

  return (
    <section className="mx-auto max-w-[1280px] space-y-7 px-1 py-2 text-[var(--text)] md:px-2">
      <header className="relative overflow-hidden rounded-[26px] border border-line bg-panel-soft px-5 py-8 md:px-9 md:py-10">
        <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border border-line opacity-70" />
        <div className="pointer-events-none absolute -right-2 -top-16 h-56 w-56 rounded-full border border-line opacity-70" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-[var(--panel)] px-3 py-1.5 text-xs font-medium text-primary">
            <ShieldCheck size={14} />
            Trusted help, right around the corner
          </span>
          <h1 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
            What can we help you with today?
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)] md:text-base">
            Find reliable local professionals for the jobs that make home feel
            like home.
          </p>
        </div>

        <div className="relative mt-7 grid gap-3 rounded-2xl border border-line bg-[var(--panel)] p-3 shadow-[var(--shadow)] md:grid-cols-[1fr_0.72fr_auto] md:items-center md:p-2">
          <label className="flex min-h-11 items-center gap-2 px-2 text-[var(--muted)]">
            <Search size={18} className="shrink-0 text-primary" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="What service do you need?"
              className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
              aria-label="Search services or providers"
            />
          </label>
          <label className="flex min-h-11 items-center gap-2 border-line px-2 text-[var(--muted)] md:border-l md:pl-4">
            <MapPin size={17} className="shrink-0 text-primary" />
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="City or neighborhood"
              className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
              aria-label="Search by city or neighborhood"
            />
          </label>
          <a
            href="#recommended"
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            <Search size={16} />
            Find a pro
          </a>
        </div>
      </header>

      <section aria-labelledby="categories-heading">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="categories-heading" className="text-lg font-semibold">
            Browse by category
          </h2>
          <button
            type="button"
            onClick={() => setSelectedCategory("All services")}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
          >
            See all
            <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(({ label, icon: Icon }) => {
            const active = selectedCategory === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setSelectedCategory(label)}
                aria-pressed={active}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-line bg-[var(--panel)] text-[var(--muted)] hover:border-primary hover:text-primary"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section id="recommended" aria-labelledby="providers-heading">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-primary">Near you</p>
            <h2
              id="providers-heading"
              className="mt-1 text-xl font-semibold tracking-tight"
            >
              Recommended professionals
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setAvailableTodayOnly((current) => !current)}
            aria-pressed={availableTodayOnly}
            className={`inline-flex w-fit items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm transition ${
              availableTodayOnly
                ? "bg-panel-soft text-primary"
                : "bg-[var(--panel)] text-[var(--muted)] hover:text-primary"
            }`}
          >
            <Clock3 size={15} />
            Available today
            <ChevronDown size={14} />
          </button>
        </div>

        {filteredProviders.length === 0 ? (
          <div className="rounded-2xl border border-line bg-[var(--panel)] px-5 py-12 text-center">
            <Wrench className="mx-auto text-primary" size={24} />
            <h3 className="mt-3 font-semibold">No pros match your search</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Try a different service, location, or availability filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProviders.map((provider) => {
              const isSaved = savedProviders.includes(provider.id);

              return (
                <article
                  key={provider.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-[var(--panel)] shadow-[var(--shadow)]"
                >
                  <div className="flex min-h-[88px] items-center gap-3 bg-panel-soft px-3 py-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-[var(--panel)] text-sm font-semibold text-primary shadow-sm">
                      {provider.initials}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                      {provider.verified && (
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-[var(--panel)] px-2.5 py-1.5 text-xs font-medium text-[var(--text)]">
                          <ShieldCheck
                            size={13}
                            className="shrink-0 text-primary"
                          />
                          Verified
                        </span>
                      )}
                      {provider.availableToday && (
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-[var(--panel)] px-2.5 py-1.5 text-xs font-medium text-primary">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Available today
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSaved(provider.id)}
                      aria-label={
                        isSaved
                          ? `Remove ${provider.name} from favourites`
                          : `Save ${provider.name} to favourites`
                      }
                      aria-pressed={isSaved}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-[var(--panel)] text-primary transition hover:bg-[var(--bg)]"
                    >
                      <Heart
                        size={17}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">
                          {provider.name}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--muted)]">
                          <MapPin size={14} />
                          {provider.location}
                        </p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold">
                        <Star
                          size={15}
                          className="text-primary"
                          fill="currentColor"
                        />
                        {provider.rating}
                        <span className="font-normal text-[var(--muted)]">
                          ({provider.reviews})
                        </span>
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-[var(--muted)]">
                      {provider.description}
                    </p>

                    <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
                      <div>
                        <p className="text-xs text-[var(--muted)]">
                          Starting from
                        </p>
                        <p className="mt-0.5 text-lg font-semibold">
                          ${provider.startingPrice}
                        </p>
                      </div>
                      <span className="text-right text-xs text-[var(--muted)]">
                        <span className="block font-medium text-[var(--text)]">
                          {provider.category}
                        </span>
                        {provider.responseTime}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <p className="text-center text-xs text-[var(--muted)]">
        Sample providers shown for the live feed prototype.
      </p>
    </section>
  );
}
