import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Direktori UMKM Desa Mojopurno',
  description:
    'Katalog lengkap usaha mikro, kecil, dan menengah di Desa Mojopurno, Ngariboyo, Magetan, Jawa Timur.',
  keywords: ['UMKM', 'Mojopurno', 'Magetan', 'Ngariboyo', 'katalog', 'usaha lokal'],
  manifest: '/manifest.json',
  openGraph: {
    title: 'Direktori UMKM Desa Mojopurno',
    description: 'Jelajahi usaha lokal Desa Mojopurno.',
    type: 'website',
    images: [{ url: '/hero-gunung-lawu.png', width: 1200, height: 630 }],
  },
}

export const viewport: Viewport = {
  themeColor: '#748C5D',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={geistSans.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
