import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Direktori UMKM Desa Mojopurno',
  description:
    'Katalog lengkap usaha mikro, kecil, dan menengah di Desa Mojopurno, Ngawi, Jawa Timur.',
  keywords: ['UMKM', 'Mojopurno', 'Ngawi', 'katalog', 'usaha lokal'],
  openGraph: {
    title: 'Direktori UMKM Desa Mojopurno',
    description: 'Jelajahi usaha lokal Desa Mojopurno.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  )
}
