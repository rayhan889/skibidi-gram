'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type fileSelectSchemaType } from '@/zod-schemas/file'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export type MemeImageFullViewProps = {
  user: string
  memeId: string
  imageIndex: string
}

export const MemeImageFullView = ({
  imageIndex,
  memeId,
  user
}: MemeImageFullViewProps) => {
  const router = useRouter()

  const { data: images, isLoading } = useQuery({
    queryKey: ['files', user, memeId],
    queryFn: async () => {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, memeId })
      })
      const data: fileSelectSchemaType[] = await response.json()
      return data
    }
  })

  if (isLoading || !images) return <div>Loading...</div>

  const nextFile = () => {
    router.push(`/${user}/${memeId}/image/${Number(imageIndex) + 1}`)
  }

  const prevFile = () => {
    router.push(`/${user}/${memeId}/image/${Number(imageIndex) - 1}`)
  }

  return (
    <div className='flex h-full w-full items-center justify-center'>
      {Number(imageIndex) > 1 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                className='absolute left-4 top-1/2 z-10 h-10 w-10 bg-black/70 text-white shadow-sm'
                size={'icon'}
                variant={'ghost'}
                onClick={prevFile}
              >
                <span className='sr-only'>Previous</span>
                <FiChevronLeft style={{ width: 20, height: 20 }} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <img
        src={images[Number(imageIndex) - 1].path}
        alt={images[Number(imageIndex) - 1].fileName}
        className='h-auto w-full lg:w-auto'
      />
      {Number(imageIndex) < images.length && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                className='absolute right-4 top-1/2 z-10 h-10 w-10 bg-black/70 text-white shadow-sm'
                size={'icon'}
                variant={'ghost'}
                onClick={nextFile}
              >
                <span className='sr-only'>Next</span>
                <FiChevronRight style={{ width: 20, height: 20 }} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
