import { fetchUmkmList } from '@/lib/api'
import { slugify } from '@/lib/utils'
import { notFound } from 'next/navigation'
import UmkmDetailClient from './client'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const list = await fetchUmkmList()
  const business = list.find(u => slugify(u.nama_umkm) === params.slug)
  
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

export default async function UmkmDetailPage({ params }: { params: { slug: string } }) {
  const list = await fetchUmkmList()
  const business = list.find(u => slugify(u.nama_umkm) === params.slug)
  
  if (!business) return notFound()

  return <UmkmDetailClient business={business} />
}
