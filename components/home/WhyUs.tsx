import SectionHeading from "@/components/ui/SectionHeading";
import { ShieldCheck, Camera, MapPinned, Headset } from "lucide-react";

const POINTS = [
  { icon: ShieldCheck, title: "Biens vérifiés", desc: "Chaque annonce est contrôlée avant publication." },
  { icon: Camera, title: "Reportages professionnels", desc: "Photos et vidéos de qualité pour chaque bien." },
  { icon: MapPinned, title: "Couverture nationale", desc: "Présence dans les principales wilayas d'Algérie." },
  { icon: Headset, title: "Accompagnement dédié", desc: "Un conseiller Transiko à chaque étape de votre projet." },
];

export default function WhyUs({ dict }: { dict: any }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="rounded-2xl bg-slate-100 p-8 md:p-12">
        <SectionHeading eyebrow={dict.sections.whyUs} title={dict.sections.whyUs} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-maroon-700 shadow-sm">
                <Icon size={20} />
              </div>
              <h4 className="font-heading text-[15px] font-extrabold text-slate-900">{title}</h4>
              <p className="mt-1 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
