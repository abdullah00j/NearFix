import { BriefcaseBusiness } from "lucide-react";
import CustomerPageHeader from "../Shared/CustomerPageHeader";

interface ServiceProviderHeaderProps {
  providerCount: number;
}

export default function ServiceProviderHeader({
  providerCount,
}: ServiceProviderHeaderProps) {
  return (
    <CustomerPageHeader
      icon={<BriefcaseBusiness size={16} />}
      eyebrow="Find local help"
      title="Service providers"
      description="Browse trusted local professionals and find the right person for your next home project."
      summary={
        <span className="self-start rounded-xl border border-line bg-panel-soft px-3 py-2 text-sm text-[var(--muted)] sm:self-auto">
          {providerCount} {providerCount === 1 ? "provider" : "providers"}
        </span>
      }
    />
  );
}
