export default function LegalPageLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="mb-2 font-heading text-2xl font-extrabold text-slate-900 md:text-3xl">{title}</h1>
      <p className="mb-8 text-sm text-slate-400">Dernière mise à jour : {updatedAt}</p>
      <div className="space-y-6 text-sm leading-relaxed text-slate-600 [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:font-heading [&_h2]:text-base [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_ul]:list-disc [&_ul]:ps-5 [&_li]:mb-1">
        {children}
      </div>
    </div>
  );
}
