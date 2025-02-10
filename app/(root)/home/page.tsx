'use client'

import MemesList from "@/components/MemesList"
import { memeSelectSchemaType } from "@/zod-schemas/meme"
import { useQuery } from "@tanstack/react-query"

export default function Home() {
  const { data: memes, isLoading } = useQuery({
    queryKey: ['memes'],
    queryFn: async () => {
      const response = await fetch('/api/meme')
      const data: memeSelectSchemaType[] = await response.json()
      return data
    }
  })
  
  return <MemesList memes={memes as memeSelectSchemaType[]} isLoading={isLoading} />
}
