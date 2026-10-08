import { Bell } from "lucide-react";

type NotificationPreferences = {
  bookingUpdates: boolean;
  messages: boolean;
  promotions: boolean;
};
interface SettingNotificationAppearanceProps {
  updatePreference: (key: keyof NotificationPreferences) => void;
  savePreferences: () => void;
  preferences: NotificationPreferences;
  saved: boolean;
}
export default function SettingNotificationAppearance({
  updatePreference,
  savePreferences,
  preferences,
  saved,
}: SettingNotificationAppearanceProps) {
  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-line bg-[var(--panel)]">
        <div className="flex items-start gap-3 border-b border-line p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-panel-soft text-primary">
            <Bell size={18} />
          </span>
          <div>
            <h2 className="font-semibold">Notification preferences</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Choose which notifications you want NearFix to send.
            </p>
          </div>
        </div>
        <div className="divide-y divide-line px-5">
          {[
            {
              key: "bookingUpdates",
              title: "Booking updates",
              description:
                "Requests, confirmations, changes, and cancellations.",
            },
            {
              key: "messages",
              title: "Messages",
              description: "When a customer or service provider messages you.",
            },
            {
              key: "promotions",
              title: "Tips and offers",
              description: "Occasional product news, tips, and special offers.",
            },
          ].map(({ key, title, description }) => {
            const preferenceKey = key as keyof NotificationPreferences;
            const enabled = preferences[preferenceKey];

            return (
              <div
                key={key}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <h3 className="text-sm font-medium">{title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {description}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  aria-label={title}
                  onClick={() => updatePreference(preferenceKey)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    enabled ? "bg-primary" : "bg-[var(--line)]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      enabled ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line bg-panel-soft px-5 py-3">
          <p aria-live="polite" className="text-sm text-[var(--muted)]">
            {saved ? "Preferences saved on this device." : ""}
          </p>
          <button
            type="button"
            onClick={savePreferences}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            Save preferences
          </button>
        </div>
      </section>
    </>
  );
}
