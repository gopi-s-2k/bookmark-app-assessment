import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const { data } = await supabase
        .from("users")
        .select("id")
        .eq("email", user.email)
        .single();

      let supabaseId: string;
      let isNewUser: boolean;

      if (!data) {
        const { data: newUser } = await supabase
          .from("users")
          .insert({ email: user.email, name: user.name! })
          .select("id")
          .single();

        supabaseId = newUser!.id;
        isNewUser = true;
      } else {
        supabaseId = data.id;
        isNewUser = false;
      }

      (user as any).supabaseId = supabaseId;
      (user as any).isNewUser = isNewUser;

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user_uid = (user as any).supabaseId;
        token.isNewUser = (user as any).isNewUser;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.isNewUser = token.isNewUser as boolean;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
