import { Sparkles } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type AttachedImage = {
  id: string;
  file: File;
  previewUrl: string;
};

type PromptEntry = {
  id: string;
  prompt: string;
  images: AttachedImage[];
};

interface SubmittedPrompt {
  submittedPrompts: PromptEntry[];
  setSubmittedPrompts: Dispatch<SetStateAction<PromptEntry[]>>;
  setPrompt: (prompt: string) => void;
}
const suggestions = [
  "Help me describe a leaking kitchen faucet",
  "What should I check before hiring an electrician?",
  "I need help assembling a wardrobe",
];

export default function AIChatBox({
  submittedPrompts,
  setPrompt,
}: SubmittedPrompt) {
  return (
    <>
      {submittedPrompts.length === 0 ? (
        <div className="mb-6 flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl border border-line bg-[var(--panel)] p-5 shadow-[var(--shadow)]">
            <p className="mb-3 text-sm font-medium">Try asking</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setPrompt(suggestion)}
                  className="rounded-xl border border-line bg-panel-soft px-3 py-2 text-left text-sm text-[var(--muted)] transition hover:text-primary"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="mb-6 flex-1 space-y-5 overflow-y-auto"
          aria-live="polite"
        >
          {submittedPrompts.map((entry) => (
            <article
              key={entry.id}
              className="ml-auto max-w-[85%] rounded-2xl border border-line bg-panel-soft p-4"
            >
              {entry.prompt && (
                <p className="whitespace-pre-wrap text-sm leading-6">
                  {entry.prompt}
                </p>
              )}
              {entry.images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.previewUrl}
                      alt={image.file.name}
                      className="h-20 w-20 rounded-xl border border-line object-cover"
                    />
                  ))}
                </div>
              )}
            </article>
          ))}
          <div className="flex max-w-[85%] items-start gap-3 rounded-2xl border border-line bg-[var(--panel)] p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-panel-soft text-primary">
              <Sparkles size={16} />
            </span>
            <p className="text-sm leading-6 text-[var(--muted)]">
              Your prompt and images are saved in this page for now. AI
              responses will be available when an assistant service is
              connected.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
