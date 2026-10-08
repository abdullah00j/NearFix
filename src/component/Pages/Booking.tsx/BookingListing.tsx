import {
  CalendarDays,
  Check,
  MapPin,
  Search,
  UserRound,
  X,
} from "lucide-react";

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

interface BookingListingProps {
  bookings: BookingRecord[];
  filter: BookingFilter;
  search: string;
  isProvider: boolean;
  statusLabels: Record<BookingStatus, string>;
  filters: { label: string; value: BookingFilter }[];
  formatDate: (value: string) => string;
  updateStatus: (id: string, status: BookingStatus) => void;
  setFilter: (filter: BookingFilter) => void;
  setSearch: (search: string) => void;
  filteredBookings: BookingRecord[];
}

export default function BookingListing({
  bookings,
  filter,
  search,
  isProvider,
  statusLabels,
  filters,
  formatDate,
  updateStatus,
  setFilter,
  setSearch,
  filteredBookings,
}: BookingListingProps) {
  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-line bg-[var(--panel)]">
        <div className="flex flex-col gap-4 border-b border-line p-4 md:flex-row md:items-center md:justify-between md:px-5">
          <div className="flex flex-wrap gap-1">
            {filters.map((item) => {
              const count =
                item.value === "ALL"
                  ? bookings.length
                  : bookings.filter((booking) => booking.status === item.value)
                      .length;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                    filter === item.value
                      ? "bg-panel-soft text-primary"
                      : "text-[var(--muted)] hover:bg-panel-soft hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                  <span className="ml-2 text-xs text-[var(--muted)]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <label className="flex h-10 w-full items-center gap-2 rounded-xl border border-line bg-[var(--panel)] px-3 text-[var(--muted)] md:max-w-[280px]">
            <Search size={16} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search bookings"
              className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
            />
          </label>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <h2 className="font-semibold">No bookings found</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Try another search or choose a different status.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-line">
            {filteredBookings.map((booking) => (
              <article
                key={booking.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between md:px-5"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-panel-soft text-primary">
                    <CalendarDays size={19} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold">{booking.service}</h2>
                      <span className="rounded-full border border-line bg-panel-soft px-2.5 py-1 text-xs font-medium text-[var(--muted)]">
                        {statusLabels[booking.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {booking.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--muted)]">
                      <span className="flex items-center gap-1.5">
                        <UserRound size={13} />
                        {isProvider ? booking.customer : booking.provider}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        {booking.location}
                      </span>
                      <span className="font-medium text-[var(--text)]">
                        ${booking.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 pl-14 sm:justify-end sm:pl-0">
                  <div className="text-sm sm:text-right">
                    <p className="font-medium">{formatDate(booking.date)}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Booking #{booking.id}
                    </p>
                  </div>
                  {isProvider && booking.status === "PENDING" && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateStatus(booking.id, "CANCELED")}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-[var(--muted)] transition hover:bg-panel-soft hover:text-[var(--text)]"
                        aria-label={`Decline booking ${booking.id}`}
                        title="Decline"
                      >
                        <X size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(booking.id, "CONFIRMED")}
                        className="flex h-9 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-medium text-white transition hover:bg-primary-dark"
                      >
                        <Check size={15} />
                        Accept
                      </button>
                    </div>
                  )}
                  {!isProvider &&
                    (booking.status === "PENDING" ||
                      booking.status === "CONFIRMED") && (
                      <button
                        type="button"
                        onClick={() => updateStatus(booking.id, "CANCELED")}
                        className="rounded-xl border border-line px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-panel-soft hover:text-[var(--text)]"
                      >
                        Cancel
                      </button>
                    )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
