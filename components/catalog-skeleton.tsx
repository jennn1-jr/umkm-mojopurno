/** Shimmer skeleton for 6 UMKM cards while the API fetches. */
export default function CatalogSkeleton() {
  return (
    <div
      aria-label="Memuat katalog..."
      aria-busy="true"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-sm"
        >
          {/* photo */}
          <div className="h-44 skeleton" />
          {/* body */}
          <div className="p-4 space-y-3">
            <div className="h-4 w-20 skeleton" />
            <div className="h-5 w-3/4 skeleton" />
            <div className="space-y-2">
              <div className="h-3.5 w-full skeleton" />
              <div className="h-3.5 w-full skeleton" />
              <div className="h-3.5 w-2/3 skeleton" />
            </div>
            <div className="h-3.5 w-1/2 skeleton" />
            <div className="h-10 w-full skeleton rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
