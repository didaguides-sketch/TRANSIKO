import { prisma } from "@/lib/prisma";

export async function logActivity(entry: {
  userId?: string | null;
  userName: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
}) {
  try {
    await prisma.activityLog.create({
      data: {
        userId: entry.userId ?? null,
        userName: entry.userName,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId ?? null,
        metadata: entry.metadata ? (entry.metadata as any) : undefined,
      },
    });
  } catch (err) {
    // La base de données n'est pas encore connectée : on n'empêche pas l'action
    // principale d'aboutir, on se contente de tracer l'erreur côté serveur.
    console.error("[activityLog] Impossible d'enregistrer l'action :", err);
  }
}

export async function listActivityLogs(limit = 50) {
  return prisma.activityLog.findMany({ orderBy: { createdAt: "desc" }, take: limit });
}
