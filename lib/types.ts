export type Kategori = "Makanan" | "Kerajinan" | "Jasa" | "Pertanian" | "Ternak" | "Lainnya";

export interface Umkm {
  id: number;
  nama_umkm: string;
  nama_pemilik?: string;
  kategori: Kategori;
  deskripsi: string;
  tentang?: string;
  lokasi: string;
  alamat?: string;
  whatsapp: string;
  foto_url?: string | null;
  fotos?: string[];
  link_shopee?: string;
  link_tokopedia?: string;
  link_instagram?: string;
  link_facebook?: string;
  link_gmaps?: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
}

export interface UmkmPendingPayload {
  nama_usaha: string;
  nama_pemilik: string;
  kategori: Kategori;
  deskripsi: string;
  lokasi: string;
  alamat: string;
  nomor_wa: string;
  link_shopee?: string;
  link_tokopedia?: string;
  link_instagram?: string;
  link_facebook?: string;
  link_gmaps?: string;
}
