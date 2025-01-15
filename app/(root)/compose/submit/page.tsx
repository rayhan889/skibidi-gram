import MemeForm from '@/components/form/MemeForm'

export default async function MemeFormPage() {
  return (
    <section className='p-3'>
      <h1>Meme Form Page</h1>
      <MemeForm user={null} />
    </section>
  )
}
