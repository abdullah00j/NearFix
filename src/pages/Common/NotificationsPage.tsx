import { useState } from "react";
import NotificationHeader from "../../component/Pages/Notifications/NotificationHeader";
import NotificationList from "../../component/Pages/Notifications/NotificationList";
import {
  initialNotifications,
  type NotificationItem,
} from "../../component/Pages/Notifications/notificationData";

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
      <NotificationHeader
        onMarkAllAsRead={markAllAsRead}
        hasUnread={notifications.some(({ unread }) => unread)}
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
