import { Check, Monitor, Moon, Sun } from "lucide-react";

interface SettingAppearanceProps {
  theme: "Light" | "Dark" | "System";
  setTheme: (theme: "Light" | "Dark" | "System") => void;
}
export default function SettingthemeAppearance({
  theme,
  setTheme,
}: SettingAppearanceProps) {
  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-line bg-[var(--panel)]">
        <div className="flex items-start gap-3 border-b border-line p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-panel-soft text-primary">
            <Sun size={18} />
          </span>
          <div>
            <h2 className="font-semibold">Appearance</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Select a theme for your NearFix workspace.
            </p>
          </div>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-3">
          {(
            [
              { value: "Light", icon: Sun, detail: "Bright and clear" },
              { value: "Dark", icon: Moon, detail: "Comfortable in low light" },
              { value: "System", icon: Monitor, detail: "Follow your device" },
            ] as const
          ).map(({ value, icon: Icon, detail }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              aria-pressed={theme === value}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                theme === value
                  ? "border-primary bg-panel-soft"
                  : "border-line hover:bg-panel-soft"
              }`}
            >
              <Icon
                size={19}
                className={
                  theme === value ? "text-primary" : "text-[var(--muted)]"
                }
              />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{value}</span>
                <span className="mt-0.5 block text-xs text-[var(--muted)]">
                  {detail}
                </span>
              </span>
              {theme === value && <Check size={16} className="text-primary" />}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
