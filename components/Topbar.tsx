'use client'

import React from 'react'
import Link from 'next/link'
import { FiMenu, FiPlus } from 'react-icons/fi'
import { useSession } from 'next-auth/react'

import { buttonVariants } from '@/components/ui/button'
import { ModeToggle } from '@/components/ModeToggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const Topbar = () => {
  const { data: session } = useSession()

  let initial
  let truncatedUserEmail

  if (true) {
  }

  return (
    <nav className='fixed left-0 right-0 top-0 z-50 hidden h-20 items-center justify-between border-b border-zinc-300 bg-white/75 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/75 lg:flex'>
      <div className='container mx-auto flex w-full max-w-7xl items-center justify-between'>
        <Link
          href='/'
          className={buttonVariants({
            variant: 'link',
            className: 'hidden md:block'
          })}
        >
          <h1 className='font-semibold leading-tight tracking-wide'>
            🙀skibidi gram.
          </h1>
        </Link>
        <div className='flex items-center md:hidden'>
          <FiMenu className='h-6 w-6' />
          <Link href='/' className={buttonVariants({ variant: 'link' })}>
            <h1 className='text-xl font-semibold leading-tight tracking-wide'>
              🙀.
            </h1>
          </Link>
        </div>

        <div className='flex items-center gap-x-2 md:gap-x-4'>
          <Link
            href={'/compose/submit'}
            className={`${buttonVariants({ variant: 'ghost', size: 'sm', className: 'block md:hidden' })}`}
          >
            <FiPlus />
          </Link>
          <div className='mr-2'>
            <ModeToggle />
          </div>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='h-8 w-8 cursor-pointer'>
                  <AvatarImage
                    src={session.user.image!}
                    alt={session.user.username!}
                  />
                  <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className='flex items-center px-3'>
                  <Avatar>
                    <AvatarImage
                      src={session.user.image!}
                      alt={session.user.username!}
                    />
                    <AvatarFallback>{initial}</AvatarFallback>
                  </Avatar>
                  <div className='block p-4'>
                    <h3 className='font-medium'>{session.user.name}</h3>
                    <span className='text-sm text-zinc-500'>
                      {truncatedUserEmail}
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {/* Logout Button */}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={'/signin'}
              className={`${buttonVariants({ variant: 'ghost' })}`}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
