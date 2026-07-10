"use server";

import { revalidatePath } from "next/cache";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { updateValuationStatus, deleteValuationRequest } from "@/lib/data/valuations";
import type { MessageStatus } from "@prisma/client";

export async function updateValuationStatusAction(id: string, status: MessageStatus) {
  const session = await requireRole(PERMISSIONS.leads);
  await updateValuationStatus(id, status);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "update-status", entityType: "ValuationRequest", entityId: id, metadata: { status } });
  revalidatePath("/admin/valuations");
}

export async function deleteValuationRequestAction(id: string) {
  const session = await requireRole(PERMISSIONS.leads);
  await deleteValuationRequest(id);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "delete", entityType: "ValuationRequest", entityId: id });
  revalidatePath("/admin/valuations");
}
