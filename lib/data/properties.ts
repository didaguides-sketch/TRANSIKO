import { prisma } from "@/lib/prisma";
import type { Property, ListingType, PropertyType, PropertyStatus } from "@prisma/client";

export type PropertyInput = {
  reference: string;
  titleFr: string;
  titleAr: string;
  titleEn: string;
  slug: string;
  descriptionFr?: string;
  listingType: ListingType;
  propertyType: PropertyType;
  status: PropertyStatus;
  price: number;
  surface: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  address?: string;
  featured?: boolean;
  agentId?: string | null;
  projectId?: string | null;
};

export async function listProperties() {
  try {
    return await prisma.property.findMany({
      include: { agent: true, wilaya: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("[data/properties] listProperties:", err);
    return [];
  }
}

export async function getProperty(id: string) {
  return prisma.property.findUnique({ where: { id } });
}

export async function createProperty(data: PropertyInput) {
  return prisma.property.create({ data });
}

export async function updateProperty(id: string, data: Partial<PropertyInput>) {
  return prisma.property.update({ where: { id }, data });
}

export async function deleteProperty(id: string) {
  return prisma.property.delete({ where: { id } });
}

export async function listPropertyImages(propertyId: string) {
  try {
    return await prisma.propertyImage.findMany({ where: { propertyId }, orderBy: { position: "asc" } });
  } catch (err) {
    console.error("[data/properties] listPropertyImages:", err);
    return [];
  }
}

export async function addPropertyImage(propertyId: string, url: string) {
  const count = await prisma.propertyImage.count({ where: { propertyId } });
  return prisma.propertyImage.create({
    data: { propertyId, url, position: count, isCover: count === 0 },
  });
}

export async function deletePropertyImage(id: string) {
  return prisma.propertyImage.delete({ where: { id } });
}

export async function setCoverPropertyImage(propertyId: string, imageId: string) {
  await prisma.propertyImage.updateMany({ where: { propertyId }, data: { isCover: false } });
  return prisma.propertyImage.update({ where: { id: imageId }, data: { isCover: true } });
}
