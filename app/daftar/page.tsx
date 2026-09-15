'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { submitPendingUmkm } from '@/lib/api'
import { ArrowLeftIcon, CheckCircleIcon, UploadIcon, ImageIcon, XIcon, WhatsAppIcon } from '@/components/icons'
import Footer from '@/components/footer'

const CATEGORY_OPTIONS = [
  { value: 'Sentra Rambak Kulit', label: '🍘  Sentra Rambak Kulit' },
  { value: 'Produksi Alas Kaki & Sepatu Kulit', label: '👞  Produksi Alas Kaki & Sepatu Kulit' },
  { value: 'Kerajinan & Souvenir Kulit', label: '🎨  Kerajinan & Souvenir Kulit' },
  { value: 'Lainnya', label: '📦  Lainnya' },
]

interface FormState {
  nama: string; pemilik: string; kategori: string; deskripsi: string; tentang: string;
  alamat: string; whatsapp: string; linkShopee: string; linkTokopedia: string;
  linkInstagram: string; linkFacebook: string; linkTiktok: string;
}

interface FormErrors {
  nama?: string; pemilik?: string; kategori?: string; deskripsi?: string;
  alamat?: string; whatsapp?: string;
}

function StepIndicator({ current }: { current: number }) {
  const steps = ['Info Usaha', 'Lokasi & Kontak', 'Foto Produk']
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => {
        const done = i < current; const active = i === current
        return (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done || active ? 'text-white' : 'bg-slate-200 text-slate-500'}`}
                style={(done || active) ? { background: 'linear-gradient(135deg,#748C5D,#8F845F)', boxShadow: active ? '0 0 0 4px rgba(116,140,93,0.20)' : undefined } : undefined}
              >
                {done ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${active ? '' : 'text-slate-400'}`} style={active ? { color: '#748C5D' } : undefined}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-16 md:w-24 h-0.5 mx-2 mb-5" style={{ backgroundColor: done ? '#748C5D' : '#e2e8f0' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function SuccessState() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircleIcon cls="w-12 h-12 text-green-500" />
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-2xl mb-2">Pengajuan Terkirim!</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Data UMKM Anda telah kami terima dan akan ditinjau oleh Admin dalam 1–3 hari kerja. Kami akan menghubungi Anda melalui WhatsApp setelah verifikasi selesai.
          </p>
          <div className="rounded-xl p-4 mb-6 text-left text-xs space-y-1" style={{ backgroundColor: '#F3F2EB', color: '#8F845F' }}>
            <p>✅ Data masuk antrian verifikasi Admin</p>
            <p>✅ Notifikasi WhatsApp akan dikirimkan</p>
            <p>✅ Pendaftaran 100% gratis</p>
          </div>
          <Link
            href="/"
            className="block w-full text-white rounded-xl py-3 font-semibold text-sm transition-colors cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}
          >
            Kembali ke Direktori
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function RegisterFormPage() {
  const [form, setForm] = useState<FormState>({
    nama: '', pemilik: '', kategori: '', deskripsi: '', tentang: '', alamat: '', whatsapp: '',
    linkShopee: '', linkTokopedia: '', linkInstagram: '', linkFacebook: '', linkTiktok: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [files, setFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentStep = form.nama && form.pemilik && form.kategori ? (form.alamat && form.whatsapp ? 2 : 1) : 0

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [field]: e.target.value }))
    setErrors(p => ({ ...p, [field]: undefined }))
  }

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return
    const imgs = Array.from(incoming).filter(f => f.type.startsWith('image/'))
    setFiles(prev => [...prev, ...imgs])
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false); addFiles(e.dataTransfer.files)
  }

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.nama.trim() || form.nama.length < 3) e.nama = 'Nama usaha minimal 3 karakter'
    if (!form.pemilik.trim() || form.pemilik.length < 3) e.pemilik = 'Nama pemilik minimal 3 karakter'
    if (!form.kategori) e.kategori = 'Pilih kategori usaha'
    if (!form.deskripsi.trim() || form.deskripsi.length < 10) e.deskripsi = 'Deskripsi minimal 10 karakter'
    if (!form.alamat.trim() || form.alamat.length < 15) e.alamat = 'Alamat minimal 15 karakter'
    const wa = form.whatsapp.replace(/\D/g, '')
    if (!wa || wa.length < 10) e.whatsapp = 'Nomor WhatsApp tidak valid (min 10 digit)'
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!validate()) return
    setLoading(true)

    const payload = new FormData();
    payload.append('nama_usaha', form.nama);
    payload.append('nama_pemilik', form.pemilik);
    payload.append('kategori', form.kategori);
    payload.append('deskripsi', form.deskripsi);
    if (form.tentang.trim()) payload.append('tentang', form.tentang.trim());
    payload.append('lokasi', form.alamat.substring(0, 50));
    payload.append('alamat', form.alamat);

    let waNum = form.whatsapp.replace(/\D/g, '');
    if (waNum.startsWith('0')) waNum = '62' + waNum.substring(1);
    else if (!waNum.startsWith('62')) waNum = '62' + waNum;
    payload.append('nomor_wa', waNum);

    if (form.linkShopee) payload.append('link_shopee', form.linkShopee);
    if (form.linkTokopedia) payload.append('link_tokopedia', form.linkTokopedia);
    if (form.linkInstagram) payload.append('link_instagram', form.linkInstagram);
    if (form.linkFacebook) payload.append('link_facebook', form.linkFacebook);
    if (form.linkTiktok) payload.append('link_tiktok', form.linkTiktok);

    const compressImage = async (file: File): Promise<Blob> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1200;
          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => resolve(blob || file), 'image/jpeg', 0.8);
        };
        img.onerror = () => resolve(file);
        img.src = URL.createObjectURL(file);
      });
    };

    for (const file of files) {
      const compressed = await compressImage(file);
      payload.append('fotos[]', compressed, file.name);
    }

    const result = await submitPendingUmkm(payload)
    setLoading(false)

    if (result.success) {
      setSubmitted(true)
    } else {
      if (result.errors) {
        const backendErrors: FormErrors = {}
        if (result.errors.nama_usaha) backendErrors.nama = result.errors.nama_usaha[0]
        if (result.errors.nama_pemilik) backendErrors.pemilik = result.errors.nama_pemilik[0]
        if (result.errors.kategori) backendErrors.kategori = result.errors.kategori[0]
        if (result.errors.deskripsi) backendErrors.deskripsi = result.errors.deskripsi[0]
        if (result.errors.alamat) backendErrors.alamat = result.errors.alamat[0]
        if (result.errors.nomor_wa) backendErrors.whatsapp = result.errors.nomor_wa[0]
        setErrors(backendErrors)
      } else {
        alert(result.message)
      }
    }
  }

  if (submitted) return <SuccessState />

  const inputClass = (err?: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${err ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-[#8F845F] focus:ring-2 focus:ring-[#8F845F]/15'}`

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-slate-600 font-medium text-sm transition-colors cursor-pointer hover:text-[#8F845F]">
            <ArrowLeftIcon cls="w-4 h-4" /> Kembali ke Direktori
          </Link>
        </div>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium mb-4" style={{ backgroundColor: '#EAE7D8', color: '#748C5D' }}>
            <CheckCircleIcon cls="w-4 h-4" /> Pendaftaran Gratis
          </span>
          <h1 className="font-display font-extrabold text-slate-900 text-3xl mb-2">Daftarkan UMKM Anda</h1>
          <p className="text-slate-500 text-sm">Isi formulir di bawah. Admin akan meninjau dan memverifikasi data Anda.</p>
        </div>

        <StepIndicator current={currentStep} />

        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
            {/* §1 */}
            <div className="p-6">
              <h2 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}>1</span>
                Informasi Usaha
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="nama">Nama UMKM <span className="text-red-500">*</span></label>
                  <input id="nama" type="text" value={form.nama} onChange={update('nama')} placeholder="Contoh: Warung Bu Sri Rejeki" className={inputClass(errors.nama)} />
                  {errors.nama && <p className="mt-1 text-xs text-red-600">{errors.nama}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="pemilik">Nama Pemilik <span className="text-red-500">*</span></label>
                  <input id="pemilik" type="text" value={form.pemilik} onChange={update('pemilik')} placeholder="Nama lengkap pemilik usaha" className={inputClass(errors.pemilik)} />
                  {errors.pemilik && <p className="mt-1 text-xs text-red-600">{errors.pemilik}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="kategori">Kategori Usaha <span className="text-red-500">*</span></label>
                  <input
                    id="kategori"
                    type="text"
                    list="kategori-options"
                    value={form.kategori}
                    onChange={update('kategori')}
                    placeholder="Contoh: Makanan, Alas Kaki"
                    className={inputClass(errors.kategori) + ' bg-white'}
                  />
                  <datalist id="kategori-options">
                    {CATEGORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </datalist>
                  <p className="mt-1.5 text-xs text-slate-400">Pilih dari daftar atau ketik sendiri kategori baru. Pisahkan dengan koma untuk lebih dari satu kategori.</p>
                  {errors.kategori && <p className="mt-1 text-xs text-red-600">{errors.kategori}</p>}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-slate-700" htmlFor="deskripsi">Deskripsi Singkat <span className="text-red-500">*</span></label>
                    <span className="text-xs text-slate-400">{form.deskripsi.length}/500</span>
                  </div>
                  <textarea id="deskripsi" rows={3} value={form.deskripsi} onChange={update('deskripsi')} maxLength={500} placeholder="Jelaskan secara singkat mengenai produk atau jasa yang Anda tawarkan..." className={inputClass(errors.deskripsi) + ' resize-none'} />
                  {errors.deskripsi && <p className="mt-1 text-xs text-red-600">{errors.deskripsi}</p>}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 mx-6" />

            {/* §2 */}
            <div className="p-6">
              <h2 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}>2</span>
                Lokasi &amp; Kontak
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-slate-700" htmlFor="alamat">Alamat Lengkap <span className="text-red-500">*</span></label>
                    <span className="text-xs text-slate-400">{form.alamat.length}/300</span>
                  </div>
                  <textarea id="alamat" rows={3} value={form.alamat} onChange={update('alamat')} maxLength={300} placeholder="Jl. Raya Mojopurno No. 12, Dusun Krajan..." className={inputClass(errors.alamat) + ' resize-none'} />
                  {errors.alamat && <p className="mt-1 text-xs text-red-600">{errors.alamat}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="whatsapp">Nomor WhatsApp <span className="text-red-500">*</span></label>
                  <div className={`flex items-center rounded-xl border overflow-hidden transition-all ${errors.whatsapp ? 'border-red-400 bg-red-50' : 'border-slate-200 focus-within:border-[#8F845F] focus-within:ring-2 focus-within:ring-[#8F845F]/15'}`}>
                    <div className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 border-r border-slate-200 flex-shrink-0">
                      <WhatsAppIcon cls="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-slate-600">+62</span>
                    </div>
                    <input id="whatsapp" type="tel" value={form.whatsapp} onChange={update('whatsapp')} placeholder="812 3456 7890" className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent" />
                  </div>
                  {errors.whatsapp && <p className="mt-1 text-xs text-red-600">{errors.whatsapp}</p>}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 mx-6" />

            {/* §2.5 — Media Sosial & Marketplace (opsional) */}
            <div className="p-6">
              <h2 className="font-display font-bold text-slate-900 mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}>🔗</span>
                Media Sosial & Marketplace
              </h2>
              <p className="text-xs text-slate-400 mb-4 ml-8">Opsional · Isi jika Anda memiliki akun di platform berikut</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl w-7 text-center">🛒</span>
                  <input
                    id="linkShopee" type="url" value={form.linkShopee} onChange={update('linkShopee')}
                    placeholder="https://shopee.co.id/tokoanda"
                    className={inputClass() + ' flex-1'}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl w-7 text-center">🏪</span>
                  <input
                    id="linkTokopedia" type="url" value={form.linkTokopedia} onChange={update('linkTokopedia')}
                    placeholder="https://tokopedia.com/tokoanda"
                    className={inputClass() + ' flex-1'}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl w-7 text-center">📸</span>
                  <input
                    id="linkInstagram" type="url" value={form.linkInstagram} onChange={update('linkInstagram')}
                    placeholder="https://instagram.com/akunanda"
                    className={inputClass() + ' flex-1'}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl w-7 text-center">👥</span>
                  <input
                    id="linkFacebook" type="url" value={form.linkFacebook} onChange={update('linkFacebook')}
                    placeholder="https://facebook.com/halamananda"
                    className={inputClass() + ' flex-1'}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl w-7 text-center">🎵</span>
                  <input
                    id="linkTiktok" type="url" value={form.linkTiktok} onChange={update('linkTiktok')}
                    placeholder="https://tiktok.com/@akunanda"
                    className={inputClass() + ' flex-1'}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 mx-6" />

            {/* §3 */}
            <div className="p-6">
              <h2 className="font-display font-bold text-slate-900 mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}>3</span>
                Foto Produk
              </h2>
              <p className="text-xs text-slate-400 mb-4 ml-8">Opsional · Format JPG, PNG, WEBP</p>

              <div
                onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${isDragOver ? 'scale-[1.01]' : ''}`}
                style={isDragOver ? { borderColor: '#748C5D', backgroundColor: '#F3F2EB' } : { borderColor: '#D4CEBC', backgroundColor: '#FAFAF8' }}
              >
                {isDragOver ? (
                  <><UploadIcon cls="w-10 h-10 mx-auto mb-2" style={{ color: '#748C5D' } as React.CSSProperties} /><p className="font-semibold text-sm" style={{ color: '#748C5D' }}>Lepaskan file di sini</p></>
                ) : (
                  <><ImageIcon cls="w-10 h-10 text-slate-400 mx-auto mb-2" /><p className="text-slate-600 text-sm font-medium mb-1">Drag &amp; drop foto ke sini</p><p className="text-slate-400 text-xs">atau klik untuk pilih dari galeri</p>{files.length > 0 && <p className="text-xs mt-2 font-medium" style={{ color: '#748C5D' }}>{files.length} foto dipilih</p>}</>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => addFiles(e.target.files)} />
              </div>

              {files.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {files.map((file, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 group">
                      <img src={URL.createObjectURL(file)} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setFiles(p => p.filter((_, j) => j !== i))}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
                      ><XIcon cls="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="px-6 pb-6">
              <button
                type="submit" disabled={loading}
                className={`w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all cursor-pointer ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                style={!loading ? { background: 'linear-gradient(135deg,#748C5D,#8F845F)', boxShadow: '0 4px 14px rgba(143,132,95,0.30)' } : { backgroundColor: '#9CAE8A' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Mengirim data...
                  </span>
                ) : 'Kirim Data Pengajuan →'}
              </button>
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><CheckCircleIcon cls="w-3.5 h-3.5 text-green-500" /> Data aman & terenkripsi</span>
                <span className="flex items-center gap-1"><CheckCircleIcon cls="w-3.5 h-3.5 text-green-500" /> Pendaftaran gratis</span>
                <span className="flex items-center gap-1"><CheckCircleIcon cls="w-3.5 h-3.5 text-green-500" /> Diverifikasi Admin</span>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
