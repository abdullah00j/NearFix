import type { ReactNode } from "react";
import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-primary">NearFix Admin</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

export function RefreshButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-medium transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
      Refresh
    </button>
  );
}

export function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail?: string;
}) {
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-sm">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      {detail && <p className="mt-1 text-xs text-[var(--muted)]">{detail}</p>}
    </article>
  );
}

export function StatusBadge({ status }: { status: string }) {
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

export function Panel({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-3">
        <h2 className="font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function DataTable({
  headers,
  children,
  emptyMessage = "No records to show.",
  isEmpty = false,
}: {
  headers: string[];
  children: ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-panel-soft text-xs uppercase tracking-wide text-[var(--muted)]">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--line)]">
          {isEmpty ? (
            <tr>
              <td
                colSpan={headers.length}
                className="px-4 py-10 text-center text-[var(--muted)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}

export function LoadingState({
  label = "Loading admin data...",
}: {
  label?: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-sm text-[var(--muted)]">
      <LoaderCircle size={18} className="animate-spin" />
      {label}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-700 dark:text-rose-300">
      <AlertCircle size={18} className="mt-0.5 shrink-0" />
      <div>
        <p className="font-semibold">Could not load this page</p>
        <p className="mt-1 break-words">{message}</p>
      </div>
    </div>
  );
}
