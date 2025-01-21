import { memes, users, files as filesDb } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { memeInsertSchema } from '@/zod-schemas/meme'
import { getAuthSession } from '@/lib/auth'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { db } from '@/db'

export async function GET(req: Request) {
  try {
    const data = await db
      .select()
      .from(memes)
      .innerJoin(users, eq(memes.userId, users.id))

    return Response.json(data)
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
