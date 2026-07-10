import { SearchX } from "lucide-react";

export default function EmptyState({
  onReset,
  title = "Aucun bien ne correspond à votre recherche",
  message = "Essayez d'élargir vos critères (wilaya, budget ou type de bien) ou contactez un conseiller Transiko qui vous aidera à trouver le bien idéal.",
}: {
  onReset: () => void;
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <SearchX size={26} />
      </div>
      <h3 className="font-heading text-lg font-extrabold text-slate-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">{message}</p>
      <button
        onClick={onReset}
        className="mt-5 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-5 py-2.5 text-sm font-bold text-white"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}
