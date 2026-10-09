import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  Bell,
  CalendarCheck,
  Check,
  CircleDollarSign,
  MessageSquareText,
  Star,
  Trash2,
} from "lucide-react";
import { type NotificationItem } from "./notificationData";
type NotificationFilter = "All" | "Unread";

type NotificationType = NotificationItem["type"];

const notificationStyles: Record<
  NotificationType,
  { icon: typeof Bell; label: string }
> = {
  booking: { icon: CalendarCheck, label: "Booking" },
  message: { icon: MessageSquareText, label: "Message" },
  payment: { icon: CircleDollarSign, label: "Payment" },
  review: { icon: Star, label: "Review" },
};
export default function NotificationList({
  notifications,
  setNotifications,
}: {
  notifications: NotificationItem[];
  setNotifications: Dispatch<SetStateAction<NotificationItem[]>>;
}) {
  const [filter, setFilter] = useState<NotificationFilter>("All");

  const unreadCount = notifications.filter(({ unread }) => unread).length;
  const visibleNotifications = useMemo(
    () =>
      notifications.filter(
        (notification) => filter === "All" || notification.unread,
      ),
    [filter, notifications],
  );

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  };
  return (
    <>
      <div className="flex items-center justify-between border-b border-line">
        <div className="flex gap-2">
          {(["All", "Unread"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={`border-b-2 px-3 py-3 text-sm font-medium transition ${
                filter === item
                  ? "border-primary text-primary"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {item}
              {item === "Unread" && (
                <span className="ml-2 rounded-full bg-panel-soft px-2 py-0.5 text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)]">
          {notifications.length} total
        </p>
      </div>
      {visibleNotifications.length === 0 ? (
        <div className="rounded-2xl border border-line bg-[var(--panel)] px-5 py-14 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-panel-soft text-primary">
            <Check size={22} />
          </span>
          <h2 className="mt-4 font-semibold">
            {filter === "Unread"
              ? "You’re all caught up"
              : "No notifications yet"}
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            New booking and account updates will show up here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-[var(--panel)]">
          <ul className="divide-y divide-line">
            {visibleNotifications.map((notification) => {
              const { icon: Icon, label } =
                notificationStyles[notification.type];

              return (
                <li
                  key={notification.id}
                  className={`flex gap-3 p-4 transition md:gap-4 md:px-5 ${
                    notification.unread ? "bg-panel-soft/60" : ""
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-panel-soft text-primary">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold">
                        {notification.title}
                      </h2>
                      {notification.unread && (
                        <span
                          className="h-2 w-2 rounded-full bg-primary"
                          aria-label="Unread"
                        />
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
                      {notification.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-[var(--muted)]">
                      <span>{label}</span>
                      <span aria-hidden="true">·</span>
                      <time>{notification.time}</time>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-start gap-1">
                    {notification.unread && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        aria-label={`Mark ${notification.title} as read`}
                        title="Mark as read"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-panel-soft hover:text-primary"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => dismissNotification(notification.id)}
                      aria-label={`Dismiss ${notification.title}`}
                      title="Dismiss"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-panel-soft hover:text-primary"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
