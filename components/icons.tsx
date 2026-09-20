import React from 'react'
import {
  MapPin, Search, Store, ArrowLeft, Phone, Share2, UploadCloud,
  CheckCircle, X, Image as ImageIconLucide, Menu, ChevronLeft, ChevronRight
} from 'lucide-react'

export function MapPinIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <MapPin className={cls} style={style} />
}
export function SearchIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <Search className={cls} style={style} />
}
export function StoreIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <Store className={cls} style={style} />
}
export function ArrowLeftIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <ArrowLeft className={cls} style={style} />
}
export function PhoneIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <Phone className={cls} style={style} />
}
export function ShareIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <Share2 className={cls} style={style} />
}

export function WhatsAppIcon({ cls = 'w-5 h-5' }: { cls?: string }) {
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L0 24l6.335-1.508C8.04 23.45 9.979 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.51-5.186-1.399l-.371-.22-3.764.896.944-3.659-.242-.381A9.795 9.795 0 012.182 12C2.182 6.591 6.591 2.182 12 2.182c5.408 0 9.818 4.409 9.818 9.818 0 5.408-4.41 9.818-9.818 9.818z" />
    </svg>
  )
}

export function UploadIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <UploadCloud className={cls} style={style} />
}
export function CheckCircleIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <CheckCircle className={cls} style={style} />
}
export function XIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <X className={cls} style={style} />
}
export function ImageIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <ImageIconLucide className={cls} style={style} />
}
export function MenuIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <Menu className={cls} style={style} />
}
export function ChevronLeftIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <ChevronLeft className={cls} style={style} />
}
export function ChevronRightIcon({ cls, style }: { cls?: string; style?: React.CSSProperties }) {
  return <ChevronRight className={cls} style={style} />
}

export function InstagramIcon({ cls = 'w-5 h-5', style }: { cls?: string; style?: React.CSSProperties }) {
  return (
    <svg className={cls} style={style} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

export function TikTokIcon({ cls = 'w-5 h-5', style }: { cls?: string; style?: React.CSSProperties }) {
  return (
    <svg className={cls} style={style} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.41-2.93 5.76-1.92 1.46-4.52 1.83-6.8 1.1-2.27-.72-4.08-2.58-4.73-4.88-.6-2.14-.15-4.54 1.15-6.32 1.25-1.7 3.32-2.73 5.4-2.84 0 1.34 0 2.67 0 4.01-1.39.06-2.81.79-3.48 2.05-.62 1.18-.46 2.75.42 3.75.9.99 2.45 1.24 3.71.74.88-.34 1.48-1.2 1.55-2.14.08-1.42.04-2.85.06-4.27.01-4.76.02-9.52.01-14.28z"/>
    </svg>
  )
}
