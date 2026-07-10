export type DemoProperty = {
  id: string;
  reference: string;
  slug: string;
  title: string;
  city: string;
  wilaya: string;
  address: string;
  type: "Villa" | "Appartement" | "Maison" | "Terrain" | "Local commercial" | "Bureau";
  listingType: "Vente" | "Location";
  price: string;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  yearBuilt?: number;
  featured?: boolean;
  hue: number;
  gallery: number[]; // teintes utilisées pour générer les visuels de démonstration
  description: string[];
  amenities: string[];
  lat: number;
  lng: number;
  agentId: string;
  videoUrl?: string;
};

export const DEMO_PROPERTIES: DemoProperty[] = [
  {
    id: "p1", reference: "TRK-1001", slug: "villa-moderne-piscine-hydra-alger",
    title: "Villa moderne avec piscine", city: "Hydra, Alger", wilaya: "Alger",
    address: "Lotissement Les Pins, Hydra, Alger",
    type: "Villa", listingType: "Vente", price: "48 500 000 DA",
    surface: 380, rooms: 5, bedrooms: 4, bathrooms: 3, floor: 0, yearBuilt: 2021,
    featured: true, hue: 0, gallery: [0, 15, 350, 25, 5],
    description: [
      "Cette villa moderne se trouve dans l'un des quartiers les plus recherchés d'Hydra, à quelques minutes du centre d'Alger. Elle offre de grands volumes baignés de lumière naturelle et une piscine privée entourée d'un jardin paysager.",
      "Le rez-de-chaussée s'organise autour d'un vaste séjour ouvert sur la terrasse, une cuisine entièrement équipée et une suite parentale. L'étage accueille trois chambres supplémentaires avec dressing et salles d'eau.",
      "Un garage double, une buanderie et un système de sécurité complet complètent ce bien clé en main, idéal pour une famille recherchant confort et prestige.",
    ],
    amenities: ["Piscine privée", "Jardin paysager", "Garage 2 voitures", "Climatisation centrale", "Système de sécurité", "Cuisine équipée", "Terrasse", "Chauffage central"],
    lat: 36.7378, lng: 3.0364, agentId: "a1",
  },
  {
    id: "p2", reference: "TRK-1002", slug: "appartement-f3-vue-mer-ain-benian",
    title: "Appartement F3 vue mer", city: "Aïn Benian, Alger", wilaya: "Alger",
    address: "Rue du Littoral, Aïn Benian, Alger",
    type: "Appartement", listingType: "Vente", price: "18 200 000 DA",
    surface: 95, rooms: 3, bedrooms: 2, bathrooms: 2, floor: 4, yearBuilt: 2019,
    featured: true, hue: 40, gallery: [40, 30, 50, 10],
    description: [
      "Un appartement lumineux avec une vue dégagée sur la baie d'Alger, situé au 4e étage d'une résidence sécurisée à Aïn Benian.",
      "Il se compose d'un salon spacieux, de deux chambres, d'une cuisine séparée équipée et de deux salles d'eau. Un balcon filant prolonge le séjour et offre un cadre idéal pour profiter du coucher de soleil sur la mer.",
    ],
    amenities: ["Vue mer", "Résidence sécurisée", "Ascenseur", "Balcon", "Parking souterrain", "Cuisine équipée"],
    lat: 36.7975, lng: 2.9235, agentId: "a2",
  },
  {
    id: "p3", reference: "TRK-1003", slug: "duplex-haut-standing-vieux-kouba",
    title: "Duplex haut standing", city: "Vieux Kouba, Alger", wilaya: "Alger",
    address: "Rue Duguet, Vieux Kouba, Alger",
    type: "Appartement", listingType: "Location", price: "160 000 DA / mois",
    surface: 140, rooms: 4, bedrooms: 3, bathrooms: 2, floor: 2, yearBuilt: 2020,
    featured: true, hue: 20, gallery: [20, 35, 5, 45],
    description: [
      "Duplex haut standing au cœur de Vieux Kouba, à proximité immédiate des commerces, écoles et transports. Idéal pour une location longue durée meublée ou non meublée.",
      "Le bien comprend un double séjour, trois chambres, deux salles de bain et une cuisine américaine entièrement équipée, répartis sur deux niveaux avec une belle hauteur sous plafond.",
    ],
    amenities: ["Cuisine américaine équipée", "Climatisation", "Parking privé", "Interphone / vidéophone", "Proche transports"],
    lat: 36.7139, lng: 3.0631, agentId: "a1",
  },
  {
    id: "p4", reference: "TRK-1004", slug: "villa-jardin-cheraga",
    title: "Villa avec jardin", city: "Chéraga, Alger", wilaya: "Alger",
    address: "Cité El Bahia, Chéraga, Alger",
    type: "Villa", listingType: "Vente", price: "62 000 000 DA",
    surface: 420, rooms: 6, bedrooms: 5, bathrooms: 4, yearBuilt: 2018,
    hue: 340, gallery: [340, 355, 10, 325],
    description: [
      "Grande villa familiale à Chéraga disposant d'un vaste jardin arboré et d'espaces de réception généreux, parfaite pour recevoir famille et amis.",
      "Elle comprend un salon double, une salle à manger, cinq chambres dont une suite parentale au rez-de-chaussée, ainsi qu'un sous-sol aménageable.",
    ],
    amenities: ["Grand jardin", "Sous-sol", "Garage", "Cheminée", "Climatisation", "Portail automatique"],
    lat: 36.7669, lng: 2.9486, agentId: "a3",
  },
  {
    id: "p5", reference: "TRK-1005", slug: "terrain-constructible-zeralda",
    title: "Terrain constructible", city: "Zéralda, Alger", wilaya: "Alger",
    address: "Route Nationale, Zéralda, Alger",
    type: "Terrain", listingType: "Vente", price: "9 800 000 DA",
    surface: 500, rooms: 0, bedrooms: 0, bathrooms: 0,
    hue: 10, gallery: [10, 20, 0],
    description: [
      "Terrain constructible de 500 m² situé à Zéralda, à proximité des plages et des grands axes routiers. Idéal pour la construction d'une villa individuelle ou d'un petit projet résidentiel.",
      "Le terrain est viabilisé (eau, électricité, assainissement) et dispose d'un acte de propriété en règle.",
    ],
    amenities: ["Terrain viabilisé", "Acte de propriété", "Proche plages", "Accès route principale"],
    lat: 36.7092, lng: 2.8464, agentId: "a3",
  },
  {
    id: "p6", reference: "TRK-1006", slug: "appartement-f2-centre-tlemcen",
    title: "Appartement F2 centre-ville", city: "Tlemcen centre", wilaya: "Tlemcen",
    address: "Avenue Émir Abdelkader, Tlemcen",
    type: "Appartement", listingType: "Location", price: "45 000 DA / mois",
    surface: 65, rooms: 2, bedrooms: 1, bathrooms: 1, floor: 1, yearBuilt: 2015,
    hue: 355, gallery: [355, 5, 340],
    description: [
      "Appartement F2 idéalement situé en plein centre-ville de Tlemcen, à proximité de tous les commerces et services. Parfait pour un jeune couple ou un usage professionnel.",
    ],
    amenities: ["Centre-ville", "Cuisine équipée", "Chauffage", "Proche commerces"],
    lat: 34.8783, lng: -1.3150, agentId: "a2",
  },
  {
    id: "p7", reference: "TRK-1007", slug: "local-commercial-avenue-oran",
    title: "Local commercial avenue principale", city: "Oran centre", wilaya: "Oran",
    address: "Boulevard de la Soummam, Oran",
    type: "Local commercial", listingType: "Location", price: "220 000 DA / mois",
    surface: 180, rooms: 0, bedrooms: 0, bathrooms: 1,
    hue: 15, gallery: [15, 25, 5],
    description: [
      "Local commercial de 180 m² sur l'une des avenues les plus fréquentées d'Oran, avec une large vitrine et un excellent passage piéton.",
      "Idéal pour un commerce de détail, une agence ou un show-room. Le local dispose d'une mezzanine et d'un espace de stockage à l'arrière.",
    ],
    amenities: ["Grande vitrine", "Mezzanine", "Espace de stockage", "Fort passage piéton", "Climatisation"],
    lat: 35.6969, lng: -0.6331, agentId: "a2",
  },
  {
    id: "p8", reference: "TRK-1008", slug: "maison-traditionnelle-renovee-bejaia",
    title: "Maison traditionnelle rénovée", city: "Béjaïa", wilaya: "Béjaïa",
    address: "Vieille ville, Béjaïa",
    type: "Maison", listingType: "Vente", price: "26 500 000 DA",
    surface: 210, rooms: 4, bedrooms: 3, bathrooms: 2, yearBuilt: 2022,
    hue: 350, gallery: [350, 10, 330],
    description: [
      "Maison de caractère entièrement rénovée dans la vieille ville de Béjaïa, alliant cachet traditionnel et confort moderne.",
    ],
    amenities: ["Rénovation récente", "Patio intérieur", "Vue sur la baie", "Proche du port"],
    lat: 36.7509, lng: 5.0567, agentId: "a3",
  },
  {
    id: "p9", reference: "TRK-1009", slug: "villa-contemporaine-boumerdes",
    title: "Villa contemporaine", city: "Boumerdès", wilaya: "Boumerdès",
    address: "Corso, Boumerdès",
    type: "Villa", listingType: "Vente", price: "55 000 000 DA",
    surface: 350, rooms: 5, bedrooms: 4, bathrooms: 3, yearBuilt: 2023,
    hue: 30, gallery: [30, 40, 20],
    description: [
      "Villa contemporaine neuve à Boumerdès, à quelques minutes des plages du Corso, avec des finitions haut de gamme et une architecture épurée.",
    ],
    amenities: ["Construction neuve", "Finitions haut de gamme", "Proche plages", "Garage", "Terrasse"],
    lat: 36.7525, lng: 3.4581, agentId: "a1",
  },
  {
    id: "p10", reference: "TRK-1010", slug: "appartement-f4-residence-bordj-el-kiffan",
    title: "Appartement F4 résidence sécurisée", city: "Bordj El Kiffan, Alger", wilaya: "Alger",
    address: "Résidence Les Palmiers, Bordj El Kiffan, Alger",
    type: "Appartement", listingType: "Vente", price: "24 800 000 DA",
    surface: 120, rooms: 4, bedrooms: 3, bathrooms: 2, floor: 3, yearBuilt: 2020,
    hue: 5, gallery: [5, 15, 355],
    description: [
      "Appartement F4 au sein d'une résidence sécurisée avec espaces verts communs, proche du littoral et des transports.",
    ],
    amenities: ["Résidence sécurisée", "Espaces verts", "Ascenseur", "Parking", "Aire de jeux"],
    lat: 36.7539, lng: 3.1858, agentId: "a1",
  },
  {
    id: "p11", reference: "TRK-1011", slug: "bureau-moderne-open-space-bab-ezzouar",
    title: "Bureau moderne open-space", city: "Bab Ezzouar, Alger", wilaya: "Alger",
    address: "Cyber Parc, Bab Ezzouar, Alger",
    type: "Bureau", listingType: "Location", price: "95 000 DA / mois",
    surface: 90, rooms: 0, bedrooms: 0, bathrooms: 1, floor: 2,
    hue: 200, gallery: [200, 210, 190],
    description: [
      "Bureau open-space moderne au sein du Cyber Parc de Bab Ezzouar, adapté aux entreprises technologiques et start-ups.",
    ],
    amenities: ["Open-space modulable", "Fibre optique", "Climatisation", "Parking visiteurs", "Salle de réunion partagée"],
    lat: 36.7180, lng: 3.1858, agentId: "a2",
  },
  {
    id: "p12", reference: "TRK-1012", slug: "terrain-agricole-tipaza",
    title: "Terrain agricole", city: "Tipaza", wilaya: "Tipaza",
    address: "Route de Sidi Amar, Tipaza",
    type: "Terrain", listingType: "Vente", price: "14 200 000 DA",
    surface: 1200, rooms: 0, bedrooms: 0, bathrooms: 0,
    hue: 90, gallery: [90, 100, 80],
    description: [
      "Vaste terrain agricole de 1200 m² à proximité de Tipaza, adapté à la culture ou à un projet agrotouristique.",
    ],
    amenities: ["Sol fertile", "Accès route", "Point d'eau", "Clôturé"],
    lat: 36.5892, lng: 2.4481, agentId: "a3",
  },
];

