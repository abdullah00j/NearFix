import { BriefcaseBusiness } from "lucide-react";

export default function BecomeProviderHeader() {
  return (
    <>
      <header>
        <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
          <BriefcaseBusiness size={16} />
          Grow your business
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Become a service provider
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          Tell customers about your business, the services you offer, and the
          areas you serve.
        </p>
      </header>
    </>
  );
}
