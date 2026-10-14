import { useState } from "react";
import { generateClient as generateGraphqlClient } from "aws-amplify/api";
import {
  Check,
  CircleDollarSign,
  Clock3,
  Edit3,
  Plus,
  RefreshCw,
  Search,
  Wrench,
  X,
} from "lucide-react";
import type { Schema } from "../../../amplify/data/resource";
import {
  createProviderService,
  updateProviderService,
} from "../../graphql/mutations";
import { formatCurrency, useProviderWorkspace } from "./providerData";

const providerGraphqlClient = generateGraphqlClient();
const createProviderServiceMutation = `
  mutation CreateProviderService($input: CreateProviderServiceInput!) {
    createProviderService(input: $input) {
      id category price description isActive providerId createdAt updatedAt __typename
    }
  }
` as typeof createProviderService;
const updateProviderServiceMutation = `
  mutation UpdateProviderService($input: UpdateProviderServiceInput!) {
    updateProviderService(input: $input) {
      id category price description isActive providerId createdAt updatedAt __typename
    }
  }
` as typeof updateProviderService;

type ProviderService = Schema["ProviderService"]["type"];
type ServiceForm = {
  category: string;
  price: string;
  description: string;
};

const emptyForm: ServiceForm = { category: "", price: "", description: "" };

