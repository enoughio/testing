import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const serif = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', display: 'swap' })
const sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://companios.example'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Companios | Thoughtful Private Companionship & Wellness', template: '%s | Companios' },
  description: 'Companios offers thoughtful private companionship, event companionship, and professional wellness experiences arranged with discretion, clarity, and care.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: siteUrl, siteName: 'Companios', title: 'Companios | Thoughtful Private Companionship & Wellness', description: 'Considered company and restorative wellness experiences, arranged with discretion.', images: [{ url: '/companios-hero.png', width: 1536, height: 1024, alt: 'A warm, quiet lounge prepared for a private conversation' }] },
  twitter: { card: 'summary_large_image', title: 'Companios | Thoughtful Private Companionship & Wellness', description: 'Considered company and restorative wellness experiences, arranged with discretion.', images: ['/companios-hero.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f4f0e9', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Companios', url: siteUrl, description: metadata.description, image: `${siteUrl}/companios-hero.png`, areaServed: 'By enquiry', serviceType: ['Private companionship', 'Event companionship', 'Wellness and massage'] }
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
