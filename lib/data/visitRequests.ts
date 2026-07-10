import { prisma } from "@/lib/prisma";
import type { MessageStatus } from "@prisma/client";

export async function listVisitRequests() {
  try {
    return await prisma.visitRequest.findMany({
      include: { property: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("[data/visitRequests] listVisitRequests:", err);
    return [];
  }
}

export async function updateVisitRequestStatus(id: string, status: MessageStatus) {
  return prisma.visitRequest.update({ where: { id }, data: { status } });
}

export async function deleteVisitRequest(id: string) {
  return prisma.visitRequest.delete({ where: { id } });
}