export type DemoProject = {
  id: string;
  slug: string;
  name: string;
  wilaya: string;
  city: string;
  address: string;
  type: "Résidentiel" | "Bureaux" | "Mixte" | "Commercial";
  status: "En cours" | "Bientôt disponible" | "Livré";
  delivery: string;
  priceFromValue: number;
  priceFrom: string;
  surfaceFrom: number;
  units: string;
  developer: string;
  hue: number;
  gallery: number[];
  description: string[];
  amenities: string[];
  lat: number;
  lng: number;
};

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: "pr1", slug: "residence-les-jardins-de-kouba", name: "Résidence Les Jardins de Kouba",
    wilaya: "Alger", city: "Kouba, Alger", address: "Route de Kouba, Alger",
    type: "Résidentiel", status: "En cours", delivery: "2027",
    priceFromValue: 16500000, priceFrom: "16 500 000 DA", surfaceFrom: 75, units: "120 logements (F2 à F5)",
    developer: "Groupe Transiko Promotion", hue: 340, gallery: [340, 350, 330, 5],
    description: [
      "Un programme résidentiel neuf au cœur de Kouba, pensé pour les familles à la recherche d'un cadre de vie calme et bien desservi.",
      "La résidence proposera des appartements du F2 au F5, des espaces verts communs, des aires de jeux et un parking souterrain sécurisé.",
    ],
    amenities: ["Espaces verts communs", "Parking souterrain", "Aire de jeux", "Sécurité 24/7", "Ascenseurs"],
    lat: 36.7139, lng: 3.0631,
  },
  {
    id: "pr2", slug: "cite-al-bahdja-ain-benian", name: "Cité Al Bahdja",
    wilaya: "Alger", city: "Aïn Benian, Alger", address: "Route du littoral, Aïn Benian, Alger",
    type: "Résidentiel", status: "Bientôt disponible", delivery: "2026",
    priceFromValue: 14200000, priceFrom: "14 200 000 DA", surfaceFrom: 68, units: "80 logements (F2 à F4)",
    developer: "SARL Bahdja Immo", hue: 40, gallery: [40, 30, 50],
    description: [
      "Cité résidentielle avec vue sur mer à Aïn Benian, à quelques minutes des plages et du centre d'Alger.",
    ],
    amenities: ["Vue mer", "Proche plages", "Espaces commerciaux au rez-de-chaussée", "Parking"],
    lat: 36.7975, lng: 2.9235,
  },
  {
    id: "pr3", slug: "complexe-business-bay-bab-ezzouar", name: "Complexe Business Bay",
    wilaya: "Alger", city: "Bab Ezzouar, Alger", address: "Cyber Parc, Bab Ezzouar, Alger",
    type: "Bureaux", status: "En cours", delivery: "2028",
    priceFromValue: 22000000, priceFrom: "22 000 000 DA", surfaceFrom: 60, units: "Bureaux & commerces (40 à 300 m²)",
    developer: "Groupe Transiko Promotion", hue: 200, gallery: [200, 210, 190],
    description: [
      "Complexe d'affaires moderne à Bab Ezzouar, conçu pour accueillir bureaux, sièges sociaux et commerces au sein d'un même écosystème.",
    ],
    amenities: ["Fibre optique", "Parking visiteurs", "Salle de conférence", "Sécurité 24/7", "Climatisation centrale"],
    lat: 36.7180, lng: 3.1858,
  },
  {
    id: "pr4", slug: "residence-oran-bay", name: "Résidence Oran Bay",
    wilaya: "Oran", city: "Front de mer, Oran", address: "Corniche Oranaise, Oran",
    type: "Résidentiel", status: "En cours", delivery: "2027",
    priceFromValue: 19800000, priceFrom: "19 800 000 DA", surfaceFrom: 82, units: "95 logements (F3 à F5)",
    developer: "Oran Bay Développement", hue: 15, gallery: [15, 25, 5],
    description: [
      "Résidence haut standing sur le front de mer d'Oran, avec vue panoramique sur la baie et prestations premium.",
    ],
    amenities: ["Vue panoramique", "Piscine commune", "Salle de sport", "Parking souterrain", "Espaces verts"],
    lat: 35.7086, lng: -0.6461,
  },
  {
    id: "pr5", slug: "village-jardins-boumerdes", name: "Village Les Jardins de Boumerdès",
    wilaya: "Boumerdès", city: "Boumerdès", address: "Route de Corso, Boumerdès",
    type: "Mixte", status: "Livré", delivery: "2025",
    priceFromValue: 21000000, priceFrom: "21 000 000 DA", surfaceFrom: 140, units: "40 villas mitoyennes",
    developer: "Boumerdès Habitat", hue: 30, gallery: [30, 40, 20],
    description: [
      "Programme de villas mitoyennes déjà livré, réparti autour d'allées paysagères et proche des plages de Boumerdès.",
    ],
    amenities: ["Villas avec jardin", "Allées paysagères", "Proche plages", "Garage privé"],
    lat: 36.7525, lng: 3.4581,
  },
];

