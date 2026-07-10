import type { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  tint = "maroon",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tint?: "maroon" | "slate" | "green" | "amber";
}) {
  const tints: Record<string, string> = {
    maroon: "bg-maroon-100 text-maroon-700",
    slate: "bg-slate-100 text-slate-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${tints[tint]}`}>
        <Icon size={19} />
      </div>
      <div className="font-heading text-2xl font-extrabold text-slate-900">{value}</div>
      <div className="mt-0.5 text-sm text-slate-500">{label}</div>
    </div>
  );
}
