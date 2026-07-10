import { listAgents } from "@/lib/data/agents";
import { deleteAgentAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import type { Agent } from "@prisma/client";

export default async function AgentsAdminPage() {
  const agents = await listAgents();

  const columns: Column<Agent>[] = [
    { header: "Nom", render: (a) => <span className="font-semibold text-slate-900">{a.fullName}</span> },
    { header: "Fonction", render: (a) => a.role ?? "—" },
    { header: "Téléphone", render: (a) => a.phone },
    {
      header: "Statut",
      render: (a) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${a.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          {a.active ? "Actif" : "Inactif"}
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Agents" description="Gérez l'équipe commerciale visible sur le site." actionHref="/admin/agents/new" actionLabel="Nouvel agent" />
      {agents.length === 0 && <NoDatabaseBanner />}
      <DataTable columns={columns} rows={agents} editHrefBase="/admin/agents" onDelete={deleteAgentAction} emptyMessage="Aucun agent enregistré." />
    </div>
  );
}
