import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { Locale } from "@/i18n/config";

export default function Footer({ locale, dict }: { locale: Locale; dict: any }) {
  return (
    <footer className="border-t border-white/10 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
              <path d="M8 100V38L38 18V100H8Z" fill="#A33449" />
              <path d="M62 100V8L92 28V100H62Z" fill="#8A9098" />
              <path d="M38 100V58L50 48L62 58V100H38Z" fill="#fff" />
            </svg>
            <div>
              <b className="block font-heading text-white">Transiko</b>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Immobilier</span>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{dict.footer.description}</p>
          <div className="mt-4 flex gap-2.5">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15"
                aria-label="Réseau social"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="mb-3 font-heading text-xs uppercase tracking-widest text-white">{dict.footer.navigation}</h5>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}`}>{dict.nav.home}</Link></li>
            <li><Link href={`/${locale}/vente`}>{dict.nav.sale}</Link></li>
            <li><Link href={`/${locale}/location`}>{dict.nav.rent}</Link></li>
            <li><Link href={`/${locale}/projets`}>{dict.nav.projects}</Link></li>
            <li><Link href={`/${locale}/agents`}>{dict.nav.agents}</Link></li>
            <li><Link href={`/${locale}/services`}>{dict.nav.services}</Link></li>
            <li><Link href={`/${locale}/a-propos`}>{dict.nav.about}</Link></li>
            <li><Link href={`/${locale}/blog`}>{dict.nav.blog}</Link></li>
            <li><Link href={`/${locale}/estimation`}>{dict.nav.estimate}</Link></li>
            <li><Link href={`/${locale}/faq`}>{dict.nav.faq}</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="mb-3 font-heading text-xs uppercase tracking-widest text-white">{dict.footer.contact}</h5>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /> 02 Rue Duguet, Vieux Kouba, Alger 16000</div>
            <div className="flex items-center gap-2"><Phone size={15} /> +213 551 87 51 79</div>
            <div className="flex items-center gap-2"><Mail size={15} /> transiko@gmail.com</div>
          </div>
          <a
            href="https://wa.me/213558207793"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Transiko Immobilier. {dict.footer.rights}</span>
          <div className="flex justify-center gap-4">
            <Link href={`/${locale}/confidentialite`}>Politique de confidentialité</Link>
            <Link href={`/${locale}/conditions`}>Conditions d'utilisation</Link>
            <Link href={`/${locale}/cookies`}>Politique des cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
