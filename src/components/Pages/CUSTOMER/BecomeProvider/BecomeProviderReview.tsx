import ReviewItem from "./ReviewItem";

interface BecomeProviderReviewProps {
  legalBusinessName: string;
  cinNumber: string;
  cinDocument: File | null;
  businessName: string;
  experience: string;
  serviceArea: string;
  bio: string;
  services: {
    id: string;
    category: string;
    description: string;
    price: number;
  }[];
}

export default function BecomeProviderReview({
  legalBusinessName,
  cinNumber,
  cinDocument,
  businessName,
  experience,
  bio,
}: BecomeProviderReviewProps) {
  return (
    <>
      <section className="space-y-4 rounded-2xl border border-line bg-[var(--panel)] p-5 md:p-6">
        <div>
          <h2 className="font-semibold">Review your application</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Check the details before saving your local application draft.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ReviewItem label="Business name" value={businessName} />
          <ReviewItem label="Experience" value={`${experience} years`} />

          <ReviewItem label="Legal business name" value={legalBusinessName} />
          <ReviewItem label="CIN" value={cinNumber} />
          <ReviewItem
            label="Verification document"
            value={cinDocument?.name ?? "No document selected"}
          />
          <div className="rounded-xl border border-line bg-panel-soft/50 p-4 sm:col-span-2">
            <p className="text-xs font-medium text-[var(--muted)]">
              About your business
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm">{bio}</p>
          </div>
        </div>

        <p className="rounded-xl bg-panel-soft p-3 text-sm leading-5 text-[var(--muted)]">
          Demo only: the application and CIN document are not uploaded or saved.
          Only non-sensitive business and service details are saved locally.
          This does not change your account role.
        </p>
      </section>
    </>
  );
}
