import { useMemo, useState } from "react";

import { useCurrentUser } from "../../context/UserContext";
import BookingHeader from "../../components/Pages/CUSTOMER/Booking.tsx/BookingHeader";
import BookingCards from "../../components/Pages/CUSTOMER/Booking.tsx/BookingCards";
import BookingListing from "../../components/Pages/CUSTOMER/Booking.tsx/BookingListing";

type BookingStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "CANCELED";
type BookingFilter = "ALL" | "PENDING" | "CONFIRMED" | "IN_PROGRESS";

type BookingRecord = {
  id: string;
  service: string;
  description: string;
  customer: string;
  provider: string;
  date: string;
  location: string;
  price: number;
  status: BookingStatus;
};

const customerBookings: BookingRecord[] = [
  {
    id: "NF-24108",
    service: "Plumbing",
    description: "Kitchen sink faucet repair",
    customer: "You",
    provider: "Jordan's Home Services",
    date: "2026-10-09T10:00:00",
    location: "Brooklyn, NY",
    price: 85,
    status: "CONFIRMED",
  },
  {
    id: "NF-24102",
    service: "Home Cleaning",
    description: "Deep clean for a two-bedroom apartment",
    customer: "You",
    provider: "Bright & Tidy",
    date: "2026-10-11T13:30:00",
    location: "Manhattan, NY",
    price: 140,
    status: "PENDING",
  },
];

const providerBookings: BookingRecord[] = [
  {
    id: "NF-24121",
    service: "Plumbing",
    description: "Repair leaking bathroom tap",
    customer: "Alex Morgan",
    provider: "You",
    date: "2026-10-10T09:30:00",
    location: "Brooklyn, NY",
    price: 75,
    status: "PENDING",
  },
  {
    id: "NF-24116",
    service: "Plumbing",
    description: "Check low water pressure in kitchen",
    customer: "Jamie Rivera",
    provider: "You",
    date: "2026-10-11T14:00:00",
    location: "Queens, NY",
    price: 90,
    status: "PENDING",
  },
  {
    id: "NF-24088",
    service: "Plumbing",
    description: "Replace shower head and seal",
    customer: "Sam Taylor",
    provider: "You",
    date: "2026-10-08T11:00:00",
    location: "Manhattan, NY",
    price: 65,
    status: "CONFIRMED",
  },
];

const statusLabels: Record<BookingStatus, string> = {
  PENDING: "Awaiting response",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In progress",
  CANCELED: "Canceled",
};

const filters: { label: string; value: BookingFilter }[] = [
  { label: "All active", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "In progress", value: "IN_PROGRESS" },
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export default function Booking() {
  const { role } = useCurrentUser();
  const isProvider = role?.includes("PROVIDER") ?? false;
  const [bookings, setBookings] = useState(
    isProvider ? providerBookings : customerBookings,
  );
  const [filter, setFilter] = useState<BookingFilter>("ALL");
  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesFilter = filter === "ALL" || booking.status === filter;
      const matchesSearch =
        !query ||
        [
          booking.service,
          booking.description,
          booking.customer,
          booking.provider,
          booking.location,
          booking.id,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [bookings, filter, search]);

  const pendingCount = bookings.filter(
    (booking) => booking.status === "PENDING",
  ).length;
  const confirmedCount = bookings.filter(
    (booking) => booking.status === "CONFIRMED",
  ).length;
  const inProgressCount = bookings.filter(
    (booking) => booking.status === "IN_PROGRESS",
  ).length;

  const updateStatus = (id: string, status: BookingStatus) => {
    setBookings((currentBookings) => {
      if (status === "CANCELED") {
        return currentBookings.filter((booking) => booking.id !== id);
      }

      return currentBookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking,
      );
    });
  };

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <BookingHeader isProvider={isProvider} bookingCount={bookings.length} />

      <BookingCards
        pendingCount={pendingCount}
        confirmedCount={confirmedCount}
        inProgressCount={inProgressCount}
        isProvider={isProvider}
      />
      <BookingListing
        bookings={bookings}
        filter={filter}
        search={search}
        isProvider={isProvider}
        statusLabels={statusLabels}
        filters={filters}
        formatDate={formatDate}
        updateStatus={updateStatus}
        setFilter={setFilter}
        setSearch={setSearch}
        filteredBookings={filteredBookings}
      />
    </section>
  );
}
