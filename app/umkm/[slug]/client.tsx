'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa'
import { Umkm } from '@/lib/types'
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, WhatsAppIcon, ShareIcon, SearchIcon, ChevronLeftIcon, XIcon } from '@/components/icons'
import UmkmMap from '@/components/umkm-map'
import CategoryBadge from '@/components/category-badge'

export default function UmkmDetailClient({ business }: { business: Umkm }) {
  const [activeImg, setActiveImg] = useState(0)
  const [galleryActive, setGalleryActive] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const validFotos = business.fotos?.filter(url => typeof url === 'string' && url.trim() !== '') || []
  const gallery = validFotos.length > 0
    ? validFotos.map(url => ({ url, caption: 'Foto Produk' }))
    : [{ url: business.foto_url || 'https://via.placeholder.com/600x400?text=Tidak+Ada+Foto', caption: 'Foto Usaha' }]

  const prevGallery = () => setGalleryActive(i => (i - 1 + gallery.length) % gallery.length)
  const nextGallery = () => setGalleryActive(i => (i + 1) % gallery.length)

  useEffect(() => {
    if (!isFullscreen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false)
      if (e.key === 'ArrowLeft') prevGallery()
      if (e.key === 'ArrowRight') nextGallery()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, gallery.length])

  let waNum = business.whatsapp?.replace(/\D/g, '') ?? ''
  if (waNum.startsWith('0')) waNum = '62' + waNum.substring(1)
  const waUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${business.nama_umkm}.`)}`

  const renderProfileCard = (className: string = '') => (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 ${className}`}>
      <CategoryBadge category={business.kategori} large />
      <h1 className="font-display font-extrabold text-slate-900 text-2xl mt-3 mb-2 leading-tight">{business.nama_umkm}</h1>
      <div className="flex items-start gap-1.5 text-sm text-slate-500 mt-2">
        <MapPinIcon cls="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> 
        <span className="flex-1 min-w-0" style={{ overflowWrap: 'anywhere' }}>{business.alamat || business.lokasi}</span>
      </div>
      <div className="flex items-start gap-1.5 text-sm text-slate-500 mt-1.5">
        <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        <span className="flex-1 break-words">Pemilik: <span className="font-medium text-slate-700">{business.nama_pemilik || '-'}</span></span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-slate-600 font-medium text-sm transition-colors hover:text-[#8F845F] cursor-pointer">
            <ArrowLeftIcon cls="w-4 h-4" /> Kembali ke Direktori
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
            <Link href="/" className="hover:text-[#8F845F]">Beranda</Link>
            <ChevronRightIcon cls="w-3 h-3" />
            <Link href="/" className="hover:text-[#8F845F]">Direktori</Link>
            <ChevronRightIcon cls="w-3 h-3" />
            <span className="text-slate-600 font-medium truncate max-w-[160px]">{business.nama_umkm}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          <div className="min-w-0">
            <div 
              className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square md:aspect-video cursor-pointer"
              onClick={() => { setGalleryActive(activeImg); setIsFullscreen(true); }}
              title="Klik untuk memperbesar"
            >
              <img src={gallery[activeImg]?.url} alt={gallery[activeImg]?.caption} className="w-full h-full object-contain transition-all duration-300" />
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
                {gallery.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer snap-start ${activeImg === i ? 'shadow-md opacity-100 border-[#748C5D]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {renderProfileCard("block lg:hidden mt-8")}

            <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-display font-bold text-slate-900 text-lg mb-3">Tentang Usaha</h2>
              <p className="text-slate-600 leading-relaxed text-sm mb-4 whitespace-pre-wrap">{business.deskripsi}</p>

              {business.tentang && (() => {
                const points = business.tentang.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0)
                return points.length > 0 ? (
                  <div className="mt-3 pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Keunggulan Usaha</p>
                    <ul className="space-y-2">
                      {points.map((point: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}>✓</span>
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              })()}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 space-y-4 min-w-0">
            {renderProfileCard("hidden lg:block")}

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <MapPinIcon cls="w-4 h-4" style={{ color: '#748C5D' } as React.CSSProperties} /> Lokasi
              </h3>
              <UmkmMap mapEmbedUrl={business.map_embed_url} />
            </div>

            <div className="space-y-2">
              <a
                id={`wa-cta-${business.id}`}
                href={waUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-3.5 text-sm font-bold transition-colors shadow-md shadow-green-200"
              >
                <WhatsAppIcon cls="w-5 h-5" /> Hubungi Penjual (WhatsApp)
              </a>
              <button
                onClick={async () => {
                  try {
                    if (navigator.share) {
                      await navigator.share({ title: business.nama_umkm, url: window.location.href })
                    } else {
                      await navigator.clipboard.writeText(window.location.href)
                      alert('Tautan disalin ke clipboard!')
                    }
                  } catch (e) {}
                }}
                className="flex items-center justify-center gap-2 w-full bg-white border border-slate-200 rounded-xl py-2.5 text-sm font-medium transition-all text-slate-700 hover:border-[#8F845F]/50 hover:text-[#8F845F] cursor-pointer"
              >
                <ShareIcon cls="w-4 h-4" /> Bagikan
              </button>
            </div>

            {(business.link_shopee || business.link_tokopedia || business.link_instagram || business.link_facebook || business.link_tiktok) && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 text-sm mb-3">Media Sosial & Marketplace</h3>
                <div className="space-y-2">
                  {business.link_shopee && (
                    <a href={business.link_shopee} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all group">
                      <Image src="/icons/shopee.svg" alt="Shopee" width={24} height={24} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-orange-600">Shopee</span>
                    </a>
                  )}
                  {business.link_tokopedia && (
                    <a href={business.link_tokopedia} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all group">
                      <Image src="/icons/tokopedia.svg" alt="Tokopedia" width={24} height={24} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-green-700">Tokopedia</span>
                    </a>
                  )}
                  {business.link_instagram && (
                    <a href={business.link_instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50 transition-all group">
                      <FaInstagram className="w-6 h-6 text-pink-500 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-pink-600">Instagram</span>
                    </a>
                  )}
                  {business.link_facebook && (
                    <a href={business.link_facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                      <FaFacebook className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">Facebook</span>
                    </a>
                  )}
                  {business.link_tiktok && (
                    <a href={business.link_tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all group">
                      <FaTiktok className="w-6 h-6 text-slate-900 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">TikTok</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {gallery.length > 0 && (
          <div className="mt-12 min-w-0">
            <h2 className="font-display font-bold text-slate-900 text-xl mb-6">Galeri Foto</h2>
            <div 
              className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square md:aspect-video mb-4 group cursor-pointer"
              onClick={() => setIsFullscreen(true)}
              title="Klik untuk memperbesar"
            >
              <img src={gallery[galleryActive]?.url} alt={gallery[galleryActive]?.caption} className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-slate-900 px-4 py-2 rounded-xl font-semibold shadow-md transition-opacity flex items-center gap-2 transform scale-95 group-hover:scale-100 duration-200">
                  <SearchIcon cls="w-4 h-4" /> Perbesar
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pointer-events-none">
                <p className="text-white text-sm font-medium">{gallery[galleryActive]?.caption}</p>
                <p className="text-white/60 text-xs">{galleryActive + 1} / {gallery.length}</p>
              </div>
              {gallery.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevGallery(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <ChevronLeftIcon cls="w-5 h-5 text-slate-700" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextGallery(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <ChevronRightIcon cls="w-5 h-5 text-slate-700" />
                  </button>
                </>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {gallery.map((img, i) => (
                  <button key={i} onClick={() => setGalleryActive(i)}
                    className={`aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${galleryActive === i ? 'shadow-md opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    style={galleryActive === i ? { borderColor: '#748C5D' } : undefined}
                  >
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col backdrop-blur-md">
          <div className="flex items-center justify-between p-4 sm:p-6 text-white">
            <span className="text-sm font-medium opacity-70 bg-white/10 px-4 py-1.5 rounded-full">
              {galleryActive + 1} / {gallery.length}
            </span>
            <button onClick={() => setIsFullscreen(false)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer" title="Tutup (Esc)">
              <XIcon cls="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center p-2 sm:p-8 overflow-hidden" onClick={() => setIsFullscreen(false)}>
            <img src={gallery[galleryActive]?.url} alt={gallery[galleryActive]?.caption} className="max-w-full max-h-full object-contain drop-shadow-2xl" onClick={(e) => e.stopPropagation()} />
            
            {gallery.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prevGallery(); }} className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all cursor-pointer hover:scale-105">
                  <ChevronLeftIcon cls="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextGallery(); }} className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all cursor-pointer hover:scale-105">
                  <ChevronRightIcon cls="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </>
            )}
          </div>
          
          <div className="p-6 text-center text-white/90 text-sm">
            {gallery[galleryActive]?.caption}
          </div>
        </div>
      )}
    </div>
  )
}
