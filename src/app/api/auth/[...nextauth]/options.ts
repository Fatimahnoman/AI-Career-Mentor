import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error("MISSING_FIELDS")

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) throw new Error("USER_NOT_FOUND")
          if (!user.password) throw new Error("NO_PASSWORD")

          const isValid = await bcrypt.compare(credentials.password, user.password)

          if (!isValid) throw new Error("INVALID_PASSWORD")

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error: any) {
          throw error
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
