/**
 * Couche IA de Transiko Immobilier.
 *
 * Toutes les fonctions ci-dessous sont conçues pour être invoquées depuis
 * n'importe quelle page ou route API. Tant qu'aucune clé n'est configurée
 * dans les variables d'environnement, chaque fonction retourne un résultat
 * de repli (fallback) sans jamais faire planter le site.
 *
 * Pour activer l'IA plus tard : ajouter OPENAI_API_KEY (ou ANTHROPIC_API_KEY)
 * dans .env, puis implémenter l'appel réel dans `callModel()`.
 */

export const AI_ENABLED = Boolean(
  process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY
);

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

async function callModel(messages: ChatMessage[]): Promise<string | null> {
  if (!AI_ENABLED) return null;

  // Emplacement réservé pour l'appel réel à l'API (OpenAI, Anthropic, etc.)
  // Exemple :
  // const res = await fetch("https://api.openai.com/v1/chat/completions", { ... });
  // return (await res.json()).choices[0].message.content;

  return null;
}

/** Assistant conversationnel — répond aux questions des visiteurs. */
export async function aiChatAssistant(userMessage: string, locale: string) {
  const result = await callModel([
    { role: "system", content: `Tu es l'assistant immobilier de Transiko (langue: ${locale}).` },
    { role: "user", content: userMessage },
  ]);
  return (
    result ??
    "Notre assistant intelligent n'est pas encore activé. Un conseiller Transiko vous répondra rapidement via WhatsApp."
  );
}

/** Transforme une recherche en langage naturel en filtres structurés. */
export async function aiParseNaturalSearch(query: string) {
  const result = await callModel([
    { role: "system", content: "Extrait wilaya, type de bien, budget et nombre de pièces au format JSON." },
    { role: "user", content: query },
  ]);
  if (!result) return null; // le moteur de recherche classique prend le relais
  try {
    return JSON.parse(result);
  } catch {
    return null;
  }
}

/** Génère une description de bien à partir de ses caractéristiques. */
export async function aiGeneratePropertyDescription(input: Record<string, unknown>) {
  const result = await callModel([
    { role: "system", content: "Rédige une description immobilière vendeuse et honnête en français." },
    { role: "user", content: JSON.stringify(input) },
  ]);
  return result; // null => l'agent doit rédiger la description manuellement
}

/** Traduit une annonce vers une autre langue. */
export async function aiTranslateListing(text: string, targetLocale: "ar" | "fr" | "en") {
  const result = await callModel([
    { role: "system", content: `Traduis ce texte immobilier vers : ${targetLocale}.` },
    { role: "user", content: text },
  ]);
  return result ?? text; // repli : texte original inchangé
}

/** Suggère des biens similaires à partir d'un identifiant de propriété. */
export async function aiSimilarProperties(propertyId: string) {
  // Repli : la recherche par similarité classique (même wilaya/type/budget) prend le relais.
  return null;
}

/** Résume les caractéristiques d'un bien en quelques lignes. */
export async function aiSummarizeProperty(input: Record<string, unknown>) {
  const result = await callModel([
    { role: "system", content: "Résume ce bien immobilier en 3 phrases maximum." },
    { role: "user", content: JSON.stringify(input) },
  ]);
  return result;
}

/** Estimation IA du prix d'un bien à partir de ses caractéristiques. */
export async function aiEstimatePrice(input: Record<string, unknown>) {
  const result = await callModel([
    { role: "system", content: "Estime le prix de marché en dinars algériens (DZD). Réponds uniquement avec un nombre." },
    { role: "user", content: JSON.stringify(input) },
  ]);
  if (!result) return null; // repli : un conseiller Transiko rappelle sous 48h
  const value = Number(result.replace(/[^\d]/g, ""));
  return Number.isFinite(value) ? value : null;
}
