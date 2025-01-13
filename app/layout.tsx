import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from './AuthProvider'
import { Topbar } from '@/components/Topbar'

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

              <main className='mt-20'>{children}</main>
              {modal}
              <div id='modal-root' />
            </ThemeProvider>
          </body>
        </html>
      </AuthProvider>
    </>
  )
}
