"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { createCategory, deleteCategory } from "@/lib/data/categories";

const CategorySchema = z.object({
  nameFr: z.string().min(2, "Le nom de la catégorie est obligatoire"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Le slug ne doit contenir que des lettres minuscules, chiffres et tirets"),
});

export async function createCategoryAction(formData: FormData) {
  const session = await requireRole(PERMISSIONS.blog);
  const data = { nameFr: String(formData.get("nameFr")), slug: String(formData.get("slug")) };

  const result = CategorySchema.safeParse(data);
  if (!result.success) redirect(`/admin/categories?error=${encodeURIComponent(result.error.issues[0].message)}`);

  const category = await createCategory(data);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "create", entityType: "BlogCategory", entityId: category.id });
  revalidatePath("/admin/categories");
  revalidatePath("/fr/blog");
}

export async function deleteCategoryAction(id: string) {
  const session = await requireRole(PERMISSIONS.blog);
  await deleteCategory(id);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "delete", entityType: "BlogCategory", entityId: id });
  revalidatePath("/admin/categories");
  revalidatePath("/fr/blog");
}
