import { db } from '@/db'
import { memes, users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getMemes = async () => {
  const data = await db
    .select()
    .from(memes)
    .innerJoin(users, eq(memes.userId, users.id))
  return data
}
