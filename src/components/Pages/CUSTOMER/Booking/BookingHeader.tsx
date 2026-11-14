import { CalendarDays } from "lucide-react";
import CustomerPageHeader from "../Shared/CustomerPageHeader";

export default function BookingHeader({
  isProvider,
  bookingCount,
}: {
  isProvider: boolean;
  bookingCount: number;
}) {
  return (
    <CustomerPageHeader
      icon={<CalendarDays size={16} />}
      eyebrow={isProvider ? "Manage requests" : "Your services"}
      title={isProvider ? "Bookings" : "My bookings"}
      description={
        isProvider
          ? "Review incoming requests and keep up with your scheduled jobs."
          : "See your upcoming appointments and keep track of past services."
      }
      summary={
        <div className="flex items-center gap-2 self-start rounded-xl border border-line bg-panel-soft px-3 py-2 text-sm text-[var(--muted)] sm:self-auto">
          <CalendarDays size={16} className="text-primary" />
          <span>{bookingCount} active bookings</span>
        </div>
      }
    />
  );
}
