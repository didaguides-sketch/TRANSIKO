import { prisma } from "@/lib/prisma";

export async function listProjects() {
  try {
    return await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  } catch (err) {
    console.error("[data/projects] listProjects:", err);
    return [];
  }
}

export async function getProject(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function createProject(data: {
  nameFr: string; nameAr: string; nameEn: string; slug: string;
  descriptionFr?: string; coverUrl?: string; wilayaId?: string; deliveryDate?: Date;
}) {
  return prisma.project.create({ data });
}

export async function updateProject(id: string, data: Partial<Parameters<typeof createProject>[0]>) {
  return prisma.project.update({ where: { id }, data });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({ where: { id } });
}
