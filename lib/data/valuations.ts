import { prisma } from "@/lib/prisma";
import type { MessageStatus, PropertyType } from "@prisma/client";

export async function listValuationRequests() {
  try {
    return await prisma.valuationRequest.findMany({ orderBy: { createdAt: "desc" } });
  } catch (err) {
    console.error("[data/valuations] listValuationRequests:", err);
    return [];
  }
}

export type CreateValuationInput = {
  name: string;
  phone: string;
  email?: string;
  propertyType: PropertyType;
  surface?: number;
  rooms?: number;
  notes?: string;
  aiEstimate?: number | null;
};

/** Utilisé par la page publique « Estimer mon bien ». Ne fait jamais planter la page appelante. */
export async function createValuationRequest(data: CreateValuationInput) {
  try {
    return await prisma.valuationRequest.create({ data });
  } catch (err) {
    console.error("[data/valuations] createValuationRequest (base de données non disponible ?):", err);
    return null;
  }
}

export async function updateValuationStatus(id: string, status: MessageStatus) {
  return prisma.valuationRequest.update({ where: { id }, data: { status } });
}

export async function deleteValuationRequest(id: string) {
  return prisma.valuationRequest.delete({ where: { id } });
}
