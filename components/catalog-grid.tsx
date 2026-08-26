import { fetchUmkmList } from "@/lib/api";
import type { Kategori } from "@/lib/types";
import UmkmCard from "@/components/umkm-card";

interface CatalogGridProps {
  search?: string;
  kategori?: Kategori | "";
}

/** Async Server Component — fetches UMKM list and renders the grid. */
export default async function CatalogGrid({ search, kategori }: CatalogGridProps) {
  const umkmList = await fetchUmkmList({ search, kategori });

  /* ── Empty / No Results ─────────────────────────────── */
  if (umkmList.length === 0) {
    return (
      <div
        id="catalog-empty-state"
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[#F0EDE4] flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#8F845F]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        {search || kategori ? (
          <>
            <h3 className="text-base font-semibold text-[#2C2A24]">Tidak ada hasil</h3>
            <p className="mt-1.5 text-sm text-[#9A9285] max-w-xs">
              Tidak ditemukan UMKM yang cocok dengan pencarian
              {search && <> &ldquo;<strong>{search}</strong>&rdquo;</>}
              {kategori && <> di kategori <strong>{kategori}</strong></>}.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-base font-semibold text-[#2C2A24]">
              Belum ada data UMKM
            </h3>
            <p className="mt-1.5 text-sm text-[#9A9285] max-w-xs">
              Data usaha akan muncul di sini setelah Admin memverifikasi
              pendaftaran melalui backend.
            </p>
          </>
        )}
      </div>
    );
  }

  /* ── Grid ────────────────────────────────────────────── */
  return (
    <>
      <p className="mb-5 text-sm text-[#9A9285]">
        Menampilkan{" "}
        <span className="font-semibold text-[#5A5549]">{umkmList.length}</span>{" "}
        usaha
        {search && (
          <> untuk &ldquo;<span className="text-[#748C5D] font-semibold">{search}</span>&rdquo;</>
        )}
        {kategori && (
          <> dalam kategori <span className="text-[#748C5D] font-semibold">{kategori}</span></>
        )}
      </p>

      <div
        id="catalog-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {umkmList.map((umkm) => (
          <UmkmCard key={umkm.id} umkm={umkm} />
        ))}
      </div>
    </>
  );
}
