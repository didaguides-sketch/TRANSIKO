import { STATS } from "@/data/demo";

export default function Stats({ dict }: { dict: any }) {
  return (
    <section className="bg-slate-900 py-12 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-[#E7A9B2]">
          {dict.sections.stats}
        </div>
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-heading text-3xl font-extrabold md:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
