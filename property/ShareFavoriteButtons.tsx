"use client";

import { useState } from "react";
import { Share2, Heart, Check } from "lucide-react";

export default function ShareFavoriteButtons({ title }: { title: string }) {
  const [fav, setFav] = useState(false);
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title, url });
        return;
      } catch {
        /* l'utilisateur a annulé le partage */
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={share}
        className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:border-maroon-500"
      >
        {copied ? <Check size={15} className="text-green-600" /> : <Share2 size={15} />}
        {copied ? "Lien copié" : "Partager"}
      </button>
      <button
        onClick={() => setFav((v) => !v)}
        className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:border-maroon-500"
      >
        <Heart size={15} fill={fav ? "#7A2331" : "none"} color={fav ? "#7A2331" : "currentColor"} />
        Favori
      </button>
    </div>
  );
}
