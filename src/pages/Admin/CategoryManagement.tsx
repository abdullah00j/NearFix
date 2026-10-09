import { useMemo, useState, type FormEvent } from "react";
import { Plus, Search } from "lucide-react";
import {
  DataTable,
  ErrorState,
  LoadingState,
  PageHeader,
  Panel,
  RefreshButton,
  StatusBadge,
} from "./AdminUI";
import { formatDate } from "./adminFormat";
import {
  adminClient,
  adminGraphqlClient,
  nonNullRecords,
  throwModelErrors,
  useAdminData,
} from "./adminData";
import { createCategory, updateCategory } from "../../graphql/mutations";

const loadCategories = async () => {
  const result = await adminClient.models.Category.list({ limit: 200 });
  throwModelErrors(result.errors, "Unable to load categories.");
  return nonNullRecords(result.data);
};

export default function CategoryManagement() {
  const {
    data: categories,
    loading,
    error,
    refresh,
  } = useAdminData(loadCategories);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
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

    setSaving(true);
    setActionError(null);
    try {
      const result = await adminGraphqlClient.graphql({
        query: createCategory,
        variables: { input: { name: trimmedName, isActive: true } },
      });
      throwModelErrors(result.errors, "Unable to create this category.");
      if (!result.data?.createCategory) {
        throw new Error("The category was not created.");
      }
      setName("");
      await refresh();
    } catch (mutationError) {
      setActionError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to create this category.",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleCategory = async (id: string, isActive: boolean) => {
    setActionError(null);
    try {
      const result = await adminGraphqlClient.graphql({
        query: updateCategory,
        variables: { input: { id, isActive: !isActive } },
      });
      throwModelErrors(result.errors, "Unable to update this category.");
      if (!result.data?.updateCategory) {
        throw new Error("The category was not updated.");
      }
      await refresh();
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
      <PageHeader
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
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
          >
            <Plus size={16} />
            {saving ? "Adding..." : "Add category"}
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
          <LoadingState />
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
