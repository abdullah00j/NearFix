import { Globe2, ChevronDown } from "lucide-react";

interface SettingLanguagePrefrencesProps {
  language: string;
  setLanguage: (language: string) => void;
}

export default function SettingLanguagePrefrences({
  language,
  setLanguage,
}: SettingLanguagePrefrencesProps) {
  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-line bg-[var(--panel)]">
        <div className="flex items-start gap-3 p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-panel-soft text-primary">
            <Globe2 size={18} />
          </span>
          <div className="flex-1">
            <h2 className="font-semibold">Language</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Choose the language used for the interface.
            </p>
          </div>
          <label className="relative">
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label="Interface language"
              className="h-10 appearance-none rounded-xl border border-line bg-[var(--panel)] py-2 pl-3 pr-9 text-sm text-[var(--text)] outline-none focus:border-primary"
            >
              <option>English</option>
              <option disabled>More languages coming soon</option>
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
            />
          </label>
        </div>
      </section>
    </>
  );
}
