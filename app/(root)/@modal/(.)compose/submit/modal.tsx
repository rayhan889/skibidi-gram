'use client'

import React from 'react'
import { type ComponentRef, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { FiX } from 'react-icons/fi'

type Props = {
  title: string
  children: React.ReactNode
}

export function Modal({ children, title }: Props) {
  const router = useRouter()
  const dialogRef = useRef<ComponentRef<'dialog'>>(null)

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
    }
  }, [])

  function onDismiss() {
    router.back()
  }

  return createPortal(
    <div className='absolute inset-0 z-[1000] flex items-center justify-center bg-black/65'>
      <dialog
        ref={dialogRef}
        className='relative flex w-[80%] max-w-[500px] items-center justify-center rounded-md border border-zinc-200 bg-slate-50 p-5 shadow-md dark:border-zinc-800 dark:bg-zinc-900'
        onClose={onDismiss}
      >
        <div className='flex w-full flex-col items-start justify-center space-y-8'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          {children}
        </div>
        <Button
          size={'icon'}
          onClick={onDismiss}
          variant={'ghost'}
          className='absolute right-2 top-2'
        >
          <FiX />
        </Button>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  )
}
