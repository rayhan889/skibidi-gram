import { createSelectSchema } from 'drizzle-zod'
import { memes } from '@/db/schema'

export const memeSelectSchema = createSelectSchema(memes)

export type memeSelectSchemaType = typeof memeSelectSchema._type
