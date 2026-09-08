"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * HeroSection — Clean, earthy aesthetic matching the Figma design.
 * Light warm background, gradient headline, elevated rounded search bar.
 */
export default function HeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("search", query.trim());
      } else {
        params.delete("search");
      }
      router.push(`/?${params.toString()}`);
    },
    [query, searchParams, router]
  );

  return (
    <section
      id="hero-section"
      className="w-full bg-gradient-to-b from-[#F3F2EB] to-[#FDFCF8] py-20 md:py-32"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">

        {/* ── Pill Badge ──────────────────────────────────── */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4CEBC] bg-white text-[#8F845F] text-sm font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#748C5D] inline-block" />
          Direktori UMKM Desa Mojopurno
        </div>

        {/* ── Headline ────────────────────────────────────── */}
        <h1
          className="animate-fade-up delay-100 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight
                     bg-clip-text text-transparent bg-gradient-to-r from-[#8F845F] to-[#748C5D]"
        >
          Temukan Potensi Hebat<br className="hidden sm:block" /> UMKM Mojopurno
        </h1>

        {/* ── Subtitle ────────────────────────────────────── */}
        <p
          className="animate-fade-up delay-200 text-[#5A5549] text-base md:text-lg leading-relaxed max-w-2xl"
        >
          Jelajahi ratusan usaha lokal — dari kuliner tradisional, kerajinan
          tangan, hingga jasa profesional. Dukung ekonomi desa, belanja lokal!
        </p>

        {/* ── Search Bar ──────────────────────────────────── */}
        <form
          onSubmit={handleSearch}
          className="animate-fade-up delay-300 w-full max-w-xl mt-2"
        >
          <div
            className="flex items-center bg-white rounded-full shadow-xl border border-[#E8E4D9]
                        focus-within:ring-2 focus-within:ring-[#8F845F] focus-within:ring-offset-2
                        transition-all duration-300"
          >
            {/* Search icon */}
            <div className="pl-5 flex-shrink-0 text-[#8F845F]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>

            {/* Input */}
            <input
              id="hero-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama usaha, produk, jasa..."
              className="flex-1 bg-transparent px-4 py-3.5 text-[#2C2A24] placeholder-[#B0A898]
                         text-sm outline-none"
            />

            {/* Button */}
            <button
              id="hero-search-button"
              type="submit"
              className="mr-2 flex-shrink-0 px-6 py-2.5 rounded-full
                         bg-[#748C5D] hover:bg-[#8F845F]
                         text-white text-sm font-semibold
                         transition-colors duration-300 cursor-pointer"
            >
              Cari
            </button>
          </div>
        </form>

        {/* ── Category chips ───────────────────────────────── */}
        <div className="animate-fade-up delay-400 flex flex-wrap justify-center gap-2 mt-1">
          {[
            { label: "🍽️  Makanan", value: "Makanan" },
            { label: "🎨  Kerajinan", value: "Kerajinan" },
            { label: "👞  Alas Kaki", value: "Alas Kaki" },
          ].map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("kategori", value);
                params.delete("search");
                router.push(`/?${params.toString()}`);
              }}
              className="px-4 py-1.5 rounded-full border border-[#D4CEBC] bg-white/80
                         text-[#5A5549] text-xs font-medium
                         hover:border-[#8F845F] hover:text-[#8F845F]
                         transition-colors duration-200 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
