'use client'

import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { BsLaptop } from 'react-icons/bs'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export const ModeToggle = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'sm'}>
          <FiSun className='rotate-0 scale-100 transition-all hover:text-zinc-900 dark:-rotate-90 dark:scale-0 dark:text-zinc-400 dark:hover:text-zinc-100' />
          <FiMoon className='absolute rotate-90 scale-0 transition-all hover:text-zinc-900 dark:rotate-0 dark:scale-100 dark:text-zinc-400 dark:hover:text-zinc-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' forceMount>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <FiSun className='mr-2 h-4 w-4' />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <FiMoon className='mr-2 h-4 w-4' />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <BsLaptop className='mr-2 h-4 w-4' />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