export const DEMO_AGENTS = [
  { id: "a1", name: "Karim Belkacem", role: "Directeur des ventes", phone: "+213 551 87 51 79", whatsapp: "+213558207793", email: "transiko@gmail.com", lang: "Arabe · Français", bio: "Plus de 12 ans d'expérience dans l'immobilier résidentiel à Alger. Karim accompagne particuliers et investisseurs dans leurs projets d'achat et de vente." },
  { id: "a2", name: "Amina Cherif", role: "Conseillère location", phone: "+213 558 20 77 93", whatsapp: "+213558207793", email: "transiko@gmail.com", lang: "Arabe · Français · Anglais", bio: "Spécialiste de la location longue durée, Amina aide locataires et propriétaires à trouver le bon accord, rapidement et en toute confiance." },
  { id: "a3", name: "Yacine Boudiaf", role: "Conseiller en investissement", phone: "+213 551 87 51 79", whatsapp: "+213558207793", email: "transiko@gmail.com", lang: "Arabe · Français", bio: "Yacine conseille les investisseurs sur les meilleures opportunités du marché algérien, du terrain au programme neuf." },
];

export const DEMO_TESTIMONIALS = [
  { id: "t1", name: "Sonia R.", role: "Acquéreur, Alger", content: "Un accompagnement sérieux du premier appel jusqu'à la signature. L'équipe Transiko a été très réactive.", rating: 5 },
  { id: "t2", name: "Mourad B.", role: "Investisseur, Oran", content: "Des biens vérifiés et une estimation de prix fiable. Je recommande Transiko pour tout projet immobilier.", rating: 5 },
  { id: "t3", name: "Nadia K.", role: "Locataire, Kouba", content: "J'ai trouvé mon appartement en moins de deux semaines grâce à leur sélection de qualité.", rating: 4 },
];

