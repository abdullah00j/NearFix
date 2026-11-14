import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEventHandler } from "react";
import { ImagePlus, RefreshCw, X } from "lucide-react";
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
};

export default function ServiceFormModal({
  editing,
  form,
  saving,
  error,
  onChange,
  onClose,
  onSubmit,
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
      if (file.size > 5 * 1024 * 1024) {
        validationError = "Each image must be smaller than 5 MB.";
        continue;
      }
      validFiles.push(file);
    }

    const availableSlots = Math.max(0, 5 - form.images.length);
    if (validFiles.length > availableSlots) {
      validationError = "You can add up to 5 images.";
    }
    const imagesToAdd = validFiles.slice(0, availableSlots);
    if (validationError) setImageError(validationError);
    if (imagesToAdd.length) {
      onChange({ ...form, images: [...form.images, ...imagesToAdd] });
    }
  };

  const selectedCategory = serviceCategories.some(
    (category) => category === form.category,
  )
    ? form.category
    : form.category
      ? "custom"
      : "";
  const priceUnitLabel =
    pricingUnits.find((unit) => unit.value === form.pricingUnit)?.label ??
    "Per job";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 p-3 backdrop-blur-[2px] sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-form-title"
        aria-describedby="service-form-description"
        className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--line)] px-5 py-4 md:px-7 md:py-5">
          <div>
            <p className="text-sm font-medium text-primary">Service listing</p>
            <h2 id="service-form-title" className="mt-1 text-2xl font-semibold">
              {editing ? "Edit service" : "Add a service"}
            </h2>
            <p
              id="service-form-description"
              className="mt-1 text-sm text-[var(--muted)]"
            >
              Add the details customers need to understand your offering.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close service form"
            className="rounded-lg p-2 text-[var(--muted)] hover:bg-panel-soft hover:text-[var(--text)]"
          >
            <X size={18} />
          </button>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 md:px-7">
            <section className="space-y-4 rounded-xl border border-[var(--line)] p-4 md:p-5">
              <div>
                <h3 className="font-semibold">Service details</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Choose the category that best describes your service.
                </p>
              </div>
              <div
                className={`grid gap-4 ${selectedCategory === "custom" ? "sm:grid-cols-2" : ""}`}
              >
                <label className="block space-y-1.5 text-sm font-medium">
                  Service category
                  <select
                    required
                    value={selectedCategory}
                    onChange={(event) =>
                      onChange({
                        ...form,
                        category: event.target.value,
                        customCategory:
                          event.target.value === "custom"
                            ? form.customCategory
                            : "",
                      })
                    }
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 font-normal outline-none focus:border-primary"
                  >
                    <option value="" disabled>
                      Choose a category
                    </option>
                    {serviceCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value="custom">Custom</option>
                  </select>
                </label>
                {selectedCategory === "custom" && (
                  <label className="block space-y-1.5 text-sm font-medium">
                    Custom category
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
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 font-normal outline-none focus:border-primary"
                    />
                  </label>
                )}
              </div>
            </section>

            <section className="space-y-4 rounded-xl border border-[var(--line)] p-4 md:p-5">
              <div>
                <h3 className="font-semibold">Pricing</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Set how you charge for this service.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5 text-sm font-medium">
                  Pricing type
                  <select
                    value={form.pricingUnit}
                    onChange={(event) => {
                      if (isPricingUnit(event.target.value)) {
                        onChange({ ...form, pricingUnit: event.target.value });
                      }
                    }}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 font-normal outline-none focus:border-primary"
                  >
                    {pricingUnits.map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block space-y-1.5 text-sm font-medium">
                  Price {priceUnitLabel.toLowerCase()} (USD)
                  <input
                    required
                    type="number"
                    min="0"
                    step="1"
                    value={form.price}
                    onChange={(event) =>
                      onChange({ ...form, price: event.target.value })
                    }
                    placeholder="e.g. 75"
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 font-normal outline-none focus:border-primary"
                  />
                </label>
              </div>
            </section>

            <section className="space-y-4 rounded-xl border border-[var(--line)] p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Photos</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Add up to five images to showcase your work.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-panel-soft px-2.5 py-1 text-xs text-[var(--muted)]">
                  {form.images.length}/5
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {imagePreviews.map(({ file, url }, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="group relative overflow-hidden rounded-xl border border-[var(--line)]"
                  >
                    <img
                      src={url}
                      alt={`Service image ${index + 1}: ${file.name}`}
                      className="h-32 w-full object-cover"
                    />
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
                      className="absolute right-2 top-2 rounded-lg bg-slate-950/70 p-2 text-white opacity-100 transition hover:bg-slate-950 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {form.images.length < 5 && (
                  <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--line)] px-4 py-5 text-center transition hover:border-primary">
                    <ImagePlus size={22} className="text-primary" />
                    <span className="font-medium">
                      {form.images.length ? "Add more" : "Choose images"}
                    </span>
                    <span className="text-xs font-normal text-[var(--muted)]">
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
                  className="text-xs text-rose-700 dark:text-rose-300"
                >
                  {imageError}
                </p>
              )}
            </section>

            <section className="space-y-4 rounded-xl border border-[var(--line)] p-4 md:p-5">
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Tell customers what to expect from this service.
                </p>
              </div>
              <label className="block space-y-1.5 text-sm font-medium">
                Details{" "}
                <span className="font-normal text-[var(--muted)]">
                  (optional)
                </span>
                <textarea
                  rows={4}
                  maxLength={500}
                  value={form.description}
                  onChange={(event) =>
                    onChange({ ...form, description: event.target.value })
                  }
                  placeholder="Describe what customers can expect from this service"
                  className="w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 font-normal outline-none focus:border-primary"
                />
                <span className="block text-right text-xs font-normal text-[var(--muted)]">
                  {form.description.length}/500
                </span>
              </label>
            </section>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 text-sm text-rose-700 dark:text-rose-300"
              >
                {error}
              </p>
            )}
            <p className="text-xs text-[var(--muted)]">
              Images and pricing type are preview-only and won’t be saved yet.
            </p>
          </div>
          <div className="flex shrink-0 justify-end gap-2 border-t border-[var(--line)] bg-[var(--panel)] px-5 py-4 md:px-7">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-medium hover:bg-panel-soft disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
            >
              {saving && <RefreshCw size={14} className="animate-spin" />}
              {saving
                ? "Saving…"
                : editing
                  ? "Save changes"
                  : "Publish service"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
