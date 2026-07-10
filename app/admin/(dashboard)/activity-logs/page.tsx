import { listActivityLogs } from "@/lib/data/activityLog";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import type { ActivityLog } from "@prisma/client";

export default async function ActivityLogsAdminPage() {
  let logs: ActivityLog[] = [];
  try {
    logs = await listActivityLogs(200);
  } catch {
    logs = [];
  }

  const columns: Column<ActivityLog>[] = [
    { header: "Utilisateur", render: (l) => <span className="font-semibold text-slate-900">{l.userName}</span> },
    { header: "Action", render: (l) => <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{l.action}</span> },
    { header: "Type", render: (l) => l.entityType },
    { header: "Élément", render: (l) => l.entityId ?? "—" },
    { header: "Date", render: (l) => new Date(l.createdAt).toLocaleString("fr-FR") },
  ];

  return (
    <div>
      <PageHeader title="Journal d'activité" description="Historique des actions effectuées dans l'espace d'administration (audit trail)." />
      {logs.length === 0 && <NoDatabaseBanner />}
      <DataTable columns={columns} rows={logs} emptyMessage="Aucune activité enregistrée pour le moment." />
    </div>
  );
}
