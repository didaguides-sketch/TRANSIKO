export type WilayaRef = { code: string; ar: string; fr: string; en: string };

// Liste de référence des wilayas d'Algérie (les plus demandées en premier
// pour l'affichage "Propriétés par wilaya" sur la page d'accueil).
export const WILAYAS: WilayaRef[] = [
  { code: "16", ar: "الجزائر", fr: "Alger", en: "Algiers" },
  { code: "31", ar: "وهران", fr: "Oran", en: "Oran" },
  { code: "25", ar: "قسنطينة", fr: "Constantine", en: "Constantine" },
  { code: "23", ar: "عنابة", fr: "Annaba", en: "Annaba" },
  { code: "09", ar: "البليدة", fr: "Blida", en: "Blida" },
  { code: "06", ar: "بجاية", fr: "Béjaïa", en: "Béjaïa" },
  { code: "13", ar: "تلمسان", fr: "Tlemcen", en: "Tlemcen" },
  { code: "19", ar: "سطيف", fr: "Sétif", en: "Sétif" },
  { code: "35", ar: "بومرداس", fr: "Boumerdès", en: "Boumerdès" },
  { code: "42", ar: "تيبازة", fr: "Tipaza", en: "Tipaza" },
];

export const ALGIERS_COMMUNES = [
  "Vieux Kouba", "Hydra", "Bir Mourad Raïs", "El Biar", "Dély Ibrahim",
  "Chéraga", "Ben Aknoun", "Bab Ezzouar", "Bordj El Kiffan", "Aïn Benian",
];
