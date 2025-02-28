import { memes, users, files as filesDb, likes } from '@/db/schema'
import { eq, desc, inArray, or, ilike, and } from 'drizzle-orm'
import { db } from '@/db'
import { NextRequest } from 'next/server'
import { getAuthSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const userId = session.user.id
    const search = req.nextUrl.searchParams.get('search') || ''

    const memeWithUsers = await db
      .select({
        id: memes.id,
        title: memes.title,
        createdAt: memes.createdAt,
        user: {
          username: users.username,
          fullName: users.name,
          email: users.email,
          image: users.image
        }
      })
      .from(memes)
      .innerJoin(users, eq(memes.userId, users.id))
      .where(
        or(
          ilike(memes.title, `%${search}%`),
          ilike(users.username, `%${search}%`),
          ilike(users.name, `%${search}%`)
        )
      )
      .orderBy(desc(memes.createdAt))

    const memeIds = memeWithUsers.map(meme => meme.id)

    const likesCounts = await db
      .select({ memeId: likes.memeId })
      .from(likes)
      .where(inArray(likes.memeId, memeIds))
      .groupBy(likes.memeId, likes.userId)

    const files = await db
      .select({
        memeId: filesDb.memeId,
        fileName: filesDb.fileName,
        fileType: filesDb.fileType,
        path: filesDb.path
      })
      .from(filesDb)
      .where(inArray(filesDb.memeId, memeIds))

    let userLikes: { memeId: string }[] = []
    if (userId) {
      userLikes = await db
        .select({ memeId: likes.memeId })
        .from(likes)
        .where(and(eq(likes.userId, userId), inArray(likes.memeId, memeIds)))
    }

    const usersData = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        email: users.email,
        image: users.image,
        createdAt: users.createdAt
      })
      .from(users)
      .where(
        or(
          ilike(users.username, `%${search}%`),
          ilike(users.name, `%${search}%`)
        )
      )

    const memesData = memeWithUsers.map(meme => ({
      ...meme,
      files: files
        .filter(file => file.memeId === meme.id)
        .map(file => ({
          fileName: file.fileName,
          fileType: file.fileType,
          path: file.path
        })),
      likeCount: likesCounts.filter(like => like.memeId === meme.id).length,
      isLiked: userLikes.some(like => like.memeId === meme.id)
    }))

    const result = {
      memes: memesData,
      users: usersData
    }

    return Response.json(result)
  } catch (error) {
    console.error('Error fetching memes:', error)
    return Response.json({ error: 'Failed to fetch memes' }, { status: 500 })
  }
}
