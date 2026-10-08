import { Bell, CheckCheck } from "lucide-react";

export default function NotificationHeader({
  onMarkAllAsRead,
  hasUnread,
}: {
  onMarkAllAsRead: () => void;
  hasUnread: boolean;
}) {
  return (
    <>
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <Bell size={16} />
            Stay up to date
          </p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Notifications
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Booking updates, messages, and other activity in one place.
          </p>
        </div>
        <button
          type="button"
          onClick={onMarkAllAsRead}
          disabled={!hasUnread}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-[var(--panel)] px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCheck size={16} />
          Mark all as read
        </button>
      </header>
    </>
  );
}
