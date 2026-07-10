"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { WILAYAS } from "@/data/wilayas";

const PROPERTY_TYPES = ["Villa", "Appartement", "Maison", "Terrain", "Local commercial", "Bureau"];

export default function SearchBar({ dict }: { dict: any }) {
  const router = useRouter();
  const [listingType, setListingType] = useState<"Vente" | "Location">("Vente");
  const [advanced, setAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    propertyType: "",
    wilaya: "",
    priceMin: "",
    priceMax: "",
    surface: "",
    rooms: "",
    bathrooms: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ transaction: listingType, ...filters }).toString();
    router.push(`/proprietes?${params}` as any);
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-2 text-left shadow-2xl">
      <div className="flex flex-col gap-2 p-1 sm:flex-row">
        <input
          className="w-full rounded-xl px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-500 focus:outline-none"
          placeholder={dict.hero.searchPlaceholder}
          value={filters.keyword}
          onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value }))}
        />
        <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-6 py-3.5 font-bold text-white shadow-[0_6px_18px_-6px_rgba(122,35,49,.55)]">
          <Search size={16} /> {dict.hero.searchButton}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-1 pb-1 pt-1">
        <button
          type="button"
          onClick={() => setListingType("Vente")}
          className={`rounded-xl px-4 py-2 text-sm font-bold ${listingType === "Vente" ? "bg-gradient-to-br from-maroon-700 to-maroon-500 text-white" : "border border-slate-200 text-slate-700"}`}
        >
          {dict.hero.buy}
        </button>
        <button
          type="button"
          onClick={() => setListingType("Location")}
          className={`rounded-xl px-4 py-2 text-sm font-bold ${listingType === "Location" ? "bg-gradient-to-br from-maroon-700 to-maroon-500 text-white" : "border border-slate-200 text-slate-700"}`}
        >
          {dict.hero.rent}
        </button>

        <button
          type="button"
          onClick={() => setAdvanced((v) => !v)}
          className="ms-auto flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700"
        >
          <SlidersHorizontal size={14} /> Filtres avancés
        </button>
      </div>

      {advanced && (
        <div className="grid grid-cols-2 gap-2.5 border-t border-slate-100 p-3 md:grid-cols-4">
          <select
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700"
            value={filters.propertyType}
            onChange={(e) => setFilters((f) => ({ ...f, propertyType: e.target.value }))}
          >
            <option value="">{dict.search.propertyType}</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          <select
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700"
            value={filters.wilaya}
            onChange={(e) => setFilters((f) => ({ ...f, wilaya: e.target.value }))}
          >
            <option value="">{dict.search.wilaya}</option>
            {WILAYAS.map((w) => <option key={w.code} value={w.fr}>{w.fr}</option>)}
          </select>

          <input
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400"
            placeholder={dict.search.priceMin}
            value={filters.priceMin}
            onChange={(e) => setFilters((f) => ({ ...f, priceMin: e.target.value }))}
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400"
            placeholder={dict.search.priceMax}
            value={filters.priceMax}
            onChange={(e) => setFilters((f) => ({ ...f, priceMax: e.target.value }))}
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400"
            placeholder={dict.search.surface}
            value={filters.surface}
            onChange={(e) => setFilters((f) => ({ ...f, surface: e.target.value }))}
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400"
            placeholder={dict.search.rooms}
            value={filters.rooms}
            onChange={(e) => setFilters((f) => ({ ...f, rooms: e.target.value }))}
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400"
            placeholder={dict.search.bathrooms}
            value={filters.bathrooms}
            onChange={(e) => setFilters((f) => ({ ...f, bathrooms: e.target.value }))}
          />
        </div>
      )}
    </form>
  );
}
