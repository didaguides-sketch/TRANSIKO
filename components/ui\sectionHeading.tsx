export default function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-maroon-700">{eyebrow}</div>
        <h2 className="font-heading text-2xl font-extrabold text-slate-900 md:text-[28px]">{title}</h2>
      </div>
      {action}
    </div>
  );
}
