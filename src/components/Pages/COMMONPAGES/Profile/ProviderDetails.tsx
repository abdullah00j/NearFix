import { useProvider } from "@/context/ProviderContext";
import { ExternalLink } from "lucide-react";
import { useProviderDocumentUrl } from "@/data/PROVIDER/ProviderQueries";

type ProviderRecord = NonNullable<
  ReturnType<typeof useProvider>["currentProvider"]
>;

function ProviderDetails({
  provider,
  loading,
  error,
}: {
  provider: ProviderRecord | null;
  loading: boolean;
  error: string | null;
}) {
  return (
    <section className="mt-10 border-t border-slate-200 pt-10 dark:border-[#303030]">
      <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">
        Provider details
      </h2>
      {loading ? (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Loading provider details…
        </p>
      ) : error ? (
        <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : !provider ? (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          No provider profile was found.
        </p>
      ) : (
        <>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ProviderDetail
              label="Business name"
              value={provider.businessName}
            />
            <ProviderDetail
              label="Availability"
              value={provider.availabilityStatus}
            />
            <ProviderDetail
              label="Verification status"
              value={provider.verificationStatus}
            />
            <ProviderDetail label="Service area" value={provider.serviceArea} />
            <ProviderDetail label="Experience" value={provider.experience} />
            <ProviderDetail label="CNIC name" value={provider.CNICNAME} />
            <ProviderDetail label="CNIC number" value={provider.CNICNumber} />
            <ProviderDetail label="Bio" value={provider.bio} />
            <ProviderDetail
              label="Created"
              value={formatDate(provider.createdAt)}
            />
            <ProviderDetail
              label="Last updated"
              value={formatDate(provider.updatedAt)}
            />
          </dl>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ProviderDocument label="Selfie" path={provider.selfie} />
            <ProviderDocument
              label="CNIC front side"
              path={provider.CNICFrontSide}
            />
            <ProviderDocument
              label="CNIC back side"
              path={provider.CNICBackSide}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default ProviderDetails;

const ProviderDetail = ({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) => (
  <div>
    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
      {label}
    </dt>
    <dd className="mt-1 whitespace-pre-wrap text-sm text-slate-900 dark:text-slate-100">
      {value?.trim() || "—"}
    </dd>
  </div>
);

const ProviderDocument = ({
  label,
  path,
}: {
  label: string;
  path: string | null | undefined;
}) => {
  const documentQuery = useProviderDocumentUrl(path);

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-200">
        {label}
      </p>
      {documentQuery.error ? (
        <p role="status" className="text-sm text-red-600 dark:text-red-400">
          {documentQuery.error instanceof Error
            ? documentQuery.error.message
            : "Unable to load this document."}
        </p>
      ) : documentQuery.data ? (
        <a
          href={documentQuery.data}
          target="_blank"
          rel="noreferrer"
          className="group block overflow-hidden rounded-lg border border-slate-200 dark:border-[#303030]"
        >
          <img
            src={documentQuery.data}
            alt={label}
            className="h-48 w-full bg-slate-50 object-contain transition group-hover:opacity-90 dark:bg-[#1b1b1b]"
          />
          <span className="flex items-center justify-between border-t border-slate-200 px-3 py-2 text-sm dark:border-[#303030]">
            Open document <ExternalLink size={15} />
          </span>
        </a>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {path && documentQuery.isLoading ? "Loading document…" : "—"}
        </p>
      )}
    </div>
  );
};

const formatDate = (value: string | null | undefined) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
};
