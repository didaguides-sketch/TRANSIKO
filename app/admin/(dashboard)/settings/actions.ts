"use server";

import { revalidatePath } from "next/cache";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { updateSettings, SiteSettings } from "@/lib/data/settings";

export async function updateSettingsAction(formData: FormData) {
  const session = await requireRole(PERMISSIONS.settings);

  const data: SiteSettings = {
    siteName: String(formData.get("siteName") || ""),
    logoUrl: String(formData.get("logoUrl") || ""),
    primaryColor: String(formData.get("primaryColor") || "#7A2331"),
    phone: String(formData.get("phone") || ""),
    whatsapp: String(formData.get("whatsapp") || ""),
    email: String(formData.get("email") || ""),
    address: String(formData.get("address") || ""),
    facebook: String(formData.get("facebook") || ""),
    instagram: String(formData.get("instagram") || ""),
    youtube: String(formData.get("youtube") || ""),
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
  };

  await updateSettings(data);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "update", entityType: "SiteSetting", entityId: "site_settings" });

  revalidatePath("/admin/settings");
  revalidatePath("/fr");
}
