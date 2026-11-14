import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  DataTable,
  ErrorState,
  Panel,
  RefreshButton,
  StatCard,
  StatusBadge,
} from "@/components/Pages/ADMIN/Shared";
import AdminPageHeader from "@/components/Pages/ADMIN/Shared/AdminPageHeader";
import AdminTableSkeleton from "./AdminSkeleton/AdminTableSkeleton";
import { formatDate } from "./adminFormat";
import { useAdmin } from "@/context/AdminContext";
import { useUpdateAdminUserStatus } from "@/data/ADMIN/AdminMutation";

type AccountStatus = "ACTIVE" | "WARNED" | "SUSPENDED";

export default function ProviderManagement() {
  const { data, loading, error, refresh } = useAdmin();
  const updateUserStatus = useUpdateAdminUserStatus();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const usersById = useMemo(
    () => new Map((data?.users ?? []).map((user) => [user.id, user])),
    [data?.users],
  );
  const servicesByProviderId = useMemo(() => {
    const counts = new Map<string, number>();
    for (const service of data?.services ?? []) {
      counts.set(service.providerId, (counts.get(service.providerId) ?? 0) + 1);
    }
    return counts;
  }, [data?.services]);

  const filteredProviders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...(data?.providers ?? [])]
      .filter((provider) => {
        const user = usersById.get(provider.userId);
        const accountStatus = user?.status ?? "ACTIVE";
        const matchesStatus =
          statusFilter === "ALL" || accountStatus === statusFilter;
        const matchesSearch = [
          provider.businessName ?? "",
          provider.serviceArea ?? "",
          provider.verificationStatus,
          user?.name ?? "",
          user?.email ?? "",
          provider.userId,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
        return matchesStatus && matchesSearch;
      })
      .sort((first, second) =>
        (first.businessName ?? "").localeCompare(second.businessName ?? ""),
      );
  }, [data?.providers, search, statusFilter, usersById]);

  const updateAccountStatus = async (userId: string, status: AccountStatus) => {
    setSavingId(userId);
    setActionError(null);
    try {
      await updateUserStatus.mutateAsync({
        id: userId,
        status,
      });
    } catch (updateError) {
      setActionError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update this provider.",
      );
    } finally {
      setSavingId(null);
    }
  };

  const providers = data?.providers ?? [];
  const activeProviders = providers.filter(
    (provider) => usersById.get(provider.userId)?.status === "ACTIVE",
  ).length;
  const pendingVerification = providers.filter(
    (provider) => provider.verificationStatus === "PENDING",
  ).length;

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <AdminPageHeader
        title="Provider Management"
        description="Manage provider accounts, review verification status, and monitor service coverage."
        action={
          <RefreshButton onClick={() => void refresh()} loading={loading} />
        }
      />

      {(error || actionError) && (
        <ErrorState
          message={actionError ?? error ?? "An unexpected error occurred."}
        />
      )}

      {loading && !data ? (
        <AdminTableSkeleton columns={6} />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label="Providers" value={providers.length} />
            <StatCard label="Active accounts" value={activeProviders} />
            <StatCard
              label="Pending verification"
              value={pendingVerification}
            />
          </div>

          <Panel
            title={`Providers (${filteredProviders.length})`}
            action={
              <div className="flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2">
                  <Search size={15} className="text-[var(--muted)]" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search providers"
                    aria-label="Search providers"
                    className="w-36 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
                  />
                </label>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  aria-label="Filter providers by account status"
                  className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  <option value="ALL">All statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="WARNED">Warned</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            }
          >
            <DataTable
              headers={[
                "Provider",
                "Contact",
                "Service area",
                "Services",
                "Verification",
                "Account status",
                "Joined",
                "",
              ]}
              minWidth={940}
              isEmpty={filteredProviders.length === 0}
              emptyMessage="No providers match your search or status filter."
            >
              {filteredProviders.map((provider) => {
                const user = usersById.get(provider.userId);
                const accountStatus = user?.status ?? "ACTIVE";
                return (
                  <tr key={provider.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium">
                        {provider.businessName ||
                          user?.name ||
                          "Unnamed provider"}
                      </p>
                      <p className="mt-0.5 max-w-48 truncate text-xs text-[var(--muted)]">
                        {provider.userId}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      {user?.email ?? "No email"}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      {provider.serviceArea || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {servicesByProviderId.get(provider.id) ?? 0}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={provider.verificationStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={accountStatus} />
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      {formatDate(provider.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <select
                        value={accountStatus}
                        disabled={!user || savingId === provider.userId}
                        onChange={(event) =>
                          void updateAccountStatus(
                            provider.userId,
                            event.target.value as AccountStatus,
                          )
                        }
                        aria-label={`Change account status for ${provider.businessName || user?.name || "provider"}`}
                        className="rounded-lg border border-[var(--line)] bg-[var(--panel)] px-2 py-1.5 text-xs outline-none focus:border-primary disabled:opacity-60"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="WARNED">Warned</option>
                        <option value="SUSPENDED">Suspended</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </DataTable>
          </Panel>
          <p className="text-xs text-[var(--muted)]">
            Verification decisions are handled in Provider Verification. Account
            status changes apply to the provider&apos;s NearFix user account.
          </p>
        </>
      )}
    </section>
  );
}
