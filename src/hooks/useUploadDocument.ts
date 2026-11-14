import { useCallback, useState } from "react";
import { useUploadProviderDocument } from "@/data/PROVIDER/ProviderMutation";

export const useUploadDocument = () => {
  const uploadMutation = useUploadProviderDocument();
  const { mutateAsync } = uploadMutation;
  const [error, setError] = useState<Error | null>(null);

  const uploadDocument = useCallback(
    async (file: File, fileType: string): Promise<string | null> => {
      setError(null);
      try {
        return await mutateAsync({ file, fileType });
      } catch (uploadError) {
        setError(
          uploadError instanceof Error
            ? uploadError
            : new Error("Failed to upload document."),
        );
        return null;
      }
    },
    [mutateAsync],
  );

  return {
    uploadDocument,
    loading: uploadMutation.isPending,
    error,
  };
};
