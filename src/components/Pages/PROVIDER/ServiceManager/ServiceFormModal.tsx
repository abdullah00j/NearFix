import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEventHandler } from "react";
import {
  ArrowUpRight,
  Eye,
  ImagePlus,
  MapPin,
  RefreshCw,
  X,
  Zap,
} from "lucide-react";
import { pricingUnits, serviceCategories } from "./serviceFormOptions";
import type { PricingUnit } from "./serviceFormOptions";

function isPricingUnit(value: string): value is PricingUnit {
  return pricingUnits.some((unit) => unit.value === value);
}

export type ServiceForm = {
  category: string;
  customCategory: string;
  price: string;
  pricingUnit: PricingUnit;
  description: string;
  images: File[];
};

type ServiceFormModalProps = {
  editing: boolean;
  form: ServiceForm;
  saving: boolean;
  error: string | null;
  onChange: (form: ServiceForm) => void;
  onClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  // Optional: shown in the live preview's provider bar
  providerName?: string;
  providerLocation?: string;
  providerInitials?: string;
};

const MAX_IMAGES = 5;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const inputClass =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

function Label({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-2 flex items-center justify-between text-sm font-medium">
      <span>{children}</span>
      {aside && (
        <span className="text-xs font-normal text-[var(--muted)]">{aside}</span>
      )}
    </div>
  );
}

