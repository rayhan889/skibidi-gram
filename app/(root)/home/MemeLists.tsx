'use server'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { type memeSelectSchemaType } from '@/zod-schemas/meme'
import { type userSelectSchemaType } from '@/zod-schemas/user'

type MemeWithUser = {
  memes: memeSelectSchemaType
  users: userSelectSchemaType
}

export default async function MemeLists() {
  return (
    <section className='flex flex-col'>
      <div className='py-3'></div>
    </section>
  )
}
