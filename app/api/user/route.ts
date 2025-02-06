import { users, userExtras, memes } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { takeUniqueOrThrow } from '@/lib/takeOneRecord'

export async function POST(req: Request) {
  try {
    const { username } = await req.json()

    const userBasicInfo = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        email: users.email,
        image: users.image,
        createdAt: users.createdAt
      })
      .from(users)
      .where(eq(users.username, username))
      .limit(1)
      .then(takeUniqueOrThrow)

    const userExtrasInfo = await db
      .select({
        bio: userExtras.bio,
        background: userExtras.background
      })
      .from(userExtras)
      .where(eq(userExtras.userId, userBasicInfo.id))
      .limit(1)

    const memesPosted = await db
      .select()
      .from(memes)
      .where(eq(memes.userId, userBasicInfo.id))

    const userInfo = {
      ...userBasicInfo,
      bio: userExtrasInfo[0]?.bio ?? '',
      background: userExtrasInfo[0]?.background ?? '',
      totalMemesPosted: memesPosted.length
    }

    return Response.json(userInfo, { status: 200 })
  } catch (error) {
    console.error('Error fetching user info:', error)
    return Response.json(
      { error: 'Failed to fetch user info' },
      { status: 500 }
    )
  }
}
