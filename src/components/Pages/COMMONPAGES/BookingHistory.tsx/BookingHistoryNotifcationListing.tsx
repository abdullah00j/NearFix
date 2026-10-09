import { Check, CircleX } from "lucide-react";

const referenceTime = Date.now();

interface BookingHistoryNotifcationListingProps {
  filteredActivities: {
    id: string;
    status: "COMPLETED" | "CANCELED";
    description: string;
    customer: string;
    service: string;
    date: string;
  }[];
}

export default function BookingHistoryNotifcationListing({
  filteredActivities,
}: BookingHistoryNotifcationListingProps) {
  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const relativeDate = (value: string): string => {
    const date = new Date(value);
    const elapsedDays = Math.max(
      0,
      Math.floor((referenceTime - date.getTime()) / (1000 * 60 * 60 * 24)),
    );

    if (elapsedDays === 0) return "Today";
    if (elapsedDays === 1) return "1d ago";
    if (elapsedDays < 30) return `${elapsedDays}d ago`;

    const elapsedMonths = Math.floor(elapsedDays / 30);
    if (elapsedMonths < 12) return `${elapsedMonths}mo ago`;

    return `${Math.floor(elapsedDays / 365)}y ago`;
  };

  return (
    <>
      <div className="relative mt-8">
        <span
          aria-hidden="true"
          className="absolute bottom-8 left-5 top-5 border-l border-line"
        />

        <ol className="space-y-6">
          {filteredActivities.map((activity) => {
            const isCompleted = activity.status === "COMPLETED";
            const Icon = isCompleted ? Check : CircleX;
            const title = isCompleted
              ? "Booking completed"
              : "Booking canceled";

            return (
              <li key={activity.id} className="relative flex items-start gap-4">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-panel-soft text-primary">
                  <Icon size={17} strokeWidth={2.2} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1 pt-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <h2 className="font-semibold">{title}</h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {activity.description} for {activity.customer}
                    </p>
                    <span className="mt-2 inline-flex rounded bg-panel-soft px-2 py-1 font-mono text-xs text-[var(--muted)]">
                      {activity.service} · {activity.id}
                    </span>
                  </div>
                  <time
                    dateTime={activity.date}
                    title={formatDate(activity.date)}
                    className="shrink-0 pt-0.5 text-xs text-[var(--muted)] sm:text-right"
                  >
                    {relativeDate(activity.date)}
                  </time>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
