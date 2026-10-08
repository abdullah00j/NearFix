import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { ImagePlus, Paperclip, Send, X } from "lucide-react";

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

interface InputForAIProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  submittedPrompts: PromptEntry[];
  setSubmittedPrompts: Dispatch<SetStateAction<PromptEntry[]>>;
  objectUrlsRef: React.MutableRefObject<Set<string>>;
}

export default function InputForAI({
  prompt,
  setPrompt,
  setSubmittedPrompts,
  objectUrlsRef,
}: InputForAIProps) {
  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImages = (files: FileList | null) => {
    if (!files) return;
    setImageError("");

    const selectedImages = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (selectedImages.length !== files.length) {
      setImageError("Only image files can be attached.");
    }

    const newAttachments = selectedImages.map((file) => {
      const previewUrl = URL.createObjectURL(file);
      objectUrlsRef.current.add(previewUrl);

      return {
        id: crypto.randomUUID(),
        file,
        previewUrl,
      };
    });
    setAttachedImages((current) => [...current, ...newAttachments]);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (imageId: string) => {
    const removedImage = attachedImages.find((image) => image.id === imageId);
    if (removedImage) {
      URL.revokeObjectURL(removedImage.previewUrl);
      objectUrlsRef.current.delete(removedImage.previewUrl);
    }
    setAttachedImages((current) =>
      current.filter((image) => image.id !== imageId),
    );
  };

  const submitPrompt = () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt && attachedImages.length === 0) return;

    setSubmittedPrompts((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        prompt: trimmedPrompt,
        images: attachedImages,
      },
    ]);
    setPrompt("");
    setAttachedImages([]);
    setImageError("");
  };
  return (
    <>
      <div className="sticky bottom-[-10] rounded-2xl border border-line bg-[var(--panel)] p-3 shadow-[var(--shadow)]">
        {attachedImages.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-3">
            {attachedImages.map((image) => (
              <div key={image.id} className="group relative">
                <img
                  src={image.previewUrl}
                  alt={`Preview of ${image.file.name}`}
                  className="h-16 w-16 rounded-xl border border-line object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  aria-label={`Remove ${image.file.name}`}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-[var(--panel)] text-[var(--muted)] hover:text-primary"
                >
                  <X size={13} />
                </button>
                <span className="mt-1 block max-w-16 truncate text-[10px] text-[var(--muted)]">
                  {image.file.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {imageError && (
          <p className="mb-2 text-sm text-primary" role="alert">
            {imageError}
          </p>
        )}

        <div className="flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => addImages(event.currentTarget.files)}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-panel-soft text-[var(--muted)] transition hover:text-primary"
            aria-label="Attach images"
            title="Attach images"
          >
            <ImagePlus size={18} />
          </button>
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submitPrompt();
              }
            }}
            placeholder="Describe what you need help with..."
            className="max-h-40 min-h-10 flex-1 resize-y bg-transparent px-2 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
            aria-label="Write a prompt"
          />
          <button
            type="button"
            onClick={submitPrompt}
            disabled={!prompt.trim() && attachedImages.length === 0}
            className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-primary px-3 text-sm font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={15} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-[var(--muted)]">
          <Paperclip size={12} />
          Attach photos of the issue to provide more context
        </div>
      </div>
    </>
  );
}
