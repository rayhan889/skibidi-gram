'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { memeSelectSchemaType } from '@/zod-schemas/meme'
import { userSelechWithExtrasSchemaType } from '@/zod-schemas/user'
import { LuLoaderCircle } from 'react-icons/lu'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TopContent from './TopContent'
import PeopleContent from './PeopleContent'
import MemeContent from './MemeContent'

export interface SearchResultType {
  memes: memeSelectSchemaType[]
  users: userSelechWithExtrasSchemaType[]
}

export default function SearchResult() {
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''

  const { data: searchData, isLoading: isLoadingSearchData } = useQuery({
    queryKey: ['memes', 'users', search],
    queryFn: async () => {
      if (!search) return { memes: [], users: [] }

      const response = await fetch(
        `/api/search?search=${encodeURIComponent(search)}`
      )
      if (!response.ok) throw new Error('Failed to fetch search results')

      const data: SearchResultType = await response.json()
      return data
    },
    enabled: !!search
  })

  return (
    <div className='flex h-full w-full flex-col items-center'>
      <Tabs defaultValue='top' className='h-full w-full'>
        <TabsList className='w-full'>
          <TabsTrigger value='top' className='w-full'>
            Top
          </TabsTrigger>
          <TabsTrigger value='people' className='w-full'>
            People
          </TabsTrigger>
          <TabsTrigger value='meme' className='w-full'>
            Meme
          </TabsTrigger>
        </TabsList>
        {isLoadingSearchData && (
          <div className='flex h-full items-center justify-center space-x-2 text-muted-foreground'>
            <p>Loading...</p>
            <LuLoaderCircle className='mr-2 h-5 w-5 animate-spin' />
          </div>
        )}
        {searchData ? (
          <>
            <TabsContent value='top' className='h-full'>
              <TopContent searchData={searchData} />
            </TabsContent>
            <TabsContent value='people' className='h-full'>
              <PeopleContent users={searchData.users} />
            </TabsContent>
            <TabsContent value='meme'>
              <MemeContent memes={searchData.memes} />
            </TabsContent>
          </>
        ) : (
          <div className='flex h-full items-center justify-center space-x-2 text-muted-foreground'>
            <p>Search something idiot...</p>
          </div>
        )}
      </Tabs>
    </div>
  )
}
