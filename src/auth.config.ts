import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/database/database";

import bcrypt from "bcryptjs";

export const authConfig = {
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials: Partial<Record<string, unknown>>) {
        const { email, password } = credentials;

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: String(email),
          },
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(String(password), user.password);

        if (isValid) {
          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
