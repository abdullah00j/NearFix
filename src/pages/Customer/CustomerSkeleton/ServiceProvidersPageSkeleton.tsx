export default function ServiceProvidersPageSkeleton() {
  return (
    <section
      className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2"
      aria-busy="true"
      aria-label="Loading service providers"
    >
      <div className="space-y-3">
        <div className="h-4 w-36 animate-pulse rounded bg-[var(--line)]" />
        <div className="h-8 w-64 max-w-full animate-pulse rounded bg-[var(--line)]" />
        <div className="h-4 w-96 max-w-full animate-pulse rounded bg-[var(--line)]" />
      </div>
      <div className="h-14 animate-pulse rounded-2xl bg-[var(--line)]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="space-y-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5"
          >
            <div className="flex items-center gap-3">
              <div className="size-12 animate-pulse rounded-xl bg-[var(--line)]" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--line)]" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--line)]" />
              </div>
            </div>
            <div className="h-16 animate-pulse rounded bg-[var(--line)]" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-[var(--line)]" />
            <div className="h-10 animate-pulse rounded-xl bg-[var(--line)]" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading service providers…</span>
    </section>
  );
}
