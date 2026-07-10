"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { WILAYAS, ALGIERS_COMMUNES } from "@/data/wilayas";

const PROPERTY_TYPES = ["Villa", "Appartement", "Maison", "Terrain", "Local commercial", "Bureau"];

export type PropertyFilters = {
  transaction: string;
  propertyType: string;
  wilaya: string;
  commune: string;
  priceMin: string;
  priceMax: string;
  surface: string;
  rooms: string;
  bathrooms: string;
  keyword: string;
};

export const EMPTY_PROPERTY_FILTERS: PropertyFilters = {
  transaction: "", propertyType: "", wilaya: "", commune: "", priceMin: "", priceMax: "",
  surface: "", rooms: "", bathrooms: "", keyword: "",
};

export default function FiltersPanel({
  dict,
  locale,
  initial,
  basePath,
  hideTransactionToggle = false,
  onClose,
}: {
  dict: any;
  locale: string;
  initial: PropertyFilters;
  /** Route de base sur laquelle appliquer les filtres (ex : /fr/proprietes, /fr/vente, /fr/location) */
  basePath?: string;
  /** Masque le sélecteur Vente/Location quand la page est déjà dédiée (page Vente ou Location) */
  hideTransactionToggle?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [filters, setFilters] = useState<PropertyFilters>(initial);
  const path = basePath ?? `/${locale}/proprietes`;

  function set<K extends keyof PropertyFilters>(key: K, value: string) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ""));
    const params = new URLSearchParams(cleaned).toString();
    router.push(`${path}${params ? `?${params}` : ""}` as any);
    onClose?.();
  }

  function reset() {
    const empty = { ...EMPTY_PROPERTY_FILTERS, transaction: hideTransactionToggle ? initial.transaction : "" };
    setFilters(empty);
    router.push(path as any);
    onClose?.();
  }

  return (
    <form onSubmit={apply} className="flex h-full flex-col">
      {onClose && (
        <div className="mb-3 flex items-center justify-between md:hidden">
          <h3 className="font-heading text-lg font-extrabold text-slate-900">Filtres</h3>
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 p-2">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex-1 space-y-5 overflow-y-auto">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
            {dict.search.keyword}
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
            placeholder="Nom, référence, ville…"
            value={filters.keyword}
            onChange={(e) => set("keyword", e.target.value)}
          />
        </div>

        {!hideTransactionToggle && (
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              {dict.search.listingType}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: "", l: "Tous" },
                { v: "Vente", l: dict.hero.buy },
                { v: "Location", l: dict.hero.rent },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.v}
                  onClick={() => set("transaction", opt.v)}
                  className={`rounded-xl border px-2 py-2 text-sm font-bold ${
                    filters.transaction === opt.v
                      ? "border-transparent bg-gradient-to-br from-maroon-700 to-maroon-500 text-white"
                      : "border-slate-200 text-slate-700"
                  }`}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
            {dict.search.propertyType}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => set("propertyType", "")}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                filters.propertyType === "" ? "border-maroon-700 bg-maroon-100 text-maroon-700" : "border-slate-200 text-slate-600"
              }`}
            >
              Tous
            </button>
            {PROPERTY_TYPES.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => set("propertyType", t)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                  filters.propertyType === t ? "border-maroon-700 bg-maroon-100 text-maroon-700" : "border-slate-200 text-slate-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              {dict.search.wilaya}
            </label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700"
              value={filters.wilaya}
              onChange={(e) => { set("wilaya", e.target.value); set("commune", ""); }}
            >
              <option value="">Toutes</option>
              {WILAYAS.map((w) => <option key={w.code} value={w.fr}>{w.fr}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              {dict.search.commune}
            </label>
            {filters.wilaya === "Alger" ? (
              <select
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700"
                value={filters.commune}
                onChange={(e) => set("commune", e.target.value)}
              >
                <option value="">Toutes</option>
                {ALGIERS_COMMUNES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            ) : (
              <input
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
                placeholder="Ex : Chéraga"
                value={filters.commune}
                onChange={(e) => set("commune", e.target.value)}
              />
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
            {dict.search.priceMin} / {dict.search.priceMax} (DA)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
              placeholder={dict.search.priceMin}
              value={filters.priceMin}
              onChange={(e) => set("priceMin", e.target.value)}
            />
            <input
              className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
              placeholder={dict.search.priceMax}
              value={filters.priceMax}
              onChange={(e) => set("priceMax", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
            {dict.search.surface}
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
            placeholder="Surface minimale"
            value={filters.surface}
            onChange={(e) => set("surface", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              {dict.search.rooms}
            </label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700"
              value={filters.rooms}
              onChange={(e) => set("rooms", e.target.value)}
            >
              <option value="">Tous</option>
              {["1", "2", "3", "4", "5"].map((n) => <option key={n} value={n}>{n}+</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              {dict.search.bathrooms}
            </label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700"
              value={filters.bathrooms}
              onChange={(e) => set("bathrooms", e.target.value)}
            >
              <option value="">Tous</option>
              {["1", "2", "3", "4"].map((n) => <option key={n} value={n}>{n}+</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={reset}
          className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700"
        >
          Réinitialiser
        </button>
        <button
          type="submit"
          className="flex-[2] rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 py-3 text-sm font-bold text-white"
        >
          {dict.search.submit}
        </button>
      </div>
    </form>
  );
}