export default function ServiceManagement() {
  const { data, loading, error, refresh } = useProviderWorkspace();
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<ProviderService | null>(
    null,
  );
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [savingServiceId, setSavingServiceId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const services = data?.services ?? [];
  const query = search.trim().toLowerCase();
  const filteredServices = [...services]
    .filter((service) =>
      [service.category, service.description ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(query),
    )
    .sort((a, b) => Number(b.isActive) - Number(a.isActive));
  const activeCount = services.filter((service) => service.isActive).length;

  const openCreateForm = () => {
    setEditingService(null);
    setForm(emptyForm);
    setActionError(null);
    setSuccessMessage(null);
    setIsFormOpen(true);
  };

  const openEditForm = (service: ProviderService) => {
    setEditingService(service);
    setForm({
      category: service.category,
      price: String(service.price),
      description: service.description ?? "",
    });
    setActionError(null);
    setSuccessMessage(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    if (saving) return;
    setIsFormOpen(false);
    setEditingService(null);
    setForm(emptyForm);
  };

  const saveService = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActionError(null);
    setSuccessMessage(null);

    const price = Number(form.price);
    if (!Number.isInteger(price) || price < 0) {
      setActionError("Enter a valid whole-number price of zero or more.");
      return;
    }
    if (!data?.provider) {
      setActionError("Your provider profile is not available.");
      return;
    }

    setSaving(true);
    try {
      const input = {
        category: form.category,
        price,
        description: form.description.trim(),
      };
      const result = editingService
        ? await providerGraphqlClient.graphql({
            query: updateProviderServiceMutation,
            variables: { input: { id: editingService.id, ...input } },
          })
        : await providerGraphqlClient.graphql({
            query: createProviderServiceMutation,
            variables: {
              input: {
                ...input,
                providerId: data.provider.id,
                isActive: true,
              },
            },
          });

      if (result.errors?.length) {
        throw new Error(result.errors.map((item) => item.message).join("; "));
      }
      if (
        !result.data ||
        ("updateProviderService" in result.data &&
          !result.data.updateProviderService) ||
        ("createProviderService" in result.data &&
          !result.data.createProviderService)
      ) {
        throw new Error("The service listing was not saved.");
      }
      setSuccessMessage(
        editingService ? "Service details updated." : "Service published.",
      );
      setIsFormOpen(false);
      setEditingService(null);
      setForm(emptyForm);
      await refresh();
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to save this service.",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleService = async (service: ProviderService) => {
    setSavingServiceId(service.id);
    setActionError(null);
    setSuccessMessage(null);
    try {
      const result = await providerGraphqlClient.graphql({
        query: updateProviderServiceMutation,
        variables: {
          input: { id: service.id, isActive: !service.isActive },
        },
      });
      if (result.errors?.length) {
        throw new Error(result.errors.map((item) => item.message).join("; "));
      }
      if (
        !result.data ||
        !("updateProviderService" in result.data) ||
        !result.data.updateProviderService
      ) {
        throw new Error("The service availability was not updated.");
      }
      setSuccessMessage(
        service.isActive
          ? "Service listing paused."
          : "Service listing is live again.",
      );
      await refresh();
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to update service availability.",
      );
    } finally {
      setSavingServiceId(null);
    }
  };

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">Your offerings</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Service management
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
            Create and maintain the services customers can book from your
            business.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-medium transition hover:border-primary disabled:opacity-60"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            type="button"
            onClick={openCreateForm}
            disabled={!data?.provider || !data.categories.length}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
            Add service
          </button>
        </div>
      </header>

      {(error || actionError) && (
        <div
          role="alert"
          className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-700 dark:text-rose-300"
        >
          {actionError ?? error}
        </div>
      )}
      {successMessage && !actionError && (
        <div
          role="status"
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-emerald-700 dark:text-emerald-300"
        >
          {successMessage}
        </div>
      )}
      {!loading && data?.provider && !data.categories.length && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-800 dark:text-amber-200">
          Service categories are not available yet. Please try again after an
          administrator has set up categories.
        </div>
      )}
      {!loading && !error && data && !data.provider && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-800 dark:text-amber-200">
          Your provider profile is not ready yet. Service listings will be
          available once your provider profile is approved.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryCard
          icon={<Wrench size={17} />}
          title="Total services"
          value={services.length}
          tone="teal"
        />
        <SummaryCard
          icon={<Check size={17} />}
          title="Published"
          value={activeCount}
          tone="green"
        />
        <SummaryCard
          icon={<Clock3 size={17} />}
          title="Paused"
          value={services.length - activeCount}
          tone="amber"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-4 md:px-5">
          <div>
            <h2 className="font-semibold">Your service listings</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              {filteredServices.length} of {services.length} listings
            </p>
          </div>
          <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2">
            <Search size={15} className="text-[var(--muted)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search services"
              aria-label="Search services"
              className="w-36 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
            />
          </label>
        </div>
        {loading && !data ? (
          <div className="py-14 text-center text-sm text-[var(--muted)]">
            Loading your services…
          </div>
        ) : filteredServices.length ? (
          <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="flex min-h-56 flex-col rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 transition hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-xl bg-primary/10 p-2.5 text-primary">
                    <Wrench size={18} />
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      service.isActive
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : "bg-slate-500/10 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {service.isActive ? "Published" : "Paused"}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold">{service.category}</h3>
                  <p className="mt-1 min-h-10 text-sm leading-5 text-[var(--muted)]">
                    {service.description || "No description provided."}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-[var(--line)] pt-4">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <CircleDollarSign size={16} className="text-primary" />
                    {formatCurrency(service.price)}
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEditForm(service)}
                      aria-label={`Edit ${service.category}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-xs font-medium transition hover:border-primary hover:text-primary"
                    >
                      <Edit3 size={13} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void toggleService(service)}
                      disabled={savingServiceId === service.id}
                      className="rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-xs font-medium transition hover:border-primary hover:text-primary disabled:opacity-60"
                    >
                      {savingServiceId === service.id
                        ? "Saving…"
                        : service.isActive
                          ? "Pause"
                          : "Publish"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="px-5 py-14 text-center">
            <Wrench size={22} className="mx-auto text-[var(--muted)]" />
            <p className="mt-3 text-sm font-medium">
              {services.length
                ? "No services match your search"
                : "No services yet"}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {services.length
                ? "Try another search term."
                : "Add your first service to start receiving relevant bookings."}
            </p>
            {!services.length &&
              data?.provider &&
              data.categories.length > 0 && (
                <button
                  type="button"
                  onClick={openCreateForm}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
                >
                  <Plus size={15} />
                  Add your first service
                </button>
              )}
          </div>
        )}
      </section>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-form-title"
            className="w-full max-w-xl rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-2xl md:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-primary">
                  Service listing
                </p>
                <h2
                  id="service-form-title"
                  className="mt-1 text-xl font-semibold"
                >
                  {editingService ? "Edit service" : "Add a service"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeForm}
                aria-label="Close service form"
                className="rounded-lg p-2 text-[var(--muted)] hover:bg-panel-soft hover:text-[var(--text)]"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(event) => void saveService(event)}
              className="mt-5 space-y-4"
            >
              <label className="block space-y-1.5 text-sm font-medium">
                Service category
                <select
                  required
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 font-normal outline-none focus:border-primary"
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  {(data?.categories ?? []).map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1.5 text-sm font-medium">
                Price (USD)
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      price: event.target.value,
                    }))
                  }
                  placeholder="e.g. 75"
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 font-normal outline-none focus:border-primary"
                />
              </label>
              <label className="block space-y-1.5 text-sm font-medium">
                Description{" "}
                <span className="font-normal text-[var(--muted)]">
                  (optional)
                </span>
                <textarea
                  rows={4}
                  maxLength={500}
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Describe what customers can expect from this service"
                  className="w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 font-normal outline-none focus:border-primary"
                />
                <span className="block text-right text-xs font-normal text-[var(--muted)]">
                  {form.description.length}/500
                </span>
              </label>
              {actionError && (
                <p
                  role="alert"
                  className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 text-sm text-rose-700 dark:text-rose-300"
                >
                  {actionError}
                </p>
              )}
              <div className="flex justify-end gap-2 border-t border-[var(--line)] pt-4">
                <button
                  type="button"
                  onClick={closeForm}
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
                    : editingService
                      ? "Save changes"
                      : "Publish service"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  tone: "teal" | "green" | "amber";
}) {
  const tones = {
    teal: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
    green: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  };

  return (
    <article className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4">
      <div>
        <p className="text-sm text-[var(--muted)]">{title}</p>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
      </div>
      <span className={`rounded-xl p-2.5 ${tones[tone]}`}>{icon}</span>
    </article>
  );
}
