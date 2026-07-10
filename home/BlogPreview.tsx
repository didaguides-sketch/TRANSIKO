import SectionHeading from "@/components/ui/SectionHeading";
import { DEMO_ARTICLES } from "@/data/demo";
import { Newspaper, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n/config";

export default function BlogPreview({ dict, locale }: { dict: any; locale: Locale }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading eyebrow={dict.sections.blog} title={dict.sections.blog} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {DEMO_ARTICLES.map((a) => (
          <Link
            key={a.id}
            href={`/${locale}/blog/${a.slug}` as any}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-card"
          >
            <div className="mb-3 flex h-32 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              <Newspaper size={28} />
            </div>
            <div className="mb-1.5 text-xs font-bold uppercase tracking-wide text-maroon-700">{a.category}</div>
            <h4 className="font-heading text-[15px] font-extrabold text-slate-900">{a.title}</h4>
            <p className="mt-1.5 text-sm text-slate-500">{a.excerpt}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-maroon-700">
              Lire l'article <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
