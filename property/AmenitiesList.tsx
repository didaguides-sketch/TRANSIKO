import { CheckCircle2 } from "lucide-react";

export default function AmenitiesList({ amenities }: { amenities: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {amenities.map((a) => (
        <div key={a} className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
          <CheckCircle2 size={16} className="shrink-0 text-maroon-700" />
          {a}
        </div>
      ))}
    </div>
  );
}
