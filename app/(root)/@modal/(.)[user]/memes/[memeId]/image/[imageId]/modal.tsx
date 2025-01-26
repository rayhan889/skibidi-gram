'use client'

import { FiX } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

type Props = {
  title?: string
  children: React.ReactNode
}

export function Modal({ children, title }: Props) {
  const router = useRouter()

  const onDismiss = () => {
    router.back()
  }

  return (
    <div className='absolute inset-0 z-[1000] flex items-center justify-center bg-black/65'>
      {children}
      <Button
        size={'icon'}
        onClick={onDismiss}
        variant={'ghost'}
        className='absolute right-4 top-4'
      >
        <FiX style={{ width: 20, height: 20 }} />
      </Button>
    </div>
  )
}
