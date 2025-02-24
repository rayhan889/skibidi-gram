import { likes } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { likeInsertSchema } from '@/zod-schemas/meme'
import { getAuthSession } from '@/lib/auth'
import { z } from 'zod'
import { db } from '@/db'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { memeId, userId } = likeInsertSchema.parse(body)

    const alreadyLikeMeme = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.memeId, memeId)))
      .limit(1)

    if (alreadyLikeMeme.length > 0) {
      await db
        .delete(likes)
        .where(and(eq(likes.userId, userId), eq(likes.memeId, memeId)))
    } else {
      await db.insert(likes).values({ memeId, userId })
    }

    const likesCount = await db.$count(
      likes,
      and(eq(likes.userId, userId), eq(likes.memeId, memeId))
    )

    return Response.json(likesCount, { status: 201 })
  } catch (error) {
    console.error('Error creating meme:', error)

    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return Response.json(
      { error: 'There was an error liking a meme' },
      { status: 500 }
    )
  }
}
