'use client'

import React from 'react'
import { type ComponentRef, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { FiX } from 'react-icons/fi'

export function Modal({ children }: { children: React.ReactNode }) {
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
        className='relative flex w-[80%] max-w-[500px] items-center justify-center rounded-md border border-zinc-300 bg-slate-50 p-5 shadow-md dark:border-zinc-800 dark:bg-zinc-900'
        onClose={onDismiss}
      >
        {children}
        <Button
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
