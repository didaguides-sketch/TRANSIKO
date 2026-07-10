import { listLeads } from "@/lib/data/leads";
import { updateLeadStatusAction, deleteLeadAction } from "../leads/actions";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import StatusSelect from "@/components/admin/StatusSelect";
import type { Lead } from "@prisma/client";

export default async function MessagesAdminPage() {
  const messages = await listLeads("contact");

  const columns: Column<Lead>[] = [
    { header: "Nom", render: (l) => <span className="font-semibold text-slate-900">{l.name}</span> },
    { header: "Téléphone", render: (l) => l.phone },
    { header: "Email", render: (l) => l.email ?? "—" },
    { header: "Message", render: (l) => <span className="line-clamp-2 max-w-sm text-slate-600">{l.message ?? "—"}</span> },
    { header: "Statut", render: (l) => <StatusSelect id={l.id} status={l.status} onChange={updateLeadStatusAction} /> },
    { header: "Reçu le", render: (l) => new Date(l.createdAt).toLocaleDateString("fr-FR") },
  ];

  return (
    <div>
      <PageHeader title="Messages de contact" description="Messages envoyés depuis le formulaire de contact du site." />
      {messages.length === 0 && <NoDatabaseBanner />}
      <DataTable columns={columns} rows={messages} onDelete={deleteLeadAction} emptyMessage="Aucun message pour le moment." />
    </div>
  );
}
