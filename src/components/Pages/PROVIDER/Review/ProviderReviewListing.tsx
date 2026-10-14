import { Search, Star } from "lucide-react";
import { formatProviderDate } from "@/pages/Provider/providerData";

type ProviderReviewRecord = {
  id: string;
  rating: number;
  comment?: string | null;
  bookingId: string;
  reviewerId: string;
  createdAt: string;
};

type ProviderReviewListingProps = {
  reviews: ProviderReviewRecord[];
  filteredReviews: ProviderReviewRecord[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  ratingFilter: string;
  setRatingFilter: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  hasData: boolean;
};

function ProviderReviewListing({
  reviews,
  filteredReviews,
  search,
  setSearch,
  ratingFilter,
  setRatingFilter,
  loading,
  hasData,
}: ProviderReviewListingProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-4 md:px-5">
        <div>
          <h2 className="font-semibold">All reviews</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {filteredReviews.length} of {reviews.length} shown
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2">
            <Search size={15} className="text-[var(--muted)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reviews"
              aria-label="Search reviews"
              className="w-32 bg-transparent text-sm outline-none placeholder:text-[var(--muted)] sm:w-40"
            />
          </label>
          <select
            value={ratingFilter}
            onChange={(event) => setRatingFilter(event.target.value)}
            aria-label="Filter by rating"
            className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="ALL">All ratings</option>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} stars
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && !hasData ? (
        <div className="py-14 text-center text-sm text-[var(--muted)]">
          Loading your reviews…
        </div>
      ) : filteredReviews.length ? (
        <div className="divide-y divide-[var(--line)]">
          {filteredReviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col gap-3 px-4 py-5 md:flex-row md:items-start md:justify-between md:px-5"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">Customer review</span>
                  <span className="text-xs text-[var(--muted)]">
                    {formatProviderDate(review.createdAt)}
                  </span>
                </div>
                <div className="mt-2 flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={15}
                      fill={index < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="ml-1 text-xs font-medium text-[var(--text)]">
                    {review.rating}.0
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[var(--muted)]">
                  {review.comment ||
                    "The customer left a rating without a comment."}
                </p>
              </div>
              <span className="shrink-0 rounded-lg bg-panel-soft px-2.5 py-1.5 text-xs text-[var(--muted)]">
                Booking {review.bookingId.slice(0, 8)}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <div className="px-5 py-14 text-center">
          <Star size={22} className="mx-auto text-[var(--muted)]" />
          <p className="mt-3 text-sm font-medium">
            {reviews.length
              ? "No reviews match those filters"
              : "No reviews yet"}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {reviews.length
              ? "Try another search or rating."
              : "Customer feedback will show here after a completed service."}
          </p>
        </div>
      )}
    </section>
  );
}

export default ProviderReviewListing;
