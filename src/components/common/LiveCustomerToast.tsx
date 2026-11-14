import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useCurrentUser } from "@/context/UserContext";
import { useLiveCustomerJoiner } from "@/data/CUSTOMER/CustomerQueries";

export default function LiveCustomerToast() {
  const { currentUser } = useCurrentUser();
  const [fadingNoticeId, setFadingNoticeId] = useState<string | null>(null);
  const { notice, clearNotice } = useLiveCustomerJoiner(currentUser?.id);
  const visible = Boolean(notice && fadingNoticeId !== notice.id);

  useEffect(() => {
    if (!notice) return;

    const fadeTimer = window.setTimeout(
      () => setFadingNoticeId(notice.id),
      4500,
    );
    const removeTimer = window.setTimeout(() => clearNotice(), 5000);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [clearNotice, notice]);

  return (
    <>
      <aside
        aria-live="polite"
        aria-atomic="true"
        className={`fixed bottom-20 right-15 z-[100] w-[min(22rem,calc(100vw-2rem))] text-right text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {notice && (
          <>
            <div className="inline-flex max-w-full items-center gap-2">
              <span className="min-w-0 truncate text-sm font-semibold">
                {notice.name}
              </span>
              <span className="shrink-0 text-sm">joined</span>
              <button
                type="button"
                aria-label="Dismiss customer notification"
                onClick={clearNotice}
                className="shrink-0 text-white/80 transition hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <p className="truncate text-xs text-white/90">{notice.email}</p>
          </>
        )}
      </aside>
    </>
  );
}
