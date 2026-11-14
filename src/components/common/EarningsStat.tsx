import { formatCurrency } from "@/lib/utilFunctions";

export default function EarningsStat({
  label,
  amount,
  detail,
  icon,
  tone,
}: {
  label: string;
  amount: number;
  detail: string;
  icon: React.ReactNode;
  tone: "teal" | "green" | "amber";
}) {
  const tones = {
    teal: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
    green: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  };

  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[var(--muted)]">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">
            {formatCurrency(amount)}
          </p>
        </div>
        <span className={`rounded-xl p-2.5 ${tones[tone]}`}>{icon}</span>
      </div>
      <p className="mt-2 text-xs text-[var(--muted)]">{detail}</p>
    </article>
  );
}
