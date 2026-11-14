import { useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
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
import ProviderApplicationDetails from "./ProviderApplicationDetails";
import { useAdmin } from "@/context/AdminContext";
import { useReviewProviderApplication } from "@/data/ADMIN/AdminMutation";
import { useLiveAdminProviderApplications } from "@/data/ADMIN/AdminQueries";

type VerificationStatus = "APPROVED" | "REJECTED";

export default function ProviderVerification() {
  const { data, loading, error, refresh } = useAdmin();
  const liveApplicationsQuery = useLiveAdminProviderApplications(
    data?.users ?? [],
  );
  const reviewApplicationMutation = useReviewProviderApplication();

  const [search, setSearch] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(
    null,
  );

  const providerApplications = useMemo(
    () => liveApplicationsQuery.data ?? data?.providerApplications ?? [],
    [liveApplicationsQuery.data, data?.providerApplications],
  );

  const selectedProvider = providerApplications.find(
    (provider) => provider.id === selectedProviderId,
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return providerApplications
      .filter((provider) => {
        return [
          provider.businessName ?? "",
          provider.serviceArea ?? "",
          provider.users?.name ?? "",
          provider.users?.email ?? "",
          provider.userId,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        const pendingOrder =
          Number(b.applicationStatus === "PENDING") -
          Number(a.applicationStatus === "PENDING");
        return pendingOrder || b.createdAt.localeCompare(a.createdAt);
      });
  }, [providerApplications, search]);

  const setVerification = async (
    id: string,
    verificationStatus: VerificationStatus,
  ) => {
    setSavingId(id);
    setActionError(null);
    try {
      await reviewApplicationMutation.mutateAsync({
        applicationId: id,
        applicationStatus: verificationStatus,
      });
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
      <AdminPageHeader
        title="Provider verification"
        description="Review provider profiles and record approval or rejection decisions."
        action={
          <RefreshButton onClick={() => void refresh()} loading={loading} />
        }
      />

      {selectedProvider ? (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setSelectedProviderId(null)}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-medium hover:border-primary"
          >
            <ArrowLeft size={16} />
            Back to applications
          </button>
          <ProviderApplicationDetails application={selectedProvider} />
        </div>
      ) : (
        <>
          {(error || actionError) && (
            <ErrorState
              message={actionError ?? error ?? "An unexpected error occurred."}
            />
          )}

          <Panel
            title={`Provider applications (${providerApplications.length})`}
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
              <AdminTableSkeleton columns={6} />
            ) : (
              <DataTable
                headers={[
                  "Provider",
                  "Service area",
                  "Applied",
                  "Documents",
                  "Status",
                  "Decision",
                ]}
                isEmpty={filtered.length === 0}
                emptyMessage="No provider applications match your search."
              >
                {filtered.map((provider) => {
                  const saving = savingId === provider.id;
                  return (
                    <tr key={provider.id}>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => setSelectedProviderId(provider.id)}
                          className="text-left font-medium hover:text-primary hover:underline"
                        >
                          {provider.businessName ||
                            provider.users?.name ||
                            "Unnamed provider"}
                        </button>
                        <p className="mt-0.5 text-xs text-[var(--muted)]">
                          {provider.users?.email ?? provider.userId}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)]">
                        {provider.serviceArea || "—"}
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)]">
                        {formatDate(provider.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)]">
                        {formatDate(provider.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={provider.applicationStatus} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              void setVerification(provider.id, "APPROVED")
                            }
                            disabled={
                              saving ||
                              provider.applicationStatus === "APPROVED"
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
                              saving ||
                              provider.applicationStatus === "REJECTED"
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
        </>
      )}
    </section>
  );
}
