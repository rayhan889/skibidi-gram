import { comments, users } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { commentInsertSchema } from '@/zod-schemas/comment'
import { getAuthSession } from '@/lib/auth'
import { z } from 'zod'
import { db } from '@/db'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const memeId = url.searchParams.get('memeId')

    if (!memeId) {
      return Response.json({ error: 'Missing memeId' }, { status: 400 })
    }

    const commentsWithUsers = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        user: {
          id: users.id,
          username: users.username,
          fullName: users.name,
          email: users.email,
          image: users.image
        },
        memeId: comments.memeId,
        parentId: comments.parentId
      })
      .from(comments)
      .where(eq(comments.memeId, memeId))
      .innerJoin(users, eq(comments.userId, users.id))
      .orderBy(desc(comments.createdAt))

    const result = {
      comments: commentsWithUsers,
      totalCount: await db.$count(comments)
    }

    return Response.json(result, { status: 200 })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return Response.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const userId = session.user.id

    const body = await req.json()
    const { content, memeId, parentId } = commentInsertSchema.parse(body)

    let createdComment

    if (parentId) {
      createdComment = await db
        .insert(comments)
        .values({ content, userId, memeId, parentId })
        .returning({
          id: comments.id,
          content: comments.content,
          userId: comments.userId,
          memeId: comments.memeId,
          parentId: comments.parentId
        })
    } else {
      createdComment = await db
        .insert(comments)
        .values({ content, userId, memeId })
        .returning({
          id: comments.id,
          content: comments.content,
          userId: comments.userId,
          memeId: comments.memeId
        })
    }

    return Response.json(
      { message: 'Comment created successfully', data: createdComment[0] },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return Response.json(
      { error: 'There was an error commenting a meme' },
      { status: 500 }
    )
  }
}
