import React from 'react'
import { Modal } from './modal'
import { getAuthSession } from '@/lib/auth'

import MemeForm from '@/components/form/MemeForm'

export default async function MemeFormPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    return <div>You are not logged in</div>
  }

  return (
    <Modal>
      <div className='flex w-full flex-col items-start justify-center space-y-8'>
        <h2 className='text-lg font-semibold'>Create Meme</h2>
        <MemeForm user={session?.user} />
      </div>
    </Modal>
  )
}
