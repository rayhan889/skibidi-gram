import { z } from 'zod'

export const userSelectSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  image: z.string(),
  createdAt: z.string()
})

export const userSelechWithExtrasSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  image: z.string(),
  createdAt: z.string(),
  bio: z.string(),
  background: z.string(),
  totalMemesPosted: z.number()
})

export type userSelectSchemaType = typeof userSelectSchema._type

export type userSelechWithExtrasSchemaType =
  typeof userSelechWithExtrasSchema._type
