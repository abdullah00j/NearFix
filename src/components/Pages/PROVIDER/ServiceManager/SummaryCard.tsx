export default function SummaryCard({
  icon,
  title,
  value,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  tone: "teal" | "green" | "amber";
}) {
  const tones = {
    teal: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
    green: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  };

  return (
    <article className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4">
      <div>
        <p className="text-sm text-[var(--muted)]">{title}</p>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
      </div>
      <span className={`rounded-xl p-2.5 ${tones[tone]}`}>{icon}</span>
    </article>
  );
}
