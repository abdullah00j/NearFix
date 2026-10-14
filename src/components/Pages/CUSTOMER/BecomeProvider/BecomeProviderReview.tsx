import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";

interface BecomeProviderReviewProps {
  legalBusinessName: string;
  cinNumber: string;
  selfie: File | null;
  cninDocumentFrontSide: File | null;
  cnicDocumentBackSide: File | null;
  businessName: string;
  serviceArea: string;
}

function AttachmentPreview({
  label,
  file,
}: {
  label: string;
  file: File | null;
}) {
  const [preview, setPreview] = useState<{ file: File; url: string } | null>(
    null,
  );

  useEffect(() => {
    if (!file?.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview({ file, url: reader.result });
      }
    };
    reader.readAsDataURL(file);
    return () => reader.abort();
  }, [file]);
  const previewUrl = preview?.file === file ? preview.url : "";

  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-line bg-[var(--panel)] p-3">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-panel-soft">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={`${label} preview`}
            className="h-full w-full object-cover"
          />
        ) : (
          <FileText size={26} className="text-primary" aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p
          className="mt-1 truncate text-xs text-[var(--muted)]"
          title={file?.name}
        >
          {file?.name ?? "No file selected"}
        </p>
        {file && (
          <p className="mt-1 text-xs text-[var(--muted)]">
            {file.type.startsWith("image/") ? "Image" : "PDF"} ·{" "}
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        )}
      </div>
    </div>
  );
}

export default function BecomeProviderReview({
  legalBusinessName,
  cinNumber,
  selfie,
  cninDocumentFrontSide,
  cnicDocumentBackSide,
  businessName,
  serviceArea,
}: BecomeProviderReviewProps) {
  return (
    <section className="space-y-5 rounded-2xl border border-line bg-[var(--panel)] p-5 md:p-6">
      <div>
        <h2 className="font-semibold">Review your application</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Check the details and files before saving your local application
          draft.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ReviewItem label="Business name" value={businessName} />
        <ReviewItem label="Service area" value={serviceArea} />
        <ReviewItem label="Name on CNIC" value={legalBusinessName} />
        <ReviewItem label="CIN" value={cinNumber} />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Uploaded files</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <AttachmentPreview label="Selfie" file={selfie} />
          <AttachmentPreview
            label="CNIC front side"
            file={cninDocumentFrontSide}
          />
          <AttachmentPreview
            label="CNIC back side"
            file={cnicDocumentBackSide}
          />
        </div>
      </div>
    </section>
  );
}
