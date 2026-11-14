import ProviderPageHeader from "../Shared/ProviderPageHeader";
import ProviderRefreshButton from "../Shared/ProviderRefreshButton";

type ProviderReviewHeaderProps = {
  loading: boolean;
  refresh: () => Promise<void>;
};

function ProviderReviewHeader({ loading, refresh }: ProviderReviewHeaderProps) {
  return (
    <ProviderPageHeader
      eyebrow="Your reputation"
      title="Customer reviews"
      description="Read feedback from customers and see how your service is performing."
      action={<ProviderRefreshButton loading={loading} onRefresh={refresh} />}
    />
  );
}

export default ProviderReviewHeader;
