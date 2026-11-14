import { AdminChart } from "@/components/common/AdminChart";
import { ErrorState, RefreshButton } from "@/components/Pages/ADMIN/Shared";
import AdminPageHeader from "@/components/Pages/ADMIN/Shared/AdminPageHeader";
import AdminOverviewSkeleton from "./AdminSkeleton/AdminOverviewSkeleton";
import AdminDashboardCards from "@/components/Pages/ADMIN/Dashboard/AdminDashboardCards";
import AdminDashboardRecentBooking from "@/components/Pages/ADMIN/Dashboard/AdminDashboardRecentBooking";
import { useAdmin } from "@/context/AdminContext";

export default function AdminDashboard() {
  const { data, loading, error, refresh } = useAdmin();
  const bookings = [...(data?.bookings ?? [])]
    .filter(
      (
        booking,
      ): booking is typeof booking & {
        userId: string;
        providerId: string;
      } => Boolean(booking.userId && booking.providerId),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6)
    .map((booking) => ({ ...booking, status: booking.status ?? "PENDING" }));

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <AdminPageHeader
        title="Dashboard"
        description="A live overview of NearFix customers, providers, services, and bookings."
        action={
          <RefreshButton onClick={() => void refresh()} loading={loading} />
        }
      />

      {error && <ErrorState message={error} />}
      {loading && !data ? (
        <AdminOverviewSkeleton />
      ) : (
        <>
          <AdminDashboardCards data={data} />
          <div className="h-[360px]">
            <AdminChart />
          </div>
          <AdminDashboardRecentBooking bookings={bookings} />
        </>
      )}
    </section>
  );
}
