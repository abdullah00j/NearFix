import EarningsStat from "@/components/common/EarningsStat";
import { CircleDollarSign, Clock3, TrendingUp } from "lucide-react";

type ProviderDashboardStatsCardsProps = {
  totalEstimated: number;
  completedBookings: number;
  thisMonthEstimate: number;
  thisMonthBookings: number;
  pendingEstimate: number;
  pendingBookings: number;
};

export default function ProviderEarningStatsCards({
  totalEstimated,
  completedBookings,
  thisMonthEstimate,
  thisMonthBookings,
  pendingBookings,
  pendingEstimate,
}: ProviderDashboardStatsCardsProps) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <EarningsStat
          label="All-time estimated"
          amount={totalEstimated}
          detail={`Across ${completedBookings} completed bookings`}
          icon={<CircleDollarSign size={18} />}
          tone="teal"
        />
        <EarningsStat
          label="This month"
          amount={thisMonthEstimate}
          detail={`${thisMonthBookings} completed this month`}
          icon={<TrendingUp size={18} />}
          tone="green"
        />
        <EarningsStat
          label="Active booking value"
          amount={pendingEstimate}
          detail={`${pendingBookings} pending or in progress`}
          icon={<Clock3 size={18} />}
          tone="amber"
        />
      </div>
    </>
  );
}
