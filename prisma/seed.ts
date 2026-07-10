import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { WILAYAS } from "../src/data/wilayas";
import { DEMO_PROPERTIES, DEMO_PROJECTS, DEMO_AGENTS, DEMO_TESTIMONIALS, DEMO_ARTICLES, DEMO_FAQS } from "../src/data/demo";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding wilayas…");
  for (const w of WILAYAS) {
    await prisma.wilaya.upsert({
      where: { code: w.code },
      update: {},
      create: { code: w.code, nameAr: w.ar, nameFr: w.fr, nameEn: w.en },
    });
  }

  console.log("Seeding admin users…");
  const users = [
    { name: "Administrateur Transiko", email: "admin@transiko.dz", password: "ChangeMoi123!", role: "ADMIN" as const },
    { name: "Éditeur Transiko", email: "editeur@transiko.dz", password: "ChangeMoi123!", role: "EDITOR" as const },
    { name: "Agent Transiko", email: "agent@transiko.dz", password: "ChangeMoi123!", role: "AGENT" as const },
  ];
  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { name: u.name, email: u.email, password: hashed, role: u.role },
    });
  }

  console.log("Seeding agents…");
  const agentIdByDemoId: Record<string, string> = {};
  for (const a of DEMO_AGENTS) {
    const created = await prisma.agent.create({
      data: {
        fullName: a.name, role: a.role, phone: a.phone, whatsapp: a.whatsapp,
        email: a.email, languages: a.lang.split(" · "),
      },
    });
    agentIdByDemoId[a.id] = created.id;
  }

  console.log("Seeding blog categories & articles…");
  const categories = Array.from(new Set(DEMO_ARTICLES.map((a) => a.category)));
  const categoryIdByName: Record<string, string> = {};
  for (const name of categories) {
    const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");
    const created = await prisma.blogCategory.create({ data: { nameFr: name, slug } });
    categoryIdByName[name] = created.id;
  }
  for (const article of DEMO_ARTICLES) {
    const slug = article.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").slice(0, 80);
    await prisma.article.create({
      data: {
        titleFr: article.title, titleAr: article.title, titleEn: article.title, slug,
        excerptFr: article.excerpt, contentFr: article.excerpt,
        categoryId: categoryIdByName[article.category], published: true, publishedAt: new Date(),
      },
    });
  }

  console.log("Seeding testimonials…");
  for (const t of DEMO_TESTIMONIALS) {
    await prisma.testimonial.create({
      data: { authorName: t.name, authorRole: t.role, content: t.content, rating: t.rating, approved: true },
    });
  }

  console.log("Seeding projects…");
  for (const p of DEMO_PROJECTS) {
    await prisma.project.create({
      data: { nameFr: p.name, nameAr: p.name, nameEn: p.name, slug: p.slug, descriptionFr: p.description.join(" ") },
    });
  }

  console.log("Seeding properties…");
  for (const p of DEMO_PROPERTIES) {
    await prisma.property.create({
      data: {
        reference: p.reference, titleFr: p.title, titleAr: p.title, titleEn: p.title, slug: p.slug,
        descriptionFr: p.description.join(" "), address: p.address,
        listingType: p.listingType === "Vente" ? "VENTE" : "LOCATION",
        propertyType: mapPropertyType(p.type),
        status: "PUBLIE",
        price: Number(p.price.replace(/[^\d]/g, "")),
        surface: p.surface, rooms: p.rooms, bedrooms: p.bedrooms, bathrooms: p.bathrooms,
        latitude: p.lat, longitude: p.lng, amenities: p.amenities, featured: !!p.featured,
        agentId: agentIdByDemoId[p.agentId],
      },
    });
  }

  console.log("Seeding FAQ…");
  for (const [index, f] of DEMO_FAQS.entries()) {
    await prisma.faq.create({
      data: { questionFr: f.question, answerFr: f.answer, category: f.category, order: index, published: true },
    });
  }

  console.log("Seed terminé avec succès.");
  console.log("Comptes de test créés (mot de passe : ChangeMoi123!) :");
  users.forEach((u) => console.log(`  - ${u.email} (${u.role})`));
}

function mapPropertyType(type: string) {
  const map: Record<string, string> = {
    Villa: "VILLA", Appartement: "APPARTEMENT", Maison: "MAISON", Terrain: "TERRAIN",
    "Local commercial": "LOCAL_COMMERCIAL", Bureau: "BUREAU",
  };
  return (map[type] ?? "APPARTEMENT") as any;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
