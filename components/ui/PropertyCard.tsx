"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MapPin, BedDouble, Ruler, Home, Building2, Warehouse, Landmark } from "lucide-react";
import type { DemoProperty } from "@/data/demo";

const TYPE_ICON: Record<string, any> = {
  Villa: Home,
  Appartement: Building2,
  Maison: Warehouse,
  Terrain: Landmark,
  "Local commercial": Building2,
  Bureau: Building2,
};

export default function PropertyCard({ property, locale }: { property: DemoProperty; locale: string }) {
  const [fav, setFav] = useState(false);
  const Icon = TYPE_ICON[property.type] ?? Home;

  return (
    <Link
      href={`/${locale}/proprietes/${property.slug}` as any}
      className="block overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-card"
    >
      <div
        className="relative flex h-40 items-center justify-center text-white/85"
        style={{
          background: `linear-gradient(135deg, hsl(${property.hue} 45% 30%), hsl(${property.hue + 30} 35% 45%))`,
        }}
      >
        <Icon size={32} />
        <span className="absolute start-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold text-slate-900">
          {property.listingType}
        </span>
        <button
          onClick={(e) => { e.preventDefault(); setFav((v) => !v); }}
          className="absolute end-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90"
          aria-label="Ajouter aux favoris"
        >
          <Heart size={15} fill={fav ? "#7A2331" : "none"} color={fav ? "#7A2331" : "#454C56"} />
        </button>
      </div>
      <div className="p-4">
        <h4 className="font-heading text-base font-extrabold text-slate-900">{property.title}</h4>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin size={13} /> {property.city}
        </div>
        <div className="mt-2.5 flex gap-4 text-xs text-slate-500">
          {property.rooms > 0 && (
            <span className="flex items-center gap-1"><BedDouble size={14} /> {property.rooms}</span>
          )}
          <span className="flex items-center gap-1"><Ruler size={14} /> {property.surface} m²</span>
        </div>
        <div className="mt-2.5 text-[15px] font-extrabold text-maroon-700">{property.price}</div>
      </div>
    </Link>
  );
}
