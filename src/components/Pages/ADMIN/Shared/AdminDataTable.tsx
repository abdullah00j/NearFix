import type { ReactNode } from "react";

export default function AdminDataTable({
  headers,
  children,
  emptyMessage = "No records to show.",
  isEmpty = false,
  minWidth = 640,
  tableLayout = "auto",
}: {
  headers: string[];
  children: ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
  minWidth?: number;
  tableLayout?: "auto" | "fixed";
}) {
  return (
    <div className="overflow-x-auto">
      <table
        className="w-full text-left text-sm"
        style={{ minWidth, tableLayout }}
      >
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
