import ProviderDashboardHeader from "@/components/Pages/PROVIDER/Earnings/ProviderEarningHeader";
import ProviderDashboardStatsCards from "@/components/Pages/PROVIDER/Earnings/ProviderEarningStatsCards";
import ProviderDashboardEarningChart from "@/components/Pages/PROVIDER/Earnings/ProviderEarningChart";
import ProviderDashboardRecentBooking from "@/components/Pages/PROVIDER/Earnings/ProviderEarningRecentBooking";
import { useProvider } from "@/context/ProviderContext";
import ProviderPageSkeleton from "./ProviderSkeleton/ProviderPageSkeleton";

const bookingDate = (booking: {
  completedAt?: string | null;
  updatedAt: string;
  createdAt: string;
}) => booking.completedAt ?? booking.updatedAt ?? booking.createdAt;

export default function EarningsPage() {
  const { data, loading, error, refresh } = useProvider();
  if (loading && !data) return <ProviderPageSkeleton />;

  const services = data?.services ?? [];
  const completedBookings = (data?.bookings ?? []).filter(
    (booking) => booking.status === "COMPLETED",
  );
  const serviceById = new Map(services.map((service) => [service.id, service]));
  const amountForBooking = (providerServiceId: string) =>
    serviceById.get(providerServiceId)?.price ?? 0;
  const totalEstimated = completedBookings.reduce(
    (total, booking) => total + amountForBooking(booking.providerServiceId),
    0,
  );
  const currentMonth = new Date();
  const thisMonthBookings = completedBookings.filter((booking) => {
    const date = new Date(bookingDate(booking));
    return (
      date.getMonth() === currentMonth.getMonth() &&
      date.getFullYear() === currentMonth.getFullYear()
    );
  });
  const thisMonthEstimate = thisMonthBookings.reduce(
    (total, booking) => total + amountForBooking(booking.providerServiceId),
    0,
  );
  const pendingBookings = (data?.bookings ?? []).filter((booking) =>
    ["PENDING", "ACCEPTED", "IN_PROGRESS"].includes(booking.status ?? ""),
  );
  const pendingEstimate = pendingBookings.reduce(
    (total, booking) => total + amountForBooking(booking.providerServiceId),
    0,
  );
  const chartData = Array.from({ length: 6 }, (_, index) => {
    const monthDate = new Date();
    monthDate.setDate(1);
    monthDate.setMonth(monthDate.getMonth() - (5 - index));
    const month = monthDate.getMonth();
    const year = monthDate.getFullYear();
    const earnings = completedBookings.reduce((total, booking) => {
      const date = new Date(bookingDate(booking));
      return date.getMonth() === month && date.getFullYear() === year
        ? total + amountForBooking(booking.providerServiceId)
        : total;
    }, 0);

    return {
      month: new Intl.DateTimeFormat(undefined, { month: "short" }).format(
        monthDate,
      ),
      earnings,
    };
  });
  const recentCompleted = [...completedBookings]
    .sort((a, b) => bookingDate(b).localeCompare(bookingDate(a)))
    .slice(0, 8);

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <ProviderDashboardHeader loading={loading} refresh={refresh} />

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-700 dark:text-rose-300"
        >
          {error}
        </div>
      )}

      <ProviderDashboardStatsCards
        totalEstimated={totalEstimated}
        completedBookings={completedBookings.length}
        thisMonthEstimate={thisMonthEstimate}
        thisMonthBookings={thisMonthBookings.length}
        pendingEstimate={pendingEstimate}
        pendingBookings={pendingBookings.length}
      />

      <ProviderDashboardEarningChart chartData={chartData} />

      <ProviderDashboardRecentBooking
        completedBookingsCount={completedBookings.length}
        loading={loading}
        hasData={Boolean(data)}
        recentCompleted={recentCompleted}
        serviceById={serviceById}
        amountForBooking={amountForBooking}
      />
    </section>
  );
}
