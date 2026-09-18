import { fetchUmkmList, fetchUmkmById } from '@/lib/api'
import { slugify } from '@/lib/utils'
import { notFound } from 'next/navigation'
import UmkmDetailClient from './client'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const list = await fetchUmkmList()
  const business = list.find(u => slugify(u.nama_umkm) === slug)
  
  if (!business) return { title: 'UMKM Tidak Ditemukan' }
  
  const imgUrl = business.foto_url || '/hero-gunung-lawu.png'
  
  return {
    title: `${business.nama_umkm} - UMKM Mojopurno`,
    description: business.deskripsi.substring(0, 150),
    openGraph: {
      title: `${business.nama_umkm} - UMKM Mojopurno`,
      description: business.deskripsi.substring(0, 150),
      images: [{ url: imgUrl }],
    }
  }
}

export default async function UmkmDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const list = await fetchUmkmList()
  const businessShallow = list.find(u => slugify(u.nama_umkm) === slug)
  
  if (!businessShallow) return notFound()

  // Ambil detail lengkap (karena API list tidak return field 'alamat')
  const business = await fetchUmkmById(businessShallow.id) || businessShallow;

  return <UmkmDetailClient business={business} />
}
