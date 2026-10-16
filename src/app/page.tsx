import App from '@/App'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Gryffindorlab — Good ideas. Made real.',
    description: 'Video editing, website development, and graphic design. Good ideas. Made real.',
    siteName: 'Gryffindorlab',
    locale: 'en_US',
    type: 'website',
    url: siteUrl + '/',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Gryffindorlab — Good ideas. Made real.' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
}

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Gryffindorlab',
  url: siteUrl,
  logo: siteUrl + '/favicon.svg',
  email: 'info@gryffindorlab.com',
  description: 'Creative studio for video editing, website development, and graphic design.',
}

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
    <App />
  </>
}
