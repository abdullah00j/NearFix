import { useState } from "react";
import { ArrowUpRight, BadgeCheck, MapPin, Star, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  id: string;
  name: string;
  category?: string;
  description?: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  startingPrice: number;
  initials: string;
  available?: boolean;
  verified?: boolean;
  image?: string | null;
  title?: string;
  priceUnit?: string;
  icon?: LucideIcon;
}

export default function ServiceCard({
  id,
  name,
  category,
  description,
  location,
  rating = 0,
  reviewCount = 0,
  startingPrice,
  initials,
  available,
  verified,
  image,
  title,
  priceUnit = "task",
  icon: Icon = Zap,
}: ServiceCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const serviceTitle = title?.trim() || category?.trim() || "Service";
  const showImage = Boolean(image) && !imageFailed;
  const hasDescription = Boolean(description?.trim());
  const priceLabel = Number.isFinite(Number(startingPrice))
    ? `$${startingPrice}`
    : "Contact";

  return (
    <article className="group flex h-full flex-col gap-3 rounded-[22px] border border-line bg-[var(--panel)] p-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(16,24,40,0.12)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(16,24,40,0.05),0_16px_32px_-14px_rgba(47,111,104,0.28)]">
      {/* Header: service + price */}
      <div className="flex items-stretch justify-between gap-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[14px] bg-panel-soft p-2">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--panel)] text-primary ring-1 ring-line">
            <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
          </span>

          <h2 className="min-w-0 flex-1 truncate text-[17px] font-semibold leading-tight tracking-tight text-[var(--text)]">
            {serviceTitle}
          </h2>
        </div>

        <div className="flex shrink-0 flex-col justify-center rounded-[14px] bg-panel-soft px-3.5 text-right leading-tight">
          <p className="text-xl font-semibold tabular-nums tracking-tight text-primary">
            {priceLabel}
          </p>
          <p className="text-[11px] text-[var(--muted)]">per {priceUnit}</p>
        </div>
      </div>

      {/* Media: image, or glass fallback */}
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl ring-1 ring-inset ring-black/5">
        {showImage ? (
          <>
            <img
              src={image as string}
              alt={`${serviceTitle} by ${name}`}
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(135deg,#E9FBFF_0%,#D4F4EF_55%,#CDEEDC_100%)]"
          >
            <div className="absolute -left-[8%] -bottom-[40%] aspect-square w-[45%] rounded-full bg-[radial-gradient(circle,rgba(125,214,228,0.5),rgba(125,214,228,0)_70%)]" />
            <div className="absolute -right-[8%] -top-[45%] aspect-square w-[50%] rounded-full border border-white/70 bg-white/35" />
            <Icon
              size={72}
              strokeWidth={1.4}
              className="absolute left-[12%] top-1/2 -translate-y-1/2 text-[rgba(47,111,104,0.16)]"
            />
          </div>
        )}

        {/* Rating chip */}
        {rating > 0 && (
          <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[var(--text)] shadow-sm backdrop-blur">
            <Star
              size={13}
              className="fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            {rating.toFixed(1)}
            {reviewCount > 0 && (
              <span className="font-normal text-[var(--muted)]">
                ({reviewCount})
              </span>
            )}
          </span>
        )}

        {/* Availability chip */}
        {available && (
          <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[var(--text)] shadow-sm backdrop-blur">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            Available
          </span>
        )}
      </div>

      {/* Description */}
      <p
        className={`line-clamp-2 min-h-10 px-1 text-sm leading-5 text-[var(--muted)] ${
          hasDescription ? "" : "italic opacity-80"
        }`}
      >
        {hasDescription ? description : "No description added yet."}
      </p>

      {/* Provider bar */}
      <div className="mt-auto flex items-center gap-3 rounded-[14px] border border-line bg-panel-soft p-2.5">
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--panel)] text-sm font-semibold text-primary ring-1 ring-line">
          {initials}
          {verified && (
            <BadgeCheck
              size={16}
              aria-label="Verified provider"
              className="absolute -bottom-1 -right-1 rounded-full bg-[var(--panel)] text-primary"
            />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight text-[var(--text)]">
            {name}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-[var(--muted)]">
            <MapPin
              size={13}
              className="shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="truncate">{location}</span>
          </p>
        </div>

        <Link
          to={`/provider-profile/${encodeURIComponent(id)}`}
          state={{
            provider: {
              id,
              name,
              category: category ?? "Home services",
              description,
              location,
              rating,
              reviewCount,
              startingPrice,
              initials,
              available: Boolean(available),
              verified: Boolean(verified),
            },
          }}
          aria-label={`View ${name}'s profile`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[10px] bg-primary px-3 py-2 text-[13px] font-medium text-white shadow-sm transition hover:opacity-90 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          View profile
          <ArrowUpRight
            size={15}
            aria-hidden="true"
            className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
