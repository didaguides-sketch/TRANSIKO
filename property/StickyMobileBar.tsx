import { Phone, MessageCircle } from "lucide-react";

export default function StickyMobileBar({ phone, whatsapp }: { phone: string; whatsapp: string }) {
  const waHref = `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-slate-200 bg-white p-3 md:hidden">
      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-800"
      >
        <Phone size={16} /> Appeler
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white"
      >
        <MessageCircle size={16} /> WhatsApp
      </a>
    </div>
  );
}
