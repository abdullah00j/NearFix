import { useMemo, useState } from "react";
import { History } from "lucide-react";
import BookingHistory from "../../component/Pages/BookingHistory.tsx/BookingHistory";
import BookingHistoryPills from "../../component/Pages/BookingHistory.tsx/BookingHistoryPills";
import BookingHistoryNotifcationListing from "../../component/Pages/BookingHistory.tsx/BookingHistoryNotifcationListing";

type HistoryStatus = "COMPLETED" | "CANCELED";
type HistoryFilter = "ALL" | HistoryStatus;

type BookingActivity = {
  id: string;
  service: string;
  description: string;
  customer: string;
  date: string;
  status: HistoryStatus;
};

const bookingActivities: BookingActivity[] = [
  {
    id: "NF-24052",
    service: "Home Cleaning",
    description: "Two-bedroom deep clean",
    customer: "Sam Rivera",
    date: "2026-10-01T13:45:00",
    status: "COMPLETED",
  },
  {
    id: "NF-24039",
    service: "Appliance Repair",
    description: "Diagnose washing machine noise",
    customer: "Taylor Kim",
    date: "2026-09-27T12:30:00",
    status: "COMPLETED",
  },
  {
    id: "NF-24021",
    service: "Painting",
    description: "Touch up living room walls",
    customer: "Casey Patel",
    date: "2026-09-22T15:00:00",
    status: "CANCELED",
  },
  {
    id: "NF-23998",
    service: "Furniture Assembly",
    description: "Assemble bedroom wardrobe",
    customer: "Riley Chen",
    date: "2026-09-18T11:10:00",
    status: "COMPLETED",
  },
];

const filters: { label: string; value: HistoryFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Canceled", value: "CANCELED" },
];

export default function BookingHistoryPage() {
  const [activeFilter, setActiveFilter] = useState<HistoryFilter>("ALL");

  const filteredActivities = useMemo(
    () =>
      bookingActivities.filter(
        (activity) =>
          activeFilter === "ALL" || activity.status === activeFilter,
      ),
    [activeFilter],
  );

  const counts: Record<HistoryFilter, number> = {
    ALL: bookingActivities.length,
    COMPLETED: bookingActivities.filter(
      (activity) => activity.status === "COMPLETED",
    ).length,
    CANCELED: bookingActivities.filter(
      (activity) => activity.status === "CANCELED",
    ).length,
  };

  return (
    <section className="mx-auto max-w-[1080px] px-1 py-6 text-[var(--text)] md:px-2 md:py-8">
      <BookingHistory />

      <BookingHistoryPills
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filters={filters}
        counts={counts}
      />

      {filteredActivities.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-line bg-[var(--panel)] px-5 py-12 text-center">
          <History className="mx-auto text-primary" size={24} />
          <h2 className="mt-3 font-semibold">No booking activity yet</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Completed and canceled bookings will appear here.
          </p>
        </div>
      ) : (
        <BookingHistoryNotifcationListing
          filteredActivities={filteredActivities}
        />
      )}
    </section>
  );
}
