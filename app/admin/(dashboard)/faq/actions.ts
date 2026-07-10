"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { createFaq, updateFaq, deleteFaq } from "@/lib/data/faq";

const FaqSchema = z.object({
  questionFr: z.string().min(5, "La question est obligatoire"),
  answerFr: z.string().min(5, "La réponse est obligatoire"),
});

function parseFaqForm(formData: FormData) {
  return {
    questionFr: String(formData.get("questionFr")),
    answerFr: String(formData.get("answerFr")),
    category: String(formData.get("category") || "Général"),
    order: Number(formData.get("order") || 0),
    published: formData.get("published") === "on",
  };
}

export async function createFaqAction(formData: FormData) {
  const session = await requireRole(PERMISSIONS.faq);
  const data = parseFaqForm(formData);
  const result = FaqSchema.safeParse(data);
  if (!result.success) redirect(`/admin/faq/new?error=${encodeURIComponent(result.error.issues[0].message)}`);

  const faq = await createFaq(data);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "create", entityType: "Faq", entityId: faq.id });
  revalidatePath("/admin/faq");
  revalidatePath("/fr/faq");
  redirect("/admin/faq");
}

export async function updateFaqAction(id: string, formData: FormData) {
  const session = await requireRole(PERMISSIONS.faq);
  const data = parseFaqForm(formData);
  const result = FaqSchema.safeParse(data);
  if (!result.success) redirect(`/admin/faq/${id}/edit?error=${encodeURIComponent(result.error.issues[0].message)}`);

  await updateFaq(id, data);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "update", entityType: "Faq", entityId: id });
  revalidatePath("/admin/faq");
  revalidatePath("/fr/faq");
  redirect("/admin/faq");
}

export async function deleteFaqAction(id: string) {
  const session = await requireRole(PERMISSIONS.faq);
  await deleteFaq(id);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "delete", entityType: "Faq", entityId: id });
  revalidatePath("/admin/faq");
  revalidatePath("/fr/faq");
}
