import React from 'react'
import { FiPlus, FiHome } from 'react-icons/fi'

import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export const LeftSidebar = () => {
  return (
    <div className='hidden flex-col items-end p-4 lg:flex'>
      <div className='flex w-[45%] flex-col items-center gap-y-4'>
        <Link
          href={'/home'}
          className={`${buttonVariants({ variant: 'ghost', className: 'flex w-full items-center justify-start' })}`}
        >
          <FiHome />
          Home
        </Link>
        <Link
          href={'/compose/submit'}
          className={`${buttonVariants({ variant: 'default', className: 'flex w-full items-center justify-start' })}`}
        >
          <FiPlus />
          Create
        </Link>
      </div>
    </div>
  )
}
