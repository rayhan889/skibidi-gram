'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Signin() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.log('Sign in error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-center space-y-3 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h2 className='mx-auto text-xl font-semibold'>Skibidi Gram🐈.</h2>
        <p className='mx-auto max-w-xs text-sm text-muted-foreground'>
          By continuing, you are setting up a Skibidi Gram account and agree to
          our User Agreement and Privacy Policy.
        </p>
      </div>
      <div className='flex w-full justify-center px-6'>
        <Button
          isLoading={isLoading}
          size='lg'
          className='w-full'
          onClick={loginWithGoogle}
          disabled={isLoading}
        >
          {isLoading ? null : <FcGoogle className='mr-1 h-4 w-4' />}
          Google
        </Button>
      </div>
      <p className='px-8 text-center text-sm text-muted-foreground'>
        New to Skibidi Gram?{' '}
        <Link
          href='/signup'
          className='hover:text-brand text-sm underline underline-offset-4'
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}
