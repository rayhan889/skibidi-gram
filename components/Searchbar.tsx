'use client'

import { ArrowLeft, Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export const Searchbar = () => {
  const router = useRouter()

  const [search, setSearch] = useState<string>('')
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window != 'undefined') {
      return JSON.parse(localStorage.getItem('searchHistory') || '[]')
    }
    return []
  })
  const [debounced] = useDebounce(search, 500)

  useEffect(() => {
    if (!debounced) {
      router.replace('/explore')
    } else {
      router.replace(`/explore?search=${search}`)
    }
  }, [debounced, router])

  const updateSearchHistory = (query: string) => {
    if (!query.trim()) return
    setSearchHistory(prev => {
      if (prev.includes(query)) return prev
      const updatedHistory = [...prev, search].slice(-5)
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
      return updatedHistory
    })
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }

  const removeSearchHistory = (item: string) => {
    setSearchHistory(prev => {
      const updatedHistory = prev.filter(history => history !== item)
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
      return updatedHistory
    })
  }

  const setSearchValue = (query: string) => {
    if (search === query) return
    setSearchHistory(prev => {
      const updatedHistory = prev.filter(history => history !== query)
      updatedHistory.unshift(query)
      const finalHistory = updatedHistory.slice(0, 5)

      localStorage.setItem('searchHistory', JSON.stringify(finalHistory))

      return finalHistory
    })
    setSearch(query)
  }

  const clearSearchValue = () => {
    setSearch('')
  }

  useEffect(() => {
    if (search) {
      updateSearchHistory(debounced)
    }
  }, [debounced])

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
      <Popover>
        <PopoverTrigger className='w-full'>
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
            {search && (
              <span
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'icon',
                  className: 'absolute right-2 top-[7px]'
                })}
                onClick={clearSearchValue}
              >
                <X />
              </span>
            )}
          </div>
        </PopoverTrigger>
        {searchHistory.length > 0 && (
          <PopoverContent className='w-[257px] md:w-[634px] lg:w-[508px]'>
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center justify-between'>
                <h4 className='font-medium'>Recent</h4>
                <Button variant={'link'} onClick={clearSearchHistory}>
                  Clear All
                </Button>
              </div>
              {searchHistory.map((history, index) => (
                <div key={index} className='flex justify-between'>
                  <span
                    className='w-full cursor-pointer'
                    onClick={() => setSearchValue(history)}
                  >
                    {history}
                  </span>
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    onClick={() => removeSearchHistory(history)}
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  )
}
