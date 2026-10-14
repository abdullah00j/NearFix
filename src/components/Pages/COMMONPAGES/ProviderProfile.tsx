import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  MapPin,
  Star,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export type ProviderProfileData = {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  initials: string;
  available: boolean;
  verified: boolean;
};

export default function ProviderProfile() {
  const { state } = useLocation();
  const provider = (state as { provider?: ProviderProfileData } | null)
    ?.provider;

  if (!provider) {
    return (
      <section className="mx-auto max-w-3xl space-y-5 py-8 text-center">
        <BriefcaseBusiness className="mx-auto text-primary" size={28} />
        <h1 className="text-2xl font-semibold">Provider profile unavailable</h1>
        <p className="text-sm text-[var(--muted)]">
          Open a provider profile from the service providers directory.
        </p>
        <Link
          to="/service-providers"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white"
        >
          <ArrowLeft size={16} />
          Browse providers
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1100px] space-y-6 py-2 text-[var(--text)]">
      <Link
        to="/service-providers"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to providers
      </Link>

      <header className="rounded-3xl border border-line bg-[var(--panel)] p-5 shadow-[var(--shadow)] md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-panel-soft text-2xl font-semibold text-primary">
            {provider.initials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {provider.name}
              </h1>
              {provider.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-panel-soft px-2.5 py-1 text-xs font-medium">
                  <BadgeCheck size={14} className="text-primary" />
                  Verified
                </span>
              )}
            </div>
            <p className="mt-1 text-[var(--muted)]">{provider.category}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Star size={16} className="text-primary" fill="currentColor" />
                <strong>{provider.rating.toFixed(1)}</strong>
                <span className="text-[var(--muted)]">
                  ({provider.reviewCount} reviews)
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
                <MapPin size={16} />
                {provider.location}
              </span>
              <span
                className={`inline-flex items-center gap-2 ${
                  provider.available ? "text-primary" : "text-[var(--muted)]"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    provider.available ? "bg-primary" : "bg-[var(--muted)]"
                  }`}
                />
                {provider.available ? "Available now" : "Currently busy"}
              </span>
            </div>
          </div>
          <p className="shrink-0 rounded-2xl bg-panel-soft px-4 py-3 text-sm text-[var(--muted)]">
            Starting at{" "}
            <strong className="text-lg text-[var(--text)]">
              ${provider.startingPrice}
            </strong>
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]">
        <section className="rounded-2xl border border-line bg-[var(--panel)] p-5 md:p-6">
          <h2 className="text-lg font-semibold">About</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[var(--muted)]">
            {provider.description}
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-[var(--panel)] p-5 md:p-6">
          <h2 className="text-lg font-semibold">Service details</h2>
          <div className="mt-4 rounded-xl border border-line bg-panel-soft/50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{provider.category}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Service provided in {provider.location}
                </p>
              </div>
              <BriefcaseBusiness size={18} className="shrink-0 text-primary" />
            </div>
            <p className="mt-4 border-t border-line pt-3 text-sm text-[var(--muted)]">
              Starting price{" "}
              <strong className="text-[var(--text)]">
                ${provider.startingPrice}
              </strong>
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-[var(--panel)] p-5 md:p-6 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Customer reviews</h2>
            <span className="inline-flex items-center gap-1.5 text-sm">
              <Star size={15} className="text-primary" fill="currentColor" />
              <strong>{provider.rating.toFixed(1)}</strong>
              <span className="text-[var(--muted)]">
                from {provider.reviewCount} reviews
              </span>
            </span>
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Individual review details are not available in this provider
            listing.
          </p>
        </section>
      </div>
    </section>
  );
}
