"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import {
  createProperty, updateProperty, deleteProperty, PropertyInput,
  addPropertyImage, deletePropertyImage, setCoverPropertyImage,
} from "@/lib/data/properties";

const PropertySchema = z.object({
  reference: z.string().min(2, "La référence est obligatoire"),
  titleFr: z.string().min(3, "Le titre (français) est obligatoire"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Le slug ne doit contenir que des lettres minuscules, chiffres et tirets"),
  price: z.number().positive("Le prix doit être positif"),
  surface: z.number().positive("La surface doit être positive"),
  listingType: z.enum(["VENTE", "LOCATION"]),
  propertyType: z.enum(["VILLA", "APPARTEMENT", "MAISON", "TERRAIN", "LOCAL_COMMERCIAL", "BUREAU", "FERME"]),
  status: z.enum(["BROUILLON", "PUBLIE", "VENDU", "LOUE", "ARCHIVE"]),
});

function parsePropertyForm(formData: FormData): PropertyInput {
  return {
    reference: String(formData.get("reference")),
    titleFr: String(formData.get("titleFr")),
    titleAr: String(formData.get("titleAr") || formData.get("titleFr")),
    titleEn: String(formData.get("titleEn") || formData.get("titleFr")),
    slug: String(formData.get("slug")),
    descriptionFr: String(formData.get("descriptionFr") || ""),
    listingType: String(formData.get("listingType")) as PropertyInput["listingType"],
    propertyType: String(formData.get("propertyType")) as PropertyInput["propertyType"],
    status: String(formData.get("status")) as PropertyInput["status"],
    price: Number(formData.get("price")),
    surface: Number(formData.get("surface")),
    rooms: Number(formData.get("rooms") || 0),
    bedrooms: Number(formData.get("bedrooms") || 0),
    bathrooms: Number(formData.get("bathrooms") || 0),
    address: String(formData.get("address") || ""),
    featured: formData.get("featured") === "on",
  };
}

function validateOrRedirect(data: PropertyInput, backTo: string) {
  const result = PropertySchema.safeParse(data);
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "Données invalides";
    redirect(`${backTo}?error=${encodeURIComponent(message)}`);
  }
}

export async function createPropertyAction(formData: FormData) {
  const session = await requireRole(PERMISSIONS.properties);
  const data = parsePropertyForm(formData);
  validateOrRedirect(data, "/admin/properties/new");

  const property = await createProperty(data);
  await logActivity({
    userId: session.user.id, userName: session.user.name ?? session.user.email ?? "—",
    action: "create", entityType: "Property", entityId: property.id,
  });

  revalidatePath("/admin/properties");
  revalidatePath("/fr/proprietes");
  redirect(`/admin/properties/${property.id}/edit`);
}

export async function updatePropertyAction(id: string, formData: FormData) {
  const session = await requireRole(PERMISSIONS.properties);
  const data = parsePropertyForm(formData);
  validateOrRedirect(data, `/admin/properties/${id}/edit`);

  await updateProperty(id, data);
  await logActivity({
    userId: session.user.id, userName: session.user.name ?? session.user.email ?? "—",
    action: "update", entityType: "Property", entityId: id,
  });

  revalidatePath("/admin/properties");
  revalidatePath("/fr/proprietes");
  redirect("/admin/properties");
}

export async function deletePropertyAction(id: string) {
  const session = await requireRole(PERMISSIONS.properties);
  await deleteProperty(id);
  await logActivity({
    userId: session.user.id, userName: session.user.name ?? session.user.email ?? "—",
    action: "delete", entityType: "Property", entityId: id,
  });
  revalidatePath("/admin/properties");
  revalidatePath("/fr/proprietes");
}

export async function addPropertyImageAction(propertyId: string, formData: FormData) {
  const session = await requireRole(PERMISSIONS.properties);
  const url = String(formData.get("url") || "").trim();
  if (!url) redirect(`/admin/properties/${propertyId}/edit?error=${encodeURIComponent("URL d'image manquante")}`);

  await addPropertyImage(propertyId, url);
  await logActivity({
    userId: session.user.id, userName: session.user.name ?? session.user.email ?? "—",
    action: "add-image", entityType: "Property", entityId: propertyId,
  });
  revalidatePath(`/admin/properties/${propertyId}/edit`);
}

export async function deletePropertyImageAction(propertyId: string, imageId: string) {
  await requireRole(PERMISSIONS.properties);
  await deletePropertyImage(imageId);
  revalidatePath(`/admin/properties/${propertyId}/edit`);
}

export async function setCoverImageAction(propertyId: string, imageId: string) {
  await requireRole(PERMISSIONS.properties);
  await setCoverPropertyImage(propertyId, imageId);
  revalidatePath(`/admin/properties/${propertyId}/edit`);
}
