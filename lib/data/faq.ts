import { prisma } from "@/lib/prisma";

export async function listFaqs() {
  try {
    return await prisma.faq.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  } catch (err) {
    console.error("[data/faq] listFaqs:", err);
    return [];
  }
}

export async function getFaq(id: string) {
  return prisma.faq.findUnique({ where: { id } });
}

export async function createFaq(data: {
  questionFr: string; answerFr: string; category?: string; order?: number; published?: boolean;
}) {
  return prisma.faq.create({ data });
}

export async function updateFaq(id: string, data: Partial<Parameters<typeof createFaq>[0]>) {
  return prisma.faq.update({ where: { id }, data });
}

export async function deleteFaq(id: string) {
  return prisma.faq.delete({ where: { id } });
}
