import AdminPageHeader from "@/components/Pages/ADMIN/Shared/AdminPageHeader";

export default function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={title}
        description={`Manage ${title.toLowerCase()} across NearFix.`}
      />
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6">
        <h2 className="font-semibold">Coming soon</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          This section is not available yet. Its navigation is ready, and the
          management tools will be added here.
        </p>
      </section>
    </div>
  );
}
