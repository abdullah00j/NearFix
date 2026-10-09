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
  nonNullRecords,
  throwModelErrors,
  useAdminData,
} from "./adminData";

const loadCustomers = async () => {
  const result = await adminClient.models.NearFixUser.list({ limit: 200 });
  throwModelErrors(result.errors, "Unable to load customers.");
  return nonNullRecords(result.data);
};

type UserStatus = "ACTIVE" | "WARNED" | "SUSPENDED";

export default function CustomerManagement() {
  const {
    data: customers,
    loading,
    error,
    refresh,
  } = useAdminData(loadCustomers);
  const [search, setSearch] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (customers ?? []).filter((customer) =>
      [
        customer.name,
        customer.email,
        customer.phone ?? "",
        customer.location ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [customers, search]);

  const updateStatus = async (id: string, status: UserStatus) => {
    setSavingId(id);
    setActionError(null);
    try {
      const result = await adminClient.models.NearFixUser.update({
        id,
        status,
      });
      throwModelErrors(result.errors, "Unable to update this customer.");
      if (!result.data) throw new Error("The customer status was not updated.");
      await refresh();
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to update this customer.",
      );
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <PageHeader
        title="Customer management"
        description="Review customer profiles and manage account status."
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
        title={`Customers (${customers?.length ?? 0})`}
        action={
          <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2">
            <Search size={15} className="text-[var(--muted)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search customers"
              aria-label="Search customers"
              className="w-36 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
            />
          </label>
        }
      >
        {loading && !customers ? (
          <LoadingState />
        ) : (
          <DataTable
            headers={[
              "Customer",
              "Contact",
              "Location",
              "Joined",
              "Status",
              "",
            ]}
            isEmpty={filtered.length === 0}
            emptyMessage="No customers match your search."
          >
            {filtered.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{customer.name}</p>
                  <p className="mt-0.5 max-w-48 truncate text-xs text-[var(--muted)]">
                    {customer.id}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p>{customer.email}</p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    {customer.phone || "No phone"}
                  </p>
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {customer.location || "—"}
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {formatDate(customer.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={customer.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <select
                    value={customer.status}
                    disabled={savingId === customer.id}
                    onChange={(event) =>
                      void updateStatus(
                        customer.id,
                        event.target.value as UserStatus,
                      )
                    }
                    aria-label={`Change status for ${customer.name}`}
                    className="rounded-lg border border-[var(--line)] bg-[var(--panel)] px-2 py-1.5 text-xs outline-none focus:border-primary disabled:opacity-60"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="WARNED">Warned</option>
                    <option value="SUSPENDED">Suspended</option>
                  </select>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Panel>
    </section>
  );
}
