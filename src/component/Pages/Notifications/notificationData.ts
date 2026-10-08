export type NotificationItem = {
  id: string;
  type: "booking" | "message" | "payment" | "review";
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

export const initialNotifications: NotificationItem[] = [
  {
    id: "notification-1",
    type: "booking",
    title: "Booking confirmed",
    description:
      "Jordan's Home Services confirmed your plumbing appointment for Oct 9 at 10:00 AM.",
    time: "10 minutes ago",
    unread: true,
  },
  {
    id: "notification-2",
    type: "message",
    title: "New message",
    description:
      "Bright & Tidy sent you a message about your cleaning request.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "notification-3",
    type: "payment",
    title: "Payment received",
    description:
      "Your payment for the completed home cleaning has been processed.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "notification-4",
    type: "review",
    title: "How was your service?",
    description:
      "Leave a review for your recent appointment with Harbor Electric.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "notification-5",
    type: "booking",
    title: "Booking request sent",
    description:
      "Your furniture assembly request is waiting for the provider's response.",
    time: "3 days ago",
    unread: false,
  },
];
