"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, BarChart2, Globe } from "lucide-react";
import { locales, Locale } from "@/i18n/config";

type Props = { locale: Locale; dict: any };

export default function Header({ locale, dict }: Props) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  const navItems: { href: string; label: string }[] = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/proprietes`, label: dict.nav.properties },
    { href: `/${locale}/vente`, label: dict.nav.sale },
    { href: `/${locale}/location`, label: dict.nav.rent },
    { href: `/${locale}/projets`, label: dict.nav.projects },
    { href: `/${locale}/agents`, label: dict.nav.agents },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  function switchLocale(next: Locale) {
    const rest = pathname.replace(`/${locale}`, "") || "/";
    return `/${next}${rest === "/" ? "" : rest}`;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
            <path d="M8 100V38L38 18V100H8Z" fill="#7A2331" />
            <path d="M62 100V8L92 28V100H62Z" fill="#454C56" />
            <path d="M38 100V58L50 48L62 58V100H38Z" fill="#fff" stroke="#E4E6E9" strokeWidth="2" />
          </svg>
          <div className="leading-tight">
            <b className="block font-heading text-[17px] font-extrabold text-slate-900">Transiko</b>
            <span className="text-[10px] uppercase tracking-wider text-slate-500">Immobilier</span>
          </div>
        </Link>

        <nav className="hidden gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as any}
              className="text-sm font-semibold text-slate-700 hover:text-maroon-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-maroon-500 hover:text-maroon-700"
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Changer de langue"
            >
              <Globe size={17} />
            </button>
            {langOpen && (
              <div className="absolute end-0 mt-2 w-28 rounded-xl border border-slate-200 bg-white py-1 shadow-card">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={switchLocale(l) as any}
                    className={`block px-3 py-2 text-sm font-medium ${
                      l === locale ? "text-maroon-700" : "text-slate-700"
                    } hover:bg-slate-100`}
                    onClick={() => setLangOpen(false)}
                  >
                    {l === "ar" ? "العربية" : l === "fr" ? "Français" : "English"}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href={`/${locale}/favoris` as any}
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-maroon-500 hover:text-maroon-700 sm:flex"
            aria-label="Favoris"
          >
            <Heart size={17} />
          </Link>
          <Link
            href={`/${locale}/comparaison` as any}
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-maroon-500 hover:text-maroon-700 sm:flex"
            aria-label="Comparaison"
          >
            <BarChart2 size={17} />
          </Link>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setOpen(false)} />
          <div className="relative flex h-full w-[78vw] max-w-xs flex-col gap-1 bg-white p-5">
            <button
              className="mb-2 flex h-9 w-9 items-center justify-center self-end rounded-lg border border-slate-200"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as any}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-bold text-slate-800 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
