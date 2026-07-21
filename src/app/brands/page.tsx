"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useCms } from "@/context/CmsContext";

export default function BrandsPage() {
  const { brands } = useCms();

  const brandLogosMap: Record<string, React.ReactNode> = {
    "Huhtamaki": (
      <div className="flex items-center justify-center font-extrabold text-2xl tracking-tight text-[#0055A5] font-sans">
        Huhtamaki
      </div>
    ),
    "Ecoware": (
      <div className="flex items-center justify-center font-bold text-2xl tracking-tight text-[#2E7D32] font-sans">
        eco<span className="text-[#4CAF50]">ware</span>
        <svg className="w-5 h-5 ml-1 fill-[#4CAF50]" viewBox="0 0 24 24">
          <path d="M17 8C8 10 5.9 16.5 3 20c0 0 4-9 14-12z" />
        </svg>
      </div>
    ),
    "Bio Eco": (
      <div className="flex items-center justify-center font-black text-2xl tracking-widest text-[#1B5E20] gap-2 font-sans">
        <div className="w-7 h-7 rounded-full border-2 border-[#1B5E20] flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#1B5E20]" />
        </div>
        BIO ECO
      </div>
    ),
    "Starpak": (
      <div className="flex items-center justify-center font-semibold text-2xl tracking-normal text-[#212121] font-sans">
        star<span className="font-light">pak</span>
      </div>
    ),
    "DART": (
      <div className="flex items-center justify-center border-2 border-[#00529B] rounded-full px-6 py-1.5 text-[#00529B] font-black text-2xl tracking-wider italic font-sans">
        DART
      </div>
    ),
    "Naturese": (
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center font-bold text-xl text-[#2E7D32] font-sans">
          naturese
          <svg className="w-4 h-4 ml-1 text-[#388E3C] fill-current" viewBox="0 0 24 24">
            <path d="M12 2L9 9l-7 3 7 3 3 7 3-7 7-3-7-3z" />
          </svg>
        </div>
        <span className="text-[10px] text-[#4CAF50] font-medium tracking-tight mt-0.5">Nature&apos;s Tableware</span>
      </div>
    ),
    "BioPak": (
      <div className="flex flex-col items-center justify-center">
        <div className="font-extrabold text-2xl text-[#2E7D32] font-sans">
          Bio<span className="text-[#1A237E]">Pak</span>
        </div>
        <span className="text-[9px] text-gray-500 font-semibold tracking-tighter mt-0.5">It Doesn&apos;t Cost The Earth</span>
      </div>
    ),
    "Vegware": (
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-1 font-bold text-xl text-[#880E4F] font-sans">
          vegware
          <svg className="w-5 h-5 text-[#4CAF50] stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
            <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z" />
            <path d="M12 3v9" />
          </svg>
        </div>
      </div>
    ),
    "Detpak": (
      <div className="flex flex-col items-center justify-center border-b-2 border-[#0D47A1] pb-0.5">
        <span className="font-bold text-2xl text-[#0D47A1] tracking-tight font-sans">Detpak</span>
      </div>
    ),
    "Pap Star": (
      <div className="flex flex-col items-center justify-center leading-tight font-black text-xl text-[#111111] tracking-wider font-sans">
        <span>PAP</span>
        <span className="flex items-center gap-1">
          STAR
          <svg className="w-4 h-4 fill-[#111111]" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </span>
      </div>
    ),
    "Enviro": (
      <div className="flex flex-col items-center justify-center">
        <div className="font-black text-2xl text-[#0277BD] tracking-tight flex items-center font-sans">
          Enviro
          <div className="w-2.5 h-2.5 rounded-full bg-[#4FC3F7] ml-0.5" />
        </div>
        <span className="text-[9px] text-gray-400 font-medium tracking-tight mt-0.5">Tableware & Packaging</span>
      </div>
    ),
    "EarthChoice": (
      <div className="flex items-center justify-center gap-1.5">
        <svg className="w-6 h-6 text-[#2E7D32] fill-current" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        </svg>
        <span className="font-extrabold text-lg text-[#795548] font-sans">earth<span className="text-[#E65100]">choice</span></span>
      </div>
    ),
    "Fineline": (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-black text-lg text-[#212121] tracking-widest font-sans">FINELINE</span>
        <span className="text-[9px] text-gray-400 font-bold tracking-[0.25em] uppercase mt-0.5">S E T T I N G S</span>
      </div>
    ),
    "Galaxy": (
      <div className="font-serif italic text-3xl font-bold text-[#111111]">
        Galaxy
      </div>
    ),
    "Clariant": (
      <div className="flex items-center justify-center gap-1.5 font-black text-lg text-[#111111] tracking-wider font-sans">
        CLARIANT
        <div className="w-3 h-3 bg-gray-400 shrink-0" />
      </div>
    ),
    "Proex": (
      <div className="font-black text-2xl text-[#212121] tracking-tight font-sans">
        pro<span className="text-[#C89A2B]">ex</span>
      </div>
    )
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Top Header & Breadcrumb matching reference image */}
      <div className="space-y-1.5 pb-2">
        <h1 className="text-3xl sm:text-4xl font-black text-[#111111] font-heading tracking-tight">
          BRANDS
        </h1>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link href="/" className="hover:text-[#C89A2B] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#C89A2B]">Brands</span>
        </div>
      </div>

      {/* 4x4 Brands Grid Section matching reference image */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-[0_16px_32px_-10px_rgba(200,154,43,0.18)] hover:border-[#C89A2B]/60 hover:ring-1 hover:ring-[#C89A2B]/30 hover:-translate-y-1.5 transition-all duration-300 h-32 sm:h-36 flex items-center justify-center p-6 text-center cursor-pointer group"
            >
              <div className="group-hover:scale-105 transition-transform duration-300">
                {brandLogosMap[brand.name] || (
                  <div className="font-extrabold text-xl text-[#222222] font-heading">
                    {brand.name}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
