"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { createArticle, updateArticle, deleteArticle } from "@/lib/data/blog";

const ArticleSchema = z.object({
  titleFr: z.string().min(3, "Le titre est obligatoire"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Le slug ne doit contenir que des lettres minuscules, chiffres et tirets"),
  contentFr: z.string().min(20, "Le contenu doit contenir au moins 20 caractères"),
});

function parseArticleForm(formData: FormData) {
  return {
    titleFr: String(formData.get("titleFr")),
    titleAr: String(formData.get("titleAr") || formData.get("titleFr")),
    titleEn: String(formData.get("titleEn") || formData.get("titleFr")),
    slug: String(formData.get("slug")),
    excerptFr: String(formData.get("excerptFr") || ""),
    contentFr: String(formData.get("contentFr") || ""),
    coverUrl: String(formData.get("coverUrl") || ""),
    categoryId: String(formData.get("categoryId") || "") || undefined,
    tags: String(formData.get("tags") || "").split(",").map((t) => t.trim()).filter(Boolean),
    published: formData.get("published") === "on",
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
  };
}

export async function createArticleAction(formData: FormData) {
  const session = await requireRole(PERMISSIONS.blog);
  const data = parseArticleForm(formData);

  const result = ArticleSchema.safeParse(data);
  if (!result.success) redirect(`/admin/blog/new?error=${encodeURIComponent(result.error.issues[0].message)}`);

  const article = await createArticle(data);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "create", entityType: "Article", entityId: article.id });

  revalidatePath("/admin/blog");
  revalidatePath("/fr/blog");
  redirect("/admin/blog");
}

export async function updateArticleAction(id: string, formData: FormData) {
  const session = await requireRole(PERMISSIONS.blog);
  const data = parseArticleForm(formData);

  const result = ArticleSchema.safeParse(data);
  if (!result.success) redirect(`/admin/blog/${id}/edit?error=${encodeURIComponent(result.error.issues[0].message)}`);

  await updateArticle(id, data);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "update", entityType: "Article", entityId: id });

  revalidatePath("/admin/blog");
  revalidatePath("/fr/blog");
  redirect("/admin/blog");
}

export async function deleteArticleAction(id: string) {
  const session = await requireRole(PERMISSIONS.blog);
  await deleteArticle(id);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "delete", entityType: "Article", entityId: id });
  revalidatePath("/admin/blog");
  revalidatePath("/fr/blog");
}
