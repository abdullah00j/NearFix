function BecomeProviderPageSkeleton() {
  return (
    <main
      className="mx-auto max-w-[960px] animate-pulse space-y-6 px-1 py-2 text-[var(--text)] md:px-2"
      role="status"
      aria-label="Loading provider application"
    >
      <div className="h-16 w-full rounded-2xl bg-[var(--color-panel-soft)]" />

      <div className="flex items-center gap-3">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-10 flex-1 rounded-full bg-[var(--color-panel-soft)]"
          />
        ))}
      </div>

      <section className="space-y-5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5">
        <div className="h-6 w-40 rounded bg-[var(--color-panel-soft)]" />

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[0, 1].map((item) => (
              <div key={item} className="space-y-2">
                <div className="h-4 w-24 rounded bg-[var(--color-panel-soft)]" />
                <div className="h-11 w-full rounded-xl bg-[var(--color-panel-soft)]" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="h-4 w-28 rounded bg-[var(--color-panel-soft)]" />
            <div className="h-11 w-full rounded-xl bg-[var(--color-panel-soft)]" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[0, 1].map((item) => (
              <div key={item} className="space-y-2">
                <div className="h-4 w-32 rounded bg-[var(--color-panel-soft)]" />
                <div className="h-28 w-full rounded-2xl bg-[var(--color-panel-soft)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-between gap-3">
        <div className="h-11 w-28 rounded-xl bg-[var(--color-panel-soft)]" />
        <div className="h-11 w-28 rounded-xl bg-[var(--color-panel-soft)]" />
      </div>

      <span className="sr-only">Loading provider application...</span>
    </main>
  );
}

export default BecomeProviderPageSkeleton;
