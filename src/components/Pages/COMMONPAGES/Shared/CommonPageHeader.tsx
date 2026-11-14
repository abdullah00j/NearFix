import type { ReactNode } from "react";

type CommonPageHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
  icon?: ReactNode;
  action?: ReactNode;
  alignment?: "left" | "center";
  titleStyle?: "default" | "prominent";
};

export default function CommonPageHeader({
  title,
  description,
  eyebrow,
  icon,
  action,
  alignment = "left",
  titleStyle = "default",
}: CommonPageHeaderProps) {
  const centered = alignment === "center";

  return (
    <header
      className={
        centered
          ? "mb-8 text-center"
          : "flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
      }
    >
      <div className={centered ? "mx-auto" : undefined}>
        {icon && !eyebrow && (
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-panel-soft text-primary">
            {icon}
          </span>
        )}
        {eyebrow && (
          <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            {icon}
            {eyebrow}
          </p>
        )}
        <h1
          className={
            titleStyle === "prominent"
              ? "text-3xl font-bold tracking-tight md:text-4xl"
              : "text-2xl font-semibold tracking-tight md:text-3xl"
          }
        >
          {title}
        </h1>
        <p
          className={`mt-2 text-sm text-[var(--muted)] ${
            centered ? "mx-auto max-w-xl leading-6" : "max-w-xl"
          } ${titleStyle === "prominent" ? "md:text-base" : ""}`}
        >
          {description}
        </p>
      </div>
      {action}
    </header>
  );
}
