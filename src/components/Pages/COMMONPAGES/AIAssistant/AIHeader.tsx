import { Sparkles } from "lucide-react";

export default function AIHeader() {
  return (
    <>
      <header className="mb-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-panel-soft text-primary">
          <Sparkles size={23} />
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
          NearFix AI Assistant
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
          Describe a home repair or upload a photo to get help preparing your
          service request.
        </p>
      </header>
    </>
  );
}
