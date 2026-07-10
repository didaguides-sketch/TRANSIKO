"use client";

import { useState } from "react";

export default function Newsletter({ dict }: { dict: any }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: brancher sur /api/newsletter une fois la base de données connectée
    setDone(true);
  }

  return (
    <section className="bg-slate-900 py-14 text-white">
      <div className="mx-auto max-w-md px-5 text-center">
        <h2 className="font-heading text-2xl font-extrabold">{dict.sections.newsletter}</h2>
        <p className="mt-2 text-sm text-slate-400">
          Recevez en exclusivité les nouvelles annonces et les baisses de prix.
        </p>
        {done ? (
          <div className="mt-5 rounded-xl border border-white/15 bg-white/5 p-4 text-sm font-medium">
            Merci ! Vous recevrez bientôt nos prochaines annonces.
          </div>
        ) : (
          <form onSubmit={submit} className="mt-5 flex flex-col gap-2.5">
            <input
              type="email"
              required
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-slate-400 focus:outline-none"
            />
            <button className="rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-4 py-3.5 text-sm font-bold">
              S'inscrire
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
