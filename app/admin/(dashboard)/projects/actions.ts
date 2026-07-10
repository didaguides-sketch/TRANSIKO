"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { createProject, updateProject, deleteProject } from "@/lib/data/projects";

const ProjectSchema = z.object({
  nameFr: z.string().min(3, "Le nom du programme est obligatoire"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Le slug ne doit contenir que des lettres minuscules, chiffres et tirets"),
});

function parseProjectForm(formData: FormData) {
  return {
    nameFr: String(formData.get("nameFr")),
    nameAr: String(formData.get("nameAr") || formData.get("nameFr")),
    nameEn: String(formData.get("nameEn") || formData.get("nameFr")),
    slug: String(formData.get("slug")),
    descriptionFr: String(formData.get("descriptionFr") || ""),
    coverUrl: String(formData.get("coverUrl") || ""),
  };
}

export async function createProjectAction(formData: FormData) {
  const session = await requireRole(PERMISSIONS.projects);
  const data = parseProjectForm(formData);

  const result = ProjectSchema.safeParse(data);
  if (!result.success) redirect(`/admin/projects/new?error=${encodeURIComponent(result.error.issues[0].message)}`);

  const project = await createProject(data);
  await logActivity({
    userId: session.user.id, userName: session.user.name ?? session.user.email ?? "—",
    action: "create", entityType: "Project", entityId: project.id,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/fr/projets");
  redirect("/admin/projects");
}

export async function updateProjectAction(id: string, formData: FormData) {
  const session = await requireRole(PERMISSIONS.projects);
  const data = parseProjectForm(formData);

  const result = ProjectSchema.safeParse(data);
  if (!result.success) redirect(`/admin/projects/${id}/edit?error=${encodeURIComponent(result.error.issues[0].message)}`);

  await updateProject(id, data);
  await logActivity({
    userId: session.user.id, userName: session.user.name ?? session.user.email ?? "—",
    action: "update", entityType: "Project", entityId: id,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/fr/projets");
  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  const session = await requireRole(PERMISSIONS.projects);
  await deleteProject(id);
  await logActivity({
    userId: session.user.id, userName: session.user.name ?? session.user.email ?? "—",
    action: "delete", entityType: "Project", entityId: id,
  });
  revalidatePath("/admin/projects");
  revalidatePath("/fr/projets");
}
