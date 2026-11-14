import ProviderPageHeader from "../Shared/ProviderPageHeader";
import ProviderRefreshButton from "../Shared/ProviderRefreshButton";

type ProviderDashboardHeaderProps = {
  loading: boolean;
  refresh: () => Promise<void>;
};

function ProviderEarningHeader({
  loading,
  refresh,
}: ProviderDashboardHeaderProps) {
  return (
    <ProviderPageHeader
      eyebrow="Revenue snapshot"
      title="Earnings"
      description="Review the estimated value of your completed work and track upcoming bookings."
      action={<ProviderRefreshButton loading={loading} onRefresh={refresh} />}
    />
  );
}

export default ProviderEarningHeader;
