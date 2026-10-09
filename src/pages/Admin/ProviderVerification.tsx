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

const loadProviders = async () => {
  const [providersResult, usersResult] = await Promise.all([
    adminClient.models.NearFixProvider.list({ limit: 200 }),
    adminClient.models.NearFixUser.list({ limit: 200 }),
  ]);
  throwModelErrors(
    providersResult.errors,
    "Unable to load provider applications.",
  );
  throwModelErrors(usersResult.errors, "Unable to load provider profiles.");
  return {
    providers: nonNullRecords(providersResult.data),
    users: nonNullRecords(usersResult.data),
  };
};

type VerificationStatus =
  "PENDING" | "APPROVED" | "REJECTED" | "CHANGE_REQUESTED";

export default function ProviderVerification() {
  const { data, loading, error, refresh } = useAdminData(loadProviders);
  const [search, setSearch] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const userById = useMemo(
    () => new Map((data?.users ?? []).map((user) => [user.id, user])),
    [data?.users],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (data?.providers ?? [])
      .filter((provider) => {
        const user = userById.get(provider.userId);
        return [
          provider.businessName ?? "",
          provider.serviceArea ?? "",
          user?.name ?? "",
          user?.email ?? "",
          provider.userId,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        const pendingOrder =
          Number(b.verificationStatus === "PENDING") -
          Number(a.verificationStatus === "PENDING");
        return pendingOrder || b.createdAt.localeCompare(a.createdAt);
      });
  }, [data?.providers, search, userById]);

  const setVerification = async (
    id: string,
    verificationStatus: VerificationStatus,
  ) => {
    setSavingId(id);
    setActionError(null);
    try {
      const result = await adminClient.models.NearFixProvider.update({
        id,
        verificationStatus,
      });
      throwModelErrors(
        result.errors,
        "Unable to update provider verification.",
      );
      if (!result.data)
        throw new Error("The verification status was not updated.");
      await refresh();
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to update provider verification.",
      );
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <PageHeader
        title="Provider verification"
        description="Review provider profiles and record approval or rejection decisions."
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
        title={`Provider applications (${data?.providers.length ?? 0})`}
        action={
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
        }
      >
        {loading && !data ? (
          <LoadingState />
        ) : (
          <DataTable
            headers={[
              "Provider",
              "Service area",
              "Experience",
              "Applied",
              "Status",
              "Decision",
            ]}
            isEmpty={filtered.length === 0}
            emptyMessage="No provider applications match your search."
          >
            {filtered.map((provider) => {
              const user = userById.get(provider.userId);
              const saving = savingId === provider.id;
              return (
                <tr key={provider.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium">
                      {provider.businessName ||
                        user?.name ||
                        "Unnamed provider"}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                      {user?.email ?? provider.userId}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {provider.serviceArea || "—"}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {provider.experience || "—"}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {formatDate(provider.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={provider.verificationStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          void setVerification(provider.id, "APPROVED")
                        }
                        disabled={
                          saving || provider.verificationStatus === "APPROVED"
                        }
                        className="rounded-lg bg-primary px-2.5 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          void setVerification(provider.id, "REJECTED")
                        }
                        disabled={
                          saving || provider.verificationStatus === "REJECTED"
                        }
                        className="rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-xs font-medium text-rose-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-rose-300"
                      >
                        Reject
                      </button>
                    </div>
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
