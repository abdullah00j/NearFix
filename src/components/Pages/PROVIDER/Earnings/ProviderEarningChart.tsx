import { formatCurrency } from "@/pages/Provider/providerData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ProviderEarningChart({
  chartData,
}: {
  chartData: { month: string; earnings: number }[];
}) {
  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--line)] px-5 py-4">
          <div>
            <h2 className="font-semibold">Earnings over time</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Estimated booking value for the last six months
            </p>
          </div>
          <span className="rounded-lg bg-panel-soft px-2.5 py-1.5 text-xs text-[var(--muted)]">
            USD · Estimated
          </span>
        </div>
        <div className="h-72 px-3 pb-4 pt-5 md:px-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: 0, right: 8, top: 4 }}>
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
                formatter={(value) => formatCurrency(Number(value ?? 0))}
                contentStyle={{
                  borderColor: "var(--line)",
                  borderRadius: "12px",
                  backgroundColor: "var(--panel)",
                  color: "var(--text)",
                }}
              />
              <Bar
                dataKey="earnings"
                name="Estimated earnings"
                fill="#0f766e"
                radius={[6, 6, 0, 0]}
                maxBarSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="border-t border-[var(--line)] px-5 py-3 text-xs leading-5 text-[var(--muted)]">
          Estimates multiply completed bookings by each service’s current
          listing price. The app does not yet store payment, payout, or
          historical price records, so these are not confirmed payouts.
        </p>
      </section>
    </>
  );
}

export default ProviderEarningChart;
