// ==============================================
// UMKM Mojopurno - API Fetching Layer
// ==============================================
import type { Umkm, ApiResponse, Kategori, UmkmPendingPayload } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

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

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error(`API responded with status ${res.status}`);
      return [];
    }

    const json: ApiResponse<Umkm[]> = await res.json();
    return json.data ?? [];
  } catch (error) {
    // API is unreachable — return empty so the UI still renders
    console.error("Failed to fetch UMKM list:", error);
    return [];
  }
}

/**
 * Fetch a single UMKM entry by ID.
 * Returns `null` when the API is unreachable or the record is missing.
 */
export async function fetchUmkmById(id: number): Promise<Umkm | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/umkm/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json: ApiResponse<Umkm> = await res.json();
    return json.data ?? null;
  } catch {
    console.error(`Failed to fetch UMKM #${id}`);
    return null;
  }
}

/**
 * Submit a new UMKM entry to the "pending" queue.
 * Only an Admin (via the Laravel backend) can approve and publish it.
 */
export async function submitPendingUmkm(
  payload: UmkmPendingPayload
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/umkm/pending`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok) {
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
