import { useMemo } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useListProviderServices } from "@/data/CUSTOMER/CustomerQueries";
import { formatCurrency } from "@/lib/utilFunctions";
import ProviderProfilePageSkeleton from "./Skeleton/ProviderProfilePageSkeleton";

export default function ProviderProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useListProviderServices();

  console.log("ProviderProfilePage data:", data);
  const services = useMemo(
    () =>
      (data ?? []).filter(
        (service) =>
          service?.providerId === id &&
          service.isActive &&
          service.provider?.verificationStatus === "APPROVED",
      ),
    [data, id],
  );
  const provider = services[0]?.provider;

  if (isLoading) {
    return <ProviderProfilePageSkeleton />;
  }

  if (error) {
    return (
      <section className="mx-auto max-w-[1080px] space-y-4 px-4 py-10 text-[var(--text)]">
        <Link
          to="/service-providers"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back to service providers
        </Link>
        <div
          role="alert"
          className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-700 dark:text-rose-300"
        >
          {error instanceof Error
            ? error.message
            : "Unable to load this provider profile."}
        </div>
      </section>
    );
  }

  if (!id || !provider || services.length === 0) {
    return (
      <section className="mx-auto max-w-[1080px] space-y-4 px-4 py-10 text-[var(--text)]">
        <Link
          to="/service-providers"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back to service providers
        </Link>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-8 text-center">
          <h1 className="text-xl font-semibold">Provider not found</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            This provider may no longer be offering active services.
          </p>
        </div>
      </section>
    );
  }

  const businessName = provider.businessName || "NearFix provider";

  return (
    <section className="mx-auto max-w-[1080px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <Link
        to="/service-providers"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft size={16} />
        Back to service providers
      </Link>

      <header className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <BriefcaseBusiness size={32} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {businessName}
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <ShieldCheck size={14} />
                Verified provider
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--muted)]">
              <MapPin size={15} />
              {provider.serviceArea || "Service area not provided"}
            </p>
            {provider.bio && (
              <p className="mt-4 max-w-3xl whitespace-pre-wrap text-sm leading-6 text-[var(--muted)]">
                {provider.bio}
              </p>
            )}
            {provider.experience && (
              <p className="mt-3 text-sm">
                <span className="font-medium">Experience:</span>{" "}
                {provider.experience}
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span
                className={`inline-flex items-center gap-2 ${
                  provider.availabilityStatus === "ONLINE"
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-[var(--muted)]"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    provider.availabilityStatus === "ONLINE"
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }`}
                />
                {provider.availabilityStatus?.replaceAll("_", " ") ??
                  "Availability not set"}
              </span>
              <span className="inline-flex items-center gap-1 text-[var(--muted)]">
                <Star size={15} />
                Ratings not available yet
              </span>
            </div>
          </div>
        </div>
      </header>

      <div>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Services</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {services.length} active{" "}
              {services.length === 1 ? "service" : "services"} available
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">
                    {service.category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">
                    {service.category}
                  </h3>
                </div>
                <p className="shrink-0 text-lg font-semibold">
                  {formatCurrency(service.price)}
                </p>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[var(--muted)]">
                {service.description ||
                  "Contact the provider for service details."}
              </p>
              <p className="mt-4 border-t border-[var(--line)] pt-3 text-xs text-[var(--muted)]">
                {service.pricingType?.replaceAll("_", " ") ?? "Price per job"}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
