"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowRight,
  Leaf,
  ShieldCheck,
  BadgeIndianRupee,
  Boxes,
  Zap,
  FileCheck,
  Star,
  CheckCircle2,
  Package
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { ProductCard } from "@/components/products/ProductCard";
import { TRUST_FEATURES, TARGET_CUSTOMERS } from "@/data/initialData";

export default function HomePage() {
  const { siteConfig, categories, products, brands, testimonials, generateWhatsAppUrl } = useCms();

  const heroWhatsAppUrl = generateWhatsAppUrl({
    message: "Hi, I am looking for bulk eco disposable packaging solutions for my business."
  });

  const ctaWhatsAppUrl = generateWhatsAppUrl({
    message: "Hello One Pack, I need a bulk packaging quotation for my business."
  });

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 6);

  const trustIconsMap: Record<string, React.ReactNode> = {
    Leaf: (
      <svg className="w-8 h-8 stroke-[1.5] stroke-current fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2.5.5 4-1 9.8A7 7 0 0 1 11 20z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 20a7 7 0 0 0 7.8-6.1c-5.7-1.1-7.2-1.6-9.2-4.1-1 2.5-.5 4 1 9.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 21c3-3 7-5 9-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    ShieldCheck: (
      <svg className="w-8 h-8 stroke-[1.5] stroke-current fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
        <path d="M6 3h5l-2.5 5v5.5m-3 0h6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 3v4a2 2 0 0 0 2 2v10m-3-16v3a1.5 1.5 0 0 0 1.5 1.5m1.5-4.5v3a1.5 1.5 0 0 0 1.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    BadgeIndianRupee: (
      <svg className="w-8 h-8 stroke-[1.5] stroke-current fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
        <path d="M12 3L2 8.5l10 5.5 10-5.5L12 3zM2 8.5v8.5l10 5.5V14M22 8.5v8.5L12 22.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 14l5-2.75M7 11.25L12 14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Boxes: (
      <svg className="w-8 h-8 stroke-[1.5] stroke-current fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
        <rect x="1" y="6" width="14" height="10" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 9h4.5l3.5 3.5V16h-8V9z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="5.5" cy="18.5" r="2" />
        <circle cx="18.5" cy="18.5" r="2" />
        <path d="M3.5 10h4m-4 2.5h2.5" strokeLinecap="round" />
      </svg>
    ),
    Zap: (
      <svg className="w-8 h-8 stroke-[1.5] stroke-current fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    FileCheck: (
      <svg className="w-8 h-8 stroke-[1.5] stroke-current fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M8 11h8M8 15h5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    )
  };

  const categoryIconsMap: Record<string, React.ReactNode> = {
    "Paper Plates": (
      <svg className="w-12 h-12 stroke-[1.4] stroke-[#C89A2B] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 32 32">
        <circle cx="13" cy="16" r="8" />
        <circle cx="13" cy="16" r="5" strokeDasharray="1.5 1.5" />
        <circle cx="19" cy="16" r="8" />
        <circle cx="19" cy="16" r="5" strokeDasharray="1.5 1.5" />
      </svg>
    ),
    "Food Containers": (
      <svg className="w-12 h-12 stroke-[1.4] stroke-[#C89A2B] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 32 32">
        <rect x="5" y="12" width="22" height="12" rx="2" />
        <path d="M4 12h24M8 12l2-5h12l2 5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 18h4" strokeLinecap="round" />
      </svg>
    ),
    "Paper Cups": (
      <svg className="w-12 h-12 stroke-[1.4] stroke-[#C89A2B] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 32 32">
        <path d="M9 10l2 16h10l2-16H9z" />
        <path d="M7 10h18M8 7h16v3H8V7z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="18" r="2" />
      </svg>
    ),
    "Wooden Cutlery": (
      <svg className="w-12 h-12 stroke-[1.4] stroke-[#C89A2B] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 32 32">
        <path d="M11 6v6a2 2 0 01-2 2v12m4-20v6a2 2 0 002 2v12m-6-20v4m4-4v4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 6c-2 3-2 6 0 8v12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Paper Straws": (
      <svg className="w-12 h-12 stroke-[1.4] stroke-[#C89A2B] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 32 32">
        <path d="M9 6v20m4-20v20m4-20v20m4-20v20" strokeLinecap="round" />
        <path d="M7 6h18M7 26h18" strokeLinecap="round" />
      </svg>
    ),
    "Carry Bags": (
      <svg className="w-12 h-12 stroke-[1.4] stroke-[#C89A2B] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 32 32">
        <rect x="7" y="11" width="18" height="16" rx="2" />
        <path d="M12 11V8a4 4 0 018 0v3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Bakery Packaging": (
      <svg className="w-12 h-12 stroke-[1.4] stroke-[#C89A2B] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 32 32">
        <rect x="5" y="13" width="22" height="12" rx="2" />
        <path d="M5 13l3-7h16l3 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 13a3 3 0 006 0" strokeLinecap="round" />
      </svg>
    ),
    "Meal Boxes": (
      <svg className="w-12 h-12 stroke-[1.4] stroke-[#C89A2B] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 32 32">
        <path d="M6 14h20v10a2 2 0 01-2 2H8a2 2 0 01-2-2V14z" />
        <path d="M6 14L16 7l10 7M10 14V9m12 5V9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Pizza Boxes": (
      <svg className="w-12 h-12 stroke-[1.4] stroke-[#C89A2B] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 32 32">
        <polygon points="16,5 27,11 27,21 16,27 5,21 5,11" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 11l11 6 11-6M16 17v10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Salad Bowls": (
      <svg className="w-12 h-12 stroke-[1.4] stroke-[#C89A2B] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 32 32">
        <path d="M6 14a10 10 0 0020 0H6z" />
        <path d="M12 14c0-3 2-6 4-6s4 3 4 6" strokeLinecap="round" />
        <path d="M14 8c-1-2 0-3 2-3s3 1 2 3" strokeLinecap="round" />
      </svg>
    )
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white pt-0 pb-8 lg:pt-2 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 space-y-5 sm:space-y-6 lg:py-2"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#122E1F] text-white px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider max-w-full">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E6C673] shrink-0" />
                <span className="truncate">WE ONLY SELL BIO PRODUCTS — NO PLASTIC</span>
              </div>

              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.12]">
                <span className="text-[#111111] block">One Source.</span>
                <span className="text-[#C89A2B] block mt-1">Every Pack.</span>
              </h1>

              <p className="text-sm sm:text-lg text-gray-800 font-medium leading-relaxed max-w-md">
                Premium bio disposable packaging solutions for your business.
              </p>

              <div className="text-xs sm:text-base text-gray-700 font-normal leading-relaxed space-y-1">
                <p>Restaurants. Hotels. Cafés. Bakeries.</p>
                <p>Juice Shops. Catering & More.</p>
              </div>

              {/* Action CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/products"
                  className="bg-[#C89A2B] hover:bg-[#B38822] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-xs transition-colors text-center inline-flex items-center justify-center w-full sm:w-auto"
                >
                  Explore Products
                </Link>

                <a
                  href={heroWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-amber-50/50 text-[#C89A2B] border border-[#C89A2B] text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl transition-colors text-center inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 text-[#C89A2B]" />
                  Order on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right Hero Image Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 relative flex items-center justify-center lg:justify-end mt-4 lg:mt-0"
            >
              <img
                src="/hero-page-image.png"
                alt="One Pack Eco Packaging Collection"
                decoding="async"
                fetchPriority="high"
                className="w-full max-w-md sm:max-w-lg lg:max-w-none h-auto object-contain object-center lg:object-right"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* TRUST FEATURES BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {TRUST_FEATURES.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-[#FAF7F2] hover:bg-white py-7 px-4 rounded-2xl border border-transparent hover:border-[#C89A2B]/40 hover:ring-1 hover:ring-[#C89A2B]/30 hover:-translate-y-2 shadow-2xs hover:shadow-[0_20px_40px_-12px_rgba(200,154,43,0.2)] transition-all duration-300 text-center flex flex-col items-center justify-center space-y-3.5 group cursor-pointer"
            >
              <div className="text-[#222222] group-hover:text-[#C89A2B] transition-colors duration-300">
                {trustIconsMap[feat.icon] || <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />}
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-[#111111] group-hover:text-[#C89A2B] uppercase tracking-wider transition-colors duration-300 font-heading">
                  {feat.title}
                </h3>
                <p className="text-[11px] text-gray-500 font-medium leading-tight mt-1">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] font-heading tracking-tight">
            SHOP BY CATEGORY
          </h2>
          <div className="w-12 h-1 bg-[#C89A2B] mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {categories.slice(0, 10).map((cat, idx) => (
            <Link key={cat.id} href={`/products?category=${cat.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="bg-white hover:bg-[#FDF7EA]/50 py-8 px-4 rounded-2xl border border-gray-100 hover:border-[#C89A2B]/50 hover:ring-1 hover:ring-[#C89A2B]/30 hover:-translate-y-2 shadow-2xs hover:shadow-[0_20px_40px_-12px_rgba(200,154,43,0.2)] transition-all duration-300 text-center flex flex-col items-center justify-center space-y-4 group h-full cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] group-hover:bg-[#FDF7EA] flex items-center justify-center transition-colors duration-300">
                  {categoryIconsMap[cat.name] || <Package className="w-8 h-8 stroke-[1.4] text-[#C89A2B]" />}
                </div>
                <h3 className="text-xs font-extrabold text-[#111111] group-hover:text-[#C89A2B] tracking-wider transition-colors duration-300 font-heading">
                  {cat.name}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] font-heading tracking-tight">
            FEATURED PRODUCTS
          </h2>
          <div className="w-12 h-1 bg-[#C89A2B] mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5">
          {featuredProducts.slice(0, 5).map((prod, idx) => {
            const productWhatsAppUrl = generateWhatsAppUrl({
              productName: prod.name,
              size: prod.sizes.join(", "),
              moq: prod.moq
            });

            return (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-[#C89A2B]/60 hover:ring-1 hover:ring-[#C89A2B]/30 hover:-translate-y-2 shadow-2xs hover:shadow-[0_20px_40px_-12px_rgba(200,154,43,0.2)] transition-all duration-300 flex flex-col justify-between group h-full cursor-pointer"
              >
                <Link href={`/products/${prod.id}`} className="block flex-1">
                  {/* Top Image Container */}
                  <div className="relative aspect-[4/3] bg-[#F8F8F8] rounded-xl overflow-hidden mb-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-extrabold text-[#111111] group-hover:text-[#C89A2B] transition-colors duration-300 font-heading mb-2 line-clamp-1">
                    {prod.name}
                  </h3>

                  {/* Specs */}
                  <div className="text-[11px] text-gray-500 font-medium space-y-1 leading-snug">
                    <p className="line-clamp-2">
                      <span className="text-gray-400">Sizes:</span> {prod.sizes.join(", ")}
                    </p>
                    <p>
                      <span className="text-gray-400">MOQ:</span> {prod.moq}
                    </p>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div className="pt-4 flex items-center gap-2">
                  <Link
                    href={`/products/${prod.id}`}
                    className="flex-1 py-2 px-2 border border-gray-200 hover:border-[#C89A2B] text-gray-700 hover:text-[#C89A2B] text-[11px] font-extrabold uppercase tracking-wider rounded-lg transition-all text-center"
                  >
                    SPECS
                  </Link>
                  <a
                    href={productWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-2 bg-[#C89A2B] hover:bg-[#B38822] text-white text-[11px] font-extrabold uppercase tracking-wider rounded-lg transition-all text-center"
                  >
                    ENQUIRE
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* BRANDS LOGO GRID SECTION */}
      <section className="bg-[#FAF7F0] py-16 border-y border-[#F3E2B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#C89A2B] uppercase tracking-widest">
              AUTHORIZED DEALERS & SUPPLIERS
            </span>
            <h2 className="text-2xl font-black text-[#222222] font-heading mt-1">
              WORLD CLASS BRAND PARTNERS
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {brands.map((brand) => (
              <motion.div
                key={brand.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center h-20 group"
              >
                <span className="text-xs font-bold text-gray-700 group-hover:text-[#C89A2B] transition-colors line-clamp-1">
                  {brand.name}
                </span>
                {brand.tagline && (
                  <span className="text-[9px] text-gray-400 line-clamp-1 mt-0.5">
                    {brand.tagline}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#C89A2B] uppercase tracking-widest">
            CLIENT FEEDBACK
          </span>
          <h2 className="text-3xl font-black text-[#222222] font-heading">
            TRUSTED BY 500+ FOOD BUSINESSES
          </h2>
          <div className="w-12 h-1 bg-[#C89A2B] mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  &ldquo;{test.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FDF7EA] text-[#C89A2B] font-bold flex items-center justify-center text-sm">
                  {test.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#222222]">{test.author}</h4>
                  <p className="text-[10px] text-gray-500">
                    {test.businessName} • {test.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#222222] via-[#2D2D2D] to-[#1A1A1A] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-gray-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left z-10">
            <span className="text-xs font-bold text-[#C89A2B] uppercase tracking-widest">
              WHOLESALE INQUIRIES & BULK ORDERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading leading-tight">
              Need Bulk Packaging Solutions?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Get immediate wholesale price quotes, custom branding options, and fast regional delivery. Talk to our team on WhatsApp today.
            </p>
          </div>

          <a
            href={ctaWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C89A2B] hover:bg-[#B38822] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 sm:px-8 py-4 rounded-2xl shadow-xl transition-all transform hover:scale-105 shrink-0 flex items-center justify-center gap-2.5 z-10 w-full md:w-auto"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            Contact us today on WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
