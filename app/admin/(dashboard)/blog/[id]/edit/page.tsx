import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import ArticleForm from "@/components/admin/ArticleForm";
import { getArticle } from "@/lib/data/blog";
import { listCategories } from "@/lib/data/categories";
import { updateArticleAction } from "../../actions";

export default async function EditArticlePage({
  params, searchParams,
}: { params: { id: string }; searchParams: { error?: string } }) {
  const [article, categories] = await Promise.all([getArticle(params.id), listCategories()]);
  if (!article) notFound();

  return (
    <div>
      <PageHeader title="Modifier l'article" description={article.titleFr} />
      <FormErrorBanner error={searchParams.error} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <ArticleForm article={article} categories={categories as any} action={updateArticleAction.bind(null, params.id)} />
      </div>
    </div>
  );
}
