import { useEffect, useRef, useState } from "react";

import InputForAI from "../../components/Pages/COMMONPAGES/AIAssistant/InputForAI";
import AIHeader from "../../components/Pages/COMMONPAGES/AIAssistant/AIHeader";
import AIChatBox from "../../components/Pages/COMMONPAGES/AIAssistant/AIChatBox";

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

export default function AIAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [submittedPrompts, setSubmittedPrompts] = useState<PromptEntry[]>([]);
  const objectUrlsRef = useRef(new Set<string>());

  useEffect(
    () => () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );

  return (
    <section className="mx-auto min-h-full  flex  max-w-[1000px] flex-col text-[var(--text)]">
      <AIHeader />

      <AIChatBox
        submittedPrompts={submittedPrompts}
        setSubmittedPrompts={setSubmittedPrompts}
        setPrompt={setPrompt}
      />

      <InputForAI
        prompt={prompt}
        setPrompt={setPrompt}
        submittedPrompts={submittedPrompts}
        setSubmittedPrompts={setSubmittedPrompts}
        objectUrlsRef={objectUrlsRef}
      />

      <p className="mt-3 text-center text-xs text-[var(--muted)]">
        Prototype only — prompts and images are not sent to an AI service.
      </p>
    </section>
  );
}
