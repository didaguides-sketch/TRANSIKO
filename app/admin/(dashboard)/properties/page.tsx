import { listProperties } from "@/lib/data/properties";
import { deletePropertyAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import type { Property } from "@prisma/client";

const STATUS_LABEL: Record<string, string> = {
  BROUILLON: "Brouillon", PUBLIE: "Publié", VENDU: "Vendu", LOUE: "Loué", ARCHIVE: "Archivé",
};

export default async function PropertiesAdminPage() {
  const properties = await listProperties();

  const columns: Column<Property>[] = [
    { header: "Référence", render: (p) => <span className="font-mono text-xs">{p.reference}</span> },
    { header: "Titre", render: (p) => <span className="font-semibold text-slate-900">{p.titleFr}</span> },
    { header: "Transaction", render: (p) => p.listingType },
    { header: "Type", render: (p) => p.propertyType },
    { header: "Prix", render: (p) => `${Number(p.price).toLocaleString("fr-FR")} DA` },
    {
      header: "Statut",
      render: (p) => (
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
          {STATUS_LABEL[p.status] ?? p.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Propriétés"
        description="Gérez l'ensemble des biens publiés sur le site."
        actionHref="/admin/properties/new"
        actionLabel="Nouvelle propriété"
      />
      {properties.length === 0 && <NoDatabaseBanner />}
      <DataTable
        columns={columns}
        rows={properties}
        editHrefBase="/admin/properties"
        onDelete={deletePropertyAction}
        emptyMessage="Aucune propriété enregistrée. Connectez la base de données puis ajoutez votre première annonce."
      />
    </div>
  );
}
