import Link from 'next/link'
import { ArrowLeftIcon } from '@/components/icons'
import Footer from '@/components/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-slate-600 font-medium text-sm transition-colors cursor-pointer hover:text-[#8F845F]">
            <ArrowLeftIcon cls="w-4 h-4" /> Kembali ke Direktori
          </Link>
        </div>
      </nav>
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header Cover */}
          <div className="h-48 md:h-64 relative" style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <div className="absolute inset-0 flex items-center justify-center flex-col text-center px-4">
              <img src="/logo-kknt.png" alt="Logo KKNT UNESA" className="w-16 h-16 md:w-20 md:h-20 object-contain mb-3 bg-white/90 rounded-full p-2 shadow-lg" />
              <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold mb-4 bg-white/20 text-white backdrop-blur-sm border border-white/30 uppercase tracking-widest">
                KKNT UNESA 2026
              </span>
              <h1 className="font-display font-extrabold text-white text-3xl md:text-5xl tracking-tight">Tentang Kami</h1>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Tentang Direktori UMKM Mojopurno</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Direktori UMKM Mojopurno merupakan platform digital yang dikembangkan untuk mengenalkan dan mendata berbagai usaha mikro, kecil, dan menengah yang berada di Desa Mojopurno, Kecamatan Ngariboyo, Kabupaten Magetan.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Kehadiran website ini diharapkan dapat memudahkan masyarakat dalam menemukan berbagai produk dan layanan lokal sekaligus membantu pelaku UMKM memperluas jangkauan informasi mengenai usahanya.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Platform ini merupakan bagian dari kontribusi <strong>KKNT UNESA 2026</strong> dalam mendukung digitalisasi dan pengembangan potensi UMKM Desa Mojopurno.
              </p>


              <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-lg font-bold text-slate-900 mb-3">
                  Bersama mengenalkan potensi desa, mendukung UMKM lokal, dan tumbuh bersama Mojopurno.
                </p>
                <p className="text-sm text-slate-500 font-medium mb-1">Dikembangkan oleh KKNT UNESA 2026</p>
                <p className="text-sm text-slate-600">Universitas Negeri Surabaya &ndash; Desa Mojopurno, Kabupaten Magetan</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
