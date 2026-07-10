import { listProjects } from "@/lib/data/projects";
import { deleteProjectAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import type { Project } from "@prisma/client";

export default async function ProjectsAdminPage() {
  const projects = await listProjects();

  const columns: Column<Project>[] = [
    { header: "Nom", render: (p) => <span className="font-semibold text-slate-900">{p.nameFr}</span> },
    { header: "Slug", render: (p) => <span className="font-mono text-xs">{p.slug}</span> },
    { header: "Créé le", render: (p) => new Date(p.createdAt).toLocaleDateString("fr-FR") },
  ];

  return (
    <div>
      <PageHeader
        title="Nouveaux projets"
        description="Gérez les programmes immobiliers neufs."
        actionHref="/admin/projects/new"
        actionLabel="Nouveau programme"
      />
      {projects.length === 0 && <NoDatabaseBanner />}
      <DataTable
        columns={columns}
        rows={projects}
        editHrefBase="/admin/projects"
        onDelete={deleteProjectAction}
        emptyMessage="Aucun programme enregistré."
      />
    </div>
  );
}
