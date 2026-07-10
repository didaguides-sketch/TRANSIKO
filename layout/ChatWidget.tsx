"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 end-5 z-50 w-[min(88vw,300px)] overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#25D366] px-4 py-3 text-white">
            <div>
              <b className="block text-sm">Transiko Immobilier</b>
              <span className="text-xs opacity-90">En ligne</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fermer">
              <X size={16} />
            </button>
          </div>
          <div className="p-4 text-sm text-slate-700">
            Bonjour 👋 Comment pouvons-nous vous aider avec votre recherche immobilière en Algérie ?
          </div>
          <a
            href="https://wa.me/213558207793"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 mb-4 block rounded-xl bg-[#25D366] py-2.5 text-center text-sm font-bold text-white"
          >
            Commencer la conversation
          </a>
        </div>
      )}
      <button
        className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl"
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
}
