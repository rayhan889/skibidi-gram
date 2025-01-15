import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from './AuthProvider'
import { Topbar } from '@/components/Topbar'
import { LeftSidebar } from '@/components/sidebar/LeftSidebar'
import { RightSidebar } from '@/components/sidebar/RightSidebar'
import { MobileMenu } from '@/components/MobileMenu'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Skibidi Gram',
  description: 'Remember, Skibidi is the one.'
}

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <>
      <AuthProvider>
        <html lang='en' suppressHydrationWarning>
          <body
            className={`${poppins.className} min-h-screen bg-slate-50 antialiased dark:bg-zinc-900`}
          >
            <ThemeProvider
              attribute='class'
              defaultTheme='dark'
              enableSystem
              disableTransitionOnChange
            >
              <Topbar />

              <MobileMenu />

              <section className='container mx-auto'>
                <div className='mt-20 grid grid-cols-1 gap-4 lg:grid-cols-3'>
                  <LeftSidebar />
                  <main className='custom-scroll h-[88vh] w-full overflow-y-auto scroll-smooth border border-t-0 border-zinc-300 dark:border-zinc-800 lg:h-[92vh]'>
                    {children}
                  </main>
                  <RightSidebar />
                </div>
              </section>

              {modal}
              <div id='modal-root' />
            </ThemeProvider>
          </body>
        </html>
      </AuthProvider>
    </>
  )
}