export const DEMO_ARTICLES = [
  {
    id: "b1", slug: "acheter-a-alger-en-2026",
    title: "Acheter à Alger en 2026 : ce qu'il faut savoir", category: "Guide d'achat",
    excerpt: "Les étapes clés, les documents nécessaires et les pièges à éviter avant de signer.",
    content: [
      "Acheter un bien à Alger implique plusieurs étapes administratives qu'il vaut mieux anticiper : vérification du titre de propriété, certificat de conformité, et parfois autorisation de l'agence foncière selon la zone.",
      "Avant toute offre, faites vérifier le dossier par un notaire et assurez-vous que le bien est libre de toute hypothèque ou litige de succession, fréquents dans l'ancien.",
      "Comptez généralement entre 4 et 8 semaines entre l'accord de principe et la signature définitive, le temps de réunir les documents et de passer devant notaire.",
      "Transiko Immobilier accompagne chaque acquéreur à chaque étape, de la visite à la remise des clés.",
    ],
  },
  {
    id: "b2", slug: "quartiers-alger-qui-montent",
    title: "Les quartiers d'Alger qui montent", category: "Marché immobilier",
    excerpt: "Un tour d'horizon des zones à fort potentiel autour de la capitale.",
    content: [
      "Certains quartiers périphériques d'Alger connaissent une forte dynamique portée par de nouveaux programmes immobiliers et une meilleure desserte routière.",
      "Aïn Benian et Zéralda séduisent par leur proximité avec le littoral, tandis que Bab Ezzouar s'impose comme un pôle d'affaires grâce à ses bureaux neufs.",
      "Kouba et Bir Mourad Raïs restent des valeurs sûres pour les familles, avec un bon compromis entre calme et accès aux commodités du centre.",
    ],
  },
  {
    id: "b3", slug: "louer-sans-mauvaise-surprise",
    title: "Louer sans mauvaise surprise : notre check-list", category: "Location",
    excerpt: "Les points à vérifier avant de signer un contrat de location en Algérie.",
    content: [
      "Avant de signer, visitez le bien à deux moments différents de la journée pour évaluer la luminosité, le bruit et le voisinage.",
      "Demandez toujours un état des lieux écrit et détaillé, daté et signé par les deux parties, avec photos à l'appui.",
      "Vérifiez que le montant de la caution et les conditions de restitution sont clairement précisés dans le contrat avant de vous engager.",
    ],
  },
];

