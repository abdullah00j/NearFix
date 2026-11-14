import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProviderDashboardHeader from "@/components/Pages/PROVIDER/Dashboard/ProviderDashboardHeader";
import ProviderDashboardStatsCards from "@/components/Pages/PROVIDER/Dashboard/ProviderDashboardStatsCards";
import ProviderDashboardEarningGraph from "@/components/Pages/PROVIDER/Dashboard/ProviderDashboardEarningGraph";
import { useProvider } from "@/context/ProviderContext";
import { useCurrentUser } from "@/context/UserContext";
import ProviderPageSkeleton from "./ProviderSkeleton/ProviderPageSkeleton";

export default function ProviderDashboard() {
  const { currentProvider, loading, error, refresh } = useProvider();
  const { currentUser } = useCurrentUser();

  const serviceIds = ["demo-plumbing", "demo-electrical", "demo-cleaning"];

  const monthDate = (monthsAgo: number, day: number) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - monthsAgo);
    date.setDate(day);
    return date.toISOString();
  };
  const workspace = {
    services: [
      {
        id: serviceIds[0],
        category: "Plumbing repair",
        price: 85,
        isActive: true,
      },
      {
        id: serviceIds[1],
        category: "Electrical work",
        price: 120,
        isActive: true,
      },
      {
        id: serviceIds[2],
        category: "Home cleaning",
        price: 65,
        isActive: false,
      },
    ],
    bookings: [
      {
        id: "demo-booking-1",
        providerServiceId: serviceIds[0],
        status: "COMPLETED",
        createdAt: monthDate(0, 5),
        completedAt: monthDate(0, 8),
        updatedAt: monthDate(0, 8),
      },
      {
        id: "demo-booking-2",
        providerServiceId: serviceIds[1],
        status: "PENDING",
        createdAt: monthDate(0, 12),
        scheduledAt: monthDate(0, 20),
        updatedAt: monthDate(0, 12),
      },
      {
        id: "demo-booking-3",
        providerServiceId: serviceIds[2],
        status: "COMPLETED",
        createdAt: monthDate(1, 6),
        completedAt: monthDate(1, 9),
        updatedAt: monthDate(1, 9),
      },
      {
        id: "demo-booking-4",
        providerServiceId: serviceIds[0],
        status: "COMPLETED",
        createdAt: monthDate(2, 14),
        completedAt: monthDate(2, 17),
        updatedAt: monthDate(2, 17),
      },
    ],
    reviews: [{ rating: 5 }, { rating: 4 }, { rating: 5 }],
  };
  const provider = currentProvider;
  const services = workspace?.services ?? [];
  const bookings = workspace?.bookings ?? [];
  const reviews = workspace?.reviews ?? [];
  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  );
  const serviceById = new Map(services.map((service) => [service.id, service]));
  const estimatedRevenue = completedBookings.reduce(
    (total, booking) =>
      total + (serviceById.get(booking.providerServiceId)?.price ?? 0),
    0,
  );
  const chartData = Array.from({ length: 6 }, (_, index) => {
    const monthDate = new Date();
    monthDate.setDate(1);
    monthDate.setMonth(monthDate.getMonth() - (5 - index));
    const month = monthDate.getMonth();
    const year = monthDate.getFullYear();
    const revenue = completedBookings.reduce((total, booking) => {
      const completedAt = booking.completedAt ?? booking.updatedAt;
      if (!completedAt) return total;
      const date = new Date(completedAt);
      return date.getMonth() === month && date.getFullYear() === year
        ? total + (serviceById.get(booking.providerServiceId)?.price ?? 0)
        : total;
    }, 0);

    return {
      month: new Intl.DateTimeFormat(undefined, { month: "short" }).format(
        monthDate,
      ),
      revenue,
    };
  });
  const recentBookings = [...bookings]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  if (loading) return <ProviderPageSkeleton />;

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <ProviderDashboardHeader
        currentUserName={currentUser?.name ?? null}
        loading={loading}
        onRefresh={refresh}
      />

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-700 dark:text-rose-300"
        >
          {error}
        </div>
      )}

      {!loading && !error && !provider && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm">
          <p className="font-semibold">
            Your provider profile is not ready yet
          </p>
          <p className="mt-1 text-[var(--muted)]">
            Once your provider profile is approved, you can publish services and
            manage bookings here.
          </p>
        </div>
      )}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f766e] via-[#0f766e] to-[#115e59] p-6 text-white shadow-[0_18px_45px_rgba(15,118,110,0.2)] md:p-8">
        <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full border border-white/10" />
        <div className="absolute -right-1 -top-12 h-48 w-48 rounded-full border border-white/10" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-white/75">
              {provider?.businessName || "Your provider business"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Make every booking count.
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Stay on top of your schedule and keep your service listings up to
              date to help nearby customers find you.
            </p>
            <Link
              to="/provider/service-management"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-white/90"
            >
              Manage services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="min-w-40 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs text-white/70">Profile status</p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
              <span
                className={`h-2 w-2 rounded-full ${
                  provider?.availabilityStatus === "ONLINE"
                    ? "bg-emerald-300"
                    : "bg-amber-300"
                }`}
              />
              {provider?.availabilityStatus?.replaceAll("_", " ") ??
                "Not available"}
            </p>
            <p className="mt-1 text-xs text-white/70">
              {provider?.serviceArea || "Add your service area"}
            </p>
          </div>
        </div>
      </div>

      <ProviderDashboardStatsCards
        bookings={bookings}
        services={services}
        reviews={reviews}
        estimatedRevenue={estimatedRevenue}
      />

      <ProviderDashboardEarningGraph
        chartData={chartData}
        recentBookings={recentBookings}
        serviceById={serviceById}
      />
    </section>
  );
}
