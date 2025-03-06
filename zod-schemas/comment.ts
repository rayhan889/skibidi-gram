import { z } from 'zod'

export const commentInsertSchema = z.object({
  memeId: z.string().nonempty(),
  content: z.string().min(1).max(1000),
  parentId: z.string().optional()
})

export const commentSelectSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    fullName: z.string(),
    email: z.string().email(),
    image: z.string()
  }),
  replies: z
    .array(
      z.object({
        id: z.string(),
        content: z.string(),
        user: z.object({
          id: z.string(),
          username: z.string(),
          fullName: z.string(),
          email: z.string().email(),
          image: z.string()
        })
      })
    )
    .nullable()
})

export type commentInsertSchemaType = z.infer<typeof commentInsertSchema>

export type commentSelectSchemaType = z.infer<typeof commentSelectSchema>
