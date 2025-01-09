import { createSelectSchema } from 'drizzle-zod'
import { users } from '@/db/schema'

export const userSelectSchema = createSelectSchema(users)

export type userSelectSchemaType = typeof userSelectSchema._type
