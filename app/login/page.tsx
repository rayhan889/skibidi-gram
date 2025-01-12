import React from 'react'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { Button } from '@/components/ui/button'

const LoginPage = () => {
  return (
    <section className='py-24'>
      <div className='container max-w-md'>
        <Button asChild variant={'default'} className='w-full'>
          <LoginLink>Sign in</LoginLink>
        </Button>
      </div>
    </section>
  )
}

export default LoginPage