export const DEMO_FAQS = [
  { id: "f1", category: "Achat", question: "Quels documents sont nécessaires pour acheter un bien en Algérie ?", answer: "Il vous faut une pièce d'identité valide, un justificatif de domicile, et pour les biens financés par un crédit, une attestation bancaire. Transiko vous accompagne dans la constitution complète du dossier." },
  { id: "f2", category: "Achat", question: "Combien de temps prend une transaction immobilière ?", answer: "En général entre 4 et 8 semaines entre l'accord de principe et la signature définitive chez le notaire, selon la complexité du dossier." },
  { id: "f3", category: "Location", question: "Quelle caution est habituellement demandée ?", answer: "La caution correspond généralement à un à trois mois de loyer, selon le bien et les conditions négociées avec le propriétaire." },
  { id: "f4", category: "Location", question: "Puis-je visiter un bien avant de m'engager ?", answer: "Oui, toutes nos visites sont gratuites et sans engagement. Nous recommandons même de visiter à deux moments différents de la journée." },
  { id: "f5", category: "Estimation", question: "L'estimation de mon bien est-elle gratuite ?", answer: "Oui, notre estimation initiale est entièrement gratuite et sans engagement, réalisée par un conseiller Transiko ou via notre outil d'estimation en ligne." },
  { id: "f6", category: "Transiko", question: "Dans quelles wilayas intervenez-vous ?", answer: "Nous intervenons principalement à Alger et sa région, ainsi que dans plusieurs grandes wilayas d'Algérie : Oran, Béjaïa, Tlemcen, Boumerdès, Tipaza et Sétif." },
  { id: "f7", category: "Transiko", question: "Comment contacter un conseiller rapidement ?", answer: "Le plus rapide est WhatsApp au +213 558 20 77 93, ou notre formulaire de contact — nous répondons généralement sous 24h ouvrées." },
];

