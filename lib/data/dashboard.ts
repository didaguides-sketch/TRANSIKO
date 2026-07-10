import { prisma } from "@/lib/prisma";

export type ChartPoint = { label: string; value: number };

/** Répartition des propriétés par statut, pour le graphique du tableau de bord. */
export async function getPropertiesByStatusChart(): Promise<ChartPoint[]> {
  try {
    const grouped = await prisma.property.groupBy({ by: ["status"], _count: { _all: true } });
    return grouped.map((g) => ({ label: g.status, value: g._count._all }));
  } catch (err) {
    console.error("[dashboard] getPropertiesByStatusChart:", err);
    return [];
  }
}

/** Répartition des leads par source (contact, estimation, chat...), pour le graphique du tableau de bord. */
export async function getLeadsBySourceChart(): Promise<ChartPoint[]> {
  try {
    const grouped = await prisma.lead.groupBy({ by: ["source"], _count: { _all: true } });
    return grouped.map((g) => ({ label: g.source, value: g._count._all }));
  } catch (err) {
    console.error("[dashboard] getLeadsBySourceChart:", err);
    return [];
  }
}
export type DashboardStats = {
  properties: number;
  publishedProperties: number;
  projects: number;
  agents: number;
  newLeads: number;
  pendingVisits: number;
  pendingValuations: number;
  articles: number;
  pendingTestimonials: number;
};

/** Retourne les statistiques réelles depuis la base, ou `null` si la base n'est pas encore connectée. */
export async function getDashboardStats(): Promise<DashboardStats | null> {
  try {
    const [
      properties, publishedProperties, projects, agents,
      newLeads, pendingVisits, pendingValuations, articles, pendingTestimonials,
    ] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: "PUBLIE" } }),
      prisma.project.count(),
      prisma.agent.count({ where: { active: true } }),
      prisma.lead.count({ where: { status: "NOUVEAU" } }),
      prisma.visitRequest.count({ where: { status: "NOUVEAU" } }),
      prisma.valuationRequest.count({ where: { status: "NOUVEAU" } }),
      prisma.article.count({ where: { published: true } }),
      prisma.testimonial.count({ where: { approved: false } }),
    ]);

    return {
      properties, publishedProperties, projects, agents,
      newLeads, pendingVisits, pendingValuations, articles, pendingTestimonials,
    };
  } catch (err) {
    console.error("[dashboard] Base de données non disponible :", err);
    return null;
  }
}
