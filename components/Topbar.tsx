import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { LogoutLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import Link from 'next/link'
import { ModeToggle } from '@/components/ModeToggle'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const Topbar = async () => {
  const { isAuthenticated } = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()

  return (
    <nav className='fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-zinc-300 bg-white/75 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/75'>
      <div className='container mx-auto flex w-full max-w-7xl items-center justify-between'>
        <Link href='/' className={buttonVariants({ variant: 'link' })}>
          <h1 className='font-semibold leading-tight tracking-wide'>
            🙀skibidi gram.
          </h1>
        </Link>

        <div className='md:hidden'>
          <ModeToggle />
        </div>

        <div className='hidden gap-4 md:flex'>
          <ModeToggle />
          {isUserAuthenticated ? (
            <Button variant={'ghost'}>
              <LogoutLink>Logout</LogoutLink>
            </Button>
          ) : (
            <Button variant={'ghost'}>
              <LoginLink>Login</LoginLink>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
