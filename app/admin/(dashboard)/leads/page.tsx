import { listLeads } from "@/lib/data/leads";
import { updateLeadStatusAction, deleteLeadAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import StatusSelect from "@/components/admin/StatusSelect";
import type { Lead } from "@prisma/client";

export default async function LeadsAdminPage() {
  const leads = await listLeads();

  const columns: Column<Lead>[] = [
    { header: "Nom", render: (l) => <span className="font-semibold text-slate-900">{l.name}</span> },
    { header: "Téléphone", render: (l) => l.phone },
    { header: "Source", render: (l) => <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{l.source}</span> },
    { header: "Message", render: (l) => <span className="line-clamp-1 max-w-xs text-slate-600">{l.message ?? "—"}</span> },
    { header: "Statut", render: (l) => <StatusSelect id={l.id} status={l.status} onChange={updateLeadStatusAction} /> },
    { header: "Reçu le", render: (l) => new Date(l.createdAt).toLocaleDateString("fr-FR") },
  ];

  return (
    <div>
      <PageHeader title="Clients & leads" description="Tous les prospects générés par le site (contact, estimation, chat)." />
      {leads.length === 0 && <NoDatabaseBanner />}
      <DataTable columns={columns} rows={leads} onDelete={deleteLeadAction} emptyMessage="Aucun lead pour le moment." />
    </div>
  );
}
