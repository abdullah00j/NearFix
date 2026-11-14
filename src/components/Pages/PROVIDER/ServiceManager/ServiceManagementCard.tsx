import { Check, Clock3, Wrench } from "lucide-react";
import type { Schema } from "../../../../../amplify/data/resource";
import SummaryCard from "./SummaryCard";

type ServiceManagementCardProps = {
  services: Schema["ProviderService"]["type"][];
  activeCount: number;
};

function ServiceManagementCard({
  services,
  activeCount,
}: ServiceManagementCardProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <SummaryCard
        icon={<Wrench size={17} />}
        title="Total services"
        value={services.length}
        tone="teal"
      />
      <SummaryCard
        icon={<Check size={17} />}
        title="Published"
        value={activeCount}
        tone="green"
      />
      <SummaryCard
        icon={<Clock3 size={17} />}
        title="Paused"
        value={services.length - activeCount}
        tone="amber"
      />
    </div>
  );
}

export default ServiceManagementCard;
