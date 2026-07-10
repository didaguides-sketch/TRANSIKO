"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { createUser, updateUser, deleteUser } from "@/lib/data/users";
import type { UserRole } from "@prisma/client";

const UserSchema = z.object({
  name: z.string().min(2, "Le nom est obligatoire"),
  email: z.string().email("Adresse email invalide"),
  role: z.enum(["ADMIN", "EDITOR", "AGENT"]),
});

export async function createUserAction(formData: FormData) {
  const session = await requireRole(PERMISSIONS.users);
  const data = {
    name: String(formData.get("name")),
    email: String(formData.get("email")),
    password: String(formData.get("password") || ""),
    role: String(formData.get("role")) as UserRole,
  };

  const result = UserSchema.safeParse(data);
  if (!result.success) redirect(`/admin/users/new?error=${encodeURIComponent(result.error.issues[0].message)}`);
  if (data.password.length < 8) redirect(`/admin/users/new?error=${encodeURIComponent("Le mot de passe doit contenir au moins 8 caractères")}`);

  const user = await createUser(data);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "create", entityType: "User", entityId: user.id });
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

const UserUpdateSchema = z.object({
  name: z.string().min(2, "Le nom est obligatoire"),
  email: z.string().email("Adresse email invalide"),
  role: z.enum(["ADMIN", "EDITOR", "AGENT"]),
});

export async function updateUserAction(id: string, formData: FormData) {
  const session = await requireRole(PERMISSIONS.users);
  const password = String(formData.get("password") || "");

  const base = {
    name: String(formData.get("name")),
    email: String(formData.get("email")),
    role: String(formData.get("role")) as UserRole,
  };

  const result = UserUpdateSchema.safeParse(base);
  if (!result.success) redirect(`/admin/users/${id}/edit?error=${encodeURIComponent(result.error.issues[0].message)}`);
  if (password && password.length < 8) redirect(`/admin/users/${id}/edit?error=${encodeURIComponent("Le mot de passe doit contenir au moins 8 caractères")}`);

  const data = { ...base, active: formData.get("active") === "on", ...(password ? { password } : {}) };

  await updateUser(id, data);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "update", entityType: "User", entityId: id });
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUserAction(id: string) {
  const session = await requireRole(PERMISSIONS.users);
  if (id === session.user.id) return; // on ne peut pas se supprimer soi-même
  await deleteUser(id);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "delete", entityType: "User", entityId: id });
  revalidatePath("/admin/users");
}
