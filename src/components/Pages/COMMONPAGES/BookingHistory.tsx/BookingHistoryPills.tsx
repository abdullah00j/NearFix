type HistoryStatus = "COMPLETED" | "CANCELED";
type HistoryFilter = "ALL" | HistoryStatus;
interface BookingHistoryPillsProps {
  activeFilter: HistoryFilter;
  setActiveFilter: (filter: HistoryFilter) => void;
  filters: { label: string; value: HistoryFilter }[];
  counts: Record<HistoryFilter, number>;
}

export default function BookingHistoryPills({
  activeFilter,
  setActiveFilter,
  filters,
  counts,
}: BookingHistoryPillsProps) {
  return (
    <>
      <div
        className="mt-6 flex flex-wrap gap-2"
        aria-label="Filter booking history"
      >
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            aria-pressed={activeFilter === filter.value}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeFilter === filter.value
                ? "bg-primary text-white"
                : "bg-panel-soft text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {filter.label}
            <span
              className={`ml-2 ${
                activeFilter === filter.value
                  ? "text-white/75"
                  : "text-[var(--muted)]"
              }`}
            >
              {counts[filter.value]}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
