'use client'

import Link from 'next/link'
import { FiBookmark, FiHome, FiPlus, FiSearch } from 'react-icons/fi'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

import { Button, buttonVariants } from '@/components/ui/button'
import { ModeToggle } from '@/components/ModeToggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const MobileMenu = () => {
  const navLinks = [
    {
      name: 'Home',
      href: '/home',
      icon: <FiHome />
    },
    {
      name: 'Explore',
      href: '/explore',
      icon: <FiSearch />
    },
    {
      name: 'Bookmarks',
      href: '/bookmarks',
      icon: <FiBookmark />
    }
  ]

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data: session } = useSession()

  let initial
  let truncatedUserName
  let truncatedUserEmail

  if (session) {
    initial = session.user.name?.match(/[A-Z]/g)?.join('')
    truncatedUserEmail = session.user.email?.slice(0, 13) + '...'
    truncatedUserName = session.user.name?.slice(0, 13) + '...'
  }

  return (
    <>
      <nav className='fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-zinc-300 bg-muted shadow-sm dark:border-zinc-800 lg:hidden'>
        <div className='container mx-auto flex w-full max-w-7xl items-center justify-between'>
          <div className='flex items-center'>
            <Button
              variant={'outline'}
              onClick={() => setIsOpen(prev => !prev)}
            >
              <span className='sr-only'>Open sidebar</span>
              <HiOutlineMenuAlt2 className='h-6 w-6' />
            </Button>
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
                  <Link
                    href={`/user/${session.user.username ?? 'username'}`}
                    className='flex items-center px-3'
                  >
                    <Avatar>
                      <AvatarImage
                        src={session.user.image!}
                        alt={session.user.username!}
                      />
                      <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                    <div className='block p-4'>
                      <h3 className='font-medium'>{truncatedUserName}</h3>
                      <span className='text-sm text-muted-foreground'>
                        {truncatedUserEmail}
                      </span>
                    </div>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link
                    className={`${buttonVariants({ variant: 'ghost', className: 'flex w-full' })}`}
                    href={`/user/${session.user.username ?? 'username'}`}
                    style={{ justifyContent: 'start' }}
                  >
                    Profile
                  </Link>
                  <Button
                    variant={'ghost'}
                    className='flex w-full justify-start'
                    onClick={() => signOut({ callbackUrl: '/signin' })}
                  >
                    Logout
                  </Button>
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

      <aside
        className={`fixed left-0 top-0 z-50 mt-20 h-screen w-64 transition-transform md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='h-full overflow-y-auto bg-white/75 px-3 py-4 shadow-sm backdrop-blur-sm dark:bg-zinc-950/75'>
          <ul className='w-full space-y-4'>
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  style={{
                    justifyContent: 'start'
                  }}
                  className={`${buttonVariants({ variant: 'ghost', className: 'flex w-full' })}`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}
