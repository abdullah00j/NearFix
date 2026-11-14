export default function AdminTableSkeleton({
  columns = 5,
}: {
  columns?: number;
}) {
  return (
    <div className="space-y-3 p-4" aria-busy="true" aria-label="Loading table">
      <div
        className="grid gap-4 border-b border-[var(--line)] pb-3"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: columns }, (_, index) => (
          <div
            key={index}
            className="h-3 animate-pulse rounded bg-[var(--line)]"
          />
        ))}
      </div>
      {Array.from({ length: 5 }, (_, row) => (
        <div
          key={row}
          className="grid items-center gap-4 border-b border-[var(--line)] py-3 last:border-0"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: columns }, (_, column) => (
            <div
              key={column}
              className={`h-4 animate-pulse rounded bg-[var(--line)] ${column === 0 ? "w-4/5" : "w-3/5"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
