'use server'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getMemes } from '@/lib/queries/memes'
import { type memeSelectSchemaType } from '@/zod-schemas/meme'
import { type userSelectSchemaType } from '@/zod-schemas/user'

type MemeWithUser = {
  memes: memeSelectSchemaType
  users: userSelectSchemaType
}

export default async function MemeLists() {
  const memes: MemeWithUser[] = await getMemes()

  if (!memes) return <div>Loading...</div>

  return (
    <section className='flex flex-col'>
      <div className='py-3'>
        {memes.map((meme, index) => (
          <div
            key={index}
            className='flex w-full gap-x-2 border-b border-zinc-300 p-3 dark:border-b-zinc-800'
          >
            <Avatar className='mt-[0.3rem]'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex w-full flex-col gap-y-3'>
              <div className='flex items-center justify-between'>
                <div className='block'>
                  <div className='flex items-center gap-x-2'>
                    <h4 className='font-bold'>{meme.users?.name}</h4>
                    <span className='h-1 w-1 rounded-full bg-gray-400'></span>
                    <span className='text-sm text-zinc-500'>15 hours ago</span>
                  </div>
                  <span>{meme.memes.title}</span>
                </div>
                {/* Actions */}
              </div>
              <img
                src={meme.memes.body}
                alt={meme.memes.title}
                className='h-full max-h-[20rem] w-full rounded-md object-cover'
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
