"use server";

import { revalidatePath } from "next/cache";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { createTestimonial, setTestimonialApproval, deleteTestimonial } from "@/lib/data/testimonials";

export async function createTestimonialAction(formData: FormData) {
  const session = await requireRole(PERMISSIONS.testimonials);
  const testimonial = await createTestimonial({
    authorName: String(formData.get("authorName")),
    authorRole: String(formData.get("authorRole") || ""),
    content: String(formData.get("content")),
    rating: Number(formData.get("rating") || 5),
    approved: formData.get("approved") === "on",
  });
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "create", entityType: "Testimonial", entityId: testimonial.id });
  revalidatePath("/admin/testimonials");
  revalidatePath("/fr");
}

export async function toggleTestimonialApprovalAction(id: string, approved: boolean) {
  const session = await requireRole(PERMISSIONS.testimonials);
  await setTestimonialApproval(id, approved);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: approved ? "approve" : "unapprove", entityType: "Testimonial", entityId: id });
  revalidatePath("/admin/testimonials");
  revalidatePath("/fr");
}

export async function deleteTestimonialAction(id: string) {
  const session = await requireRole(PERMISSIONS.testimonials);
  await deleteTestimonial(id);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "delete", entityType: "Testimonial", entityId: id });
  revalidatePath("/admin/testimonials");
  revalidatePath("/fr");
}
