import { getDashboardStats, getPropertiesByStatusChart, getLeadsBySourceChart } from "@/lib/data/dashboard";
import { listActivityLogs } from "@/lib/data/activityLog";
import StatCard from "@/components/admin/StatCard";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import DashboardBarChart from "@/components/admin/DashboardBarChart";
import {
  Building2, Layers, UserSquare2, Users2, CalendarCheck, Calculator, Newspaper, Star, Clock, ShieldAlert,
} from "lucide-react";

export default async function AdminDashboardPage({ searchParams }: { searchParams: { error?: string } }) {
  const stats = await getDashboardStats();
  const [logs, propertiesChart, leadsChart] = stats
    ? await Promise.all([safeLogs(), getPropertiesByStatusChart(), getLeadsBySourceChart()])
    : [[], [], []];

  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-extrabold text-slate-900">Tableau de bord</h1>
      <p className="mb-5 text-sm text-slate-500">Vue d'ensemble de l'activité de Transiko Immobilier.</p>

      {searchParams.error === "forbidden" && (
        <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <ShieldAlert size={16} /> Vous n'avez pas les droits nécessaires pour accéder à cette section.
        </div>
      )}

      {!stats && <NoDatabaseBanner />}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <StatCard icon={Building2} label="Propriétés publiées" value={stats ? `${stats.publishedProperties} / ${stats.properties}` : "—"} />
        <StatCard icon={Layers} label="Nouveaux projets" value={stats?.projects ?? "—"} tint="slate" />
        <StatCard icon={UserSquare2} label="Agents actifs" value={stats?.agents ?? "—"} tint="slate" />
        <StatCard icon={Users2} label="Leads à traiter" value={stats?.newLeads ?? "—"} tint="amber" />
        <StatCard icon={CalendarCheck} label="Visites à confirmer" value={stats?.pendingVisits ?? "—"} tint="amber" />
        <StatCard icon={Calculator} label="Estimations à traiter" value={stats?.pendingValuations ?? "—"} tint="amber" />
        <StatCard icon={Newspaper} label="Articles publiés" value={stats?.articles ?? "—"} tint="green" />
        <StatCard icon={Star} label="Témoignages à valider" value={stats?.pendingTestimonials ?? "—"} tint="amber" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-3 font-heading text-base font-extrabold text-slate-900">Propriétés par statut</h2>
          <DashboardBarChart data={propertiesChart} />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-3 font-heading text-base font-extrabold text-slate-900">Leads par source</h2>
          <DashboardBarChart data={leadsChart} color="#454C56" />
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Clock size={18} className="text-maroon-700" />
          <h2 className="font-heading text-base font-extrabold text-slate-900">Activité récente</h2>
        </div>
        {logs.length === 0 ? (
          <p className="text-sm text-slate-500">Aucune activité enregistrée pour le moment.</p>
        ) : (
          <ul className="space-y-2.5">
            {logs.map((log) => (
              <li key={log.id} className="flex items-center justify-between text-sm">
                <span className="text-slate-700">
                  <b className="font-semibold text-slate-900">{log.userName}</b> — {log.action} {log.entityType}
                  {log.entityId ? ` (${log.entityId})` : ""}
                </span>
                <span className="text-xs text-slate-400">{new Date(log.createdAt).toLocaleString("fr-FR")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

async function safeLogs() {
  try {
    return await listActivityLogs(10);
  } catch {
    return [];
  }
}
