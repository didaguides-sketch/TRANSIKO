import { prisma } from "@/lib/prisma";

export async function listArticles() {
  try {
    return await prisma.article.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
  } catch (err) {
    console.error("[data/blog] listArticles:", err);
    return [];
  }
}

export async function getArticle(id: string) {
  return prisma.article.findUnique({ where: { id } });
}

export async function createArticle(data: {
  titleFr: string; titleAr: string; titleEn: string; slug: string;
  excerptFr?: string; contentFr: string; coverUrl?: string;
  categoryId?: string; tags?: string[]; published?: boolean;
  seoTitle?: string; seoDescription?: string;
}) {
  return prisma.article.create({ data: { ...data, publishedAt: data.published ? new Date() : null } });
}

export async function updateArticle(id: string, data: Partial<Parameters<typeof createArticle>[0]>) {
  return prisma.article.update({ where: { id }, data });
}

export async function deleteArticle(id: string) {
  return prisma.article.delete({ where: { id } });
}
