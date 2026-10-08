import { BriefcaseBusiness } from "lucide-react";

interface ServiceProviderHeaderProps {
  providerCount: number;
}

export default function ServiceProviderHeader({
  providerCount,
}: ServiceProviderHeaderProps) {
  return (
    <>
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <BriefcaseBusiness size={16} />
            Find local help
          </p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Service providers
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
            Browse trusted local professionals and find the right person for
            your next home project.
          </p>
        </div>
        <span className="self-start rounded-xl border border-line bg-panel-soft px-3 py-2 text-sm text-[var(--muted)] sm:self-auto">
          {providerCount} {providerCount === 1 ? "provider" : "providers"}
        </span>
      </header>
    </>
  );
}
