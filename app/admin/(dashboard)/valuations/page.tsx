import { listValuationRequests } from "@/lib/data/valuations";
import { updateValuationStatusAction, deleteValuationRequestAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import StatusSelect from "@/components/admin/StatusSelect";
import type { ValuationRequest } from "@prisma/client";

export default async function ValuationsAdminPage() {
  const requests = await listValuationRequests();

  const columns: Column<ValuationRequest>[] = [
    { header: "Nom", render: (r) => <span className="font-semibold text-slate-900">{r.name}</span> },
    { header: "Téléphone", render: (r) => r.phone },
    { header: "Type de bien", render: (r) => r.propertyType },
    { header: "Surface", render: (r) => r.surface ? `${r.surface} m²` : "—" },
    { header: "Estimation IA", render: (r) => r.aiEstimate ? `${Number(r.aiEstimate).toLocaleString("fr-FR")} DA` : "—" },
    { header: "Statut", render: (r) => <StatusSelect id={r.id} status={r.status} onChange={updateValuationStatusAction} /> },
  ];

  return (
    <div>
      <PageHeader title="Demandes d'estimation" description="Demandes envoyées depuis la page « Estimer mon bien »." />
      {requests.length === 0 && <NoDatabaseBanner />}
      <DataTable columns={columns} rows={requests} onDelete={deleteValuationRequestAction} emptyMessage="Aucune demande d'estimation pour le moment." />
    </div>
  );
}
