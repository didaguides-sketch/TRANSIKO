"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { createAgent, updateAgent, deleteAgent } from "@/lib/data/agents";

const AgentSchema = z.object({
  fullName: z.string().min(3, "Le nom complet est obligatoire"),
  phone: z.string().min(6, "Le numéro de téléphone est obligatoire"),
});

function parseAgentForm(formData: FormData) {
  return {
    fullName: String(formData.get("fullName")),
    role: String(formData.get("role") || ""),
    phone: String(formData.get("phone")),
    whatsapp: String(formData.get("whatsapp") || ""),
    email: String(formData.get("email") || ""),
    photoUrl: String(formData.get("photoUrl") || ""),
    bio: String(formData.get("bio") || ""),
    languages: String(formData.get("languages") || "").split(",").map((s) => s.trim()).filter(Boolean),
    active: formData.get("active") === "on",
  };
}

export async function createAgentAction(formData: FormData) {
  const session = await requireRole(PERMISSIONS.agents);
  const data = parseAgentForm(formData);

  const result = AgentSchema.safeParse(data);
  if (!result.success) redirect(`/admin/agents/new?error=${encodeURIComponent(result.error.issues[0].message)}`);

  const agent = await createAgent(data);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "create", entityType: "Agent", entityId: agent.id });

  revalidatePath("/admin/agents");
  revalidatePath("/fr");
  redirect("/admin/agents");
}

export async function updateAgentAction(id: string, formData: FormData) {
  const session = await requireRole(PERMISSIONS.agents);
  const data = parseAgentForm(formData);

  const result = AgentSchema.safeParse(data);
  if (!result.success) redirect(`/admin/agents/${id}/edit?error=${encodeURIComponent(result.error.issues[0].message)}`);

  await updateAgent(id, data);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "update", entityType: "Agent", entityId: id });

  revalidatePath("/admin/agents");
  revalidatePath("/fr");
  redirect("/admin/agents");
}

export async function deleteAgentAction(id: string) {
  const session = await requireRole(PERMISSIONS.agents);
  await deleteAgent(id);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "delete", entityType: "Agent", entityId: id });
  revalidatePath("/admin/agents");
  revalidatePath("/fr");
}
