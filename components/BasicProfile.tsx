'use client'

import { userSelechWithExtrasSchemaType } from '@/zod-schemas/user'
import Image from 'next/image'
import { PencilLine, CalendarDays, ImageUp } from 'lucide-react'

import { Button } from '@/components/ui/button'

type BasicProfileProps = {
  userInfo: userSelechWithExtrasSchemaType
}

export const BasicProfile = ({ userInfo }: BasicProfileProps) => {
  let formattedDate = userInfo?.createdAt

  const date = new Date(userInfo.createdAt)
  formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return (
    <>
      <div className='h-28 w-full'>
        <Image
          src={
            userInfo?.background && userInfo?.background.trim() !== ''
              ? userInfo.background
              : '/assets/default-user-bg.jpg'
          }
          alt='User Image'
          fill
          objectFit='cover'
          className='inset-0 -z-50 mt-[61px]'
        />
      </div>
      <div className='w-full translate-x-1'>
        <div className='absolute flex w-full translate-y-4 flex-col space-y-3'>
          <Image
            src={userInfo?.image ?? ''}
            alt={userInfo?.name ?? ''}
            width={100}
            height={100}
            className='h-24 w-24 rounded-full object-cover shadow-sm'
          />
          <div className='flex flex-col space-y-3'>
            <div>
              <h2 className='font-medium'>{userInfo?.name}</h2>
              <span className='text-sm text-muted-foreground'>
                {userInfo?.username}
              </span>
            </div>
            <div className='h-fit w-full rounded-md'>
              <span className='text-sm text-muted-foreground'>Bio</span>
              <p className='h-full w-full text-sm tracking-wide'>
                {userInfo?.bio ? userInfo?.bio : 'No bio provided'}
              </p>
            </div>
            <div className='grid w-full grid-cols-2 gap-2'>
              <div className='flex flex-col space-y-2 rounded-md border border-zinc-300 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950'>
                <div className='flex items-center gap-2'>
                  <CalendarDays size={16} className='text-muted-foreground' />
                  <span className='text-sm text-muted-foreground'>
                    Joined In
                  </span>
                </div>
                <span className='text-sm lg:text-base'>{formattedDate}</span>
              </div>
              <div className='flex flex-col space-y-2 rounded-md border border-zinc-300 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950'>
                <div className='flex items-center gap-2'>
                  <ImageUp size={16} className='text-muted-foreground' />
                  <span className='text-sm text-muted-foreground'>
                    Total Posted
                  </span>
                </div>
                <span className='text-sm lg:text-base'>
                  {userInfo?.totalMemesPosted ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button className='absolute right-0 translate-y-20' variant={'outline'}>
          <PencilLine />
          Edit Profile
        </Button>
      </div>
    </>
  )
}
