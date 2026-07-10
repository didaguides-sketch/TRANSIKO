import { prisma } from "@/lib/prisma";

export async function listCategories() {
  try {
    return await prisma.blogCategory.findMany({
      include: { _count: { select: { articles: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("[data/categories] listCategories:", err);
    return [];
  }
}

export async function listAllTags() {
  try {
    const articles = await prisma.article.findMany({ select: { tags: true } });
    const tags = new Set<string>();
    articles.forEach((a) => a.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  } catch (err) {
    console.error("[data/categories] listAllTags:", err);
    return [];
  }
}

export async function createCategory(data: { nameFr: string; slug: string }) {
  return prisma.blogCategory.create({ data });
}

export async function deleteCategory(id: string) {
  return prisma.blogCategory.delete({ where: { id } });
}
