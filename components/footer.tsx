import Link from 'next/link'
import { MapPinIcon, PhoneIcon, InstagramIcon, TikTokIcon } from './icons'

export default function Footer() {
  return (
    <footer id="footer-section" style={{ backgroundColor: '#1C1812', color: '#A09880' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo-kknt.png" alt="Logo KKNT" className="w-10 h-10 object-contain bg-white rounded-lg p-0.5" />
              <span className="font-display font-extrabold text-white text-lg">UMKM <span style={{ color: '#C5BFA0' }}>Mojopurno</span></span>
            </div>
            <p className="text-sm leading-relaxed">Direktori resmi usaha mikro, kecil, dan menengah Desa Mojopurno, Kecamatan Ngariboyo, Kabupaten Magetan.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-[#C5BFA0]">Beranda</Link>
              </li>
              <li>
                <Link href="/#catalog-section" className="transition-colors hover:text-[#C5BFA0]">Direktori UMKM</Link>
              </li>
              <li>
                <Link href="/tentang" className="transition-colors hover:text-[#C5BFA0]">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/daftar" className="transition-colors hover:text-[#C5BFA0]">Daftarkan UMKM</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Kontak</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPinIcon cls="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#748C5D' } as React.CSSProperties} />
                <span>Kantor Desa Mojopurno, Kecamatan Ngariboyo, Kabupaten Magetan, Jawa Timur</span>
              </div>
              <a href="https://wa.me/6281563586789" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group transition-all cursor-pointer">
                <PhoneIcon cls="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: '#748C5D' } as React.CSSProperties} />
                <span className="group-hover:text-white transition-colors">081563586789</span>
              </a>
              <a href="mailto:kkntmojopurno26@gmail.com" className="flex items-center gap-2 group transition-all cursor-pointer">
                <svg className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: '#748C5D' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="group-hover:text-white transition-colors">kkntmojopurno26@gmail.com</span>
              </a>
              <a href="https://instagram.com/kknt.mojopurno" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group transition-all cursor-pointer">
                <InstagramIcon cls="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: '#748C5D' } as React.CSSProperties} />
                <span className="group-hover:text-white transition-colors">@kknt.mojopurno</span>
              </a>
              <a href="https://tiktok.com/@kknt.mojopurno" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group transition-all cursor-pointer">
                <TikTokIcon cls="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: '#748C5D' } as React.CSSProperties} />
                <span className="group-hover:text-white transition-colors">@kknt.mojopurno</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 text-xs text-center" style={{ borderTop: '1px solid #2E2920', color: '#6B6250' }}>
          &copy; 2026 Direktori UMKM Desa Mojopurno. Dikembangkan oleh KKNT UNESA 2026.
        </div>
      </div>
    </footer>
  )
}
