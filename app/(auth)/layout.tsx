import { Topbar } from '@/components/Topbar'
import { MobileMenu } from '@/components/MobileMenu'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Topbar />
      <MobileMenu />
      <main className='container mx-auto flex h-screen items-center justify-center'>
        {children}
      </main>
    </>
  )
}
