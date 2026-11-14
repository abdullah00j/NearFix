import ProviderPageHeader from "../Shared/ProviderPageHeader";
import ProviderRefreshButton from "../Shared/ProviderRefreshButton";

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
    <ProviderPageHeader
      eyebrow="Provider workspace"
      title={`Welcome back${currentUserName ? `, ${currentUserName}` : ""}`}
      description="Your business at a glance. Keep track of bookings, service performance, and estimated earnings."
      action={<ProviderRefreshButton loading={loading} onRefresh={onRefresh} />}
    />
  );
}

export default ProviderDashboardHeader;
