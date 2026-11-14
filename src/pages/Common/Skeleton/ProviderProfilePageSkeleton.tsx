export default function ProviderProfilePageSkeleton() {
  return (
    <section
      className="mx-auto max-w-[1080px] space-y-6 px-4 py-10 text-[var(--text)]"
      aria-busy="true"
      aria-label="Loading provider profile"
    >
      <div className="h-4 w-40 animate-pulse rounded bg-[var(--line)]" />
      <div className="grid gap-6 rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 md:grid-cols-[auto_1fr] md:p-8">
        <div className="size-24 animate-pulse rounded-2xl bg-[var(--line)]" />
        <div className="space-y-3">
          <div className="h-4 w-28 animate-pulse rounded bg-[var(--line)]" />
          <div className="h-8 w-64 max-w-full animate-pulse rounded bg-[var(--line)]" />
          <div className="h-4 w-48 max-w-full animate-pulse rounded bg-[var(--line)]" />
          <div className="h-16 w-full animate-pulse rounded bg-[var(--line)]" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-6 w-44 animate-pulse rounded bg-[var(--line)]" />
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-2xl border border-[var(--line)] bg-[var(--panel)]"
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading provider profile…</span>
    </section>
  );
}
