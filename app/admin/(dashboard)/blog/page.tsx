import { listArticles } from "@/lib/data/blog";
import { deleteArticleAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";

export default async function BlogAdminPage() {
  const articles = await listArticles();

  const columns: Column<(typeof articles)[number]>[] = [
    { header: "Titre", render: (a) => <span className="font-semibold text-slate-900">{a.titleFr}</span> },
    { header: "Catégorie", render: (a) => a.category?.nameFr ?? "—" },
    {
      header: "Statut",
      render: (a) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${a.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          {a.published ? "Publié" : "Brouillon"}
        </span>
      ),
    },
    { header: "Créé le", render: (a) => new Date(a.createdAt).toLocaleDateString("fr-FR") },
  ];

  return (
    <div>
      <PageHeader title="Blog" description="Rédigez et publiez les articles du blog Transiko." actionHref="/admin/blog/new" actionLabel="Nouvel article" />
      {articles.length === 0 && <NoDatabaseBanner />}
      <DataTable columns={columns} rows={articles} editHrefBase="/admin/blog" onDelete={deleteArticleAction} emptyMessage="Aucun article pour le moment." />
    </div>
  );
}
