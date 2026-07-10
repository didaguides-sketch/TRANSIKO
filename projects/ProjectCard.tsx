import Link from "next/link";
import { Building2, MapPin, CalendarClock } from "lucide-react";
import type { DemoProject } from "@/data/demo";

const STATUS_STYLE: Record<DemoProject["status"], string> = {
  "En cours": "bg-maroon-100 text-maroon-700",
  "Bientôt disponible": "bg-amber-100 text-amber-700",
  "Livré": "bg-green-100 text-green-700",
};

export default function ProjectCard({ project, locale }: { project: DemoProject; locale: string }) {
  return (
    <Link
      href={`/${locale}/projets/${project.slug}` as any}
      className="block overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-card"
    >
      <div
        className="relative flex h-36 items-center justify-center text-white/85"
        style={{ background: `linear-gradient(135deg, hsl(${project.hue} 45% 30%), hsl(${project.hue + 30} 35% 45%))` }}
      >
        <Building2 size={30} />
        <span className={`absolute start-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${STATUS_STYLE[project.status]}`}>
          {project.status}
        </span>
      </div>
      <div className="p-5">
        <h4 className="font-heading text-base font-extrabold text-slate-900">{project.name}</h4>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500"><MapPin size={13} /> {project.city}</div>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><CalendarClock size={13} /> Livraison {project.delivery}</div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-maroon-700">À partir de {project.priceFrom}</span>
        </div>
        <div className="mt-1 text-xs text-slate-400">{project.units}</div>
      </div>
    </Link>
  );
}
