import NextAuth from 'next-auth';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import LinkedInProvider from 'next-auth/providers/linkedin';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID || '',
      clientSecret: process.env.LINKEDIN_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = user;
      return session;
    },
    async signIn({ user, account, profile }) {
      // To be added
      return true;
    },
  },
});
