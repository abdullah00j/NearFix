import { FileCheck2, MapPin, Upload } from "lucide-react";

interface BasicDetailProps {
  businessName: string;
  setBusinessName: (value: string) => void;
  setServiceArea: (value: string) => void;
  serviceArea: string;
  setSaved: (value: boolean) => void;
}
export default function BasicDetail({
  businessName,
  setBusinessName,
  serviceArea,
  setServiceArea,
  setSaved,
}: BasicDetailProps) {
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
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--panel)] text-primary">
                <FileCheck2 size={18} />
                {/* {cinDocument ? (
                              ) : (
                                <FileText size={18} />
                              )} */}
              </span>
              <div>
                <p className="text-sm font-medium">
                  Upload your selfie
                  {/* {cinDocument?.name ?? "Upload a Back side of  CNIC"} */}
                </p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  PDF, JPG, or PNG · Maximum 10 MB
                </p>
              </div>
            </div>
            <button
              type="button"
              // onClick={() => documentInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-[var(--panel)] px-3 py-2 text-sm font-medium text-primary transition hover:bg-panel-soft"
            >
              <Upload size={15} />
              Choose file
              {/* {cinDocument ? "Choose another" : "Choose file"} */}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
