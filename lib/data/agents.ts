import { prisma } from "@/lib/prisma";

export async function listAgents() {
  try {
    return await prisma.agent.findMany({ orderBy: { createdAt: "desc" } });
  } catch (err) {
    console.error("[data/agents] listAgents:", err);
    return [];
  }
}

export async function getAgent(id: string) {
  return prisma.agent.findUnique({ where: { id } });
}

export async function createAgent(data: {
  fullName: string; role?: string; phone: string; whatsapp?: string; email?: string;
  photoUrl?: string; bio?: string; languages?: string[]; active?: boolean;
}) {
  return prisma.agent.create({ data });
}

export async function updateAgent(id: string, data: Partial<Parameters<typeof createAgent>[0]>) {
  return prisma.agent.update({ where: { id }, data });
}

export async function deleteAgent(id: string) {
  return prisma.agent.delete({ where: { id } });
}
