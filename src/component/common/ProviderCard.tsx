import { MapPin, ShieldCheck, Star } from "lucide-react";

interface ProviderCardProps {
  id: string;
  name: string;
  category?: string;
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  available?: boolean;
  startingPrice: number;
  verified?: boolean;
  initials: string;
}

export default function ProviderCard({
  id,
  name,
  category,
  description,
  location,
  rating,
  reviewCount,
  available,
  startingPrice,
  verified,
  initials,
}: ProviderCardProps) {
  return (
    <>
      <article
        key={id}
        className="flex h-full flex-col rounded-2xl border border-line bg-[var(--panel)] p-5 shadow-[var(--shadow)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-panel-soft text-sm font-semibold text-primary">
              {initials}
            </span>
            <div className="min-w-0">
              <h2 className="truncate font-semibold">{name}</h2>
              <p className="mt-0.5 text-sm text-[var(--muted)]">{category}</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold">
            <Star size={15} className="text-primary" fill="currentColor" />
            {rating}
            <span className="font-normal text-[var(--muted)]">
              ({reviewCount})
            </span>
          </span>
        </div>

        <p className="mt-4 min-h-10 text-sm leading-5 text-[var(--muted)]">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
            <MapPin size={15} />
            {location}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium ${
              available ? "text-primary" : "text-[var(--muted)]"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                available ? "bg-primary" : "bg-[var(--muted)]"
              }`}
            />
            {available ? "Available now" : "Currently busy"}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <p className="text-sm text-[var(--muted)]">
            From{" "}
            <span className="font-semibold text-[var(--text)]">
              ${startingPrice}
            </span>
          </p>
          {verified && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-panel-soft px-2.5 py-1 text-xs font-medium text-[var(--text)]">
              <ShieldCheck size={14} className="text-primary" />
              Verified
            </span>
          )}
        </div>
      </article>
    </>
  );
}
