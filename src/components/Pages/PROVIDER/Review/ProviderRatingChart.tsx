import { MessageSquareText, Star } from "lucide-react";

type ProviderReviewSummary = {
  id: string;
  rating: number;
  comment?: string | null;
  bookingId: string;
  reviewerId: string;
  createdAt: string;
};

type ProviderRatingChartProps = {
  reviews: ProviderReviewSummary[];
  averageRating: number;
};

function ProviderRatingChart({
  reviews,
  averageRating,
}: ProviderRatingChartProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.4fr]">
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5">
        <p className="text-sm font-medium text-[var(--muted)]">
          Overall rating
        </p>
        <div className="mt-3 flex items-end gap-3">
          <span className="text-5xl font-semibold tracking-tight">
            {reviews.length ? averageRating.toFixed(1) : "—"}
          </span>
          <div className="pb-1">
            <div className="flex gap-0.5 text-amber-500">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={17}
                  fill={
                    index < Math.round(averageRating) ? "currentColor" : "none"
                  }
                  className={
                    index < Math.round(averageRating)
                      ? "text-amber-500"
                      : "text-[var(--line)]"
                  }
                />
              ))}
            </div>
            <p className="mt-1 text-xs text-[var(--muted)]">
              {reviews.length} customer{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-2.5">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter(
              (review) => review.rating === rating,
            ).length;
            const percentage = reviews.length
              ? (count / reviews.length) * 100
              : 0;
            return (
              <div
                key={rating}
                className="grid grid-cols-[28px_1fr_28px] items-center gap-2 text-xs"
              >
                <span className="text-[var(--muted)]">{rating} star</span>
                <div className="h-2 overflow-hidden rounded-full bg-panel-soft">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-right text-[var(--muted)]">{count}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-gradient-to-br from-panel-soft to-[var(--panel)] p-6 md:p-7">
        <div className="flex h-full flex-col justify-between gap-6">
          <div>
            <span className="inline-flex rounded-xl bg-primary/10 p-2.5 text-primary">
              <MessageSquareText size={20} />
            </span>
            <h2 className="mt-4 text-xl font-semibold">
              Every review helps you grow
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-[var(--muted)]">
              Great service builds trust with your next customer. Keep
              delivering reliable work and use feedback to spot what you can
              improve.
            </p>
          </div>
          <p className="text-sm font-medium text-primary">
            {reviews.length
              ? `${reviews.filter((review) => review.rating >= 4).length} of ${reviews.length} customers gave you 4 or 5 stars`
              : "Your first customer review will appear here"}
          </p>
        </div>
      </section>
    </div>
  );
}

export default ProviderRatingChart;
