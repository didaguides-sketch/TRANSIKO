import { listUsers } from "@/lib/data/users";
import { deleteUserAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";

const ROLE_LABEL: Record<string, string> = { ADMIN: "Administrateur", EDITOR: "Éditeur", AGENT: "Agent" };

export default async function UsersAdminPage() {
  const users = await listUsers();

  const columns: Column<(typeof users)[number]>[] = [
    { header: "Nom", render: (u) => <span className="font-semibold text-slate-900">{u.name}</span> },
    { header: "Email", render: (u) => u.email },
    { header: "Rôle", render: (u) => <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{ROLE_LABEL[u.role] ?? u.role}</span> },
    {
      header: "Statut",
      render: (u) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${u.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          {u.active ? "Actif" : "Désactivé"}
        </span>
      ),
    },
    { header: "Dernière connexion", render: (u) => u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString("fr-FR") : "—" },
  ];

  return (
    <div>
      <PageHeader title="Utilisateurs & rôles" description="Gérez les comptes ayant accès à l'espace d'administration." actionHref="/admin/users/new" actionLabel="Nouvel utilisateur" />
      {users.length === 0 && <NoDatabaseBanner />}
      <DataTable columns={columns} rows={users} editHrefBase="/admin/users" onDelete={deleteUserAction} emptyMessage="Aucun utilisateur enregistré." />
    </div>
  );
}
