import { formatDate } from "@/pages/Admin/adminFormat";
import { DataTable, Panel, StatusBadge } from "@/pages/Admin/AdminUI";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminDashboardRecentBookingProps {
  bookings: {
    id: string;
    userId: string;
    providerId: string;
    status: string;
    createdAt: string;
  }[];
}

export default function AdminDashboardRecentBooking({
  bookings,
}: AdminDashboardRecentBookingProps) {
  return (
    <>
      <Panel
        title="Recent bookings"
        action={
          <Link
            to="/admin/payments"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View payment overview <ArrowRight size={14} />
          </Link>
        }
      >
        <DataTable
          headers={["Booking", "Customer", "Provider", "Status", "Created"]}
          isEmpty={bookings.length === 0}
          emptyMessage="No bookings have been recorded yet."
        >
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-4 py-3 font-medium">{booking.id}</td>
              <td className="px-4 py-3 text-[var(--muted)]">
                {booking.userId}
              </td>
              <td className="px-4 py-3 text-[var(--muted)]">
                {booking.providerId}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={booking.status ?? "PENDING"} />
              </td>
              <td className="px-4 py-3 text-[var(--muted)]">
                {formatDate(booking.createdAt)}
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </>
  );
}
