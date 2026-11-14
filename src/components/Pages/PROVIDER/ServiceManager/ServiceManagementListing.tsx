import {
  Droplets,
  Fan,
  Hammer,
  Loader2,
  Paintbrush,
  Pause,
  Pencil,
  Play,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  createElement,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Schema } from "../../../../../amplify/data/resource";
import { formatCurrency } from "@/lib/utilFunctions";

type ProviderService = Schema["ProviderService"]["type"];
type StatusFilter = "all" | "published" | "paused";

type ServiceManagementListingProps = {
  services: ProviderService[];
  filteredServices: ProviderService[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  hasData: boolean;
  hasProvider: boolean;
  savingServiceId: string | null;
  deletingServiceId: string | null;
  onAddService: () => void;
  onEditService: (service: ProviderService) => void;
  onToggleService: (service: ProviderService) => void;
  onDeleteService: (service: ProviderService) => void;
  getImageUrl?: (service: ProviderService) => string | null | undefined;
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  electrical: Zap,
  plumbing: Droplets,
  cleaning: Sparkles,
  carpentry: Hammer,
  painting: Paintbrush,
  ac: Fan,
  hvac: Fan,
};

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All services" },
  { value: "published", label: "Published" },
  { value: "paused", label: "Paused" },
];

function getCategoryIcon(category?: string | null): LucideIcon {
  const key = (category ?? "").toLowerCase();
  const match = Object.keys(CATEGORY_ICONS).find((k) => key.includes(k));
  return match ? CATEGORY_ICONS[match] : Wrench;
}

function defaultImageResolver(service: ProviderService): string | undefined {
  const s = service as unknown as {
    imageUrl?: string | null;
    image?: string | null;
    images?: (string | null)[] | null;
  };

  return s.imageUrl || s.image || s.images?.find(Boolean) || undefined;
}

