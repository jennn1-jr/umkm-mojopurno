'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Umkm } from '@/lib/types'
import { fetchUmkmList } from '@/lib/api'
import { slugify } from '@/lib/utils'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CTABanner from '@/components/cta-banner'
import { MapPinIcon, SearchIcon, StoreIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from '@/components/icons'
import CategoryBadge from '@/components/category-badge'

const CATEGORY_EMOJI: Record<string, string> = {
  'Sentra Rambak Kulit': '🍘',
  'Produksi Alas Kaki & Sepatu Kulit': '👞',
  'Kerajinan & Souvenir Kulit': '🎨',
  'Lainnya': '📦'
}

const HERO_BG = '/hero-gunung-lawu.png'

function HeroSection({ search, setSearch, totalUmkm }: {
  search: string; setSearch: (v: string) => void; totalUmkm: number;
}) {
  return (
    <section className="relative min-h-[540px] md:min-h-[600px] flex items-center overflow-hidden">
      <img src={HERO_BG} alt="Pemandangan Gunung Lawu, Magetan" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30,22,10,0.85) 0%, rgba(116,140,93,0.68) 100%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          <div className="animate-fade-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <MapPinIcon cls="w-4 h-4 text-[#C5BFA0]" />
            Desa Mojopurno, Ngariboyo, Magetan
          </div>

          <h1 className="animate-fade-up delay-1 font-display font-extrabold text-white text-4xl md:text-6xl leading-tight tracking-tight mb-4">
            Temukan Potensi Hebat<br />
            UMKM <span style={{ color: '#C5BFA0' }}>Mojopurno</span>
          </h1>

          <p className="animate-fade-up delay-2 text-slate-200 text-lg leading-relaxed mb-8 max-w-xl">
            Beragam usaha lokal Desa Mojopurno, mulai dari kuliner, kerajinan, hingga berbagai produk dan jasa unggulan
          </p>

          <div className="animate-fade-up delay-3 relative max-w-xl mb-8">
            <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden ring-2 ring-transparent focus-within:ring-[#8F845F] transition-all">
              <div className="pl-4 flex-shrink-0" style={{ color: '#8F845F' }}>
                <SearchIcon cls="w-5 h-5" />
              </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari nama usaha, produk, atau layanan..."
                className="flex-1 px-3 py-4 text-slate-900 placeholder-slate-400 text-sm outline-none bg-transparent"
              />
              {search && (
                <button onClick={() => setSearch('')} className="px-3 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <XIcon cls="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="animate-fade-up delay-4 flex flex-wrap gap-6 text-white text-sm">
            {[
              { val: totalUmkm.toString(), label: 'UMKM Terdaftar' },
              { val: '4', label: 'Kategori Usaha' },
              { val: '3', label: 'Dusun' },
            ].map(s => (
              <div key={s.val} className="flex items-center gap-2">
                <span className="font-display font-extrabold text-2xl" style={{ color: '#C5BFA0' }}>{s.val}</span>
                <span className="text-slate-300">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const FILTERS = ['Semua', 'Sentra Rambak Kulit', 'Produksi Alas Kaki & Sepatu Kulit', 'Kerajinan & Souvenir Kulit', 'Lainnya'] as const
type Filter = typeof FILTERS[number]

function FilterChips({ active, setActive }: { active: Filter; setActive: (f: Filter) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {FILTERS.map(f => (
        <button
          key={f}
          onClick={() => setActive(f)}
          className={`rounded-full px-5 py-2 text-sm font-semibold border transition-all cursor-pointer ${active === f
            ? 'text-white border-transparent shadow-md'
            : 'bg-white text-slate-600 border-slate-200 hover:border-[#8F845F]/50 hover:text-[#8F845F]'
            }`}
          style={active === f ? { background: 'linear-gradient(135deg,#748C5D,#8F845F)', boxShadow: '0 4px 12px rgba(143,132,95,0.30)' } : undefined}
        >
          {f !== 'Semua' && CATEGORY_EMOJI[f]} {f}
        </button>
      ))}
    </div>
  )
}

function BusinessCard({ business }: { business: Umkm }) {
  return (
    <Link
      href={`/umkm/${slugify(business.nama_umkm)}`}
      className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer flex-1 w-full"
    >
      <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden bg-slate-100 flex items-center justify-center border-b border-slate-100">
        {business.foto_url ? (
          <>
            <div className="absolute inset-0 bg-cover bg-center blur-sm opacity-60 scale-110" style={{ backgroundImage: `url(${business.foto_url})` }}></div>
            <img src={business.foto_url} alt={`Foto ${business.nama_umkm}`} className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <StoreIcon cls="w-16 h-16" />
          </div>
        )}
        <div className="absolute top-3 left-3 z-20"><CategoryBadge category={business.kategori} /></div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2 min-w-0">
        <h3 className="font-display font-bold text-slate-900 leading-snug transition-colors duration-200 group-hover:text-[#748C5D] min-w-0">
          {business.nama_umkm}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1 min-w-0">{business.deskripsi}</p>
        <div className="flex items-start gap-1.5 text-xs text-slate-400 min-w-0">
          <MapPinIcon cls="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" /> 
          <span className="min-w-0 line-clamp-1">{business.alamat || business.lokasi}</span>
        </div>
        <div
          className="mt-auto w-full text-white text-center rounded-xl py-2.5 text-sm font-semibold transition-all cursor-pointer"
          style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}
        >
          Lihat Detail
        </div>
      </div>
    </Link>
  )
}

export default function CatalogPage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<Filter>('Semua')
  const [sortBy, setSortBy] = useState<'terbaru' | 'asc' | 'desc'>('terbaru')
  const [businesses, setBusinesses] = useState<Umkm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [search, activeFilter, sortBy])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const data = await fetchUmkmList()
      setBusinesses(data)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  let filtered = businesses.filter(b => {
    const q = search.toLowerCase()
    const matchSearch = !q || b.nama_umkm.toLowerCase().includes(q) || b.deskripsi?.toLowerCase().includes(q) || b.lokasi?.toLowerCase().includes(q) || b.kategori.toLowerCase().includes(q)
    
    const categories = b.kategori.split(',').map(c => c.trim().toLowerCase())
    let matchCat = false
    if (activeFilter === 'Semua') {
      matchCat = true
    } else if (activeFilter === 'Lainnya') {
      const mainCats = ['kerajinan kulit', 'alas kaki', 'sentra rambak kulit', 'produksi alas kaki & sepatu kulit', 'kerajinan & souvenir kulit']
      matchCat = categories.some(c => !mainCats.includes(c) || c === 'lainnya')
    } else {
      matchCat = categories.includes(activeFilter.toLowerCase())
    }

    return matchSearch && matchCat
  })

  // Sorting logic
  if (sortBy === 'asc') {
    filtered.sort((a, b) => a.nama_umkm.localeCompare(b.nama_umkm))
  } else if (sortBy === 'desc') {
    filtered.sort((a, b) => b.nama_umkm.localeCompare(a.nama_umkm))
  } else {
    // 'terbaru' - asumsikan id terbesar = terbaru
    filtered.sort((a, b) => b.id - a.id)
  }

  const itemsPerPage = 6
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginatedBusinesses = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection search={search} setSearch={setSearch} totalUmkm={businesses.length} />

      <main id="catalog-section" className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="font-display font-extrabold text-slate-900 text-2xl">Direktori UMKM</h2>
            <p className="text-slate-500 text-sm mt-0.5">{filtered.length} usaha ditemukan</p>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-slate-600">Urutkan:</label>
            <select 
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 outline-none focus:border-[#8F845F]"
            >
              <option value="terbaru">Terbaru</option>
              <option value="asc">Nama A - Z</option>
              <option value="desc">Nama Z - A</option>
            </select>
          </div>
        </div>

        <FilterChips active={activeFilter} setActive={setActiveFilter} />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#748C5D] mb-4"></div>
            <h3 className="font-display font-bold text-slate-800 text-lg mb-1">Memuat data...</h3>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
            <h3 className="font-display font-bold text-slate-800 text-lg mb-1">Gagal mengambil data dari server</h3>
            <p className="text-slate-500 text-sm mb-4">Pastikan Anda terhubung ke internet dan coba lagi.</p>
            <button 
              onClick={loadData}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <SearchIcon cls="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-display font-bold text-slate-800 text-lg mb-1">Tidak ada hasil</h3>
            <p className="text-slate-400 text-sm max-w-xs">
              Tidak ditemukan UMKM untuk <strong>&ldquo;{search}&rdquo;</strong>. Coba kata kunci lain.
            </p>
            <button onClick={() => { setSearch(''); setActiveFilter('Semua') }} className="mt-4 text-sm font-medium hover:underline cursor-pointer" style={{ color: '#8F845F' }}>
              Hapus filter
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch" style={{ scrollbarWidth: 'none' }}>
              {paginatedBusinesses.map(b => (
                <div key={b.id} className="snap-start shrink-0 w-[280px] sm:w-auto flex flex-col">
                  <BusinessCard business={b} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ChevronLeftIcon cls="w-5 h-5" />
                </button>
                
                <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none" style={{ scrollbarWidth: 'none' }}>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 shrink-0 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        currentPage === i + 1 
                          ? 'bg-[#748C5D] text-white shadow-md' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ChevronRightIcon cls="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <CTABanner />
      <Footer />
    </div>
  )
}