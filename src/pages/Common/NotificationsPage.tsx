import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import CommonPageHeader from "@/components/Pages/COMMONPAGES/Shared/CommonPageHeader";
import NotificationList from "../../components/Pages/COMMONPAGES/Notifications/NotificationList";
import {
  initialNotifications,
  type NotificationItem,
} from "../../components/Pages/COMMONPAGES/Notifications/notificationData";

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, unread: false })),
    );
  };

  return (
    <section className="mx-auto max-w-[1000px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <CommonPageHeader
        eyebrow="Stay up to date"
        icon={<Bell size={16} />}
        title="Notifications"
        description="Booking updates, messages, and other activity in one place."
        action={
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={!notifications.some(({ unread }) => unread)}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-[var(--panel)] px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        }
      />

      <NotificationList
        notifications={notifications}
        setNotifications={setNotifications}
      />

      <p className="text-center text-xs text-[var(--muted)]">
        Sample notifications shown for this prototype.
      </p>
    </section>
  );
}
