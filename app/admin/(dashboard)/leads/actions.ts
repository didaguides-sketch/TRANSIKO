"use server";

import { revalidatePath } from "next/cache";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { updateLeadStatus, deleteLead } from "@/lib/data/leads";
import type { MessageStatus } from "@prisma/client";

export async function updateLeadStatusAction(id: string, status: MessageStatus) {
  const session = await requireRole(PERMISSIONS.leads);
  await updateLeadStatus(id, status);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "update-status", entityType: "Lead", entityId: id, metadata: { status } });
  revalidatePath("/admin/leads");
  revalidatePath("/admin/messages");
}

export async function deleteLeadAction(id: string) {
  const session = await requireRole(PERMISSIONS.leads);
  await deleteLead(id);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "delete", entityType: "Lead", entityId: id });
  revalidatePath("/admin/leads");
  revalidatePath("/admin/messages");
}
