import type { ReactNode } from "react";

type ProviderPageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  action?: ReactNode;
};

export default function ProviderPageHeader({
  eyebrow,
  title,
  description,
  action,
}: ProviderPageHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-primary">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
          {description}
        </p>
      </div>
      {action}
    </header>
  );
}
