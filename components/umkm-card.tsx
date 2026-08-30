import type { Umkm, Kategori } from "@/lib/types";

const BADGE_STYLE: Record<Kategori, string> = {
  Makanan:   "bg-[#FFF5E6] text-[#A0622A] border-[#F5DEC2]",
  Kerajinan: "bg-[#F0F4EC] text-[#4E6E3A] border-[#C9DAB8]",
  Jasa:      "bg-[#F2F0E8] text-[#8F845F] border-[#D9D4C0]",
};

const BADGE_ICON: Record<Kategori, string> = {
  Makanan:   "🍽️",
  Kerajinan: "🎨",
  Jasa:      "⚡",
};

const PHOTO_GRADIENT: Record<Kategori, string> = {
  Makanan:   "from-amber-200 to-orange-300",
  Kerajinan: "from-[#C9DAB8] to-[#748C5D]",
  Jasa:      "from-[#D9D4C0] to-[#8F845F]",
};

interface UmkmCardProps {
  umkm: Umkm;
}

export default function UmkmCard({ umkm }: UmkmCardProps) {
  const waUrl = `https://wa.me/${umkm.nomor_wa?.replace(/\D/g, "") ?? ""}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan ${umkm.nama_usaha}.`
  )}`;

  return (
    <article
      id={`umkm-card-${umkm.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-[#E8E4D9]
                 shadow-sm hover:shadow-md hover:-translate-y-0.5
                 transition-all duration-300 overflow-hidden"
    >
      {/* ── Photo ─────────────────────────────────────────── */}
      <div className="relative h-44 overflow-hidden bg-[#F3F2EB]">
        {umkm.foto_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={umkm.foto_url}
            alt={`Foto ${umkm.nama_usaha}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${PHOTO_GRADIENT[umkm.kategori]}
                        flex items-center justify-center`}
          >
            <span className="text-5xl">{BADGE_ICON[umkm.kategori]}</span>
          </div>
        )}

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1
                      px-2.5 py-1 rounded-full text-xs font-semibold border
                      ${BADGE_STYLE[umkm.kategori]}`}
        >
          {BADGE_ICON[umkm.kategori]} {umkm.kategori}
        </span>
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name */}
        <h3 className="font-bold text-base text-[#2C2A24] leading-snug line-clamp-2
                       group-hover:text-[#748C5D] transition-colors duration-200">
          {umkm.nama_usaha}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#5A5549] leading-relaxed line-clamp-3 flex-1">
          {umkm.deskripsi}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-[#9A9285]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 shrink-0 text-[#748C5D]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
          <span className="truncate">{umkm.lokasi}</span>
        </div>

        {/* Divider */}
        <hr className="border-[#F0EDE4]" />

        {/* WhatsApp CTA */}
        <a
          id={`wa-btn-${umkm.id}`}
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                     bg-[#748C5D] hover:bg-[#8F845F]
                     text-white text-sm font-semibold
                     transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L0 24l6.335-1.508C8.04 23.45 9.979 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.51-5.186-1.399l-.371-.22-3.764.896.944-3.659-.242-.381A9.795 9.795 0 012.182 12C2.182 6.591 6.591 2.182 12 2.182c5.408 0 9.818 4.409 9.818 9.818 0 5.408-4.41 9.818-9.818 9.818z" />
          </svg>
          Hubungi via WhatsApp
        </a>
      </div>
    </article>
  );
}
