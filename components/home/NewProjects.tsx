import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import { DEMO_PROJECTS } from "@/data/demo";
import { Locale } from "@/i18n/config";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function NewProjects({ dict, locale }: { dict: any; locale: Locale }) {
  const items = DEMO_PROJECTS.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading eyebrow={dict.sections.projects} title={dict.sections.projects} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((proj) => <ProjectCard key={proj.id} project={proj} locale={locale} />)}
      </div>
      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/projets` as any}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-6 py-3.5 font-bold text-white"
        >
          {dict.nav.projects} <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
}