export type DemoFaq = (typeof DEMO_FAQS)[number];

export const STATS = [
  { label: "Biens gérés", value: "1 200+" },
  { label: "Clients accompagnés", value: "3 500+" },
  { label: "Wilayas couvertes", value: "12" },
  { label: "Années d'expérience", value: "9" },
];

export const DEMO_SERVICES = [
  { icon: "Home", title: "Achat immobilier", desc: "Accompagnement complet pour trouver et acquérir le bien idéal.", detail: "De la définition de vos critères à la signature chez le notaire, un conseiller Transiko vous accompagne à chaque visite et négociation." },
  { icon: "Key", title: "Location", desc: "Gestion locative sereine pour propriétaires et locataires.", detail: "Recherche de locataires sérieux, rédaction du contrat, état des lieux : nous simplifions la location pour les deux parties." },
  { icon: "Calculator", title: "Estimation de prix", desc: "Évaluation fiable basée sur le marché algérien actuel.", detail: "Notre méthode combine données de marché locales et expertise terrain pour une estimation réaliste, gratuite et sans engagement." },
  { icon: "FileSearch", title: "Conseil juridique", desc: "Vérification des documents et sécurisation des transactions.", detail: "Vérification des titres de propriété, accompagnement notarial et sécurisation de chaque étape administrative de votre transaction." },
  { icon: "Users2", title: "Gestion de projets", desc: "Suivi de programmes immobiliers neufs de A à Z.", detail: "De la commercialisation à la livraison, nous accompagnons promoteurs et acquéreurs sur les programmes neufs partout en Algérie." },
  { icon: "Building", title: "Immobilier d'entreprise", desc: "Bureaux et locaux commerciaux pour votre activité.", detail: "Trouvez le bureau ou le local commercial adapté à votre activité, avec un accompagnement dédié aux professionnels." },
];
