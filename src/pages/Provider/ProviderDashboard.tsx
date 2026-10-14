import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../context/UserContext";
import { useProviderWorkspace } from "./providerData";
import ProviderDashboardHeader from "@/components/Pages/PROVIDER/Dasboard/ProviderDashboardHeader";
import ProviderDashboardStatsCards from "@/components/Pages/PROVIDER/Dasboard/ProviderDashboardStatsCards";
import ProviderDashboardEarningGraph from "@/components/Pages/PROVIDER/Dasboard/ProviderDashboardEarningGraph";

export default function ProviderDashboard() {
  const { currentUser } = useCurrentUser();
  const { data, loading, error, refresh } = useProviderWorkspace();
  const provider = data?.provider;
  const services = data?.services ?? [];
  const bookings = data?.bookings ?? [];
  const reviews = data?.reviews ?? [];
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
