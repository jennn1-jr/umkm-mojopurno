'use client'

import { useState, useRef, useCallback } from 'react'

// ═══════════════════════════════════════════════════════════════
// 1.  TYPES
// ═══════════════════════════════════════════════════════════════

interface GalleryItem { url: string; caption: string }

interface Business {
  id: number
  name: string
  ownerName: string
  category: 'Makanan' | 'Kerajinan' | 'Jasa'
  description: string
  about: string
  location: string
  address: string
  phone: string
  hours: string
  hoursNote: string
  rating: number
  reviewCount: number
  image: string
  alt: string
  gallery: GalleryItem[]
  linkShopee?: string
  linkTokopedia?: string
  linkInstagram?: string
  linkFacebook?: string
  linkGmaps?: string
}

type View =
  | { page: 'catalog' }
  | { page: 'detail'; business: Business }
  | { page: 'form' }

// ═══════════════════════════════════════════════════════════════
// 2.  DUMMY DATA
// ═══════════════════════════════════════════════════════════════

// Foto Gunung Lawu — foto asli dari pengguna (disimpan di /public)
const HERO_BG = '/hero-gunung-lawu.png'

const BUSINESSES: Business[] = [
  {
    id: 1,
    name: 'Warung Bu Sri Rejeki',
    ownerName: 'Sri Rejeki',
    category: 'Makanan',
    description:
      'Warung makan rumahan dengan masakan Jawa otentik dan harga terjangkau untuk semua kalangan.',
    about:
      'Warung Bu Sri Rejeki berdiri sejak tahun 2005, menyajikan cita rasa masakan Jawa tradisional yang kaya akan rempah pilihan. Menu andalan kami adalah nasi pecel, rawon, dan berbagai lauk pauk rumahan yang dimasak segar setiap harinya. Semua bahan baku dipilih langsung setiap pagi dari pasar Ngawi untuk menjamin kesegaran dan kualitas terbaik. Kami melayani makan di tempat maupun takeaway dengan porsi memuaskan dan harga yang sangat bersahabat.',
    location: 'Dusun Krajan, Mojopurno',
    address: 'Jl. Raya Mojopurno No. 12, Dusun Krajan, Kec. Ngawi, Kab. Ngawi 63253',
    phone: '6281234567890',
    hours: 'Senin – Sabtu: 07.00 – 20.00 WIB',
    hoursNote: 'Minggu: 07.00 – 15.00 WIB',
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1546548770-e98d31aaafe1?w=480&h=288&fit=crop&auto=format',
    alt: 'Masakan Jawa di Warung Bu Sri Rejeki',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1546548770-e98d31aaafe1?w=400&h=300&fit=crop&auto=format', caption: 'Menu Andalan' },
      { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format', caption: 'Nasi Pecel' },
      { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format', caption: 'Rawon Spesial' },
      { url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&auto=format', caption: 'Suasana Warung' },
    ],
    linkInstagram: 'https://instagram.com/warungbusrirejeki',
    linkGmaps: 'https://maps.google.com/?q=Warung+Bu+Sri+Rejeki+Mojopurno',
  },
  {
    id: 2,
    name: 'Depot Soto Pak Naryo',
    ownerName: 'Naryo Sugiarto',
    category: 'Makanan',
    description:
      'Soto ayam kampung kuah bening dengan resep turun-temurun sejak 1990, khas Ngawi yang legendaris.',
    about:
      'Depot Soto Pak Naryo adalah warung soto legendaris yang telah berdiri sejak 1990 dengan resep autentik turun-temurun. Kami menggunakan ayam kampung asli yang dimasak perlahan dengan kuah bening khas kaya rempah pilihan. Setiap mangkok disajikan dengan pelengkap lengkap: koya, perkedel, dan sambal matah yang menyegarkan. Dipercaya oleh ribuan pelanggan setia selama lebih dari 30 tahun, kami terus menjaga cita rasa yang membuat pelanggan selalu rindu kembali.',
    location: 'Dusun Wonoasri, Mojopurno',
    address: 'Jl. Wonoasri Raya No. 5, Dusun Wonoasri, Kec. Ngawi, Kab. Ngawi 63254',
    phone: '6281345678901',
    hours: 'Setiap Hari: 06.00 – 14.00 WIB',
    hoursNote: 'Hari Minggu sering habis lebih cepat',
    rating: 4.9,
    reviewCount: 237,
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=480&h=288&fit=crop&auto=format',
    alt: 'Soto Ayam Kampung Pak Naryo',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=300&fit=crop&auto=format', caption: 'Soto Ayam' },
      { url: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop&auto=format', caption: 'Pelengkap Soto' },
      { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format', caption: 'Sambal & Koya' },
      { url: 'https://images.unsplash.com/photo-1565557702-b586b8813c73?w=400&h=300&fit=crop&auto=format', caption: 'Suasana Depot' },
    ],
    linkFacebook: 'https://facebook.com/sotopaknaryongawi',
    linkGmaps: 'https://maps.google.com/?q=Depot+Soto+Pak+Naryo+Wonoasri',
  },
  {
    id: 3,
    name: 'Kerajinan Anyaman Mba Surti',
    ownerName: 'Surti Handayani',
    category: 'Kerajinan',
    description:
      'Anyaman bambu dan rotan berkualitas tinggi, cocok untuk dekorasi dan perabot rumah modern.',
    about:
      'Kerajinan Anyaman Mba Surti telah menghasilkan produk anyaman berkualitas tinggi selama lebih dari 15 tahun. Kami menggunakan bahan baku bambu dan rotan pilihan yang dipanen secara bertanggung jawab dari hutan lokal di sekitar Ngawi. Setiap produk dikerjakan dengan tangan oleh pengrajin terampil menggunakan teknik anyaman tradisional yang diwariskan turun-temurun. Koleksi kami mencakup keranjang, tempat buah, furniture ringan, hingga aksesori dekorasi rumah yang elegan dan bernilai seni tinggi.',
    location: 'Dusun Sambungrejo, Mojopurno',
    address: 'Jl. Sambungrejo No. 8, Dusun Sambungrejo, Kec. Ngawi, Kab. Ngawi 63255',
    phone: '6281456789012',
    hours: 'Senin – Jumat: 08.00 – 17.00 WIB',
    hoursNote: 'Sabtu: 08.00 – 14.00 WIB · Minggu libur',
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=288&fit=crop&auto=format',
    alt: 'Kerajinan Anyaman Bambu Mba Surti',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format', caption: 'Koleksi Anyaman' },
      { url: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=400&h=300&fit=crop&auto=format', caption: 'Keranjang Bambu' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format', caption: 'Dekorasi Rotan' },
      { url: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=400&h=300&fit=crop&auto=format', caption: 'Proses Pengerjaan' },
    ],
    linkShopee: 'https://shopee.co.id/anyaman_surti',
    linkInstagram: 'https://instagram.com/anyamansurti',
    linkGmaps: 'https://maps.google.com/?q=Kerajinan+Anyaman+Surti+Sambungrejo',
  },
  {
    id: 4,
    name: 'Batik Tulis Bumi Nusantara',
    ownerName: 'Heru Widodo',
    category: 'Kerajinan',
    description:
      'Batik tulis tangan bermotif khas Ngawi dengan pewarna alami pilihan, tersedia custom order.',
    about:
      'Batik Tulis Bumi Nusantara berkomitmen melestarikan seni batik tulis tradisional dengan sentuhan modern yang elegan. Setiap kain dikerjakan sepenuhnya dengan tangan menggunakan canting dan malam, menghasilkan motif yang unik dan tidak pernah sama. Kami menggunakan pewarna alami berbasis tanaman yang ramah lingkungan dan aman bagi kesehatan. Tersedia motif khas Ngawi seperti motif padi, gunung, dan ornamen budaya lokal, serta layanan custom order untuk pernikahan, seragam kantor, atau hadiah eksklusif.',
    location: 'Dusun Krajan, Mojopurno',
    address: 'Jl. Raya Mojopurno No. 45, Dusun Krajan, Kec. Ngawi, Kab. Ngawi 63253',
    phone: '6281567890123',
    hours: 'Senin – Sabtu: 09.00 – 18.00 WIB',
    hoursNote: 'Minggu hanya custom order (by appointment)',
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1583922606661-9b5b1e1bdb56?w=480&h=288&fit=crop&auto=format',
    alt: 'Batik Tulis Khas Ngawi Bumi Nusantara',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1583922606661-9b5b1e1bdb56?w=400&h=300&fit=crop&auto=format', caption: 'Koleksi Batik' },
      { url: 'https://images.unsplash.com/photo-1576616977887-6b8cdf6c2cd0?w=400&h=300&fit=crop&auto=format', caption: 'Proses Membatik' },
      { url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=300&fit=crop&auto=format', caption: 'Motif Khas Ngawi' },
      { url: 'https://images.unsplash.com/photo-1620503374956-c942862f0372?w=400&h=300&fit=crop&auto=format', caption: 'Pewarna Alami' },
    ],
    linkShopee: 'https://shopee.co.id/batiknusantarangawi',
    linkTokopedia: 'https://tokopedia.com/batiknusantara',
    linkInstagram: 'https://instagram.com/batiknusantarangawi',
    linkGmaps: 'https://maps.google.com/?q=Batik+Tulis+Bumi+Nusantara+Mojopurno',
  },
  {
    id: 5,
    name: 'Laundry Bersih Kilat',
    ownerName: 'Agus Prasetyo',
    category: 'Jasa',
    description:
      'Layanan laundry profesional: cuci bersih, setrika rapi, dan antar-jemput ke rumah Anda.',
    about:
      'Laundry Bersih Kilat hadir sebagai solusi lengkap untuk kebutuhan laundry harian Anda. Kami menggunakan mesin cuci berkapasitas besar dengan deterjen premium yang lembut namun ampuh mengatasi noda membandel. Layanan meliputi cuci kilat 24 jam, cuci reguler, setrika, dry cleaning, dan laundry pakaian bayi dengan deterjen khusus. Tersedia layanan antar-jemput gratis radius 3 km. Kepuasan pelanggan adalah prioritas utama kami.',
    location: 'Dusun Wonoasri, Mojopurno',
    address: 'Jl. Wonoasri Raya No. 22, Dusun Wonoasri, Kec. Ngawi, Kab. Ngawi 63254',
    phone: '6281678901234',
    hours: 'Senin – Sabtu: 08.00 – 20.00 WIB',
    hoursNote: 'Minggu: 08.00 – 17.00 WIB',
    rating: 4.6,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=480&h=288&fit=crop&auto=format',
    alt: 'Laundry Bersih Kilat Mojopurno',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&auto=format', caption: 'Area Cuci' },
      { url: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=300&fit=crop&auto=format', caption: 'Mesin Cuci' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format', caption: 'Setrika Rapi' },
      { url: 'https://images.unsplash.com/photo-1543161949-1f9193812ce8?w=400&h=300&fit=crop&auto=format', caption: 'Pakaian Siap Ambil' },
    ],
    linkInstagram: 'https://instagram.com/laundrybersihkilat',
    linkGmaps: 'https://maps.google.com/?q=Laundry+Bersih+Kilat+Wonoasri',
  },
  {
    id: 6,
    name: 'Bengkel Motor Mas Agus',
    ownerName: 'Agus Setiawan',
    category: 'Jasa',
    description:
      'Bengkel motor terpercaya untuk servis rutin hingga besar, teknisi berpengalaman 10+ tahun.',
    about:
      'Bengkel Motor Mas Agus telah dipercaya ribuan pelanggan di Kecamatan Ngawi sejak 2012. Tim teknisi berpengalaman 10+ tahun kami siap menangani berbagai jenis sepeda motor dari semua merek. Layanan mencakup servis rutin, ganti oli, tune-up, perbaikan mesin, penggantian sparepart, hingga pengecatan bodi. Kami hanya menggunakan sparepart original dan semi-original berkualitas dengan harga transparan dan terjangkau. Kepercayaan pelanggan adalah aset terbesar kami.',
    location: 'Dusun Sambungrejo, Mojopurno',
    address: 'Jl. Sambungrejo No. 15, Dusun Sambungrejo, Kec. Ngawi, Kab. Ngawi 63255',
    phone: '6281789012345',
    hours: 'Senin – Sabtu: 08.00 – 17.00 WIB',
    hoursNote: 'Minggu: Tutup',
    rating: 4.7,
    reviewCount: 103,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=480&h=288&fit=crop&auto=format',
    alt: 'Bengkel Motor Mas Agus Mojopurno',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop&auto=format', caption: 'Area Bengkel' },
      { url: 'https://images.unsplash.com/photo-1609630699906-87ec1ba96cce?w=400&h=300&fit=crop&auto=format', caption: 'Servis Motor' },
      { url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&h=300&fit=crop&auto=format', caption: 'Pengecekan Mesin' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format', caption: 'Sparepart' },
    ],
    linkFacebook: 'https://facebook.com/bengkelmasagus',
    linkGmaps: 'https://maps.google.com/?q=Bengkel+Motor+Mas+Agus+Sambungrejo',
  },
]

// ═══════════════════════════════════════════════════════════════
// 3.  ICON COMPONENTS (inline SVG)
// ═══════════════════════════════════════════════════════════════

const iP = { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 }

function MapPinIcon({ cls = 'w-5 h-5', style }: { cls?: string; style?: React.CSSProperties }) {
  return (
    <svg className={cls} style={style} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}
function SearchIcon({ cls = 'w-5 h-5' }: { cls?: string }) {
  return (
    <svg className={cls} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  )
}
function StoreIcon({ cls = 'w-5 h-5', style }: { cls?: string; style?: React.CSSProperties }) {
  return (
    <svg className={cls} style={style} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-3.75a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375z" />
    </svg>
  )
}
function ArrowLeftIcon({ cls = 'w-5 h-5' }: { cls?: string }) {
  return (
    <svg className={cls} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  )
}
function ClockIcon({ cls = 'w-5 h-5' }: { cls?: string }) {
  return (
    <svg className={cls} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function PhoneIcon({ cls = 'w-5 h-5', style }: { cls?: string; style?: React.CSSProperties }) {
  return (
    <svg className={cls} style={style} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  )
}
function ShareIcon({ cls = 'w-5 h-5' }: { cls?: string }) {
  return (
    <svg className={cls} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  )
}
function StarIcon({ filled = true, cls = 'w-4 h-4' }: { filled?: boolean; cls?: string }) {
  return (
    <svg className={cls} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1.5} xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  )
}
function WhatsAppIcon({ cls = 'w-5 h-5' }: { cls?: string }) {
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L0 24l6.335-1.508C8.04 23.45 9.979 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.51-5.186-1.399l-.371-.22-3.764.896.944-3.659-.242-.381A9.795 9.795 0 012.182 12C2.182 6.591 6.591 2.182 12 2.182c5.408 0 9.818 4.409 9.818 9.818 0 5.408-4.41 9.818-9.818 9.818z" />
    </svg>
  )
}
function UploadIcon({ cls = 'w-8 h-8', style }: { cls?: string; style?: React.CSSProperties }) {
  return (
    <svg className={cls} style={style} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  )
}
function CheckCircleIcon({ cls = 'w-16 h-16' }: { cls?: string }) {
  return (
    <svg className={cls} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function XIcon({ cls = 'w-4 h-4' }: { cls?: string }) {
  return (
    <svg className={cls} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
function ImageIcon({ cls = 'w-8 h-8' }: { cls?: string }) {
  return (
    <svg className={cls} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  )
}
function MenuIcon({ cls = 'w-6 h-6' }: { cls?: string }) {
  return (
    <svg className={cls} {...iP}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}
function ChevronLeftIcon({ cls = 'w-5 h-5' }: { cls?: string }) {
  return <svg className={cls} {...iP}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
}
function ChevronRightIcon({ cls = 'w-5 h-5' }: { cls?: string }) {
  return <svg className={cls} {...iP}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
}

// ═══════════════════════════════════════════════════════════════
// 4.  SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ── Warna kategori tetap distingktif per jenis usaha ──────────
const CATEGORY_STYLE: Record<string, string> = {
  Makanan:   'bg-amber-100 text-amber-700 ring-amber-200',
  Kerajinan: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  Jasa:      'bg-violet-100 text-violet-700 ring-violet-200',
}
const CATEGORY_EMOJI: Record<string, string> = {
  Makanan: '🍽️', Kerajinan: '🎨', Jasa: '⚡',
}

function CategoryBadge({ category, large = false }: { category: string; large?: boolean }) {
  const style = CATEGORY_STYLE[category] ?? 'bg-slate-100 text-slate-600'
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ring-1 ring-inset ${style} ${large ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs'}`}>
      {CATEGORY_EMOJI[category]} {category}
    </span>
  )
}

function StarRating({ rating, reviewCount, showCount = true }: { rating: number; reviewCount: number; showCount?: boolean }) {
  const full = Math.floor(rating)
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex text-amber-400">
        {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= full} cls="w-4 h-4" />)}
      </div>
      <span className="text-sm font-semibold text-slate-700">{rating.toFixed(1)}</span>
      {showCount && <span className="text-sm text-slate-400">({reviewCount} ulasan)</span>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 5.  PAGE 1 — CATALOG
// ═══════════════════════════════════════════════════════════════

/* ── Navbar ─────────────────────────────────────────────────── */
function Navbar({ onRegister, onHome }: { onRegister: () => void; onHome: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else { onHome(); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50) }
  }

  const NAV_LINKS = [
    { label: 'Beranda',      action: () => { onHome(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileOpen(false) } },
    { label: 'Direktori',   action: () => scrollTo('catalog-section') },
    { label: 'Tentang Kami', action: () => scrollTo('footer-section') },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => { onHome(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}>
            <StoreIcon cls="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-extrabold text-slate-900 text-lg hidden sm:block">
            UMKM <span style={{ color: '#748C5D' }}>Mojopurno</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {NAV_LINKS.map(l => (
            <button key={l.label} onClick={l.action} className="hover:text-[#8F845F] transition-colors cursor-pointer">{l.label}</button>
          ))}
          <span className="text-slate-300">|</span>
          <button
            onClick={onRegister}
            className="text-white rounded-xl px-4 py-2 text-sm font-semibold transition-colors cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}
          >
            Daftarkan UMKM
          </button>
        </div>

        {/* Mobile: register + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onRegister}
            className="text-white rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer"
            style={{ backgroundColor: '#748C5D' }}
          >
            + Daftar
          </button>
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
              <button
                key={l.label}
                onClick={l.action}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-[#F3F2EB] hover:text-[#8F845F] transition-colors cursor-pointer"
              >
                {l.label}
              </button>
            ))}
            <div className="border-t border-slate-100 mt-1 pt-2">
              <button
                onClick={() => { setMobileOpen(false); onRegister() }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer"
                style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}
              >
                🏪 Daftarkan UMKM Saya
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ── Hero Section ───────────────────────────────────────────── */
function HeroSection({ search, setSearch, onRegister }: {
  search: string; setSearch: (v: string) => void; onRegister: () => void
}) {
  return (
    <section className="relative min-h-[540px] md:min-h-[600px] flex items-center overflow-hidden">
      {/* Background: Gunung Lawu */}
      <img src={HERO_BG} alt="Pemandangan Gunung Lawu, Ngawi" className="absolute inset-0 w-full h-full object-cover" />
      {/* Earthy overlay: dark brown → olive green */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30,22,10,0.85) 0%, rgba(116,140,93,0.68) 100%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          {/* Badge lokasi */}
          <div className="animate-fade-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <MapPinIcon cls="w-4 h-4 text-[#C5BFA0]" />
            Desa Mojopurno, Ngawi, Jawa Timur
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-1 font-display font-extrabold text-white text-4xl md:text-6xl leading-tight tracking-tight mb-4">
            Temukan Potensi Hebat<br />
            <span style={{ color: '#C5BFA0' }}>UMKM Mojopurno</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-2 text-slate-200 text-lg leading-relaxed mb-8 max-w-xl">
            Jelajahi ratusan usaha lokal — dari kuliner tradisional, kerajinan tangan, hingga jasa profesional. Dukung ekonomi desa!
          </p>

          {/* Search bar */}
          <div className="animate-fade-up delay-3 relative max-w-xl mb-8">
            <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden ring-2 ring-transparent focus-within:ring-[#8F845F] transition-all">
              <div className="pl-4 flex-shrink-0" style={{ color: '#8F845F' }}>
                <SearchIcon cls="w-5 h-5" />
              </div>
              <input
                id="hero-search"
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

          {/* Stats row */}
          <div className="animate-fade-up delay-4 flex flex-wrap gap-6 text-white text-sm">
            {[
              { val: '48+', label: 'UMKM Terdaftar' },
              { val: '4',   label: 'Kategori Usaha'  },
              { val: '3',   label: 'Dusun'           },
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

/* ── Filter Chips ───────────────────────────────────────────── */
const FILTERS = ['Semua', 'Makanan', 'Kerajinan', 'Jasa'] as const
type Filter = typeof FILTERS[number]

function FilterChips({ active, setActive }: { active: Filter; setActive: (f: Filter) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {FILTERS.map(f => (
        <button
          key={f}
          onClick={() => setActive(f)}
          className={`rounded-full px-5 py-2 text-sm font-semibold border transition-all cursor-pointer ${
            active === f
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

/* ── Business Card ──────────────────────────────────────────── */
function BusinessCard({ business, onClick }: { business: Business; onClick: () => void }) {
  return (
    <article
      id={`card-${business.id}`}
      className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img src={business.image} alt={business.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute top-3 left-3"><CategoryBadge category={business.category} /></div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          <StarIcon filled cls="w-3.5 h-3.5 text-amber-400" /> {business.rating}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-display font-bold text-slate-900 leading-snug transition-colors duration-200 group-hover:text-[#748C5D]">
          {business.name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">{business.description}</p>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <MapPinIcon cls="w-3.5 h-3.5 text-slate-400" /> {business.location}
        </div>
        <button
          onClick={e => { e.stopPropagation(); onClick() }}
          className="mt-2 w-full text-white rounded-xl py-2.5 text-sm font-semibold transition-all cursor-pointer"
          style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}
        >
          Lihat Detail
        </button>
      </div>
    </article>
  )
}

/* ── CTA Banner ─────────────────────────────────────────────── */
function CTABanner({ onRegister }: { onRegister: () => void }) {
  return (
    <section style={{ backgroundColor: '#F3F2EB', borderTop: '1px solid #D4CEBC', borderBottom: '1px solid #D4CEBC' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-4" style={{ backgroundColor: '#EAE7D8', color: '#8F845F' }}>
          <StoreIcon cls="w-4 h-4" /> Punya UMKM?
        </div>
        <h2 className="font-display font-extrabold text-slate-900 text-2xl md:text-3xl mb-3">
          Daftarkan Usaha Anda Secara Gratis
        </h2>
        <p className="text-slate-500 text-base max-w-lg mx-auto mb-6">
          Bergabunglah dengan ratusan UMKM di Desa Mojopurno dan jangkau lebih banyak pelanggan.
        </p>
        <button
          onClick={onRegister}
          className="text-white rounded-xl px-8 py-3 font-semibold text-sm transition-all cursor-pointer"
          style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)', boxShadow: '0 4px 12px rgba(143,132,95,0.30)' }}
        >
          Daftarkan UMKM Saya →
        </button>
      </div>
    </section>
  )
}

/* ── Footer ─────────────────────────────────────────── */
function Footer({ onHome, onRegister }: { onHome: () => void; onRegister: () => void }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else { onHome(); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50) }
  }

  return (
    <footer id="footer-section" style={{ backgroundColor: '#1C1812', color: '#A09880' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}>
                <StoreIcon cls="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-white text-lg">UMKM Mojopurno</span>
            </div>
            <p className="text-sm leading-relaxed">Direktori resmi usaha mikro, kecil, dan menengah Desa Mojopurno, Kecamatan Ngawi, Jawa Timur.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { onHome(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="transition-colors cursor-pointer hover:text-[#C5BFA0]">Beranda</button>
              </li>
              <li>
                <button onClick={() => scrollTo('catalog-section')} className="transition-colors cursor-pointer hover:text-[#C5BFA0]">Direktori UMKM</button>
              </li>
              <li>
                <button onClick={() => scrollTo('footer-section')} className="transition-colors cursor-pointer hover:text-[#C5BFA0]">Tentang Kami</button>
              </li>
              <li>
                <button onClick={onRegister} className="transition-colors cursor-pointer hover:text-[#C5BFA0]">Daftarkan UMKM</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Kontak</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPinIcon cls="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#748C5D' } as React.CSSProperties} />
                <span>Kantor Desa Mojopurno, Kec. Ngawi, Kab. Ngawi, Jawa Timur 63253</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon cls="w-4 h-4 flex-shrink-0" style={{ color: '#748C5D' } as React.CSSProperties} />
                <span>+62 851-0000-0000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 text-xs text-center" style={{ borderTop: '1px solid #2E2920', color: '#6B6250' }}>
          &copy; {new Date().getFullYear()} Direktori UMKM Desa Mojopurno. Proyek Akademik — ADPL.
        </div>
      </div>
    </footer>

  )
}

/* ── Catalog Page ───────────────────────────────────────────── */
function CatalogPage({ goTo }: { goTo: (v: View) => void }) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<Filter>('Semua')

  const filtered = BUSINESSES.filter(b => {
    const q = search.toLowerCase()
    const matchSearch = !q || b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.location.toLowerCase().includes(q)
    const matchCat = activeFilter === 'Semua' || b.category === activeFilter
    return matchSearch && matchCat
  })

  const onRegister = () => goTo({ page: 'form' })
  const onHome = () => { setSearch(''); setActiveFilter('Semua') }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onRegister={onRegister} onHome={onHome} />
      <HeroSection search={search} setSearch={setSearch} onRegister={onRegister} />

      <main id="catalog-section" className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-extrabold text-slate-900 text-2xl">Direktori UMKM</h2>
            <p className="text-slate-500 text-sm mt-0.5">{filtered.length} usaha ditemukan</p>
          </div>
        </div>

        <FilterChips active={activeFilter} setActive={setActiveFilter} />

        {filtered.length === 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(b => (
              <BusinessCard key={b.id} business={b} onClick={() => goTo({ page: 'detail', business: b })} />
            ))}
          </div>
        )}
      </main>

      <CTABanner onRegister={onRegister} />
      <Footer onHome={onHome} onRegister={onRegister} />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 6.  PAGE 2 — BUSINESS DETAIL
// ═══════════════════════════════════════════════════════════════

function MapPlaceholder({ address }: { address: string }) {
  return (
    <div className="relative h-44 rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#d4e8c8 0%,#c8d9b0 100%)' }}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mapgrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(116,140,93,0.25)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.75)" strokeWidth="8" />
        <line x1="42%" y1="0" x2="42%" y2="100%" stroke="rgba(255,255,255,0.75)" strokeWidth="8" />
        <line x1="72%" y1="0" x2="72%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="5" />
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full p-3 shadow-xl" style={{ backgroundColor: '#748C5D', boxShadow: '0 0 0 8px rgba(116,140,93,0.25)' }}>
          <MapPinIcon cls="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-3 py-2.5 flex items-start gap-1.5">
        <MapPinIcon cls="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#748C5D' } as React.CSSProperties} />
        <p className="text-xs text-slate-700 leading-snug">{address}</p>
      </div>
    </div>
  )
}

function BusinessDetailPage({ business, goTo }: { business: Business; goTo: (v: View) => void }) {
  const [activeImg, setActiveImg] = useState(0)
  const [galleryActive, setGalleryActive] = useState(0)

  const waUrl = `https://wa.me/${business.phone}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${business.name}.`)}`

  const prevGallery = () => setGalleryActive(i => (i - 1 + business.gallery.length) % business.gallery.length)
  const nextGallery = () => setGalleryActive(i => (i + 1) % business.gallery.length)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar detail */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => goTo({ page: 'catalog' })}
            className="flex items-center gap-2 text-slate-600 font-medium text-sm transition-colors cursor-pointer hover:text-[#8F845F]"
          >
            <ArrowLeftIcon cls="w-4 h-4" /> Kembali ke Direktori
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
            <button onClick={() => goTo({ page: 'catalog' })} className="hover:text-[#8F845F] cursor-pointer">Beranda</button>
            <ChevronRightIcon cls="w-3 h-3" />
            <button onClick={() => goTo({ page: 'catalog' })} className="hover:text-[#8F845F] cursor-pointer">Direktori</button>
            <ChevronRightIcon cls="w-3 h-3" />
            <span className="text-slate-600 font-medium truncate max-w-[160px]">{business.name}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Split layout */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
          {/* ── LEFT ── */}
          <div>
            <div className="rounded-2xl overflow-hidden bg-slate-200 aspect-video">
              <img src={business.gallery[activeImg].url} alt={business.gallery[activeImg].caption} className="w-full h-full object-cover transition-all duration-300" />
            </div>
            <div className="flex gap-2 mt-3">
              {business.gallery.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${activeImg === i ? 'shadow-md opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  style={activeImg === i ? { borderColor: '#748C5D' } : undefined}
                >
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* About */}
            <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-display font-bold text-slate-900 text-lg mb-3">Tentang Bisnis</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{business.about}</p>
            </div>
          </div>

          {/* ── RIGHT STICKY ── */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <CategoryBadge category={business.category} large />
              <h1 className="font-display font-extrabold text-slate-900 text-2xl mt-3 mb-2 leading-tight">{business.name}</h1>
              <StarRating rating={business.rating} reviewCount={business.reviewCount} />
              <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-2">
                <MapPinIcon cls="w-4 h-4 text-slate-400" /> {business.location}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1.5">
                <svg className="w-4 h-4 text-slate-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <span>Pemilik: <span className="font-medium text-slate-700">{business.ownerName}</span></span>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <MapPinIcon cls="w-4 h-4" style={{ color: '#748C5D' } as React.CSSProperties} /> Lokasi
              </h3>
              <MapPlaceholder address={business.address} />
            </div>

            {/* Hours */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-semibold text-amber-900 text-sm mb-3 flex items-center gap-2">
                <ClockIcon cls="w-4 h-4 text-amber-600" /> Jam Operasional
              </h3>
              <p className="text-amber-800 text-sm font-medium">{business.hours}</p>
              <p className="text-amber-700 text-xs mt-1">{business.hoursNote}</p>
            </div>

            {/* CTA */}
            <div className="space-y-2">
              <a
                id={`wa-cta-${business.id}`}
                href={waUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-3.5 text-sm font-bold transition-colors shadow-md shadow-green-200"
              >
                <WhatsAppIcon cls="w-5 h-5" /> Hubungi Penjual (WhatsApp)
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a href={`tel:+${business.phone}`}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl py-2.5 text-sm font-medium transition-all text-slate-700 hover:border-[#8F845F]/50 hover:text-[#8F845F]"
                >
                  <PhoneIcon cls="w-4 h-4" /> Telepon
                </a>
                <button
                  onClick={() => navigator.share?.({ title: business.name, url: window.location.href })}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl py-2.5 text-sm font-medium transition-all text-slate-700 hover:border-[#8F845F]/50 hover:text-[#8F845F] cursor-pointer"
                >
                  <ShareIcon cls="w-4 h-4" /> Bagikan
                </button>
              </div>
            </div>

            {/* Social Media & Marketplace */}
            {(business.linkShopee || business.linkTokopedia || business.linkInstagram || business.linkFacebook || business.linkGmaps) && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 text-sm mb-3">Media Sosial & Marketplace</h3>
                <div className="space-y-2">
                  {business.linkShopee && (
                    <a href={business.linkShopee} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all group"
                    >
                      <span className="text-lg">🛒</span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-orange-600">Shopee</span>
                      <svg className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    </a>
                  )}
                  {business.linkTokopedia && (
                    <a href={business.linkTokopedia} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all group"
                    >
                      <span className="text-lg">🏪</span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-green-700">Tokopedia</span>
                      <svg className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    </a>
                  )}
                  {business.linkInstagram && (
                    <a href={business.linkInstagram} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-pink-300 hover:bg-pink-50 transition-all group"
                    >
                      <span className="text-lg">📸</span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-pink-600">Instagram</span>
                      <svg className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    </a>
                  )}
                  {business.linkFacebook && (
                    <a href={business.linkFacebook} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                    >
                      <span className="text-lg">👥</span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">Facebook</span>
                      <svg className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    </a>
                  )}
                  {business.linkGmaps && (
                    <a href={business.linkGmaps} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all group"
                    >
                      <span className="text-lg">📍</span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-red-600">Google Maps</span>
                      <svg className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-12">
          <h2 className="font-display font-bold text-slate-900 text-xl mb-6">Galeri Foto</h2>
          <div className="relative rounded-2xl overflow-hidden bg-slate-200 aspect-video mb-4 group">
            <img src={business.gallery[galleryActive].url} alt={business.gallery[galleryActive].caption} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white text-sm font-medium">{business.gallery[galleryActive].caption}</p>
              <p className="text-white/60 text-xs">{galleryActive + 1} / {business.gallery.length}</p>
            </div>
            <button onClick={prevGallery} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <ChevronLeftIcon cls="w-5 h-5 text-slate-700" />
            </button>
            <button onClick={nextGallery} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <ChevronRightIcon cls="w-5 h-5 text-slate-700" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {business.gallery.map((img, i) => (
              <button key={i} onClick={() => setGalleryActive(i)}
                className={`aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${galleryActive === i ? 'shadow-md opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                style={galleryActive === i ? { borderColor: '#748C5D' } : undefined}
              >
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 7.  PAGE 3 — REGISTRATION FORM
// ═══════════════════════════════════════════════════════════════

const CATEGORY_OPTIONS = [
  { value: 'Makanan',   label: '🍽️  Makanan & Minuman'    },
  { value: 'Kerajinan', label: '🎨  Kerajinan Tangan'      },
  { value: 'Jasa',      label: '⚡  Jasa & Layanan'        },
  { value: 'Pertanian', label: '🌾  Pertanian & Perkebunan' },
  { value: 'Ternak',    label: '🐄  Peternakan'            },
  { value: 'Lainnya',   label: '📦  Lainnya'               },
]

interface FormState  {
  nama: string
  pemilik: string
  kategori: string
  alamat: string
  whatsapp: string
  linkShopee: string
  linkTokopedia: string
  linkInstagram: string
  linkFacebook: string
  linkGmaps: string
}
interface FormErrors {
  nama?: string
  pemilik?: string
  kategori?: string
  alamat?: string
  whatsapp?: string
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

function SuccessState({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
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
        <button
          onClick={onBack}
          className="w-full text-white rounded-xl py-3 font-semibold text-sm transition-colors cursor-pointer"
          style={{ background: 'linear-gradient(135deg,#748C5D,#8F845F)' }}
        >
          Kembali ke Direktori
        </button>
      </div>
    </div>
  )
}

function RegisterFormPage({ goTo }: { goTo: (v: View) => void }) {
  const [form, setForm] = useState<FormState>({
    nama: '', pemilik: '', kategori: '', alamat: '', whatsapp: '',
    linkShopee: '', linkTokopedia: '', linkInstagram: '', linkFacebook: '', linkGmaps: ''
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
    setFiles(prev => [...prev, ...imgs].slice(0, 5))
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false); addFiles(e.dataTransfer.files)
  }

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.nama.trim() || form.nama.length < 3) e.nama = 'Nama usaha minimal 3 karakter'
    if (!form.pemilik.trim() || form.pemilik.length < 3) e.pemilik = 'Nama pemilik minimal 3 karakter'
    if (!form.kategori) e.kategori = 'Pilih kategori usaha'
    if (!form.alamat.trim() || form.alamat.length < 15) e.alamat = 'Alamat minimal 15 karakter'
    const wa = form.whatsapp.replace(/\D/g, '')
    if (!wa || wa.length < 10) e.whatsapp = 'Nomor WhatsApp tidak valid (min 10 digit)'
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); if (!validate()) return
    setLoading(true); setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  if (submitted) return <SuccessState onBack={() => goTo({ page: 'catalog' })} />

  const inputClass = (err?: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${err ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-[#8F845F] focus:ring-2 focus:ring-[#8F845F]/15'}`

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <button onClick={() => goTo({ page: 'catalog' })} className="flex items-center gap-2 text-slate-600 font-medium text-sm transition-colors cursor-pointer hover:text-[#8F845F]">
            <ArrowLeftIcon cls="w-4 h-4" /> Kembali ke Direktori
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium mb-4" style={{ backgroundColor: '#EAE7D8', color: '#748C5D' }}>
            <CheckCircleIcon cls="w-4 h-4" /> Pendaftaran Gratis
          </span>
          <h1 className="font-display font-extrabold text-slate-900 text-3xl mb-2">Daftarkan UMKM Anda</h1>
          <p className="text-slate-500 text-sm">Isi formulir di bawah. Admin akan meninjau dan memverifikasi data Anda.</p>
        </div>

        <StepIndicator current={currentStep} />

        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
                  <select id="kategori" value={form.kategori} onChange={update('kategori')} className={inputClass(errors.kategori) + ' bg-white'}>
                    <option value="">Pilih kategori...</option>
                    {CATEGORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.kategori && <p className="mt-1 text-xs text-red-600">{errors.kategori}</p>}
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
                  <span className="text-xl w-7 text-center">📍</span>
                  <input
                    id="linkGmaps" type="url" value={form.linkGmaps} onChange={update('linkGmaps')}
                    placeholder="https://maps.google.com/?q=..."
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
              <p className="text-xs text-slate-400 mb-4 ml-8">Opsional · Maks. 5 foto · Format JPG, PNG, WEBP</p>

              <div
                onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${isDragOver ? 'scale-[1.01]' : files.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={isDragOver ? { borderColor: '#748C5D', backgroundColor: '#F3F2EB' } : { borderColor: '#D4CEBC', backgroundColor: '#FAFAF8' }}
              >
                {isDragOver ? (
                  <><UploadIcon cls="w-10 h-10 mx-auto mb-2" style={{ color: '#748C5D' } as React.CSSProperties} /><p className="font-semibold text-sm" style={{ color: '#748C5D' }}>Lepaskan file di sini</p></>
                ) : (
                  <><ImageIcon cls="w-10 h-10 text-slate-400 mx-auto mb-2" /><p className="text-slate-600 text-sm font-medium mb-1">Drag &amp; drop foto ke sini</p><p className="text-slate-400 text-xs">atau klik untuk pilih dari galeri</p>{files.length > 0 && <p className="text-xs mt-2 font-medium" style={{ color: '#748C5D' }}>{files.length}/5 foto dipilih</p>}</>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => addFiles(e.target.files)} disabled={files.length >= 5} />
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
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// 8.  ROOT
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const [view, setView] = useState<View>({ page: 'catalog' })

  const goTo = useCallback((v: View) => {
    setView(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (view.page === 'detail') return <BusinessDetailPage business={view.business} goTo={goTo} />
  if (view.page === 'form')   return <RegisterFormPage goTo={goTo} />
  return <CatalogPage goTo={goTo} />
}