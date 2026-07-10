import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProject } from "@/lib/data/projects";
import { updateProjectAction } from "../../actions";

export default async function EditProjectPage({
  params, searchParams,
}: { params: { id: string }; searchParams: { error?: string } }) {
  const project = await getProject(params.id);
  if (!project) notFound();

  return (
    <div>
      <PageHeader title="Modifier le programme" description={project.nameFr} />
      <FormErrorBanner error={searchParams.error} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <ProjectForm project={project} action={updateProjectAction.bind(null, params.id)} />
      </div>
    </div>
  );
}
