import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  DataTable,
  ErrorState,
  LoadingState,
  PageHeader,
  Panel,
  RefreshButton,
  StatusBadge,
} from "./AdminUI";
import { formatDate } from "./adminFormat";
import {
  adminClient,
  adminGraphqlClient,
  nonNullRecords,
  throwModelErrors,
  useAdminData,
} from "./adminData";
import { updateProviderService } from "../../graphql/mutations";

const loadServices = async () => {
  const [servicesResult, providersResult] = await Promise.all([
    adminClient.models.ProviderService.list({ limit: 200 }),
    adminClient.models.NearFixProvider.list({ limit: 200 }),
  ]);
  throwModelErrors(servicesResult.errors, "Unable to load service listings.");
  throwModelErrors(providersResult.errors, "Unable to load providers.");
  return {
    services: nonNullRecords(servicesResult.data),
    providers: nonNullRecords(providersResult.data),
  };
};

export default function ServiceManagement() {
  const { data, loading, error, refresh } = useAdminData(loadServices);
  const [search, setSearch] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const providerNames = useMemo(
    () =>
      new Map(
        (data?.providers ?? []).map((provider) => [
          provider.id,
          provider.businessName || provider.userId,
        ]),
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
        providerNames.get(service.providerId) ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [data?.services, providerNames, search]);

  const toggleService = async (id: string, isActive: boolean) => {
    setSavingId(id);
    setActionError(null);
    try {
      const result = await adminGraphqlClient.graphql({
        query: updateProviderService,
        variables: { input: { id, isActive: !isActive } },
      });
      throwModelErrors(result.errors, "Unable to update this service.");
      if (!result.data?.updateProviderService) {
        throw new Error("The service listing was not updated.");
      }
      await refresh();
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
      <PageHeader
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
          <LoadingState />
        ) : (
          <DataTable
            headers={["Service", "Provider", "Price", "Added", "Status", ""]}
            isEmpty={filtered.length === 0}
            emptyMessage="No service listings match your search."
          >
            {filtered.map((service) => (
              <tr key={service.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{service.category}</p>
                  <p className="mt-0.5 max-w-64 truncate text-xs text-[var(--muted)]">
                    {service.description || service.id}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p>
                    {providerNames.get(service.providerId) ??
                      "Unknown provider"}
                  </p>
                  <p className="mt-0.5 max-w-40 truncate text-xs text-[var(--muted)]">
                    {service.providerId}
                  </p>
                </td>
                <td className="px-4 py-3 font-medium">
                  {new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: "USD",
                  }).format(service.price)}
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {formatDate(service.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge
                    status={service.isActive ? "ACTIVE" : "INACTIVE"}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      void toggleService(service.id, Boolean(service.isActive))
                    }
                    disabled={savingId === service.id}
                    className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-medium transition hover:border-primary hover:text-primary disabled:opacity-60"
                  >
                    {service.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Panel>
    </section>
  );
}
