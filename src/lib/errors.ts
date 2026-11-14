export function nonNullRecords<T>(records: (T | null)[] | null | undefined) {
  return (records ?? []).filter((record): record is T => record !== null);
}

export function throwModelErrors(
  errors: readonly { message?: string | null }[] | undefined,
  fallback: string,
) {
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message ?? fallback).join("; "));
  }
}
