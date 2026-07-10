import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { UserRole } from "@prisma/client";

export async function listUsers() {
  try {
    return await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, active: true, lastLoginAt: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("[data/users] listUsers:", err);
    return [];
  }
}

export async function getUser(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(data: { name: string; email: string; password: string; role: UserRole }) {
  const hashed = await bcrypt.hash(data.password, 10);
  return prisma.user.create({ data: { ...data, password: hashed } });
}

export async function updateUser(
  id: string,
  data: Partial<{ name: string; email: string; role: UserRole; active: boolean; password: string }>
) {
  const payload = { ...data };
  if (payload.password) payload.password = await bcrypt.hash(payload.password, 10);
  else delete payload.password;
  return prisma.user.update({ where: { id }, data: payload });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}
