export default function ProviderPageSkeleton() {
  return (
    <section
      className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2"
      aria-busy="true"
      aria-label="Loading provider page"
    >
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="h-4 w-32 animate-pulse rounded bg-[var(--line)]" />
          <div className="h-8 w-56 max-w-full animate-pulse rounded bg-[var(--line)]" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-[var(--line)]" />
        </div>
        <div className="h-10 w-28 animate-pulse rounded-xl bg-[var(--line)]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-2xl border border-[var(--line)] bg-[var(--panel)]"
          />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="h-80 animate-pulse rounded-2xl border border-[var(--line)] bg-[var(--panel)]" />
        <div className="space-y-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5">
          <div className="h-5 w-40 animate-pulse rounded bg-[var(--line)]" />
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-12 animate-pulse rounded bg-[var(--line)]"
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading provider data…</span>
    </section>
  );
}
