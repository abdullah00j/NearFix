import { StatCard } from "@/pages/Admin/AdminUI";
import type { AdminDashboardData } from "@/pages/Admin/adminData";

interface AdminDashboardCardsProps {
  data: AdminDashboardData | null;
}
export default function AdminDashboardCards({
  data,
}: AdminDashboardCardsProps) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Customers" value={data?.users.length ?? 0} />
        <StatCard
          label="Providers"
          value={data?.providers.length ?? 0}
          detail={`${data?.providers.filter((provider) => provider.verificationStatus === "PENDING").length ?? 0} awaiting verification`}
        />
        <StatCard label="Bookings" value={data?.bookings.length ?? 0} />
        <StatCard
          label="Service categories"
          value={
            data?.categories.filter((category) => category.isActive).length ?? 0
          }
          detail={`${data?.categories.length ?? 0} total categories`}
        />
      </div>
    </>
  );
}
