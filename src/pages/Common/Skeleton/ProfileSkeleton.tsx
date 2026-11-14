function ProfileSkeleton() {
  return (
    <main
      className="min-h-screen animate-pulse bg-[var(--panel)] px-6 py-8 text-[var(--text)]"
      role="status"
      aria-label="Loading profile"
    >
      <div className="mx-auto max-w-[1280px] space-y-8">
        <section>
          <div className="h-6 w-28 rounded bg-[var(--color-panel-soft)]" />

          <div className="mt-8 flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[var(--color-panel-soft)]" />
            <div className="space-y-2">
              <div className="h-4 w-20 rounded bg-[var(--color-panel-soft)]" />
              <div className="h-9 w-32 rounded-lg bg-[var(--color-panel-soft)]" />
            </div>
          </div>

          <div className="mt-6 grid max-w-[640px] gap-5 sm:grid-cols-2">
            {[0, 1, 2].map((item) => (
              <div key={item} className="space-y-2">
                <div className="h-4 w-20 rounded bg-[var(--color-panel-soft)]" />
                <div className="h-10 w-full rounded-lg bg-[var(--color-panel-soft)]" />
              </div>
            ))}
          </div>
        </section>

        {[0, 1, 2].map((section) => (
          <section
            key={section}
            className="space-y-4 border-t border-[var(--line)] pt-8"
          >
            <div className="h-5 w-44 rounded bg-[var(--color-panel-soft)]" />
            <div className="h-4 w-72 max-w-full rounded bg-[var(--color-panel-soft)]" />
            <div className="h-10 w-64 max-w-full rounded-lg bg-[var(--color-panel-soft)]" />
          </section>
        ))}
      </div>
      <span className="sr-only">Loading profile...</span>
    </main>
  );
}

export default ProfileSkeleton;
