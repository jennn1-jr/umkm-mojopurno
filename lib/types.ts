// ==============================================
// UMKM Mojopurno - Shared Type Definitions
// ==============================================

/** Valid business categories */
export type Kategori = "Makanan" | "Kerajinan" | "Jasa";

/** Shape of a single UMKM record returned by the API */
export interface Umkm {
  id: number;
  nama_umkm: string;
  kategori: Kategori;
  deskripsi: string;
  lokasi: string;
  foto_url: string;
  whatsapp: string;
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
  nama_umkm: string;
  kategori: Kategori;
  deskripsi: string;
  lokasi: string;
  foto_url: string;
  whatsapp: string;
}
