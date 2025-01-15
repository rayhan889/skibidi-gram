import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/signin',
    newUser: '/auth/signup'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id
          session.user.email = token.email
          session.user.image = token.picture
          session.user.name = token.name
          session.user.username = token.username
        }
      }
      return session
    },

    async jwt({ token, user }) {
      const dbUsers = await db.select().from(users).where(eq(users.id, user.id))
      const dbUser = dbUsers[0]

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        username: dbUser.username,
        email: dbUser.email,
        image: dbUser.image
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
}
