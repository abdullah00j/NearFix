import ProgressBar from "./ProgressBar";

interface BecomeProviderProgressBarProps {
  step: number;
  totalSteps: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function BecomeProviderProgressBar({
  step,
  totalSteps,
  setStep,
}: BecomeProviderProgressBarProps) {
  const stepLabels = [
    { name: "Business details", step: 1 },
    { name: "CIN verification", step: 2 },
    { name: "Review", step: 3 },
    { name: "Complete", step: 4 },
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
                key={label.step}
                className={`text-xs font-medium ${
                  isCurrent || isComplete
                    ? "text-primary"
                    : "text-[var(--muted)]"
                }`}
              >
                <button
                  type="button"
                  disabled={itemStep > step}
                  aria-current={isCurrent ? "step" : undefined}
                  onClick={() => setStep(label.step)}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  {label.name}
                </button>
              </div>
            );
          })}
        </div>
        <ProgressBar step={step} totalSteps={totalSteps} />
      </div>
    </>
  );
}
