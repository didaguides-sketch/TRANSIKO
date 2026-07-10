import { prisma } from "@/lib/prisma";
import type { MediaType } from "@prisma/client";

export async function listMedia(folder?: string) {
  try {
    return await prisma.mediaAsset.findMany({
      where: folder ? { folder } : undefined,
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("[data/media] listMedia:", err);
    return [];
  }
}

export async function createMedia(data: {
  url: string; filename: string; type: MediaType; sizeBytes?: number; altText?: string; folder?: string;
}) {
  return prisma.mediaAsset.create({ data });
}

export async function deleteMedia(id: string) {
  return prisma.mediaAsset.delete({ where: { id } });
}
