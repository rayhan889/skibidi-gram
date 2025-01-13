import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { memes } from '@/db/schema'
import { z } from 'zod'

export const memeInsertSchema = createInsertSchema(memes, {
  title: schema =>
    schema
      .min(1, 'Title min characters is 1')
      .max(100, 'Title max characters is 100'),
  userId: schema => schema.nonempty('User id is required'),
  body: z
    .instanceof(File)
    .refine(file => file.size !== 0, 'Please upload an image')
})

export const memeSelectSchema = createSelectSchema(memes)

export type memeSelectSchemaType = typeof memeSelectSchema._type

export type memeInsertSchemaType = typeof memeInsertSchema._type
