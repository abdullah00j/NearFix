import { formatCurrency, formatProviderDate } from "@/lib/utilFunctions";
import { CircleDollarSign, Info } from "lucide-react";

type ProviderDashboardRecentBookingBooking = {
  id: string;
  providerServiceId: string;
  completedAt?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
};

type ProviderDashboardRecentBookingService = {
  id: string;
  category?: string | null;
  price?: number | null;
};

type ProviderDashboardRecentBookingProps = {
  completedBookingsCount: number;
  loading: boolean;
  hasData: boolean;
  recentCompleted: ProviderDashboardRecentBookingBooking[];
  serviceById: Map<string, ProviderDashboardRecentBookingService>;
  amountForBooking: (providerServiceId: string) => number;
};

function bookingDate(booking: ProviderDashboardRecentBookingBooking) {
  return booking.completedAt ?? booking.updatedAt ?? booking.createdAt ?? "";
}

function ProviderEarningRecentBooking({
  completedBookingsCount,
  loading,
  hasData,
  recentCompleted,
  serviceById,
  amountForBooking,
}: ProviderDashboardRecentBookingProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-4">
        <div>
          <h2 className="font-semibold">Completed bookings</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {completedBookingsCount} recorded completed services
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-lg bg-panel-soft px-2.5 py-1.5 text-xs text-[var(--muted)]">
          <Info size={14} />
          Payment history unavailable
        </span>
      </div>
      {loading && !hasData ? (
        <div className="py-14 text-center text-sm text-[var(--muted)]">
          Loading earnings…
        </div>
      ) : recentCompleted.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-panel-soft text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Completed</th>
                <th className="px-5 py-3 font-medium">Booking</th>
                <th className="px-5 py-3 text-right font-medium">
                  Estimated value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {recentCompleted.map((booking) => {
                const service = serviceById.get(booking.providerServiceId);
                return (
                  <tr key={booking.id}>
                    <td className="px-5 py-3.5 font-medium">
                      {service?.category ?? "Service"}
                    </td>
                    <td className="px-5 py-3.5 text-[var(--muted)]">
                      {formatProviderDate(bookingDate(booking))}
                    </td>
                    <td className="px-5 py-3.5 text-[var(--muted)]">
                      {booking.id.slice(0, 8)}
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold">
                      {formatCurrency(
                        amountForBooking(booking.providerServiceId),
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-5 py-14 text-center">
          <CircleDollarSign size={22} className="mx-auto text-[var(--muted)]" />
          <p className="mt-3 text-sm font-medium">No completed bookings yet</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Your estimated earnings will appear here when you complete a job.
          </p>
        </div>
      )}
    </section>
  );
}

export default ProviderEarningRecentBooking;
