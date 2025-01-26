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
    <Modal title='Create Meme'>
      <MemeForm user={session?.user} />
    </Modal>
  )
}
