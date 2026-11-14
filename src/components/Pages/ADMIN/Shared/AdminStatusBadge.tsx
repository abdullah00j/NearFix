export default function AdminStatusBadge({ status }: { status: string }) {
  const positive = ["ACTIVE", "APPROVED", "COMPLETED", "RESOLVED"].includes(
    status.toUpperCase(),
  );
  const waiting = ["PENDING", "IN_REVIEW", "WARNED", "IN_PROGRESS"].includes(
    status.toUpperCase(),
  );
  const tone = positive
    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
    : waiting
      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
      : "bg-rose-500/10 text-rose-700 dark:text-rose-300";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
