'use client'

import { ArrowLeft, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Searchbar = () => {
  const router = useRouter()

  const [search, setSearch] = useState<string>('')
  const [debounced] = useDebounce(search, 500)

  useEffect(() => {
    if (!debounced) {
      router.push('/explore')
    } else {
      router.push(`/explore?search=${search}`)
    }
  }, [debounced, router])

  return (
    <div className='flex w-full items-center justify-between gap-3'>
      <Button
        variant={'ghost'}
        size={'icon'}
        className='p-6'
        onClick={() => router.back()}
      >
        <ArrowLeft size={20} />
      </Button>
      <div className='relative w-full'>
        <Search
          className='absolute left-3 top-3.5 text-muted-foreground'
          size={20}
        />
        <Input
          value={search ?? ''}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search...'
          className='w-full rounded-lg py-6 pl-12 pr-6'
        />
      </div>
    </div>
  )
}
