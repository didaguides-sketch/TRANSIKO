import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import ArticleForm from "@/components/admin/ArticleForm";
import { listCategories } from "@/lib/data/categories";
import { createArticleAction } from "../actions";

export default async function NewArticlePage({ searchParams }: { searchParams: { error?: string } }) {
  const categories = await listCategories();
  return (
    <div>
      <PageHeader title="Nouvel article" description="Rédigez un nouvel article de blog." />
      <FormErrorBanner error={searchParams.error} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <ArticleForm categories={categories as any} action={createArticleAction} />
      </div>
    </div>
  );
}
