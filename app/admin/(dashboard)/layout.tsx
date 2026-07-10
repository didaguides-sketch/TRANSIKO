import { requireSession } from "@/lib/rbac";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Administration — Transiko Immobilier", robots: { index: false, follow: false } };

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  return (
    <html lang="fr" dir="ltr">
      <body>
        <AdminShell role={session.user.role} name={session.user.name ?? session.user.email ?? "Utilisateur"}>
          {children}
        </AdminShell>
      </body>
    </html>
  );
}
