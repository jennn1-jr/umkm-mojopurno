import React from 'react';

interface UmkmMapProps {
  mapEmbedUrl?: string | null;
}

export default function UmkmMap({ mapEmbedUrl }: UmkmMapProps) {
  if (!mapEmbedUrl) {
    return (
      <div className="w-full h-32 bg-[#F3F2EB] rounded-xl border border-[#E8E4D9] flex items-center justify-center p-4">
        <p className="text-xs text-[#9A9285] text-center font-medium">
          🗺️ Peta lokasi belum tersedia untuk UMKM ini.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-40 sm:h-48 rounded-xl overflow-hidden shadow-sm border border-[#E8E4D9]">
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
