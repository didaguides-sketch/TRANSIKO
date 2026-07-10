import { listFaqs } from "@/lib/data/faq";
import { deleteFaqAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import type { Faq } from "@prisma/client";

export default async function FaqAdminPage() {
  const faqs = await listFaqs();

  const columns: Column<Faq>[] = [
    { header: "Question", render: (f) => <span className="font-semibold text-slate-900">{f.questionFr}</span> },
    { header: "Catégorie", render: (f) => f.category },
    { header: "Ordre", render: (f) => f.order },
    {
      header: "Statut",
      render: (f) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${f.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          {f.published ? "Publié" : "Masqué"}
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Foire aux questions" description="Gérez les questions fréquentes affichées sur le site." actionHref="/admin/faq/new" actionLabel="Nouvelle question" />
      {faqs.length === 0 && <NoDatabaseBanner />}
      <DataTable columns={columns} rows={faqs} editHrefBase="/admin/faq" onDelete={deleteFaqAction} emptyMessage="Aucune question pour le moment." />
    </div>
  );
}
