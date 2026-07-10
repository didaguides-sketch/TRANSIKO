"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { WILAYAS } from "@/data/wilayas";

const PROJECT_TYPES = ["Résidentiel", "Bureaux", "Mixte", "Commercial"];
const PROJECT_STATUSES = ["En cours", "Bientôt disponible", "Livré"];

export type ProjectFilters = {
  wilaya: string;
  type: string;
  status: string;
  keyword: string;
};

export const EMPTY_PROJECT_FILTERS: ProjectFilters = { wilaya: "", type: "", status: "", keyword: "" };

export default function ProjectFiltersPanel({
  initial,
  basePath,
  onClose,
}: {
  initial: ProjectFilters;
  basePath: string;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [filters, setFilters] = useState<ProjectFilters>(initial);

  function set<K extends keyof ProjectFilters>(key: K, value: string) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ""));
    const params = new URLSearchParams(cleaned).toString();
    router.push(`${basePath}${params ? `?${params}` : ""}` as any);
    onClose?.();
  }

  function reset() {
    setFilters(EMPTY_PROJECT_FILTERS);
    router.push(basePath as any);
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
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Mot-clé</label>
          <input
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
            placeholder="Nom du programme, ville…"
            value={filters.keyword}
            onChange={(e) => set("keyword", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Wilaya</label>
          <select
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700"
            value={filters.wilaya}
            onChange={(e) => set("wilaya", e.target.value)}
          >
            <option value="">Toutes les wilayas</option>
            {WILAYAS.map((w) => <option key={w.code} value={w.fr}>{w.fr}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Type de programme</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => set("type", "")}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                filters.type === "" ? "border-maroon-700 bg-maroon-100 text-maroon-700" : "border-slate-200 text-slate-600"
              }`}
            >
              Tous
            </button>
            {PROJECT_TYPES.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => set("type", t)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                  filters.type === t ? "border-maroon-700 bg-maroon-100 text-maroon-700" : "border-slate-200 text-slate-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Statut</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => set("status", "")}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                filters.status === "" ? "border-maroon-700 bg-maroon-100 text-maroon-700" : "border-slate-200 text-slate-600"
              }`}
            >
              Tous
            </button>
            {PROJECT_STATUSES.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => set("status", s)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                  filters.status === s ? "border-maroon-700 bg-maroon-100 text-maroon-700" : "border-slate-200 text-slate-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
        <button type="button" onClick={reset} className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700">
          Réinitialiser
        </button>
        <button type="submit" className="flex-[2] rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 py-3 text-sm font-bold text-white">
          Voir les résultats
        </button>
      </div>
    </form>
  );
}
