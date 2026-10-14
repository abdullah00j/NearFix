import { RefreshCw } from "lucide-react";

export type ProviderDashboardHeaderProps = {
  currentUserName?: string | null;
  loading: boolean;
  onRefresh: () => void | Promise<void>;
};

function ProviderDashboardHeader({
  currentUserName,
  loading,
  onRefresh,
}: ProviderDashboardHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-primary">Provider workspace</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Welcome back{currentUserName ? `, ${currentUserName}` : ""}
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
          Your business at a glance. Keep track of bookings, service
          performance, and estimated earnings.
        </p>
      </div>
      <button
        type="button"
        onClick={() => void onRefresh()}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-medium transition hover:border-primary disabled:opacity-60"
      >
        <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
        Refresh
      </button>
    </header>
  );
}

export default ProviderDashboardHeader;
