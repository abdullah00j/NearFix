import { AdminChart } from "@/components/common/AdminChart";
import { ErrorState, LoadingState, PageHeader, RefreshButton } from "./AdminUI";
import {
  adminClient,
  nonNullRecords,
  throwModelErrors,
  useAdminData,
} from "./adminData";
import AdminDashboardCards from "@/components/Pages/ADMIN/Dashboard/AdminDashboardCards";
import AdminDashboardRecentBooking from "@/components/Pages/ADMIN/Dashboard/AdminDashboardRecentBooking";

const loadDashboard = async () => {
  const [usersResult, providersResult, bookingsResult, categoriesResult] =
    await Promise.all([
      adminClient.models.NearFixUser.list({ limit: 200 }),
      adminClient.models.NearFixProvider.list({ limit: 200 }),
      adminClient.models.Booking.list({ limit: 200 }),
      adminClient.models.Category.list({ limit: 200 }),
    ]);
  throwModelErrors(usersResult.errors, "Unable to load customers.");
  throwModelErrors(providersResult.errors, "Unable to load providers.");
  throwModelErrors(bookingsResult.errors, "Unable to load bookings.");
  throwModelErrors(categoriesResult.errors, "Unable to load categories.");

  return {
    users: nonNullRecords(usersResult.data),
    providers: nonNullRecords(providersResult.data),
    bookings: nonNullRecords(bookingsResult.data),
    categories: nonNullRecords(categoriesResult.data),
  };
};

export default function AdminDashboard() {
  const { data, loading, error, refresh } = useAdminData(loadDashboard);
  const bookings = [...(data?.bookings ?? [])]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6)
    .map((booking) => ({ ...booking, status: booking.status ?? "PENDING" }));

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <PageHeader
        title="Dashboard"
        description="A live overview of NearFix customers, providers, services, and bookings."
        action={
          <RefreshButton onClick={() => void refresh()} loading={loading} />
        }
      />

      {error && <ErrorState message={error} />}
      {loading && !data ? (
        <LoadingState />
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
