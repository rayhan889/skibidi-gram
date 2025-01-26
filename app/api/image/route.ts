import { files as filesDb, memes, users } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { db } from '@/db'
import { takeUniqueOrThrow } from '@/lib/takeOneRecord'

export async function POST(req: Request) {
  try {
    const { user, memeId } = await req.json()

    const userDt = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, user))
      .limit(1)
      .then(takeUniqueOrThrow)

    const meme = await db
      .select({ id: memes.id })
      .from(memes)
      .where(and(eq(memes.id, memeId), eq(memes.userId, userDt.id)))
      .limit(1)
      .then(takeUniqueOrThrow)

    const memeFiles = await db
      .select({
        fileName: filesDb.fileName,
        fileType: filesDb.fileType,
        path: filesDb.path
      })
      .from(filesDb)
      .where(eq(filesDb.memeId, meme.id))

    return Response.json(memeFiles)
  } catch (error) {
    console.error('Error fetching files:', error)
    return Response.json({ error: 'Failed to fetch files' }, { status: 500 })
  }
}
