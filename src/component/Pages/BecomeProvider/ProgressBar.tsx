type ProgressBarProps = {
  step: number;
  totalSteps: number;
};

export default function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <div>
      <div
        className="h-4 w-full overflow-hidden rounded-full bg-panel-soft"
        role="progressbar"
        aria-label="Application progress"
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={step}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
