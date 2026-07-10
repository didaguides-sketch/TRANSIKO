"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Expand, Home, Building2, Warehouse, Landmark } from "lucide-react";

const TYPE_ICON: Record<string, any> = {
  Villa: Home,
  Appartement: Building2,
  Maison: Warehouse,
  Terrain: Landmark,
  "Local commercial": Building2,
  Bureau: Building2,
};

export default function Gallery({ hues, type }: { hues: number[]; type: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const Icon = TYPE_ICON[type] ?? Home;

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % hues.length), [hues.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + hues.length) % hues.length), [hues.length]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  function tile(hue: number, i: number, className: string) {
    return (
      <button
        key={i}
        onClick={() => { setIndex(i); setOpen(true); }}
        className={`group relative overflow-hidden ${className}`}
        style={{ background: `linear-gradient(135deg, hsl(${hue} 45% 30%), hsl(${hue + 30} 35% 45%))` }}
      >
        <span className="flex h-full items-center justify-center text-white/80">
          <Icon size={i === 0 ? 44 : 26} />
        </span>
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
          <Expand size={18} className="text-white" />
        </span>
      </button>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-2xl sm:grid-cols-4 sm:grid-rows-2">
        {tile(hues[0], 0, "col-span-2 row-span-2 h-56 sm:h-full")}
        {hues.slice(1, 5).map((h, i) => tile(h, i + 1, "h-28 sm:h-full"))}
      </div>
      {hues.length > 5 && (
        <button
          onClick={() => { setIndex(0); setOpen(true); }}
          className="mt-2 text-sm font-bold text-maroon-700"
        >
          Voir les {hues.length} photos
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4">
          <button onClick={close} className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Fermer">
            <X size={20} />
          </button>
          <button onClick={prev} className="absolute start-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Précédent">
            <ChevronLeft size={22} />
          </button>
          <div
            className="flex h-[60vh] w-full max-w-2xl items-center justify-center rounded-2xl text-white/80"
            style={{ background: `linear-gradient(135deg, hsl(${hues[index]} 45% 30%), hsl(${hues[index] + 30} 35% 45%))` }}
          >
            <Icon size={64} />
          </div>
          <button onClick={next} className="absolute end-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Suivant">
            <ChevronRight size={22} />
          </button>
          <div className="absolute bottom-5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
            {index + 1} / {hues.length}
          </div>
        </div>
      )}
    </div>
  );
}
