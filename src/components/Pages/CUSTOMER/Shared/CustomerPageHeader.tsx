import type { ReactNode } from "react";

type CustomerPageHeaderProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  summary: ReactNode;
};

export default function CustomerPageHeader({
  icon,
  eyebrow,
  title,
  description,
  summary,
}: CustomerPageHeaderProps) {
  return (
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
          {icon}
          {eyebrow}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
          {description}
        </p>
      </div>
      {summary}
    </header>
  );
}
