import { Check, ChevronDown, Search } from "lucide-react";

interface ServiceProviderBarProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: string[];
  availableOnly: boolean;
  setAvailableOnly: (value: boolean) => void;
}

export default function ServiceProviderBar({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  availableOnly,
  setAvailableOnly,
}: ServiceProviderBarProps) {
  return (
    <>
      <div className="flex flex-col gap-3 rounded-2xl  bg-[var(--panel)] md:flex-row md:items-center ">
        <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-line bg-[var(--panel)] px-3 text-[var(--muted)]">
          <Search size={17} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search providers, services, or locations"
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
          />
        </label>
        <label className="relative flex h-11 items-center rounded-xl border border-line bg-[var(--panel)]">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-full w-full appearance-none rounded-xl bg-transparent py-2 pl-3 pr-10 text-sm text-[var(--text)] outline-none md:min-w-52"
            aria-label="Filter providers by category"
          >
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 text-[var(--muted)]"
          />
        </label>
        <button
          type="button"
          onClick={() => setAvailableOnly(!availableOnly)}
          aria-pressed={availableOnly}
          className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
            availableOnly
              ? "border-primary bg-primary text-white"
              : "border-line bg-[var(--panel)] text-[var(--muted)] hover:text-primary"
          }`}
        >
          <Check size={16} />
          Available now
        </button>
      </div>
    </>
  );
}
