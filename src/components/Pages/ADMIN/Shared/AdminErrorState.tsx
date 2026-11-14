import { AlertCircle } from "lucide-react";

export default function AdminErrorState({ message }: { message: string }) {
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
