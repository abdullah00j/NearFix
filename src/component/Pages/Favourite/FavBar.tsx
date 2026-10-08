import { Search } from "lucide-react";

interface FavBarProps {
  categories: string[];
  setActiveCategory: (category: string) => void;
  search: string;
  setSearch: (search: string) => void;
  activeCategory: string;
}

export default function FavBar({
  categories,
  setActiveCategory,
  search,
  setSearch,
  activeCategory,
}: FavBarProps) {
  return (
    <>
      <div className="flex flex-col gap-4 rounded-2xl  bg-[var(--panel)]  md:flex-row md:items-center md:justify-between ">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-panel-soft text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <label className="flex h-10 w-full items-center gap-2 rounded-xl border border-line bg-[var(--panel)] px-3 text-[var(--muted)] md:max-w-[280px]">
          <Search size={16} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search favourites"
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
          />
        </label>
      </div>
    </>
  );
}
