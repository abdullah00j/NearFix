import { useMemo, useState, type FormEvent } from "react";
import { Plus, Search } from "lucide-react";
import {
  DataTable,
  ErrorState,
  Panel,
  RefreshButton,
  StatusBadge,
} from "@/components/Pages/ADMIN/Shared";
import AdminPageHeader from "@/components/Pages/ADMIN/Shared/AdminPageHeader";
import AdminTableSkeleton from "./AdminSkeleton/AdminTableSkeleton";
import { formatDate } from "./adminFormat";
import { useAdmin } from "@/context/AdminContext";
import {
  useCreateAdminCategory,
  useUpdateAdminCategory,
} from "@/data/ADMIN/AdminMutation";

export default function CategoryManagement() {
  const { data, loading, error, refresh } = useAdmin();
  const categories = data?.categories ?? null;
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const createCategoryMutation = useCreateAdminCategory();
  const updateCategoryMutation = useUpdateAdminCategory();
  const [actionError, setActionError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (categories ?? []).filter((category) =>
      category.name.toLowerCase().includes(query),
    );
  }, [categories, search]);

  const addCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setActionError(null);
    try {
      await createCategoryMutation.mutateAsync(trimmedName);
      setName("");
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to create this category.",
      );
    }
  };

  const toggleCategory = async (id: string, isActive: boolean) => {
    setActionError(null);
    try {
      await updateCategoryMutation.mutateAsync({ id, isActive: !isActive });
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to update this category.",
      );
    }
  };

  return (
    <section className="mx-auto max-w-[1280px] space-y-6 px-1 py-2 text-[var(--text)] md:px-2">
      <AdminPageHeader
        title="Category management"
        description="Create and maintain the service categories customers can browse."
        action={
          <RefreshButton onClick={() => void refresh()} loading={loading} />
        }
      />

      {(error || actionError) && (
        <ErrorState
          message={actionError ?? error ?? "An unexpected error occurred."}
        />
      )}

      <Panel title="Add a category">
        <form
          onSubmit={(event) => void addCategory(event)}
          className="flex flex-col gap-3 p-4 sm:flex-row"
        >
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={80}
            placeholder="e.g. Home cleaning"
            aria-label="Category name"
            className="min-w-0 flex-1 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm outline-none focus:border-primary"
            required
          />
          <button
            type="submit"
            disabled={createCategoryMutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
          >
            <Plus size={16} />
            {createCategoryMutation.isPending ? "Adding..." : "Add category"}
          </button>
        </form>
      </Panel>

      <Panel
        title={`Categories (${categories?.length ?? 0})`}
        action={
          <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2">
            <Search size={15} className="text-[var(--muted)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories"
              aria-label="Search categories"
              className="w-36 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
            />
          </label>
        }
      >
        {loading && !categories ? (
          <AdminTableSkeleton columns={4} />
        ) : (
          <DataTable
            headers={["Category", "Status", "Created", ""]}
            isEmpty={filtered.length === 0}
            emptyMessage="No categories match your search."
          >
            {filtered.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-3 font-medium">{category.name}</td>
                <td className="px-4 py-3">
                  <StatusBadge
                    status={category.isActive ? "ACTIVE" : "INACTIVE"}
                  />
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {formatDate(category.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      void toggleCategory(
                        category.id,
                        Boolean(category.isActive),
                      )
                    }
                    className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-medium transition hover:border-primary hover:text-primary"
                  >
                    {category.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Panel>
    </section>
  );
}
