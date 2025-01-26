import { Modal } from './modal'

import { MemeImageFullView } from '@/components/MemeImageFullView'

export default async function ImageDetailsPage({
  params
}: {
  params: Promise<{ user: string; memeId: string; imageId: string }>
}) {
  const user = (await params).user
  const memeId = (await params).memeId
  const imageId = (await params).imageId

  return (
    <Modal>
      <MemeImageFullView imageIndex={imageId} memeId={memeId} user={user} />
    </Modal>
  )
}
