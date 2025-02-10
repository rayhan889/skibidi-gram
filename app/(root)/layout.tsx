import { Topbar } from '@/components/Topbar'
import { LeftSidebar } from '@/components/sidebar/LeftSidebar'
import { RightSidebar } from '@/components/sidebar/RightSidebar'
import { MobileMenu } from '@/components/MobileMenu'

export default async function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <>
      <Topbar />

      <MobileMenu />

      <section className='container mx-auto lg:max-w-[120rem]'>
        <div className='mt-20 grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <LeftSidebar />
          <main className='custom-scroll h-[88vh] w-full overflow-y-auto scroll-smooth border border-t-0 border-zinc-200 dark:border-zinc-800 lg:h-[92vh]'>
            {children}
          </main>
          <RightSidebar />
        </div>
      </section>

      {modal}
      <div id='modal-root' />
    </>
  )
}
