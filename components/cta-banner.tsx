import Link from 'next/link'
import { StoreIcon } from './icons'

export default function CTABanner() {
  return (
    <section style={{ backgroundColor: '#F3F2EB', borderTop: '1px solid #D4CEBC', borderBottom: '1px solid #D4CEBC' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-4" style={{ backgroundColor: '#EAE7D8', color: '#8F845F' }}>
          <StoreIcon cls="w-4 h-4" /> Punya Usaha di Mojopurno?
        </div>
        <h2 className="font-display font-extrabold text-slate-900 text-2xl md:text-3xl mb-3">
          Mari Tumbuhkan UMKM <span style={{ color: '#748C5D' }}>Mojopurno</span> Bersama
        </h2>
        <p className="text-slate-500 text-base max-w-lg mx-auto mb-6">
          Daftarkan usaha Anda secara gratis dan jadilah bagian dari direktori UMKM Desa Mojopurno.
        </p>
        <Link
          href="/daftar"
          className="inline-block text-white rounded-xl px-8 py-3 font-semibold text-sm transition-all cursor-pointer hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)', boxShadow: '0 4px 12px rgba(143,132,95,0.30)' }}
        >
          Daftarkan UMKM Saya →
        </Link>
      </div>
    </section>
  )
}
