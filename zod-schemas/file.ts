import { z } from 'zod'

export const fileSelectSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
  path: z.string()
})

export type fileSelectSchemaType = typeof fileSelectSchema._type
