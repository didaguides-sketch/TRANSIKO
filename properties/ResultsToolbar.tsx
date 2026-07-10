"use client";

import { SlidersHorizontal } from "lucide-react";

export type SortOption = string;

export type SortDefinition = { value: string; label: string };

const DEFAULT_SORT_OPTIONS: SortDefinition[] = [
  { value: "recent", label: "Plus récents" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "surface-desc", label: "Plus grande surface" },
];

export default function ResultsToolbar({
  count,
  sort,
  onSortChange,
  onOpenFilters,
  sortOptions = DEFAULT_SORT_OPTIONS,
  label = "bien",
}: {
  count: number;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  onOpenFilters: () => void;
  sortOptions?: SortDefinition[];
  label?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div className="text-sm text-slate-600">
        <b className="text-slate-900">{count}</b> {label}{count > 1 ? "s" : ""} trouvé{count > 1 ? "s" : ""}
      </div>
      <div className="flex items-center gap-2">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
        >
          {sortOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <button
          onClick={onOpenFilters}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-bold text-slate-700 md:hidden"
        >
          <SlidersHorizontal size={14} /> Filtres
        </button>
      </div>
    </div>
  );
}
