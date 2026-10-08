import ProgressBar from "./ProgressBar";

interface BecomeProviderProgressBarProps {
  step: number;
  totalSteps: number;
}

export default function BecomeProviderProgressBar({
  step,
  totalSteps,
}: BecomeProviderProgressBarProps) {
  const stepLabels = [
    "Business details",
    "CIN verification",
    "Review",
    "Complete",
  ];
  return (
    <>
      <div className=" bg-[var(--panel)] p-4 md:p-5">
        <div className="mb-3 hidden justify-between gap-2 sm:flex">
          {stepLabels.map((label, index) => {
            const itemStep = index + 1;
            const isCurrent = itemStep === step;
            const isComplete = itemStep < step;
            return (
              <div
                key={label}
                className={`text-xs cursor-pointer font-medium ${
                  isCurrent || isComplete
                    ? "text-primary"
                    : "text-[var(--muted)]"
                }`}
              >
                {label}
              </div>
            );
          })}
        </div>
        <ProgressBar step={step} totalSteps={totalSteps} />
      </div>
    </>
  );
}
