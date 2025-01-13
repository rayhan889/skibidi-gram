import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import { memes } from '@/db/schema'

export const memeInsertSchema = createInsertSchema(memes, {
  title: schema =>
    schema.min(1, 'Title min length is 1').max(100, 'Title max length is 100'),
  userId: schema => schema.nonempty('User id is required'),
  body: schema => schema.min(1, 'Body min length is 1')
})

export const memeSelectSchema = createSelectSchema(memes)

export type memeSelectSchemaType = typeof memeSelectSchema._type

export type memeInsertSchemaType = typeof memeInsertSchema._type
