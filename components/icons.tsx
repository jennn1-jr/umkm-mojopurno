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
