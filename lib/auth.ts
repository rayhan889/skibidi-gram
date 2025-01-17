import { getServerSession, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/signin',
    newUser: '/signup'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!
        session.user.email = token.email
        session.user.image = token.picture
        session.user.name = token.name
        session.user.username = token.username
      }
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUsers = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email!))
        const dbUser = dbUsers[0]

        if (dbUser) {
          if (!dbUser.username) {
            const newUsername = nanoid(10)
            await db
              .update(users)
              .set({ username: newUsername })
              .where(eq(users.id, dbUser.id))
            token.username = newUsername
          } else {
            token.username = dbUser.username
          }

          token.id = dbUser.id
        } else {
          token.id = user.id
          token.username = null
        }
      }

      return token
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
}

export const getAuthSession = () => getServerSession(authOptions)
