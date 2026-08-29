// ==============================================
// UMKM Mojopurno - Shared Type Definitions
// ==============================================

/** Valid business categories */
export type Kategori = "Makanan" | "Kerajinan" | "Jasa";

/** Shape of a single UMKM record returned by the API (list endpoint) */
export interface Umkm {
  id: number;
  nama_umkm: string;
  nama_pemilik: string;
  kategori: Kategori;
  deskripsi: string;
  lokasi: string;
  foto_url: string | null;
  whatsapp: string;
}

/** Full detail shape — returned by GET /api/umkm/:id */
export interface UmkmDetail extends Umkm {
  tentang: string | null;
  alamat: string;
  link_shopee: string | null;
  link_tokopedia: string | null;
  link_instagram: string | null;
  link_facebook: string | null;
  link_gmaps: string | null;
}

/** Standard paginated response envelope from the Laravel API */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

/** Payload shape for the public "pending" submission form */
export interface UmkmPendingPayload {
  nama_usaha: string;
  nama_pemilik: string;
  kategori: Kategori;
  deskripsi_usaha: string;
  alamat: string;
  lokasi: string;
  nomor_wa: string;
  foto_sampul?: string | null;
  link_shopee?: string | null;
  link_tokopedia?: string | null;
  link_instagram?: string | null;
  link_facebook?: string | null;
  link_gmaps?: string | null;
}
