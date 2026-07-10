"use server";

import { revalidatePath } from "next/cache";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { createMedia, deleteMedia } from "@/lib/data/media";

export async function addMediaAction(formData: FormData) {
  const session = await requireRole(PERMISSIONS.media);
  const url = String(formData.get("url") || "").trim();
  if (!url) return;

  const type = String(formData.get("type") || "IMAGE") as "IMAGE" | "VIDEO";
  const filename = url.split("/").pop() || "media";
  const folder = String(formData.get("folder") || "general");

  const media = await createMedia({ url, filename, type, folder });
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "create", entityType: "MediaAsset", entityId: media.id });
  revalidatePath("/admin/media");
}

export async function deleteMediaAction(id: string) {
  const session = await requireRole(PERMISSIONS.media);
  await deleteMedia(id);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "delete", entityType: "MediaAsset", entityId: id });
  revalidatePath("/admin/media");
}
