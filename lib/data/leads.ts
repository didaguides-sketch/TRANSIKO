import { prisma } from "@/lib/prisma";
import type { MessageStatus } from "@prisma/client";

/** Leads génériques (source: contact | estimation | chat | autre). */
export async function listLeads(source?: string) {
  try {
    return await prisma.lead.findMany({
      where: source ? { source } : undefined,
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("[data/leads] listLeads:", err);
    return [];
  }
}

export type CreateLeadInput = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
  propertyId?: string;
};

/** Utilisé par les formulaires publics (contact, chat...). Ne fait jamais planter la page appelante. */
export async function createLead(data: CreateLeadInput) {
  try {
    return await prisma.lead.create({ data: { ...data, source: data.source ?? "contact" } });
  } catch (err) {
    console.error("[data/leads] createLead (base de données non disponible ?):", err);
    return null;
  }
}

export async function updateLeadStatus(id: string, status: MessageStatus) {
  return prisma.lead.update({ where: { id }, data: { status } });
}

export async function deleteLead(id: string) {
  return prisma.lead.delete({ where: { id } });
}
