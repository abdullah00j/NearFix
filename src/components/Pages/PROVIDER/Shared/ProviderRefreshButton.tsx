import { RefreshCw } from "lucide-react";

type ProviderRefreshButtonProps = {
  loading: boolean;
  onRefresh: () => void | Promise<void>;
};

export default function ProviderRefreshButton({
  loading,
  onRefresh,
}: ProviderRefreshButtonProps) {
  return (
    <button
      type="button"
      onClick={() => void onRefresh()}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-medium transition hover:border-primary disabled:opacity-60"
    >
      <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
      Refresh
    </button>
  );
}
