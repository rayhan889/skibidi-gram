'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { userSelechWithExtrasSchemaType } from '@/zod-schemas/user'
import { LuLoaderCircle } from 'react-icons/lu'
import { memeSelectSchemaType } from '@/zod-schemas/meme'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { BasicProfile } from '@/components/BasicProfile'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MemesList from '@/components/MemesList'

export default function ProfilePage() {
  const params = useParams<{ username: string }>()

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: params.username })
      })
      const data: userSelechWithExtrasSchemaType = await response.json()
      return data
    }
  })

  const { data: userMemes, isLoading: isLoadingMemes } = useQuery({
    queryKey: ['memes'],
        queryFn: async () => {
          const response = await fetch(`/api/meme/${params.username}`)
          const data: memeSelectSchemaType[] = await response.json()
          return data
        }
  })

  let truncatedUserName = userInfo?.name

  if (userInfo) {
    truncatedUserName =
      userInfo.name.length > 15
        ? userInfo.name.slice(0, 15) + '...'
        : userInfo.name
  }

  return (
    <section className='flex h-full flex-col'>
      {isLoading ? (
        <div className='flex h-full items-center justify-center space-x-2 text-muted-foreground'>
          <p>Loading...</p>
          <LuLoaderCircle className='mr-2 h-5 w-5 animate-spin' />
        </div>
      ) : (
        <div className='relative pl-2 pr-4'>
          <div className='absolute inset-0 h-fit w-full border-b border-zinc-300 bg-white/75 p-5 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/75'>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{truncatedUserName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <BasicProfile userInfo={userInfo as userSelechWithExtrasSchemaType} />
          <div className='absolute w-full -translate-x-2 h-full top-[28rem]'>
            <Tabs defaultValue='memes' className='w-full px-3'>
              <TabsList className='w-full grid grid-cols-3 gap-2'>
                <TabsTrigger value='memes'>Memes</TabsTrigger>
                <TabsTrigger value='replies'>Replies</TabsTrigger>
                <TabsTrigger value='likes'>Likes</TabsTrigger>
              </TabsList>
              <TabsContent value='memes' className='absolute w-full -translate-x-3'>
                <MemesList memes={userMemes as memeSelectSchemaType[]} isLoading={isLoadingMemes} />
              </TabsContent>
              <TabsContent value='replies'>Lisf of replies</TabsContent>
              <TabsContent value='likes'>Lisf of liked memes</TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </section>
  )
}
