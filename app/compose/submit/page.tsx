import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import MemeForm from '@/components/form/MemeForm'

export default async function MemeFormPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <section className='container mx-auto max-w-screen-sm px-4 md:px-0'>
      <h1>Meme Form Page</h1>
      <MemeForm user={user} />
    </section>
  )
}
