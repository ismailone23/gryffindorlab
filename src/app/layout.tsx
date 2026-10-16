import type { Metadata } from 'next'
import { siteUrl } from '@/lib/site'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/manrope'
import '../index.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Gryffindorlab — Good ideas. Made real.',
  description: 'Gryffindorlab is a creative agency for video editing, website development, and graphic design. Good ideas. Made real.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
