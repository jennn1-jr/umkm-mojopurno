import React from 'react';

interface UmkmMapProps {
  mapEmbedUrl?: string | null;
  /** Override tinggi container, default: 'h-52 sm:h-64' */
  className?: string;
}

export default function UmkmMap({ mapEmbedUrl, className }: UmkmMapProps) {
  // Fallback: URL kosong/null
  if (!mapEmbedUrl || mapEmbedUrl.trim() === '') {
    return (
      <div className="w-full h-44 bg-gradient-to-br from-[#F3F2EB] to-[#EAE7D8] rounded-xl border border-[#E8E4D9] flex flex-col items-center justify-center p-6 gap-2">
        <span className="text-3xl">🗺️</span>
        <p className="text-sm text-[#9A9285] text-center font-medium leading-snug">
          Peta lokasi belum tersedia untuk UMKM ini.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`w-full rounded-xl overflow-hidden shadow-sm border border-[#E8E4D9] ${
        className ?? 'h-52 sm:h-64'
      }`}
    >
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Lokasi Google Maps"
      />
    </div>
  );
}
