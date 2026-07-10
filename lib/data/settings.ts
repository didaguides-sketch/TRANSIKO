import { prisma } from "@/lib/prisma";

export type SiteSettings = {
  siteName: string;
  logoUrl: string;
  primaryColor: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  seoTitle: string;
  seoDescription: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Transiko Immobilier",
  logoUrl: "",
  primaryColor: "#7A2331",
  phone: "+213 551 87 51 79",
  whatsapp: "+213 558 20 77 93",
  email: "transiko@gmail.com",
  address: "02 Rue Duguet, Vieux Kouba, Alger 16000, Algérie",
  facebook: "",
  instagram: "",
  youtube: "",
  seoTitle: "Transiko Immobilier — Agence immobilière à Alger, Algérie",
  seoDescription: "Achat, vente et location de villas, appartements, terrains et locaux commerciaux partout en Algérie.",
};

const SETTINGS_KEY = "site_settings";

export async function getSettings(): Promise<SiteSettings> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: SETTINGS_KEY } });
    if (!row) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(row.value as Partial<SiteSettings>) };
  } catch (err) {
    console.error("[data/settings] getSettings:", err);
    return DEFAULT_SETTINGS;
  }
}

export async function updateSettings(data: SiteSettings) {
  return prisma.siteSetting.upsert({
    where: { key: SETTINGS_KEY },
    create: { key: SETTINGS_KEY, value: data as any },
    update: { value: data as any },
  });
}
