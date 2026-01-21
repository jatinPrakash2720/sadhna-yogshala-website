import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/api/db";
import { config } from "@/lib/config";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), 
  
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  secret: config.nextAuthSecret,
  debug: config.nodeEnv === "development",

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = user.isAdmin || (config.adminEmail ? user.email === config.adminEmail : false);
      }
      return session;
    },
  },
};