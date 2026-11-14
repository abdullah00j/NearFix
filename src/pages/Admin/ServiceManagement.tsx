import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  DataTable,
  ErrorState,
  Panel,
  RefreshButton,
  StatusBadge,
} from "@/components/Pages/ADMIN/Shared";
import AdminPageHeader from "@/components/Pages/ADMIN/Shared/AdminPageHeader";
import AdminTableSkeleton from "./AdminSkeleton/AdminTableSkeleton";
import { formatDate } from "./adminFormat";
import { useAdmin } from "@/context/AdminContext";
import { useUpdateAdminService } from "@/data/ADMIN/AdminMutation";

export default function ServiceManagement() {
  const { data, loading, error, refresh } = useAdmin();
  const updateAdminService = useUpdateAdminService();
  const [search, setSearch] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const providerById = useMemo(
    () =>
      new Map(
        (data?.providers ?? []).map((provider) => [provider.id, provider]),
      ),
    [data?.providers],
  );
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (data?.services ?? []).filter((service) =>
      [
        service.category,
        service.description ?? "",
        service.providerId,
        service.pricingType ?? "",
        ...(service.ProductImages ?? []),
        providerById.get(service.providerId)?.businessName ?? "",
        providerById.get(service.providerId)?.serviceArea ?? "",
        providerById.get(service.providerId)?.availabilityStatus ?? "",
        providerById.get(service.providerId)?.selfie ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [data?.services, providerById, search]);

  const toggleService = async (id: string, isActive: boolean) => {
    setSavingId(id);
    setActionError(null);
    try {
      await updateAdminService.mutateAsync({ id, isActive: !isActive });
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to update this service.",
      );
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <AdminPageHeader
        title="Service management"
        description="Review provider listings, prices, categories, and availability."
        action={
          <RefreshButton onClick={() => void refresh()} loading={loading} />
        }
      />

      {(error || actionError) && (
        <ErrorState
          message={actionError ?? error ?? "An unexpected error occurred."}
        />
      )}

      <Panel
        title={`Service listings (${data?.services.length ?? 0})`}
        action={
          <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2">
            <Search size={15} className="text-[var(--muted)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search services"
              aria-label="Search service listings"
              className="w-36 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
            />
          </label>
        }
      >
        {loading && !data ? (
          <AdminTableSkeleton columns={14} />
        ) : (
          <DataTable
            minWidth={1900}
            tableLayout="fixed"
            headers={[
              "ID",
              "Description",
              "Price",
              "Provider ID",
              "Active",
              "Category",
              "Pricing type",
              "Product images",
              "Business name",
              "Service area",
              "Availability",
              "Provider selfie",
              "Added",
              "Action",
            ]}
            isEmpty={filtered.length === 0}
            emptyMessage="No service listings match your search."
          >
            {filtered.map((service) => {
              const provider = providerById.get(service.providerId);

              return (
                <tr key={service.id}>
                  <td
                    title={service.id}
                    className="truncate px-4 py-3 font-mono text-xs"
                  >
                    {service.id}
                  </td>
                  <td
                    title={service.description || undefined}
                    className="truncate px-4 py-3"
                  >
                    {service.description || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium">
                    {new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: "USD",
                    }).format(service.price)}
                  </td>
                  <td
                    title={service.providerId}
                    className="truncate px-4 py-3 font-mono text-xs"
                  >
                    {service.providerId}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={service.isActive ? "ACTIVE" : "INACTIVE"}
                    />
                  </td>
                  <td className="px-4 py-3">{service.category}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {service.pricingType?.replaceAll("_", " ") ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {service.ProductImages?.filter((image): image is string =>
                      Boolean(image),
                    ).length ? (
                      <div className="space-y-1">
                        {service.ProductImages.filter(
                          (image): image is string => Boolean(image),
                        ).map((image, index) => (
                          <p
                            key={`${service.id}-image-${index}`}
                            title={image}
                            className="truncate"
                          >
                            Image {index + 1}: {image}
                          </p>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">{provider?.businessName || "—"}</td>
                  <td className="px-4 py-3">{provider?.serviceArea || "—"}</td>
                  <td className="px-4 py-3">
                    {provider?.availabilityStatus?.replaceAll("_", " ") ?? "—"}
                  </td>
                  <td
                    title={provider?.selfie ?? undefined}
                    className="truncate px-4 py-3 text-xs"
                  >
                    {provider?.selfie || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-[var(--muted)]">
                    {formatDate(service.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        void toggleService(
                          service.id,
                          Boolean(service.isActive),
                        )
                      }
                      disabled={savingId === service.id}
                      className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-medium transition hover:border-primary hover:text-primary disabled:opacity-60"
                    >
                      {service.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </DataTable>
        )}
      </Panel>
    </section>
  );
}
