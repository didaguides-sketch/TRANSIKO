import { Phone, Mail, MessageCircle, User } from "lucide-react";

export default function AgentCard({
  agent,
}: {
  agent: { name: string; role: string; phone: string; whatsapp: string; email: string; lang: string };
}) {
  const waHref = `https://wa.me/${agent.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-maroon-100 text-maroon-700">
          <User size={24} />
        </div>
        <div>
          <div className="font-heading text-base font-extrabold text-slate-900">{agent.name}</div>
          <div className="text-sm text-slate-500">{agent.role}</div>
          <div className="text-xs text-slate-400">{agent.lang}</div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <a href={`tel:${agent.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:border-maroon-500">
          <Phone size={15} /> {agent.phone}
        </a>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 rounded-xl bg-[#25D366] px-3.5 py-2.5 text-sm font-bold text-white">
          <MessageCircle size={15} /> Contacter sur WhatsApp
        </a>
        <a href={`mailto:${agent.email}`} className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:border-maroon-500">
          <Mail size={15} /> {agent.email}
        </a>
      </div>
    </div>
  );
}
