import React from 'react'
import { Modal } from './modal'

import MemeForm from '@/components/form/MemeForm'

export default async function MemeFormPage() {
  return (
    <Modal>
      <div className='flex w-full flex-col items-start justify-center space-y-8'>
        <h2 className='text-lg font-semibold'>Create Meme</h2>
        <MemeForm user={null} />
      </div>
    </Modal>
  )
}
