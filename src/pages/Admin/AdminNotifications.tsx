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
import AdminOverviewSkeleton from "./AdminSkeleton/AdminOverviewSkeleton";
import { formatDate } from "./adminFormat";
import { useAdmin } from "@/context/AdminContext";
import { useMarkAdminNotificationRead } from "@/data/ADMIN/AdminMutation";

export default function AdminNotifications() {
  const { data, loading, error, refresh } = useAdmin();
  const markNotificationRead = useMarkAdminNotificationRead();
  const [search, setSearch] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const userById = useMemo(
    () => new Map((data?.users ?? []).map((user) => [user.id, user])),
    [data?.users],
  );
  const notifications = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...(data?.notifications ?? [])]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .filter((notification) =>
        [
          notification.title ?? "",
          notification.description ?? "",
          userById.get(notification.userId)?.name ?? notification.userId,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
  }, [data?.notifications, search, userById]);

  const markAsRead = async (id: string) => {
    setSavingId(id);
    setActionError(null);
    try {
      await markNotificationRead.mutateAsync(id);
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to update this notification.",
      );
    } finally {
      setSavingId(null);
    }
  };

  const unreadCount =
    data?.notifications.filter((notification) => !notification.isRead).length ??
    0;

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <AdminPageHeader
        title="Notifications"
        description="Review notifications already sent to customers and mark them as read."
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
        <AdminOverviewSkeleton cards={2} showChart={false} />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard
              label="Notifications"
              value={data?.notifications.length ?? 0}
            />
            <StatCard label="Unread" value={unreadCount} />
          </div>

          <Panel
            title={`Notification history (${data?.notifications.length ?? 0})`}
            action={
              <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2">
                <Search size={15} className="text-[var(--muted)]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search notifications"
                  aria-label="Search notifications"
                  className="w-36 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
                />
              </label>
            }
          >
            <DataTable
              headers={["Notification", "Customer", "Date", "Read", ""]}
              isEmpty={notifications.length === 0}
              emptyMessage="No notifications match your search."
            >
              {notifications.map((notification) => (
                <tr key={notification.id}>
                  <td className="max-w-[360px] px-4 py-3">
                    <p className="font-medium">
                      {notification.title || "Notification"}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-[var(--muted)]">
                      {notification.description || "No message"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {userById.get(notification.userId)?.name ??
                      notification.userId}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {formatDate(notification.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={notification.isRead ? "READ" : "UNREAD"}
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {!notification.isRead && (
                      <button
                        type="button"
                        onClick={() => void markAsRead(notification.id)}
                        disabled={savingId === notification.id}
                        className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-medium transition hover:border-primary hover:text-primary disabled:opacity-60"
                      >
                        Mark read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </DataTable>
          </Panel>
          <p className="text-xs text-[var(--muted)]">
            This screen manages existing notification records; broadcasting new
            notifications is not part of the current data model.
          </p>
        </>
      )}
    </section>
  );
}