function Thumb({
  src,
  category,
  isActive,
}: {
  src?: string | null;
  category: string;
  isActive: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const Icon = getCategoryIcon(category);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={`relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl
        bg-gradient-to-br from-primary/[0.09] to-primary/[0.03]
        ring-1 ring-inset ring-primary/[0.08]
        sm:h-32 sm:w-32 ${!isActive ? "opacity-65" : ""}`}
    >
      {showImage ? (
        <img
          src={src as string}
          alt={category}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/80 text-primary shadow-sm dark:bg-white/10">
            {createElement(Icon, { size: 29, strokeWidth: 1.6 })}
          </div>
        </div>
      )}
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-9 w-9 place-items-center rounded-xl
        border border-[var(--line)] bg-[var(--panel)]
        text-[var(--muted)] transition-all duration-200
        hover:border-primary/30 hover:bg-primary/[0.07]
        hover:text-primary hover:shadow-sm
        focus-visible:outline-2 focus-visible:outline-primary
        disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function ServiceManagementListing({
  services,
  filteredServices,
  search,
  setSearch,
  isLoading,
  hasData,
  hasProvider,
  savingServiceId,
  deletingServiceId,
  onAddService,
  onEditService,
  onToggleService,
  onDeleteService,
  getImageUrl = defaultImageResolver,
}: ServiceManagementListingProps) {
  const [status, setStatus] = useState<StatusFilter>("all");

  const counts = useMemo(() => {
    const published = filteredServices.filter((s) => s.isActive).length;

    return {
      all: filteredServices.length,
      published,
      paused: filteredServices.length - published,
    };
  }, [filteredServices]);

  const visible = useMemo(
    () =>
      filteredServices.filter((s) =>
        status === "all"
          ? true
          : status === "published"
            ? s.isActive
            : !s.isActive,
      ),
    [filteredServices, status],
  );

  const showSkeleton = isLoading && !hasData;

  return (
    <section className="overflow-hidden rounded-3xl  bg-[var(--panel)] ">
      {/* Header / Toolbar */}
      <div className="flex flex-col gap-4  p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filter services by status"
          className="flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-xl bg-[var(--line)]/40 p-1"
        >
          {FILTERS.map((filter) => {
            const active = status === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setStatus(filter.value)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[var(--panel)] text-primary shadow-sm"
                    : "text-[var(--muted)] hover:text-[inherit]"
                }`}
              >
                {filter.label}

                <span
                  className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "bg-black/[0.04] text-[var(--muted)] dark:bg-white/[0.06]"
                  }`}
                >
                  {counts[filter.value]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search + Add */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="flex h-10 min-w-0 items-center gap-2.5 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 sm:w-60">
            <Search size={17} className="shrink-0 text-[var(--muted)]" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search services..."
              aria-label="Search services"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="text-[var(--muted)] transition hover:text-primary"
              >
                <X size={15} />
              </button>
            )}
          </label>

          {hasProvider && (
            <button
              type="button"
              onClick={onAddService}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Plus size={17} />
              Add service
            </button>
          )}
        </div>
      </div>

      {/* Service Cards */}
      {showSkeleton ? (
        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-2" aria-busy="true">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex gap-4 rounded-2xl border border-[var(--line)] p-4"
            >
              <div className="h-28 w-28 shrink-0 animate-pulse rounded-2xl bg-[var(--line)]/60 sm:h-32 sm:w-32" />

              <div className="flex-1 space-y-3 py-2">
                <div className="h-4 w-1/2 animate-pulse rounded bg-[var(--line)]" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-[var(--line)]/70" />
                <div className="mt-8 h-5 w-1/3 animate-pulse rounded bg-[var(--line)]" />
              </div>
            </div>
          ))}
        </div>
      ) : visible.length ? (
        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-2">
          {visible.map((service) => {
            const isSaving = savingServiceId === service.id;
            const isDeleting = deletingServiceId === service.id;
            const isActive = Boolean(service.isActive);

            return (
              <article
                key={service.id}
                className="group relative flex min-w-0 gap-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_32px_-16px_rgba(15,118,110,0.22)] sm:gap-5 sm:p-4"
              >
                {/* Thumbnail */}
                <Thumb
                  src={getImageUrl(service)}
                  category={service.category}
                  isActive={isActive}
                />

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col py-0.5">
                  {/* Title + Status */}
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={`truncate text-base font-semibold tracking-tight ${
                        isActive
                          ? "text-[var(--foreground)]"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      {service.category}
                    </h3>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-slate-500/10 text-slate-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isActive ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                      />
                      {isActive ? "Published" : "Paused"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-[var(--muted)]">
                    {service.description || "No description added"}
                  </p>

                  {/* Price + Actions */}
                  <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                    <div className="min-w-0">
                      <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                        Starting price
                      </p>

                      <p
                        className={`truncate text-xl font-bold tracking-tight tabular-nums ${
                          isActive ? "text-primary" : "text-[var(--muted)]"
                        }`}
                      >
                        {formatCurrency(service.price)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <IconButton
                        label={`Edit ${service.category}`}
                        onClick={() => onEditService(service)}
                        disabled={isSaving || isDeleting}
                      >
                        <Pencil size={15} strokeWidth={2} />
                      </IconButton>

                      <IconButton
                        label={`${isActive ? "Pause" : "Publish"} ${service.category}`}
                        onClick={() => onToggleService(service)}
                        disabled={isSaving || isDeleting}
                      >
                        {isSaving ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : isActive ? (
                          <Pause size={15} strokeWidth={2} />
                        ) : (
                          <Play size={15} strokeWidth={2} />
                        )}
                      </IconButton>

                      <IconButton
                        label={`Delete ${service.category}`}
                        onClick={() => onDeleteService(service)}
                        disabled={isSaving || isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} strokeWidth={2} />
                        )}
                      </IconButton>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center px-5 py-16 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/[0.08] text-primary">
            <Wrench size={27} strokeWidth={1.5} />
          </div>

          <h3 className="mt-5 text-base font-semibold">
            {!services.length
              ? "No services yet"
              : status !== "all" && !search
                ? `No ${status} services`
                : "No services found"}
          </h3>

          <p className="mt-1.5 max-w-xs text-sm leading-6 text-[var(--muted)]">
            {!services.length
              ? "Add your first service to start receiving bookings from customers."
              : "Try changing your search or selecting another filter."}
          </p>

          {!services.length && hasProvider ? (
            <button
              type="button"
              onClick={onAddService}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              <Plus size={16} />
              Add your first service
            </button>
          ) : services.length > 0 && (search || status !== "all") ? (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatus("all");
              }}
              className="mt-5 text-sm font-semibold text-primary hover:underline"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}

export default ServiceManagementListing;
