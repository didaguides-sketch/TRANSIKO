import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import FormErrorBanner from "@/components/admin/FormErrorBanner";
import UserForm from "@/components/admin/UserForm";
import { getUser } from "@/lib/data/users";
import { updateUserAction } from "../../actions";

export default async function EditUserPage({
  params, searchParams,
}: { params: { id: string }; searchParams: { error?: string } }) {
  const user = await getUser(params.id);
  if (!user) notFound();

  return (
    <div>
      <PageHeader title="Modifier l'utilisateur" description={user.email} />
      <FormErrorBanner error={searchParams.error} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <UserForm user={user} action={updateUserAction.bind(null, params.id)} />
      </div>
    </div>
  );
}
