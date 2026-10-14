import { CheckCircle2, Clock3, FileCheck2, ArrowRight } from "lucide-react";

type ApplicationSubmittedProps = {
  status: "PENDING" | "APPROVED";
  onBackToDashboard?: () => void;
};

export default function ApplicationSubmitted({
  status,
  onBackToDashboard,
}: ApplicationSubmittedProps) {
  const approved = status === "APPROVED";
  const steps = [
    {
      title: "Submitted",
      description: "Application received",
      state: "completed",
    },
    {
      title: "Under review",
      description: approved ? "Details verified" : "Checking your details",
      state: approved ? "completed" : "current",
    },
    {
      title: approved ? "Approved" : "Decision",
      description: approved ? "Provider account activated" : "Final outcome",
      state: approved ? "completed" : "upcoming",
    },
  ] as const;

  return (
    <section className="flex min-h-[70vh] items-center justify-center  ">
      <div className="w-full  rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-teal-50">
          <FileCheck2 className="size-10 text-[#0F766E]" strokeWidth={1.7} />
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
          Provider registration
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {approved ? "You’re approved!" : "Application submitted!"}
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
          {approved
            ? "Your provider application has been approved. Your provider account is ready, and you can now continue to your dashboard."
            : "Your application has been received successfully. Our team will review your details before activating your provider account."}
        </p>

        {/* Application status */}
        <div
          className={`mt-8 flex items-center gap-3 rounded-2xl border p-4 text-left ${
            approved
              ? "border-teal-200 bg-teal-50"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-full ${
              approved ? "bg-teal-100" : "bg-amber-100"
            }`}
          >
            {approved ? (
              <CheckCircle2 className="size-5 text-[#0F766E]" />
            ) : (
              <Clock3 className="size-5 text-amber-700" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p
              className={`text-xs font-medium ${
                approved ? "text-teal-800" : "text-amber-800"
              }`}
            >
              APPLICATION STATUS
            </p>
            <p
              className={`mt-1 text-lg font-bold ${
                approved ? "text-teal-900" : "text-amber-900"
              }`}
            >
              {approved ? "Approved" : "Pending review"}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              approved
                ? "bg-teal-200/70 text-teal-900"
                : "bg-amber-200/70 text-amber-900"
            }`}
          >
            {approved ? "Complete" : "Pending"}
          </span>
        </div>

        {/* Horizontal progress tracker */}
        <div className="mt-10 px-1 sm:px-4">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[16.66%] right-[16.66%] top-4 h-0.5 bg-gray-200" />

            {/* Completed portion */}
            <div className="absolute left-[16.66%] top-4 h-0.5 w-[16.67%] bg-[#0F766E]" />

            <div className="relative grid grid-cols-3">
              {steps.map((step) => {
                const completed = step.state === "completed";
                const current = step.state === "current";

                return (
                  <div
                    key={step.title}
                    className="flex min-w-0 flex-col items-center"
                  >
                    <div
                      className={`z-10 flex size-8 items-center justify-center rounded-full ${
                        completed
                          ? "bg-[#0F766E] text-white"
                          : current
                            ? "border-2 border-amber-400 bg-amber-50"
                            : "border border-gray-200 bg-gray-50"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 className="size-5" />
                      ) : current ? (
                        <span className="size-2.5 rounded-full bg-amber-500" />
                      ) : (
                        <span className="size-2 rounded-full bg-gray-400" />
                      )}
                    </div>

                    <p
                      className={`mt-3 text-xs font-semibold sm:text-sm ${
                        completed || current ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>

                    <p className="mt-1 max-w-[110px] text-center text-[10px] leading-4 text-gray-500 sm:max-w-none sm:text-xs">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackToDashboard}
          className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#115E59] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-2"
        >
          {approved ? "Go to provider dashboard" : "Back to dashboard"}
          <ArrowRight className="size-4" />
        </button>

        <p className="mt-4 text-xs text-gray-400">
          Thank you for choosing NearFix.
        </p>
      </div>
    </section>
  );
}
