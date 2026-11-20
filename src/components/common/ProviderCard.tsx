import { useState } from "react";
import { ArrowUpRight, BadgeCheck, MapPin, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Same props as the old ProviderCard, so existing usage keeps working:
 *  - name          -> provider who listed the service (e.g. "carpenter")
 *  - category      -> the service (e.g. "Electrical")
 *  - startingPrice -> service price
 * New optional props: image, title, priceUnit, icon.
 */
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
  available?: boolean; // accepted, not shown
  verified?: boolean; // accepted, not shown
  image?: string | null; // service image; glass effect is used when missing
  title?: string; // overrides category as the heading
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
    <article
      key={id}
      className="flex h-full flex-col gap-3 rounded-[20px]   p-3.5 "
    >
      {/* Header: service + price */}
      <div className="flex items-center justify-between gap-3">
        <div className="w-full flex items-center gap-3 border border-line bg-panel-soft shadow-md p-2 rounded-[14px]">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-panel-soft text-primary">
            <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1 text-xs text-primary/80">
              NearFix service
              <BadgeCheck size={13} aria-hidden="true" />
            </p>
            <h2 className="truncate text-[17px] font-semibold leading-tight text-[var(--text)]">
              {serviceTitle}
            </h2>
          </div>
        </div>
        <div className="shrink-0 text-right leading-tight border border-line bg-panel-soft shadow-md p-2 px-3 rounded-[14px]">
          <p className="text-xl font-semibold text-primary">{priceLabel}</p>
          <p className="text-[11px] text-[var(--muted)]">per {priceUnit}</p>
        </div>
      </div>

      {/* Media: image, or glass fallback */}
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl">
        {showImage ? (
          <img
            src={image as string}
            alt={`${serviceTitle} by ${name}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
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
      </div>

      {/* Description */}
      <p
        className={`line-clamp-2 min-h-10 px-1 text-sm leading-5 text-[var(--muted)] ${
          hasDescription ? "" : "italic"
        }`}
      >
        {hasDescription ? description : "No description added yet."}
      </p>

      {/* Provider bar */}
      <div className="mt-auto flex items-center gap-3 rounded-[14px] border border-line bg-panel-soft p-2.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--panel)] text-sm font-semibold text-primary ring-1 ring-line">
          {initials}
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
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[10px] bg-primary px-3 py-2 text-[13px] font-medium text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          View profile
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
