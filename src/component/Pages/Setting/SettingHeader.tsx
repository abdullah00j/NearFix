import { Monitor } from "lucide-react";

export default function SettingHeader() {
  return (
    <>
      <header>
        <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
          <Monitor size={16} />
          Personalize your account
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Choose how NearFix looks and which updates you want to receive.
        </p>
      </header>
    </>
  );
}
