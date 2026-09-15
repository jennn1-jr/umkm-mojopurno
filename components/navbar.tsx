'use client'

import { useState } from 'react'
import Link from 'next/link'
import { XIcon, MenuIcon } from './icons'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const NAV_LINKS = [
    { label: 'Beranda', href: '/' },
    { label: 'Direktori', href: '/#catalog-section' },
    { label: 'Tentang Kami', href: '/tentang' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo-kknt.png" alt="Logo KKNT" className="w-9 h-9 object-contain" />
          <span className="font-display font-extrabold text-slate-900 text-base sm:text-lg">
            UMKM <span style={{ color: '#748C5D' }}>Mojopurno</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {NAV_LINKS.map(l => (
            <Link key={l.label} href={l.href} className="hover:text-[#8F845F] transition-colors cursor-pointer">{l.label}</Link>
          ))}
          <span className="text-slate-300">|</span>
          <Link
            href="/daftar"
            className="text-white rounded-xl px-4 py-2 text-sm font-semibold transition-colors cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}
          >
            Daftarkan UMKM
          </Link>
        </div>

        {/* Mobile: register + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/daftar"
            className="text-white rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer"
            style={{ backgroundColor: '#748C5D' }}
          >
            + Daftar
          </Link>
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="p-1 text-slate-500 hover:text-[#8F845F] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XIcon cls="w-6 h-6" /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(l => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-[#F3F2EB] hover:text-[#8F845F] transition-colors cursor-pointer"
              >
                {l.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 mt-1 pt-2">
              <Link
                href="/daftar"
                onClick={() => setMobileOpen(false)}
                className="block text-center w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer"
                style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}
              >
                🏪 Daftarkan UMKM Saya
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
