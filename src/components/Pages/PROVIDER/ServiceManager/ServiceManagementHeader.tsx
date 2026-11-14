import { Plus } from "lucide-react";
import ProviderPageHeader from "../Shared/ProviderPageHeader";
import ProviderRefreshButton from "../Shared/ProviderRefreshButton";

type ServiceManagementHeaderProps = {
  isLoading: boolean;
  onRefresh: () => void;
  onAddService: () => void;
};

function ServiceManagementHeader({
  isLoading,
  onRefresh,
  onAddService,
}: ServiceManagementHeaderProps) {
  return (
    <ProviderPageHeader
      eyebrow="Your offerings"
      title="Service management"
      description="Create and maintain the services customers can book from your business."
      action={
        <div className="flex gap-2">
          <ProviderRefreshButton loading={isLoading} onRefresh={onRefresh} />
          <button
            type="button"
            onClick={onAddService}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
            Add service
          </button>
        </div>
      }
    />
  );
}

export default ServiceManagementHeader;
