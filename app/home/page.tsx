import MemeLists from './MemeLists'
import { LeftSidebar } from '@/components/sidebar/LeftSidebar'
import { RightSidebar } from '@/components/sidebar/RightSidebar'

export default function Home() {
  return (
    <section className='container mx-auto h-screen max-w-screen-2xl'>
      <div className='grid h-screen grid-cols-3 gap-4'>
        <LeftSidebar />
        <MemeLists />
        <RightSidebar />
      </div>
    </section>
  )
}
