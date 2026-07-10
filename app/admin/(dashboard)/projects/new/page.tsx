import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import ProjectForm from "@/components/admin/ProjectForm";
import { createProjectAction } from "../actions";

export default function NewProjectPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div>
      <PageHeader title="Nouveau programme" description="Ajoutez un nouveau projet immobilier." />
      <FormErrorBanner error={searchParams.error} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <ProjectForm action={createProjectAction} />
      </div>
    </div>
  );
}