export default function ServiceFormModal({
  editing,
  form,
  saving,
  error,
  onChange,
  onClose,
  onSubmit,
  providerName = "Your name",
  providerLocation = "Your location",
  providerInitials,
}: ServiceFormModalProps) {
  const [imageError, setImageError] = useState<string | null>(null);

  const imagePreviews = useMemo(
    () =>
      form.images.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [form.images],
  );

  useEffect(
    () => () => {
      imagePreviews.forEach(({ url }) => URL.revokeObjectURL(url));
    },
    [imagePreviews],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !saving) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, saving]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    event.target.value = "";
    setImageError(null);

    const validFiles: File[] = [];
    let validationError: string | null = null;
    for (const file of selectedFiles) {
      if (!file.type.startsWith("image/")) {
        validationError = "Only image files can be selected.";
        continue;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        validationError = "Each image must be smaller than 5 MB.";
        continue;
      }
      validFiles.push(file);
    }

    const availableSlots = Math.max(0, MAX_IMAGES - form.images.length);
    if (validFiles.length > availableSlots) {
      validationError = "You can add up to 5 images.";
    }
    const imagesToAdd = validFiles.slice(0, availableSlots);
    if (validationError) setImageError(validationError);
    if (imagesToAdd.length) {
      onChange({ ...form, images: [...form.images, ...imagesToAdd] });
    }
  };

  const isCustom =
    form.category === "custom" ||
    (!!form.category &&
      !serviceCategories.some((category) => category === form.category));

  const selectCategory = (value: string) =>
    onChange({
      ...form,
      category: value,
      customCategory: value === "custom" ? form.customCategory : "",
    });

  const priceUnitLabel =
    pricingUnits.find((unit) => unit.value === form.pricingUnit)?.label ??
    "Per job";

  const previewCategory = isCustom
    ? form.customCategory || "Custom"
    : form.category;

  // Live preview values (mirrors ServiceCard)
  const previewTitle = previewCategory?.trim() || "Your service";
  const previewPrice = form.price ? `$${form.price}` : "$—";
  const previewUnit = priceUnitLabel.toLowerCase().replace("per ", "");
  const previewDescription = form.description.trim();
  const previewInitials =
    providerInitials ||
    providerName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const chipClass = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm transition ${
      active
        ? "border-primary bg-primary text-white"
        : "border-[var(--line)] hover:border-primary hover:text-primary"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-[2px] sm:p-6"
      onMouseDown={(event) => {
        if (
          (event.target === event.currentTarget ||
            (event.target as HTMLElement).dataset.backdrop) &&
          !saving
        )
          onClose();
      }}
    >
      <div
        data-backdrop="true"
        className="m-auto flex  w-full max-w-[1100px]    gap-4 md:flex-row md:items-center md:justify-center md:gap-6"
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-form-title"
          aria-describedby="service-form-description"
          className="flex max-h-[calc(100dvh-9rem)] w-full min-w-0 max-w-2xl flex-col md:flex-1 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-2xl md:max-h-[calc(100dvh-3rem)]"
        >
          {/* Header */}
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--line)] px-5 py-4 md:px-7">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                Service listing
              </p>
              <h2
                id="service-form-title"
                className="mt-1 text-xl font-semibold"
              >
                {editing ? "Edit service" : "Add a service"}
              </h2>
              <p
                id="service-form-description"
                className="mt-0.5 text-sm text-[var(--muted)]"
              >
                Add the details customers need to understand your offering.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close service form"
              className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-panel-soft hover:text-[var(--text)]"
            >
              <X size={18} />
            </button>
          </header>

          <form
            onSubmit={onSubmit}
            className="flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div className="min-h-0 flex-1 overflow-y-auto">
              {/* Form column */}
              <div className="space-y-6 px-5 py-5 md:px-7">
                {/* Category */}
                <div>
                  <Label>Category</Label>
                  <div
                    role="radiogroup"
                    aria-label="Service category"
                    className="flex flex-wrap gap-2"
                  >
                    {serviceCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        role="radio"
                        aria-checked={form.category === category}
                        onClick={() => selectCategory(category)}
                        className={chipClass(form.category === category)}
                      >
                        {category}
                      </button>
                    ))}
                    <button
                      type="button"
                      role="radio"
                      aria-checked={isCustom}
                      onClick={() => selectCategory("custom")}
                      className={chipClass(isCustom)}
                    >
                      + Custom
                    </button>
                  </div>
                  {/* Keeps native "required" validation for the chip group */}
                  <input
                    tabIndex={-1}
                    aria-hidden="true"
                    required
                    value={form.category}
                    onChange={() => undefined}
                    className="pointer-events-none h-0 w-0 opacity-0"
                  />
                  {isCustom && (
                    <input
                      required
                      maxLength={80}
                      value={form.customCategory}
                      onChange={(event) =>
                        onChange({
                          ...form,
                          customCategory: event.target.value,
                        })
                      }
                      placeholder="Enter a category"
                      aria-label="Custom category"
                      className={`${inputClass} mt-3`}
                    />
                  )}
                </div>

                {/* Pricing */}
                <div>
                  <Label>Pricing</Label>
                  <div
                    role="radiogroup"
                    aria-label="Pricing type"
                    className="mb-3 flex gap-1 rounded-xl bg-panel-soft p-1"
                  >
                    {pricingUnits.map((unit) => {
                      const active = form.pricingUnit === unit.value;
                      return (
                        <button
                          key={unit.value}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => {
                            if (isPricingUnit(unit.value)) {
                              onChange({ ...form, pricingUnit: unit.value });
                            }
                          }}
                          className={`flex-1 rounded-lg px-3 py-1.5 text-sm transition ${
                            active
                              ? "bg-[var(--panel)] font-medium shadow-sm"
                              : "text-[var(--muted)] hover:text-[var(--text)]"
                          }`}
                        >
                          {unit.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted)]">
                      $
                    </span>
                    <input
                      required
                      type="number"
                      min="0"
                      step="1"
                      inputMode="numeric"
                      value={form.price}
                      onChange={(event) =>
                        onChange({ ...form, price: event.target.value })
                      }
                      placeholder="75"
                      aria-label={`Price ${priceUnitLabel.toLowerCase()} in USD`}
                      className={`${inputClass} pl-7 pr-24`}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)]">
                      USD · {priceUnitLabel.toLowerCase()}
                    </span>
                  </div>
                </div>

                {/* Photos */}
                <div>
                  <Label aside={`${form.images.length}/${MAX_IMAGES}`}>
                    Photos
                  </Label>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {imagePreviews.map(({ file, url }, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--line)]"
                      >
                        <img
                          src={url}
                          alt={`Service image ${index + 1}: ${file.name}`}
                          className="h-full w-full object-cover"
                        />
                        {index === 0 && (
                          <span className="absolute bottom-1.5 left-1.5 rounded-full bg-[var(--panel)] px-2 py-0.5 text-[10px] font-medium">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setImageError(null);
                            onChange({
                              ...form,
                              images: form.images.filter(
                                (_, imageIndex) => imageIndex !== index,
                              ),
                            });
                          }}
                          aria-label={`Remove image ${index + 1}`}
                          className="absolute right-1.5 top-1.5 rounded-lg bg-slate-950/70 p-1.5 text-white opacity-100 transition hover:bg-slate-950 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {form.images.length < MAX_IMAGES && (
                      <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-[var(--line)] text-center transition focus-within:border-primary hover:border-primary">
                        <ImagePlus size={20} className="text-primary" />
                        <span className="text-xs font-medium">
                          {form.images.length ? "Add more" : "Add photos"}
                        </span>
                        <span className="text-[10px] text-[var(--muted)]">
                          5 MB max each
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                    )}
                  </div>
                  {imageError && (
                    <p
                      role="alert"
                      className="mt-2 text-xs text-rose-700 dark:text-rose-300"
                    >
                      {imageError}
                    </p>
                  )}
                </div>

                {/* Description */}
                <label className="block">
                  <Label aside={`${form.description.length}/500`}>
                    Description{" "}
                    <span className="font-normal text-[var(--muted)]">
                      (optional)
                    </span>
                  </Label>
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={form.description}
                    onChange={(event) =>
                      onChange({ ...form, description: event.target.value })
                    }
                    placeholder="Describe what customers can expect from this service"
                    className={`${inputClass} resize-y`}
                  />
                </label>

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 text-sm text-rose-700 dark:text-rose-300"
                  >
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <footer className="flex shrink-0 justify-end gap-2 border-t border-[var(--line)] bg-[var(--panel)] px-5 py-4 md:px-7">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-medium transition hover:bg-panel-soft disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
              >
                {saving && <RefreshCw size={14} className="animate-spin" />}
                {saving
                  ? "Saving…"
                  : editing
                    ? "Save changes"
                    : "Publish service"}
              </button>
            </footer>
          </form>
        </section>

        <aside
          aria-label="Listing preview"
          className="w-full shrink-0  rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-2xl md:sticky md:top-0 md:w-[320px] lg:w-[380px]"
        >
          <p className="mb-3 flex items-center gap-1.5 px-1 text-xs font-medium text-[var(--muted)]">
            <Eye size={14} /> Live preview
          </p>

          {/* Same layout as ServiceCard (static, no navigation) */}
          <article className="flex flex-col gap-3 rounded-[22px] border border-[var(--line)] bg-[var(--panel)] p-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(16,24,40,0.12)]">
            {/* Header: service + price */}
            <div className="flex items-stretch justify-between gap-2.5">
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[14px] bg-panel-soft p-2">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--panel)] text-primary ring-1 ring-[var(--line)]">
                  <Zap size={22} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h3
                  className={`min-w-0 flex-1 truncate text-[17px] font-semibold leading-tight tracking-tight ${
                    previewCategory
                      ? "text-[var(--text)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {previewTitle}
                </h3>
              </div>

              <div className="flex shrink-0 flex-col justify-center rounded-[14px] bg-panel-soft px-3.5 text-right leading-tight">
                <p className="text-xl font-semibold tabular-nums tracking-tight text-primary">
                  {previewPrice}
                </p>
                <p className="text-[11px] text-[var(--muted)]">
                  per {previewUnit}
                </p>
              </div>
            </div>

            {/* Media: first photo, or glass fallback */}
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl ring-1 ring-inset ring-black/5">
              {imagePreviews[0] ? (
                <>
                  <img
                    src={imagePreviews[0].url}
                    alt=""
                    className="h-full w-full object-cover"
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
                  <Zap
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
                previewDescription ? "" : "italic opacity-80"
              }`}
            >
              {previewDescription || "No description added yet."}
            </p>

            {/* Provider bar */}
            <div className="flex items-center gap-3 rounded-[14px] border border-[var(--line)] bg-panel-soft p-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--panel)] text-sm font-semibold text-primary ring-1 ring-[var(--line)]">
                {previewInitials || "?"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-tight text-[var(--text)]">
                  {providerName}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-[var(--muted)]">
                  <MapPin
                    size={13}
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="truncate">{providerLocation}</span>
                </p>
              </div>
              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-[10px] bg-primary px-3 py-2 text-[13px] font-medium text-white shadow-sm"
              >
                View profile
                <ArrowUpRight size={15} />
              </span>
            </div>
          </article>

          <p className="mt-4 px-1 text-xs text-[var(--muted)]">
            Photos are uploaded securely and saved with your service listing.
          </p>
        </aside>
      </div>
    </div>
  );
}
