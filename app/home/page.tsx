import MemeLists from './MemeLists'
import { LeftSidebar } from '@/components/sidebar/LeftSidebar'
import { RightSidebar } from '@/components/sidebar/RightSidebar'

export default function Home() {
  return (
    <section className='container mx-auto max-w-screen-2xl'>
      <div className='mt-20 grid grid-cols-3 gap-4'>
        <LeftSidebar />
        <MemeLists />
        <RightSidebar />
      </div>
    </section>
  )
}
