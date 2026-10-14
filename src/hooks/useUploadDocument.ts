import { fetchAuthSession } from "aws-amplify/auth";
import { uploadData } from "aws-amplify/storage";
import { useCallback, useState } from "react";

export const useUploadDocument = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadDocument = useCallback(
    async (file: File, fileType: string): Promise<string | null> => {
      setLoading(true);
      setError(null);

      try {
        if (!/^[a-zA-Z0-9_-]+$/.test(fileType)) {
          throw new Error(
            "Document type must contain only letters, numbers, - or _.",
          );
        }

        const { identityId } = await fetchAuthSession();
        if (!identityId) {
          throw new Error("Sign in before uploading a document.");
        }

        const path = `provider-applications/${identityId}/${fileType}/${crypto.randomUUID()}-${encodeURIComponent(file.name)}`;
        await uploadData({
          path,
          data: file,
          options: { contentType: file.type },
        }).result;

        return path;
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to upload document."),
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { uploadDocument, loading, error };
};
