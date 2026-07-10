"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@prisma/client";
import { hasRole, PERMISSIONS } from "@/lib/rbac";
import {
  LayoutDashboard, Building2, Layers, Users2, UserSquare2, MessageSquare, CalendarCheck,
  Calculator, Newspaper, Tags, Star, HelpCircle, Image as ImageIcon, Settings, ShieldCheck,
  ScrollText, Home,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, min: "AGENT" as UserRole },
  { href: "/admin/properties", label: "Propriétés", icon: Building2, min: PERMISSIONS.properties },
  { href: "/admin/projects", label: "Nouveaux projets", icon: Layers, min: PERMISSIONS.projects },
  { href: "/admin/agents", label: "Agents", icon: UserSquare2, min: PERMISSIONS.agents },
  { href: "/admin/leads", label: "Clients & leads", icon: Users2, min: PERMISSIONS.leads },
  { href: "/admin/messages", label: "Messages de contact", icon: MessageSquare, min: PERMISSIONS.leads },
  { href: "/admin/visit-requests", label: "Demandes de visite", icon: CalendarCheck, min: PERMISSIONS.leads },
  { href: "/admin/valuations", label: "Demandes d'estimation", icon: Calculator, min: PERMISSIONS.leads },
  { href: "/admin/blog", label: "Blog", icon: Newspaper, min: PERMISSIONS.blog },
  { href: "/admin/categories", label: "Catégories & tags", icon: Tags, min: PERMISSIONS.blog },
  { href: "/admin/testimonials", label: "Témoignages", icon: Star, min: PERMISSIONS.testimonials },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle, min: PERMISSIONS.faq },
  { href: "/admin/media", label: "Bibliothèque média", icon: ImageIcon, min: PERMISSIONS.media },
  { href: "/admin/settings", label: "Paramètres du site", icon: Settings, min: PERMISSIONS.settings },
  { href: "/admin/users", label: "Utilisateurs & rôles", icon: ShieldCheck, min: PERMISSIONS.users },
  { href: "/admin/activity-logs", label: "Journal d'activité", icon: ScrollText, min: PERMISSIONS.activityLogs },
];

export default function Sidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto p-4">
      <div className="mb-4 flex items-center gap-2.5 px-2">
        <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
          <path d="M8 100V38L38 18V100H8Z" fill="#A33449" />
          <path d="M62 100V8L92 28V100H62Z" fill="#8A9098" />
          <path d="M38 100V58L50 48L62 58V100H38Z" fill="#fff" />
        </svg>
        <div>
          <b className="block font-heading text-sm font-extrabold text-white">Transiko</b>
          <span className="text-[10px] uppercase tracking-wider text-slate-400">Administration</span>
        </div>
      </div>

      {NAV.filter((item) => hasRole(role, item.min)).map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href as any}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
              active ? "bg-gradient-to-br from-maroon-700 to-maroon-500 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <item.icon size={17} />
            {item.label}
          </Link>
        );
      })}

      <Link
        href="/fr"
        className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white"
      >
        <Home size={17} /> Retour au site
      </Link>
    </nav>
  );
}
