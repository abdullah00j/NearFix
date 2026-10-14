import { BadgeCheck, FileCheck2, FileText, Upload } from "lucide-react";
import { useRef } from "react";

interface CnicVerficationProps {
  legalBusinessName: string;
  setLegalBusinessName: (name: string) => void;
  cinNumber: string;
  setCinNumber: (cin: string) => void;
  cninDocumentFrontSide: File | null;
  cnicDocumentBackSide: File | null;
  documentInputRef: React.RefObject<HTMLInputElement | null>;
  handleDocumentFrontSide: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDocumentBackSide: (event: React.ChangeEvent<HTMLInputElement>) => void;
  documentError: string | null;
  frontDocumentUploading: boolean;
  backDocumentUploading: boolean;
  frontDocumentUploadError: string | null;
  backDocumentUploadError: string | null;
  documentUploadDisabled: boolean;
  saved: boolean;
  setSaved: (saved: boolean) => void;
}

export default function CnicVerfication({
  legalBusinessName,
  setLegalBusinessName,
  cinNumber,
  setCinNumber,
  cnicDocumentBackSide,
  cninDocumentFrontSide,
  documentInputRef,
  handleDocumentFrontSide,
  handleDocumentBackSide,
  documentError,
  frontDocumentUploading,
  backDocumentUploading,
  frontDocumentUploadError,
  backDocumentUploadError,
  documentUploadDisabled,

  setSaved,
}: CnicVerficationProps) {
  const documentInputRef2 = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <section className="rounded-2xl border border-line bg-[var(--panel)] p-5 md:p-6">
        <div className="mb-5 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-panel-soft text-primary">
            <BadgeCheck size={19} />
          </span>
          <div>
            <h2 className="font-semibold">CIN verification</h2>
            <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
              Add your Corporate Identification Number and a supporting document
              for verification.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm font-medium">
            Name on CNIC
            <input
              required
              maxLength={120}
              value={legalBusinessName}
              onChange={(event) => {
                setLegalBusinessName(event.target.value);
                setSaved(false);
              }}
              placeholder="Name registered on your CIN"
              className="h-11 w-full rounded-xl border border-line bg-[var(--panel)] px-3 font-normal text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-primary"
            />
          </label>
          <label className="space-y-1.5 text-sm font-medium">
            CNIC Number
            <input
              required
              minLength={5}
              maxLength={32}
              value={cinNumber}
              onChange={(event) => {
                setCinNumber(event.target.value.toUpperCase());
                setSaved(false);
              }}
              placeholder="Enter your CNIC No."
              className="h-11 w-full rounded-xl border border-line bg-[var(--panel)] px-3 font-normal text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-primary"
            />
          </label>
          <div className="space-y-2 sm:col-span-2">
            <span className="block text-sm font-medium">CNIC Document</span>
            <input
              ref={documentInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              className="hidden"
              onChange={handleDocumentFrontSide}
              disabled={documentUploadDisabled}
            />
            <input
              ref={documentInputRef2}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              className="hidden"
              onChange={handleDocumentBackSide}
              disabled={documentUploadDisabled}
            />

            <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-line bg-panel-soft/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--panel)] text-primary">
                  {cninDocumentFrontSide ? (
                    <FileCheck2 size={18} />
                  ) : (
                    <FileText size={18} />
                  )}
                </span>
                <div>
                  <p className="text-sm font-medium">
                    {cninDocumentFrontSide?.name ??
                      "Upload a Front side of  CNIC"}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    PDF, JPG, or PNG · Maximum 10 MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => documentInputRef.current?.click()}
                disabled={documentUploadDisabled}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-[var(--panel)] px-3 py-2 text-sm font-medium text-primary transition hover:bg-panel-soft"
              >
                <Upload size={15} />
                {frontDocumentUploading
                  ? "Uploading..."
                  : cninDocumentFrontSide
                    ? "Choose another"
                    : "Choose file"}
              </button>
            </div>
            {frontDocumentUploading && (
              <p className="text-sm text-[var(--muted)]" role="status">
                Uploading front side...
              </p>
            )}
            {frontDocumentUploadError && (
              <p className="text-sm text-primary" role="alert">
                {frontDocumentUploadError}
              </p>
            )}

            <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-line bg-panel-soft/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--panel)] text-primary">
                  {cnicDocumentBackSide ? (
                    <FileCheck2 size={18} />
                  ) : (
                    <FileText size={18} />
                  )}
                </span>
                <div>
                  <p className="text-sm font-medium">
                    {cnicDocumentBackSide?.name ??
                      "Upload a Back side of  CNIC"}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    PDF, JPG, or PNG · Maximum 10 MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => documentInputRef2.current?.click()}
                disabled={documentUploadDisabled}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-[var(--panel)] px-3 py-2 text-sm font-medium text-primary transition hover:bg-panel-soft"
              >
                <Upload size={15} />
                {backDocumentUploading
                  ? "Uploading..."
                  : cnicDocumentBackSide
                    ? "Choose another"
                    : "Choose file"}
              </button>
            </div>
            {backDocumentUploading && (
              <p className="text-sm text-[var(--muted)]" role="status">
                Uploading back side...
              </p>
            )}
            {backDocumentUploadError && (
              <p className="text-sm text-primary" role="alert">
                {backDocumentUploadError}
              </p>
            )}

            {documentError && (
              <p className="text-sm text-primary" role="alert">
                {documentError}
              </p>
            )}
            {!cninDocumentFrontSide && !documentError && (
              <p className="text-xs text-[var(--muted)]">
                A document is required to continue. In this prototype, the file
                itself is not uploaded.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
