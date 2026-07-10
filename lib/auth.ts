import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/data/activityLog";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Identifiants",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await prisma.user.findUnique({ where: { email: credentials.email } });
          if (!user || !user.active) return null;

          const valid = await bcrypt.compare(credentials.password, user.password);
          if (!valid) return null;

          await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
          await logActivity({ userId: user.id, userName: user.name, action: "login", entityType: "User", entityId: user.id });

          return { id: user.id, name: user.name, email: user.email, role: user.role };
        } catch (err) {
          console.error("[auth] Échec de connexion (base de données non disponible ?) :", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};
