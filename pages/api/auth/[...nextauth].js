import NextAuth, { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from "@/lib/mongodb";

const adminEmails = ['perrymhs@gmail.com']

 export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET, // Define el secret aquí
  callbacks:{
    session:({session, token, user}) => {
      if(adminEmails.includes(session?.user?.email)){
        return session;
      }
      return false;
    }
  }
};

export default NextAuth(authOptions);

export async function isAdminRequest(req,res){
  const session = await getServerSession({req,res}, authOptions);
  if(!adminEmails.includes(session?.user?.email)){
    res.status(401);
    res.end();
    throw 'no admin email'
  }
}