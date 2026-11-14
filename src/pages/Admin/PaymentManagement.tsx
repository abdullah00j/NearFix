import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  DataTable,
  ErrorState,
  Panel,
  RefreshButton,
  StatCard,
  StatusBadge,
} from "@/components/Pages/ADMIN/Shared";
import AdminPageHeader from "@/components/Pages/ADMIN/Shared/AdminPageHeader";
import AdminOverviewSkeleton from "./AdminSkeleton/AdminOverviewSkeleton";
import { formatDate } from "./adminFormat";
import { useAdmin } from "@/context/AdminContext";

const currency = (amount: number) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(amount);

export default function PaymentManagement() {
  const { data, loading, error, refresh } = useAdmin();
  const [search, setSearch] = useState("");

  const serviceById = useMemo(
    () =>
      new Map((data?.services ?? []).map((service) => [service.id, service])),
    [data?.services],
  );
  const userById = useMemo(
    () => new Map((data?.users ?? []).map((user) => [user.id, user])),
    [data?.users],
  );
  const providerById = useMemo(
    () =>
      new Map(
        (data?.providers ?? []).map((provider) => [provider.id, provider]),
      ),
    [data?.providers],
  );
  const bookings = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...(data?.bookings ?? [])]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .filter((booking) => {
        const service = serviceById.get(booking.providerServiceId);
        const customer = userById.get(booking.userId);
        const provider = providerById.get(booking.providerId);
        return [
          booking.id,
          booking.status ?? "PENDING",
          service?.category ?? "",
          customer?.name ?? booking.userId,
          provider?.businessName ?? booking.providerId,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      });
  }, [data?.bookings, providerById, search, serviceById, userById]);

  const completedBookings =
    data?.bookings.filter((booking) => booking.status === "COMPLETED") ?? [];
  const estimatedCompletedTotal = completedBookings.reduce(
    (total, booking) =>
      total + (serviceById.get(booking.providerServiceId)?.price ?? 0),
    0,
  );

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <AdminPageHeader
        title="Payments"
        description="Booking-based payment overview. The current data model does not store payment transactions, so amounts below are service-price estimates."
        action={
          <RefreshButton onClick={() => void refresh()} loading={loading} />
        }
      />

      {error && <ErrorState message={error} />}
      {loading && !data ? (
        <AdminOverviewSkeleton cards={3} showChart={false} />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="Completed bookings"
              value={completedBookings.length}
              detail="Based on booking status"
            />
            <StatCard
              label="Estimated completed value"
              value={currency(estimatedCompletedTotal)}
              detail="Sum of current listed service prices"
            />
            <StatCard
              label="Bookings with a price"
              value={
                data?.bookings.filter((booking) =>
                  serviceById.has(booking.providerServiceId),
                ).length ?? 0
              }
              detail="Price comes from the linked service listing"
            />
          </div>

          <Panel
            title={`Booking payment overview (${data?.bookings.length ?? 0})`}
            action={
              <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2">
                <Search size={15} className="text-[var(--muted)]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search bookings"
                  aria-label="Search bookings"
                  className="w-36 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
                />
              </label>
            }
          >
            <DataTable
              headers={[
                "Booking",
                "Service",
                "Customer",
                "Provider",
                "Estimated amount",
                "Status",
                "Created",
              ]}
              isEmpty={bookings.length === 0}
              emptyMessage="No bookings match your search."
            >
              {bookings.map((booking) => {
                const service = serviceById.get(booking.providerServiceId);
                const user = userById.get(booking.userId);
                const provider = providerById.get(booking.providerId);
                return (
                  <tr key={booking.id}>
                    <td className="px-4 py-3 font-medium">{booking.id}</td>
                    <td className="px-4 py-3">
                      {service?.category ?? "Unknown"}
                    </td>
                    <td className="px-4 py-3">
                      {user?.name ?? booking.userId}
                    </td>
                    <td className="px-4 py-3">
                      {provider?.businessName ?? booking.providerId}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {service ? currency(service.price) : "Unavailable"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={booking.status ?? "PENDING"} />
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      {formatDate(booking.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </DataTable>
          </Panel>
        </>
      )}
    </section>
  );
}
