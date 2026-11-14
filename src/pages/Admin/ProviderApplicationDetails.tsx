import {
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  MapPin,
  ShieldCheck,
  User,
  XCircle,
  BriefcaseBusiness,
  ExternalLink,
  Hash,
} from "lucide-react";
import { useAdminDocumentUrl } from "@/data/ADMIN/AdminQueries";
import type { ProviderApplication } from "@/data/ADMIN/AdminTypes";

export type { ProviderApplication } from "@/data/ADMIN/AdminTypes";

type Props = {
  application: ProviderApplication;
  onApprove?: (applicationId: string) => void;
  onReject?: (applicationId: string) => void;
};

const formatDate = (value?: string | null) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const StatusBadge = ({ status }: { status: string }) => {
  const normalized = status.toUpperCase();

  const styles: Record<string, string> = {
    PENDING:
      "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300",
    APPROVED:
      "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300",
    REJECTED:
      "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-300",
    CHANGE_REQUESTED:
      "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-300",
  };

  const icons: Record<string, React.ReactNode> = {
    PENDING: <Clock size={14} />,
    APPROVED: <CheckCircle2 size={14} />,
    REJECTED: <XCircle size={14} />,
    CHANGE_REQUESTED: <FileText size={14} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
        styles[normalized] ??
        "bg-[var(--color-panel-soft)] text-[var(--text)] ring-[var(--line)]"
      }`}
    >
      {icons[normalized]}
      {normalized.replaceAll("_", " ")}
    </span>
  );
};

const Detail = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="min-w-0 space-y-1">
    <p className="text-xs font-medium text-[var(--muted)]">{label}</p>
    <p className="break-words text-sm font-medium text-[var(--text)]">
      {value || "Not provided"}
    </p>
  </div>
);

const DocumentCard = ({
  title,
  path,
}: {
  title: string;
  path?: string | null;
}) => {
  const documentQuery = useAdminDocumentUrl(path);

  if (!path) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--line)] p-4">
        <p className="text-sm font-medium text-[var(--text)]">{title}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Document not provided
        </p>
      </div>
    );
  }

  if (documentQuery.error) {
    return (
      <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
        <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
          {title}
        </p>
        <p className="mt-2 text-sm text-rose-700 dark:text-rose-300">
          {documentQuery.error instanceof Error
            ? documentQuery.error.message
            : "Unable to load document."}
        </p>
      </div>
    );
  }

  if (!documentQuery.data) {
    return (
      <div className="rounded-xl border border-[var(--line)] p-4">
        <p className="text-sm font-medium text-[var(--text)]">{title}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {documentQuery.isLoading
            ? "Loading document..."
            : "Unable to load document."}
        </p>
      </div>
    );
  }

  const url = documentQuery.data;
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)]">
      <a href={url} target="_blank" rel="noreferrer" className="group block">
        {/\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(path) ? (
          <img
            src={url}
            alt={title}
            className="h-48 w-full bg-[var(--color-panel-soft)] object-contain transition group-hover:opacity-90"
          />
        ) : (
          <div className="flex h-48 flex-col items-center justify-center gap-3 bg-[var(--color-panel-soft)] text-[var(--muted)]">
            <FileText size={36} />
            <span className="text-sm">Open document</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-[var(--line)] p-3">
          <span className="text-sm font-medium text-[var(--text)]">
            {title}
          </span>
          <ExternalLink size={16} className="shrink-0 text-[var(--muted)]" />
        </div>
      </a>
    </div>
  );
};

export default function ProviderApplicationDetails({
  application,
  onApprove,
  onReject,
}: Props) {
  const applicant = application.users;
  const canReview = application.applicationStatus.toUpperCase() === "PENDING";

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-[var(--text)]">
      {/* Header */}
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            {applicant?.profileImage ? (
              <img
                src={applicant.profileImage}
                alt={applicant.name || "Applicant"}
                className="h-16 w-16 shrink-0 rounded-full border border-[var(--line)] object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-panel-soft)]">
                <User size={28} className="text-[var(--muted)]" />
              </div>
            )}

            <div className="min-w-0">
              <h1 className="text-xl font-bold sm:text-2xl">
                {applicant?.name ||
                  application.CNICNAME ||
                  "Provider applicant"}
              </h1>
              <p className="mt-1 break-all text-sm text-[var(--muted)]">
                {applicant?.email || "No email available"}
              </p>
              <div className="mt-3">
                <StatusBadge status={application.applicationStatus} />
              </div>
            </div>
          </div>

          {canReview && (onApprove || onReject) && (
            <div className="flex shrink-0 gap-3">
              {onReject && (
                <button
                  type="button"
                  onClick={() => onReject(application.id)}
                  className="rounded-lg border border-rose-500/30 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-500/10 dark:text-rose-300"
                >
                  Reject
                </button>
              )}

              {onApprove && (
                <button
                  type="button"
                  onClick={() => onApprove(application.id)}
                  className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
                >
                  Approve
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-4 border-t border-[var(--line)] pt-5 sm:grid-cols-2 lg:grid-cols-3">
          <Detail label="Application ID" value={application.id} />
          <Detail label="User ID" value={application.userId} />
          <Detail label="Record owner" value={application.owner} />
        </div>
      </section>

      {/* Business details */}
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5 text-primary dark:text-teal-300">
            <BriefcaseBusiness size={20} />
          </div>
          <div>
            <h2 className="font-semibold">Business information</h2>
            <p className="text-sm text-[var(--muted)]">
              Applicant's service and business details
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Detail
            label="Business name / service"
            value={application.businessName}
          />

          <div className="flex items-start gap-2">
            <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--muted)]" />
            <div>
              <p className="text-xs font-medium text-[var(--muted)]">
                Service area
              </p>
              <p className="mt-1 text-sm font-medium">
                {application.serviceArea}
              </p>
            </div>
          </div>

          <Detail label="CNIC name" value={application.CNICNAME} />
          <Detail label="CNIC number" value={application.CNICNumber} />
        </div>
      </section>

      {/* Applicant details */}
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-700 dark:text-blue-300">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="font-semibold">Applicant verification</h2>
            <p className="text-sm text-[var(--muted)]">
              Identity and submitted verification documents
            </p>
          </div>
        </div>

        <div className="mb-5 grid gap-5 sm:grid-cols-2">
          <Detail label="Applicant name" value={applicant?.name} />
          <div className="flex items-start gap-2">
            <Mail size={17} className="mt-0.5 shrink-0 text-[var(--muted)]" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-[var(--muted)]">
                Email address
              </p>
              <p className="mt-1 break-all text-sm font-medium">
                {applicant?.email || "Not available"}
              </p>
            </div>
          </div>
          <Detail label="CNIC name" value={application.CNICNAME} />
          <Detail label="CNIC number" value={application.CNICNumber} />
        </div>

        <h3 className="mb-3 text-sm font-semibold text-[var(--text)]">
          Submitted documents
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DocumentCard title="Applicant selfie" path={application.selfie} />
          <DocumentCard
            title="CNIC front side"
            path={application.CNICFrontSide}
          />
          <DocumentCard
            title="CNIC back side"
            path={application.CNICBackSide}
          />
        </div>
      </section>

      {/* Record timestamps */}
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-[var(--color-panel-soft)] p-2.5 text-[var(--muted)]">
            <CalendarDays size={20} />
          </div>
          <h2 className="font-semibold">Application timeline</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Clock size={18} className="mt-0.5 text-[var(--muted)]" />
            <div>
              <p className="text-xs font-medium text-[var(--muted)]">
                Submitted at
              </p>
              <p className="mt-1 text-sm font-medium">
                {formatDate(application.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Hash size={18} className="mt-0.5 text-[var(--muted)]" />
            <div>
              <p className="text-xs font-medium text-[var(--muted)]">
                Last updated
              </p>
              <p className="mt-1 text-sm font-medium">
                {formatDate(application.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
