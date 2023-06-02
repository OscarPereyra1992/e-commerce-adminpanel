import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import GoogleProvider from 'next-auth/providers/google';
import clientPromise from "@/lib/mongodb";



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here

    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,

        callbackUrl: 'http://localhost:3000/',
      }),
],
  adapter: MongoDBAdapter(clientPromise),
}
export default NextAuth(authOptions)