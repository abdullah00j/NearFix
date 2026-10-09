import { ArrowLeft, ArrowRight, BriefcaseBusiness, Check } from "lucide-react";

type BecomeProviderFooterProps = {
  step: number;
  totalSteps: number;
  saved: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onReview: () => void;
  onSave: () => void;
};

export default function BecomeProviderFooter({
  step,
  totalSteps,
  saved,
  onPrevious,
  onNext,
  onReview,
  onSave,
}: BecomeProviderFooterProps) {
  const isComplete = step === totalSteps;

  return (
    <footer className="flex flex-col gap-3  bg-[var(--panel)] p-4 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={isComplete ? onReview : onPrevious}
        disabled={!isComplete && step <= 1}
        className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-line bg-[var(--panel)] px-4 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:bg-panel-soft hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft size={16} />
        {isComplete ? "Review application" : "Back"}
      </button>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
        <p className="text-center text-xs text-[var(--muted)] sm:text-right">
          {isComplete
            ? saved
              ? "Draft saved on this device."
              : "Application draft is not saved yet."
            : `Step ${step} of ${totalSteps}`}
        </p>
        {!isComplete && (
          <button
            type="button"
            onClick={step === totalSteps - 1 ? onSave : onNext}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            {step === totalSteps - 1 ? (
              <>
                {saved ? <Check size={16} /> : <BriefcaseBusiness size={16} />}
                {saved ? "Draft saved locally" : "Submit application"}
              </>
            ) : (
              <>
                Next
                <ArrowRight size={16} />
              </>
            )}
          </button>
        )}
      </div>
    </footer>
  );
}
