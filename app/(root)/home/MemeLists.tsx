'use client'

import { useQuery } from '@tanstack/react-query'
import { memeSelectSchemaType } from '@/zod-schemas/meme'
import { LuLoaderCircle } from 'react-icons/lu'

import { MemeCard } from '@/components/MemeCard'

export default function MemeLists() {
  const { data: memes, isLoading } = useQuery({
    queryKey: ['memes', 'comments'],
    queryFn: async () => {
      const response = await fetch('/api/meme')
      const data: memeSelectSchemaType[] = await response.json()
      return data
    }
  })

  return (
    <section className='flex h-full flex-col'>
      {isLoading ? (
        <div className='flex h-full items-center justify-center space-x-2 text-muted-foreground'>
          <p>Loading...</p>
          <LuLoaderCircle className='mr-2 h-5 w-5 animate-spin' />
        </div>
      ) : (
        <div className='py-3'>
          {memes?.map((meme, index) => <MemeCard key={index} data={meme} />)}
        </div>
      )}
    </section>
  )
}
