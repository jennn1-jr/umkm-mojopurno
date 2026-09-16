// ==============================================
// UMKM Mojopurno - API Fetching Layer
// ==============================================
import type { Umkm, ApiResponse, Kategori, UmkmPendingPayload } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

/**
 * Fetch the list of published UMKM entries from the API.
 *
 * Accepts optional `search` and `kategori` query params so the
 * server can filter results. Returns an empty array gracefully
 * when the API is unreachable (e.g. backend not yet deployed).
 */
export async function fetchUmkmList(params?: {
  search?: string;
  kategori?: Kategori | "";
}): Promise<Umkm[]> {
  try {
    const url = new URL(`${BASE_URL}/api/umkm`);

    if (params?.search) {
      url.searchParams.set("search", params.search);
    }
    if (params?.kategori) {
      url.searchParams.set("kategori", params.kategori);
    }
    
    // Request a large number of items to bypass backend default pagination of 12
    // since the frontend handles its own pagination natively.
    url.searchParams.set("per_page", "1000");

    const res = await fetch(url.toString(), {
      cache: 'no-store', // Always fetch fresh data to avoid missing new UMKMs
    });

    if (!res.ok) {
      console.error(`API responded with status ${res.status}`);
      throw new Error(`API responded with status ${res.status}`);
    }

    const json: ApiResponse<Umkm[]> = await res.json();
    return json.data ?? [];
  } catch (error) {
    // API is unreachable — throw so the UI shows an error state
    console.error("Failed to fetch UMKM list:", error);
    throw error;
  }
}

/**
 * Fetch a single UMKM entry by ID.
 * Returns `null` when the API is unreachable or the record is missing.
 */
export async function fetchUmkmById(id: number): Promise<Umkm | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/umkm/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const json: ApiResponse<Umkm> = await res.json();
    return json.data ?? null;
  } catch {
    console.warn(`Failed to fetch UMKM #${id}`);
    return null;
  }
}

/**
 * Submit a new UMKM entry to the "pending" queue.
 * Only an Admin (via the Laravel backend) can approve and publish it.
 */
export async function submitPendingUmkm(
  payload: FormData
): Promise<{ success: boolean; message: string; errors?: Record<string, string[]> }> {
  try {
    const res = await fetch(`${BASE_URL}/api/umkm/pending`, {
      method: "POST",
      headers: { 
        "Accept": "application/json"
      },
      body: payload,
    });

    const json = await res.json();

    if (!res.ok) {
      if (res.status === 422) {
        return {
          success: false,
          message: json.message ?? "Terjadi kesalahan validasi.",
          errors: json.errors,
        };
      }
      return {
        success: false,
        message: json.message ?? "Gagal mengirim data. Silakan coba lagi.",
      };
    }

    return {
      success: true,
      message: json.message ?? "Data berhasil dikirim untuk ditinjau Admin.",
    };
  } catch {
    return {
      success: false,
      message: "Tidak dapat terhubung ke server. Silakan coba lagi nanti.",
    };
  }
}
