import {
  DataTable,
  ErrorState,
  LoadingState,
  PageHeader,
  Panel,
  RefreshButton,
  StatCard,
  StatusBadge,
} from "./AdminUI";
import {
  adminClient,
  nonNullRecords,
  throwModelErrors,
  useAdminData,
} from "./adminData";

const loadReports = async () => {
  const [usersResult, providersResult, bookingsResult, categoriesResult] =
    await Promise.all([
      adminClient.models.NearFixUser.list({ limit: 200 }),
      adminClient.models.NearFixProvider.list({ limit: 200 }),
      adminClient.models.Booking.list({ limit: 200 }),
      adminClient.models.Category.list({ limit: 200 }),
    ]);
  throwModelErrors(usersResult.errors, "Unable to load customer report data.");
  throwModelErrors(
    providersResult.errors,
    "Unable to load provider report data.",
  );
  throwModelErrors(
    bookingsResult.errors,
    "Unable to load booking report data.",
  );
  throwModelErrors(
    categoriesResult.errors,
    "Unable to load category report data.",
  );

  return {
    users: nonNullRecords(usersResult.data),
    providers: nonNullRecords(providersResult.data),
    bookings: nonNullRecords(bookingsResult.data),
    categories: nonNullRecords(categoriesResult.data),
  };
};

export default function Reports() {
  const { data, loading, error, refresh } = useAdminData(loadReports);
  const bookings = data?.bookings ?? [];
  const completed = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  ).length;
  const canceled = bookings.filter(
    (booking) => booking.status === "CANCELED",
  ).length;
  const activeProviders =
    data?.providers.filter(
      (provider) => provider.verificationStatus === "APPROVED",
    ).length ?? 0;
  const bookingStatuses = [
    "PENDING",
    "ACCEPTED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELED",
  ] as const;
  const statusCounts = bookingStatuses.map((status) => ({
    status,
    count: bookings.filter((booking) => booking.status === status).length,
  }));
  const maximumStatusCount = Math.max(
    1,
    ...statusCounts.map(({ count }) => count),
  );

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <PageHeader
        title="Reports"
        description="Current platform totals and booking status breakdown from available NearFix records."
        action={
          <RefreshButton onClick={() => void refresh()} loading={loading} />
        }
      />

      {error && <ErrorState message={error} />}
      {loading && !data ? (
        <LoadingState />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Customers" value={data?.users.length ?? 0} />
            <StatCard
              label="Verified providers"
              value={activeProviders}
              detail={`${data?.providers.length ?? 0} provider profiles`}
            />
            <StatCard label="Total bookings" value={bookings.length} />
            <StatCard
              label="Completion rate"
              value={`${bookings.length ? Math.round((completed / bookings.length) * 100) : 0}%`}
              detail={`${canceled} canceled`}
            />
          </div>

          <Panel title="Booking status breakdown">
            <div className="space-y-4 p-4">
              {statusCounts.map(({ status, count }) => (
                <div
                  key={status}
                  className="grid grid-cols-[100px_1fr_48px] items-center gap-3"
                >
                  <StatusBadge status={status} />
                  <div className="h-2 overflow-hidden rounded-full bg-panel-soft">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${(count / maximumStatusCount) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-right text-sm font-medium">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Platform snapshot">
            <DataTable headers={["Metric", "Current total", "Notes"]}>
              <tr>
                <td className="px-4 py-3 font-medium">Active categories</td>
                <td className="px-4 py-3">
                  {data?.categories.filter((category) => category.isActive)
                    .length ?? 0}
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  Categories available in the catalog
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Pending verification</td>
                <td className="px-4 py-3">
                  {data?.providers.filter(
                    (provider) => provider.verificationStatus === "PENDING",
                  ).length ?? 0}
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  Provider applications requiring review
                </td>
              </tr>
            </DataTable>
          </Panel>
          <p className="text-xs text-[var(--muted)]">
            Reports summarize the latest 200 records returned for each data
            type.
          </p>
        </>
      )}
    </section>
  );
}
