import { AlertTriangle, LoaderCircle, Trash2, X } from "lucide-react";

type DeleteServiceModalProps = {
  serviceName: string;
  deleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteServiceModal({
  serviceName,
  deleting,
  onClose,
  onConfirm,
}: DeleteServiceModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (!deleting && event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-service-title"
        aria-describedby="delete-service-description"
        className="w-full max-w-md rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-300">
              <AlertTriangle size={21} />
            </span>
            <div>
              <h2
                id="delete-service-title"
                className="text-lg font-semibold text-[var(--text)]"
              >
                Delete service?
              </h2>
              <p
                id="delete-service-description"
                className="mt-2 text-sm leading-6 text-[var(--muted)]"
              >
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[var(--text)]">
                  {serviceName}
                </span>
                ? This action cannot be undone.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            aria-label="Close delete confirmation"
            className="rounded-lg p-2 text-[var(--muted)] transition hover:bg-panel-soft hover:text-[var(--text)] disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-medium transition hover:bg-panel-soft disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            {deleting ? "Deleting..." : "Delete service"}
          </button>
        </div>
      </section>
    </div>
  );
}
