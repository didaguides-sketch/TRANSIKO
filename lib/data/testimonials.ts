import { prisma } from "@/lib/prisma";

export async function listTestimonials() {
  try {
    return await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  } catch (err) {
    console.error("[data/testimonials] listTestimonials:", err);
    return [];
  }
}

export async function createTestimonial(data: {
  authorName: string; authorRole?: string; content: string; rating: number; approved?: boolean;
}) {
  return prisma.testimonial.create({ data });
}

export async function setTestimonialApproval(id: string, approved: boolean) {
  return prisma.testimonial.update({ where: { id }, data: { approved } });
}

export async function deleteTestimonial(id: string) {
  return prisma.testimonial.delete({ where: { id } });
}
