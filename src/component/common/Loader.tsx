import { Ripple } from "./Ripple";

type LoaderProps = {
  label?: string;
};

function Loader({ label = "Loading..." }: LoaderProps) {
  return (
    <div
      className="flex min-h-48 items-center justify-center text-[var(--muted)]"
      role="status"
      aria-live="polite"
    >
      <Ripple className="mr-3 h-11 w-11 text-primary" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export default Loader;
