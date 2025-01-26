import { memes, users, files as filesDb } from '@/db/schema'
import { eq, desc, inArray } from 'drizzle-orm'
import { memeInsertSchema } from '@/zod-schemas/meme'
import { getAuthSession } from '@/lib/auth'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { db } from '@/db'

export async function GET(_: Request) {
  try {
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
      .orderBy(desc(memes.createdAt))
      .limit(5)

    const memeIds = memeWithUsers.map(meme => meme.id)

    const files = await db
      .select({
        memeId: filesDb.memeId,
        fileName: filesDb.fileName,
        fileType: filesDb.fileType,
        path: filesDb.path
      })
      .from(filesDb)
      .where(inArray(filesDb.memeId, memeIds))

    const result = memeWithUsers.map(meme => ({
      ...meme,
      files: files
        .filter(file => file.memeId === meme.id)
        .map(file => ({
          fileName: file.fileName,
          fileType: file.fileType,
          path: file.path
        }))
    }))

    return Response.json(result)
  } catch (error) {
    console.error('Error fetching memes:', error)
    return Response.json({ error: 'Failed to fetch memes' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { files, title, userId } = memeInsertSchema.parse(body)
    const memeId = nanoid(20)

    const [meme] = await db
      .insert(memes)
      .values({
        id: memeId,
        title,
        userId
      })
      .returning({
        id: memes.id,
        title: memes.title,
        userId: memes.userId
      })

    const createdFiles = await Promise.all(
      files.map(async file => {
        const [createdFile] = await db
          .insert(filesDb)
          .values({
            id: nanoid(20),
            fileName: file.fileName,
            fileType: file.fileType,
            path: file.path,
            memeId: meme.id
          })
          .returning()

        return createdFile
      })
    )

    return Response.json(
      {
        message: 'Meme created successfully',
        data: { meme, files: createdFiles }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating meme:', error)

    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return Response.json(
      { error: 'There was an error creating the meme' },
      { status: 500 }
    )
  }
}
