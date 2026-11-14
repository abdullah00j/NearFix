export default function AdminOverviewSkeleton({
  cards = 4,
  showChart = true,
}: {
  cards?: number;
  showChart?: boolean;
}) {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading overview">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: cards }, (_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4"
          >
            <div className="h-3 w-2/5 animate-pulse rounded bg-[var(--line)]" />
            <div className="h-7 w-1/3 animate-pulse rounded bg-[var(--line)]" />
            <div className="h-3 w-3/5 animate-pulse rounded bg-[var(--line)]" />
          </div>
        ))}
      </div>
      {showChart && (
        <div className="h-72 animate-pulse rounded-2xl border border-[var(--line)] bg-[var(--panel)]" />
      )}
      <div className="space-y-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5">
        <div className="h-5 w-1/3 animate-pulse rounded bg-[var(--line)]" />
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-10 animate-pulse rounded bg-[var(--line)]"
          />
        ))}
      </div>
    </div>
  );
}
