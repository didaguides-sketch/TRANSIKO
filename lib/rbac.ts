import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { authOptions } from "@/lib/auth";

/** Hiérarchie des rôles : plus l'index est élevé, plus le rôle a de droits. */
const ROLE_RANK: Record<UserRole, number> = {
  AGENT: 1,
  EDITOR: 2,
  ADMIN: 3,
};

export function hasRole(role: UserRole, minimum: UserRole) {
  return ROLE_RANK[role] >= ROLE_RANK[minimum];
}

/** À utiliser dans les Server Components des pages /admin/**. Redirige vers le login si non connecté. */
export async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");
  return session;
}

/** À utiliser quand une page/action nécessite un rôle minimum (ex : ADMIN pour la gestion des utilisateurs). */
export async function requireRole(minimum: UserRole) {
  const session = await requireSession();
  if (!hasRole(session.user.role, minimum)) {
    redirect("/admin?error=forbidden");
  }
  return session;
}

/**
 * Permissions par module — sert de référence unique pour l'UI (masquer des liens)
 * et pour les Server Actions (vérification côté serveur).
 */
export const PERMISSIONS = {
  properties: "AGENT" as UserRole,
  projects: "EDITOR" as UserRole,
  agents: "EDITOR" as UserRole,
  leads: "AGENT" as UserRole,
  blog: "EDITOR" as UserRole,
  testimonials: "EDITOR" as UserRole,
  faq: "EDITOR" as UserRole,
  media: "AGENT" as UserRole,
  settings: "ADMIN" as UserRole,
  users: "ADMIN" as UserRole,
  activityLogs: "ADMIN" as UserRole,
};
