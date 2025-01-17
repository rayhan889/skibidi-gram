import { getAuthSession } from '@/lib/auth'

import MemeForm from '@/components/form/MemeForm'

export default async function MemeFormPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    return <div>You are not logged in</div>
  }

  return (
    <section className='space-y-8 p-3'>
      <h1 className='text-xl font-semibold'>Create Meme</h1>
      <MemeForm user={session?.user} />
    </section>
  )
}
