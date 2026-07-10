import { Calculator, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n/config";

export default function ValuationCTA({ dict, locale }: { dict: any; locale: Locale }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br from-maroon-900 to-maroon-700 p-8 text-center text-white md:flex-row md:justify-between md:text-start">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <Calculator size={26} />
          </div>
          <div>
            <h3 className="font-heading text-xl font-extrabold">{dict.sections.estimate}</h3>
            <p className="mt-1 max-w-md text-sm text-white/85">
              Obtenez une estimation gratuite de votre bien en quelques minutes, avec l'appui de notre équipe.
            </p>
          </div>
        </div>
        <Link
          href={`/${locale}/estimation` as any}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-maroon-700"
        >
          {dict.sections.estimate} <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
}
