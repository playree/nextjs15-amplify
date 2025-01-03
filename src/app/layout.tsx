import { Noto_Sans_JP, Roboto_Mono } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import './globals.css'
import { Providers } from './providers'

const NotoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

const RobotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className={`${NotoSansJp.variable} ${RobotoMono.variable}`} suppressHydrationWarning>
      <body className={twMerge('font-noto min-h-screen bg-background antialiased')}>
        <Providers>
          <div className='relative flex h-screen flex-col'>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
