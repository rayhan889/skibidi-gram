'use client'

import { LayoutGrid, Search, Bookmark, FilePlus2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'

export const LeftSidebar = () => {
  const navLinks = [
    {
      name: 'Home',
      href: '/home',
      icon: <LayoutGrid />
    },
    {
      name: 'Explore',
      href: '/explore',
      icon: <Search />
    },
    {
      name: 'Bookmarks',
      href: '/bookmarks',
      icon: <Bookmark />
    }
  ]

  const pathname = usePathname()

  return (
    <div className='hidden flex-col items-end p-4 lg:flex'>
      <div className='flex w-[45%] flex-col items-center gap-y-4'>
        <ul className='w-full space-y-4'>
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.href}
                style={{
                  justifyContent: 'start'
                }}
                className={`${buttonVariants({ variant: 'ghost', className: `flex w-full ${pathname === link.href ? 'border border-zinc-200/50 bg-white shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900' : ''}` })}`}
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={'/compose/submit'}
          className={`${buttonVariants({ variant: 'primary', className: 'w-full' })}`}
        >
          <FilePlus2 />
          Create
        </Link>
      </div>
    </div>
  )
}
