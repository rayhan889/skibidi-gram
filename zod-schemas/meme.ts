import { z } from 'zod'

export const memeInsertSchema = z.object({
  title: z.string().min(1).max(100),
  files: z.array(
    z.object({
      fileName: z.string().min(1),
      fileType: z.string().min(1),
      path: z.string().url('Invalid file URL')
    })
  ),
  userId: z.string().nonempty()
})

export const memeSelectSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  files: z.array(
    z.object({
      fileName: z.string().min(1),
      fileType: z.string().min(1),
      path: z.string().url('Invalid file URL')
    })
  ),
  user: z.object({
    username: z.string(),
    fullName: z.string(),
    email: z.string().email(),
    image: z.string()
  })
})

export type memeInsertSchemaType = z.infer<typeof memeInsertSchema>

export type memeSelectSchemaType = z.infer<typeof memeSelectSchema>
