import { useState } from "react";
import { useProviderWorkspace } from "./providerData";
import ProviderReviewHeader from "@/components/Pages/PROVIDER/Review/ProviderReviewHeader";
import ProviderRatingChart from "@/components/Pages/PROVIDER/Review/ProviderRatingChart";
import ProviderReviewListing from "@/components/Pages/PROVIDER/Review/ProviderReviewListing";

export default function ReviewsPage() {
  const { data, loading, error, refresh } = useProviderWorkspace();
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("ALL");
  const reviews = data?.reviews ?? [];
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
    : 0;
  const query = search.trim().toLowerCase();
  const filteredReviews = [...reviews]
    .filter((review) => {
      const matchesRating =
        ratingFilter === "ALL" || review.rating === Number(ratingFilter);
      const matchesSearch =
        !query ||
        [review.comment ?? "", review.bookingId, review.reviewerId]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesRating && matchesSearch;
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <ProviderReviewHeader loading={loading} refresh={refresh} />

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-700 dark:text-rose-300"
        >
          {error}
        </div>
      )}

      <ProviderRatingChart reviews={reviews} averageRating={averageRating} />

      <ProviderReviewListing
        reviews={reviews}
        filteredReviews={filteredReviews}
        search={search}
        setSearch={setSearch}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        loading={loading}
        hasData={Boolean(data)}
      />
    </section>
  );
}
