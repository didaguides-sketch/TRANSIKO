import { listCategories, listAllTags } from "@/lib/data/categories";
import { createCategoryAction, deleteCategoryAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import { TextInput } from "@/components/admin/FormFields";
import { Plus, Tag } from "lucide-react";

type CategoryRow = { id: string; nameFr: string; slug: string; _count: { articles: number } };

export default async function CategoriesAdminPage({ searchParams }: { searchParams: { error?: string } }) {
  const categories = (await listCategories()) as unknown as CategoryRow[];
  const tags = await listAllTags();

  const columns: Column<CategoryRow>[] = [
    { header: "Nom", render: (c) => <span className="font-semibold text-slate-900">{c.nameFr}</span> },
    { header: "Slug", render: (c) => <span className="font-mono text-xs">{c.slug}</span> },
    { header: "Articles", render: (c) => c._count.articles },
  ];

  return (
    <div>
      <PageHeader title="Catégories & tags" description="Organisez les articles du blog par catégorie et par tag." />
      <FormErrorBanner error={searchParams.error} />
      {categories.length === 0 && <NoDatabaseBanner />}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <DataTable columns={columns} rows={categories} onDelete={deleteCategoryAction} emptyMessage="Aucune catégorie pour le moment." />

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 font-heading text-sm font-extrabold text-slate-900">Nouvelle catégorie</h3>
            <form action={createCategoryAction} className="space-y-3">
              <TextInput name="nameFr" required placeholder="Nom (ex : Guide d'achat)" />
              <TextInput name="slug" required placeholder="slug (ex : guide-achat)" />
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 py-2.5 text-sm font-bold text-white">
                <Plus size={15} /> Ajouter
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-extrabold text-slate-900">
              <Tag size={15} /> Tags utilisés
            </h3>
            {tags.length === 0 ? (
              <p className="text-sm text-slate-500">Aucun tag pour le moment. Les tags se créent directement depuis un article.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">#{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
