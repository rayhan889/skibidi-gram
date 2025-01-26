import { FiMoreHorizontal, FiEdit3, FiTrash2, FiBookmark } from 'react-icons/fi'
import { formatDate } from '@/lib/formatDate'
import { memeSelectSchemaType } from '@/zod-schemas/meme'

import { Button } from '@/components/ui/button'
import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MemeImage } from '@/components/MemeImage'

export const MemeCard = ({ data }: { data: memeSelectSchemaType }) => {
  const initial = data.user.fullName.match(/[A-Z]/g)?.join('')
  const lastIndex = data.files.length - 1

  function isDisplayFull(index: number): boolean {
    if (data.files.length === 1) {
      return true
    } else if (data.files.length === 3 && lastIndex == index) {
      return true
    }

    return false
  }

  return (
    <div className='flex w-full gap-x-2 border-b border-b-zinc-300 p-3 dark:border-b-zinc-800'>
      <Avatar className='mt-[0.3rem]'>
        <AvatarImage src={data.user.image} />
        <AvatarFallback>{initial}</AvatarFallback>
      </Avatar>
      <div className='flex w-full flex-col gap-y-3'>
        <div className='flex items-start justify-between'>
          <div className='block'>
            <div className='flex flex-col items-start gap-x-2 md:flex-row md:items-center'>
              <h4 className='font-semibold'>{data.user.fullName}</h4>
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
                <FiMoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col space-y-2'>
              <Button
                variant={'ghost'}
                style={{
                  justifyContent: 'start'
                }}
              >
                <FiEdit3 />
                Edit
              </Button>
              <Button
                variant={'ghost'}
                style={{
                  justifyContent: 'start'
                }}
              >
                <FiBookmark />
                Bookmark
              </Button>
              <DropdownMenuSeparator />
              <Button
                variant={'ghost'}
                style={{
                  justifyContent: 'start'
                }}
              >
                <FiTrash2 />
                Delete
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
      </div>
    </div>
  )
}
