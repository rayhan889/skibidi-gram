'use client'

import { Bookmark, Ellipsis, Heart } from 'lucide-react'
import { formatDate } from '@/lib/formatDate'
import { memeSelectSchemaType } from '@/zod-schemas/meme'
import { useState } from 'react'
import { motion } from 'motion/react'
import { useMutation } from '@tanstack/react-query'
import { likeInsertSchemaType } from '@/zod-schemas/meme'

import { Button } from '@/components/ui/button'
import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MemeImage } from '@/components/MemeImage'
import { toast } from '@/hooks/use-toast'

export const MemeCard = ({ data }: { data: memeSelectSchemaType }) => {
  const [isLiked, setIsLiked] = useState(false)

  console.log('Is Meme Liked: ', data.isLiked)

  const { mutate: likeMeme, data: likesCount } = useMutation({
    mutationFn: async () => {
      const payload: likeInsertSchemaType = {
        memeId: data.id,
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
      const response = await fetch('/api/like', requestOptions)
      const resultData = await response.json()
      return resultData as number
    },
    onError: err => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive'
      })
    }
  })

  const handleLike = () => {
    likeMeme()
    setIsLiked(prev => !prev)
  }

  const initial = data.user.fullName.match(/[A-Z]/g)?.join('')
  const lastIndex = data.files.length - 1

  let truncatedUserName

  function isDisplayFull(index: number): boolean {
    if (data.files.length === 1) {
      return true
    } else if (data.files.length === 3 && lastIndex == index) {
      return true
    }

    return false
  }

  if (data.user.fullName) {
    truncatedUserName =
      data.user.fullName.length > 15
        ? data.user.fullName.slice(0, 15) + '...'
        : data.user.fullName
  }

  return (
    <div className='flex w-full gap-x-2 border-b border-b-zinc-200 p-3 dark:border-b-zinc-800'>
      <Avatar className='mt-[0.3rem]'>
        <AvatarImage src={data.user.image} />
        <AvatarFallback>{initial}</AvatarFallback>
      </Avatar>
      <div className='flex w-full flex-col gap-y-3'>
        <div className='flex items-start justify-between'>
          <div className='block'>
            <div className='flex flex-col items-start gap-x-2 md:flex-row md:items-center'>
              <h4 className='font-semibold'>{truncatedUserName}</h4>
              <div className='flex items-center space-x-1'>
                <span className='text-sm text-muted-foreground'>
                  @{data.user.username}
                </span>
                <span className='h-1 w-1 rounded-full bg-gray-400'></span>
                <span className='text-sm text-muted-foreground'>
                  {formatDate(data.createdAt)}
                </span>
              </div>
            </div>
            <span className='text-sm'>{data.title}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'} size={'icon'}>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col space-y-2'>
              <Button
                variant={'ghost'}
                style={{
                  justifyContent: 'start'
                }}
              >
                <Bookmark />
                Bookmark
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {data.files.slice(0, 4).map((file, index) => (
            <MemeImage
              key={index}
              file={file}
              memeId={data.id}
              username={data.user.username}
              fileIndex={index}
              isDisplayFull={isDisplayFull(index)}
              isLast={data.files.length > 4 && lastIndex - 1 == index}
            />
          ))}
        </div>
        <div className='w-full'>
          <span
            className={`flex w-fit items-center gap-1 text-sm hover:text-pink-600 ${isLiked && 'text-pink-600'}`}
          >
            <div
              className='cursor-pointer rounded-full p-2 hover:bg-pink-600/10'
              onClick={handleLike}
            >
              <motion.div
                animate={{ scale: isLiked ? 1 : 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Heart size={16} fill={isLiked ? 'rgb(219 39 119)' : 'none'} />
              </motion.div>
            </div>
            {likesCount ?? data.likeCount}
          </span>
        </div>
      </div>
    </div>
  )
}
