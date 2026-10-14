import { CalendarDays, Check, Clock3 } from "lucide-react";

interface BookingCardsProps {
  pendingCount: number;
  confirmedCount: number;
  inProgressCount: number;
  isProvider: boolean;
}

export default function BookingCards({
  pendingCount,
  confirmedCount,
  inProgressCount,
  isProvider,
}: BookingCardsProps) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            label: isProvider ? "New requests" : "Awaiting confirmation",
            value: pendingCount,
            icon: Clock3,
          },
          { label: "Confirmed", value: confirmedCount, icon: Check },
          { label: "In progress", value: inProgressCount, icon: CalendarDays },
        ].map(({ label, value, icon: Icon }) => (
          <article
            key={label}
            className="flex items-center justify-between rounded-2xl border border-line bg-[var(--panel)] p-4 shadow-[var(--shadow)]"
          >
            <div>
              <p className="text-sm text-[var(--muted)]">{label}</p>
              <p className="mt-1 text-2xl font-semibold">{value}</p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-panel-soft text-primary">
              <Icon size={20} />
            </span>
          </article>
        ))}
      </div>
    </>
  );
}
