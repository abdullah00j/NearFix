import { FileCheck2, FileText, MapPin, Upload } from "lucide-react";
import { useRef } from "react";

interface BasicDetailProps {
  businessName: string;
  setBusinessName: (value: string) => void;
  setServiceArea: (value: string) => void;
  serviceArea: string;
  setSaved: (value: boolean) => void;
  selfie: File | null;
  handleSelfie: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selfieUploading: boolean;
  selfieUploadError: string | null;
}
export default function BasicDetail({
  businessName,
  setBusinessName,
  serviceArea,
  setServiceArea,
  setSaved,
  selfie,
  handleSelfie,
  selfieUploading,
  selfieUploadError,
}: BasicDetailProps) {
  const documentInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <section className="rounded-2xl border border-line bg-[var(--panel)] p-5 md:p-6">
        <div className="mb-5">
          <h2 className="font-semibold">Business details</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Add the information customers will see on your provider profile.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm font-medium">
            Business or display name
            <input
              required
              maxLength={80}
              value={businessName}
              onChange={(event) => {
                setBusinessName(event.target.value);
                setSaved(false);
              }}
              placeholder="e.g. Jordan's Home Services"
              className="h-11 w-full rounded-xl border border-line bg-[var(--panel)] px-3 font-normal text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-primary"
            />
          </label>

          <label className="space-y-1.5 text-sm font-medium ">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-primary" />
              Service area
            </span>
            <input
              required
              maxLength={120}
              value={serviceArea}
              onChange={(event) => {
                setServiceArea(event.target.value);
                setSaved(false);
              }}
              placeholder="e.g. Brooklyn, Queens, and nearby areas"
              className="h-11 w-full rounded-xl border border-line bg-[var(--panel)] px-3 font-normal text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-primary"
            />
          </label>

          <div className="flex flex-col col-span-2 items-start gap-3 rounded-xl border border-dashed border-line bg-panel-soft/50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <input
                ref={documentInputRef}
                onChange={handleSelfie}
                className="hidden"
                type="file"
                accept="image/jpeg,image/png"
                disabled={selfieUploading}
              />
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--panel)] text-primary">
                {selfie ? <FileCheck2 size={18} /> : <FileText size={18} />}
              </span>
              <div>
                <p className="text-sm font-medium">Upload your selfie</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  JPG or PNG · Maximum 10 MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => documentInputRef.current?.click()}
              disabled={selfieUploading}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-[var(--panel)] px-3 py-2 text-sm font-medium text-primary transition hover:bg-panel-soft"
            >
              <Upload size={15} />
              {selfieUploading
                ? "Uploading..."
                : selfie
                  ? "Choose another"
                  : "Choose file"}
            </button>
          </div>
          {selfieUploading && (
            <p className="text-sm text-[var(--muted)]" role="status">
              Uploading selfie...
            </p>
          )}
          {selfieUploadError && (
            <p className="text-sm text-primary" role="alert">
              {selfieUploadError}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
