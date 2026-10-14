import { RefreshCw } from "lucide-react";

type ProviderDashboardHeaderProps = {
  loading: boolean;
  refresh: () => Promise<void>;
};

function ProviderEarningHeader({
  loading,
  refresh,
}: ProviderDashboardHeaderProps) {
  return (
    <>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">Revenue snapshot</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Earnings
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
            Review the estimated value of your completed work and track upcoming
            bookings.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-medium transition hover:border-primary disabled:opacity-60"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </header>
    </>
  );
}

export default ProviderEarningHeader;
