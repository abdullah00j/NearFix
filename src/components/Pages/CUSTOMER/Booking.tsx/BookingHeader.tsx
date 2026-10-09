import { CalendarDays } from "lucide-react";

export default function BookingHeader({
  isProvider,
  bookingCount,
}: {
  isProvider: boolean;
  bookingCount: number;
}) {
  return (
    <>
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <CalendarDays size={16} />
            {isProvider ? "Manage requests" : "Your services"}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {isProvider ? "Bookings" : "My bookings"}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
            {isProvider
              ? "Review incoming requests and keep up with your scheduled jobs."
              : "See your upcoming appointments and keep track of past services."}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-xl border border-line bg-panel-soft px-3 py-2 text-sm text-[var(--muted)] sm:self-auto">
          <CalendarDays size={16} className="text-primary" />
          <span>{bookingCount} active bookings</span>
        </div>
      </header>
    </>
  );
}
