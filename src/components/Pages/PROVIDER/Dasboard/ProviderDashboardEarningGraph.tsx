import { ArrowRight, Clock3 } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import {
  formatCurrency,
  formatProviderDate,
} from "@/pages/Provider/providerData";

type DashboardBooking = {
  id: string;
  providerServiceId: string;
  status?: string | null;
  scheduledAt?: string | null;
  createdAt: string;
};

type DashboardService = {
  id: string;
  category?: string | null;
  price?: number | null;
};

type DashboardChartPoint = {
  month: string;
  revenue: number;
};

export type ProviderDashboardEarningGraphProps = {
  chartData: DashboardChartPoint[];
  recentBookings: DashboardBooking[];
  serviceById: Map<string, DashboardService>;
};

const currencyTooltip = (
  value: string | number | readonly (string | number)[] | undefined,
) => {
  const numericValue = Array.isArray(value)
    ? Number(value[0] ?? 0)
    : Number(value ?? 0);

  return formatCurrency(numericValue);
};

function ProviderDashboardEarningGraph({
  chartData,
  recentBookings,
  serviceById,
}: ProviderDashboardEarningGraphProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--line)] px-5 py-4">
          <div>
            <h2 className="font-semibold">Earnings overview</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Estimated service value by completion month
            </p>
          </div>
          <Link
            to="/provider/earnings"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View earnings <ArrowRight size={15} />
          </Link>
        </div>
        <div className="h-64 px-3 pb-3 pt-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: 0, right: 8, top: 4 }}>
              <defs>
                <linearGradient
                  id="provider-revenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#0f766e" stopOpacity={0.24} />
                  <stop offset="95%" stopColor="#0f766e" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="var(--line)"
                strokeDasharray="4 5"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted)", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={56}
                tick={{ fill: "var(--muted)", fontSize: 11 }}
                tickFormatter={(value: number) => `$${value}`}
              />
              <Tooltip
                formatter={currencyTooltip}
                contentStyle={{
                  borderColor: "var(--line)",
                  borderRadius: "12px",
                  backgroundColor: "var(--panel)",
                  color: "var(--text)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Estimated earnings"
                stroke="#0f766e"
                strokeWidth={2.5}
                fill="url(#provider-revenue)"
                activeDot={{ r: 5, fill: "#0f766e" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="px-5 pb-4 text-xs text-[var(--muted)]">
          Estimates use the current listed service price. Actual payment records
          are not available yet.
        </p>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
        <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <div>
            <h2 className="font-semibold">Recent bookings</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Your latest customer requests
            </p>
          </div>
          <Clock3 size={17} className="text-[var(--muted)]" />
        </div>
        {recentBookings.length ? (
          <div className="divide-y divide-[var(--line)]">
            {recentBookings.map((booking) => {
              const service = serviceById.get(booking.providerServiceId);
              const status = booking.status ?? "PENDING";
              return (
                <div
                  key={booking.id}
                  className="flex items-center justify-between gap-3 px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {service?.category ?? "Service request"}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {formatProviderDate(
                        booking.scheduledAt ?? booking.createdAt,
                      )}
                    </p>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      status === "COMPLETED"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : status === "PENDING"
                          ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                          : status === "CANCELED"
                            ? "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                            : "bg-sky-500/10 text-sky-700 dark:text-sky-300"
                    }`}
                  >
                    {status.replaceAll("_", " ")}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <p className="text-sm font-medium">No bookings yet</p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              New customer requests will appear here.
            </p>
          </div>
        )}
        <Link
          to="/bookings"
          className="flex items-center justify-center gap-2 border-t border-[var(--line)] px-5 py-3 text-sm font-medium text-primary hover:bg-panel-soft"
        >
          Open bookings <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}

export default ProviderDashboardEarningGraph;
