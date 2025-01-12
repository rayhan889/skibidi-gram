import React from 'react'
import { Button } from '@/components/ui/button'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

export const LeftSidebar = () => {
  return (
    <div className='flex flex-col items-center p-4'>
      <Button asChild variant={'secondary'} className='w-full'>
        <LogoutLink postLogoutRedirectURL='/login'>Log out</LogoutLink>
      </Button>
    </div>
  )
}
