'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { memeSelectSchemaType } from '@/zod-schemas/meme'
import { userSelectSchemaType } from '@/zod-schemas/user'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar'

interface SearchResultType {
  memes: memeSelectSchemaType[]
  users: userSelectSchemaType[]
}

export default function SearchResult() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''

  const { data, isLoading } = useQuery({
    queryKey: ['memes', 'users', search],
    queryFn: async () => {
      if (!search) return { memes: [], users: [] }

      const response = await fetch(`/api/search?search=${encodeURIComponent(search)}`)
      if (!response.ok) throw new Error('Failed to fetch search results')

      const data: SearchResultType = await response.json()
      return data
    },
    enabled: !!search
  })

  return (
    <div className='w-full flex flex-col items-center'>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className='w-full'>
          <TabsTrigger value="top" className='w-full'>Top</TabsTrigger>
          <TabsTrigger value="people" className='w-full'>People</TabsTrigger>
          <TabsTrigger value="meme" className='w-full'>Meme</TabsTrigger>
        </TabsList>
        <TabsContent value="top">
          <div className='w-full flex flex-col gap-y-2'>
            <h2 className='text-lg font-medium'>People</h2>
            <div className='flex flex-col gap-1 w-full'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'></div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="people">Change your password here.</TabsContent>
        <TabsContent value="meme">Change your password here.</TabsContent>
      </Tabs>
  </div>
  )
}
