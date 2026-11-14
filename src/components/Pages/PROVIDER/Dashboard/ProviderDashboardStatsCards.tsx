import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  CalendarCheck2,
  CircleDollarSign,
  Star,
} from "lucide-react";
import { formatCurrency } from "@/lib/utilFunctions";

type DashboardBooking = {
  status?: string | null;
};

type DashboardReview = {
  rating: number;
};

type DashboardService = {
  id: string;
  isActive?: boolean | null;
};

export type ProviderDashboardStatsCardsProps = {
  bookings: DashboardBooking[];
  services: DashboardService[];
  reviews: DashboardReview[];
  estimatedRevenue: number;
};

function StatCard({
  icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  detail: string;
  tone: "teal" | "green" | "amber" | "blue";
}) {
  const tones = {
    teal: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
    green: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    blue: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  };

  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[var(--muted)]">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <span className={`rounded-xl p-2.5 ${tones[tone]}`}>{icon}</span>
      </div>
      <p className="mt-2 text-xs text-[var(--muted)]">{detail}</p>
    </article>
  );
}

function ProviderDashboardStatsCards({
  bookings,
  services,
  reviews,
  estimatedRevenue,
}: ProviderDashboardStatsCardsProps) {
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
    : 0;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={<CalendarCheck2 size={17} />}
        label="Total bookings"
        value={bookings.length}
        detail={`${bookings.filter((booking) => booking.status === "PENDING").length} need your attention`}
        tone="teal"
      />
      <StatCard
        icon={<CircleDollarSign size={17} />}
        label="Estimated earnings"
        value={formatCurrency(estimatedRevenue)}
        detail="From completed bookings"
        tone="green"
      />
      <StatCard
        icon={<Star size={17} />}
        label="Average rating"
        value={reviews.length ? averageRating.toFixed(1) : "—"}
        detail={`${reviews.length} customer reviews`}
        tone="amber"
      />
      <StatCard
        icon={<BriefcaseBusiness size={17} />}
        label="Active services"
        value={services.filter((service) => service.isActive).length}
        detail={`${services.length} total listings`}
        tone="blue"
      />
    </div>
  );
}

export default ProviderDashboardStatsCards;
