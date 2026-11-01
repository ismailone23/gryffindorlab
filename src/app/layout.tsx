import type { Metadata } from 'next'
import { Geist, Geist_Mono, Silkscreen } from 'next/font/google'
import { siteUrl } from '@/lib/site'
import '../index.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const pixel = Silkscreen({ subsets: ['latin'], weight: '400', variable: '--font-pixel' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Gryffindorlab — Good ideas. Made real.',
  description: 'Gryffindorlab is a creative agency for video editing, website development, and graphic design. Good ideas. Made real.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${pixel.variable}`}>
      <body>{children}</body>
    </html>
  )
}
