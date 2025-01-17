import React from 'react'
import { FiPlus, FiHome, FiSearch, FiBookmark } from 'react-icons/fi'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export const LeftSidebar = () => {
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
                className={`${buttonVariants({ variant: 'ghost', className: 'flex w-full' })}`}
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={'/compose/submit'}
          className={`${buttonVariants({ variant: 'default', className: 'flex w-full' })}`}
        >
          <FiPlus />
          Create
        </Link>
      </div>
    </div>
  )
}
