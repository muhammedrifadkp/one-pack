"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Leaf,
  ShieldCheck,
  Building2,
  Users,
  Truck,
  PackageCheck,
  CheckCircle2,
  MessageCircle,
  Target,
  Eye,
  Sparkles
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { TRUST_FEATURES } from "@/data/initialData";

export default function AboutPage() {
  const { siteConfig, generateWhatsAppUrl } = useCms();

  const aboutWhatsAppUrl = generateWhatsAppUrl({
    message: "Hello One Pack, I read your About page and would like to partner for bulk eco packaging."
  });

  const stats = [
    { value: "10+", label: "Years Experience", desc: "Serving food businesses across South India" },
    { value: "150+", label: "Products Catalogued", desc: "Bio plates, cups, containers & cutlery" },
    { value: "500+", label: "Regular Clients", desc: "Restaurants, cafes, hotels & caterers" },
    { value: "25+", label: "Cities Served", desc: "Fast regional logistics & daily dispatch" },
  ];

  const timelineEvents = [
    { year: "2016", title: "Company Foundation", desc: "Started as a regional distributor of eco-friendly paper packaging in Kasaragod." },
    { year: "2018", title: "Expanded Product Range", desc: "Introduced sugarcane bagasse plates, bowls, and ripple cups for hot beverages." },
    { year: "2021", title: "Factory Direct Partnerships", desc: "Partnered with top global brands like Huhtamaki, Ecoware, and BioPak." },
    { year: "2024", title: "Digital B2B Catalogue Launch", desc: "Streamlined bulk order placement directly through instant WhatsApp integration." },
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#FAF7F0] border-b border-[#F3E2B8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-[#C89A2B] uppercase tracking-widest">
            ABOUT ONE PACK
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#222222] font-heading">
            Pioneering Sustainable Food Packaging
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We empower food businesses, caterers, and wholesale distributors with 100% biodegradable, food-grade, and factory-direct disposable packaging solutions.
          </p>
        </div>
      </section>

      {/* Main Story & Image Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-[#FDF7EA] border border-[#F3E2B8] px-4 py-1.5 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C89A2B]" />
              <span className="text-xs font-bold text-[#C89A2B] uppercase tracking-wider font-heading">
                Our Story
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#111111] font-heading leading-[1.18] tracking-tight">
              Replacing Single-Use Plastics with Certified Bio Alternatives
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
              <p>
                <strong className="text-[#111111]">One Pack</strong> is a premier wholesale supplier of premium eco-friendly food packaging solutions based in Kasaragod, Kerala. We supply sustainable, high-performance disposable tableware to restaurants, hotels, cafes, bakeries, juice shops, caterers, and retail distributors across the region.
              </p>
              <p>
                Our mission is to lead the food service industry away from environmentally harmful plastics by offering cost-effective, aesthetically pleasing, and 100% compostable alternatives crafted from natural sugarcane bagasse, birchwood, and FSC-certified virgin food paper.
              </p>
            </div>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#222222]">
                <CheckCircle2 className="w-4 h-4 text-[#C89A2B] shrink-0" />
                <span>100% Biodegradable</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#222222]">
                <CheckCircle2 className="w-4 h-4 text-[#C89A2B] shrink-0" />
                <span>Certified Food-Grade</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#222222]">
                <CheckCircle2 className="w-4 h-4 text-[#C89A2B] shrink-0" />
                <span>Direct Factory Prices</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#222222]">
                <CheckCircle2 className="w-4 h-4 text-[#C89A2B] shrink-0" />
                <span>Fast Wholesale Delivery</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href={aboutWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C89A2B] hover:bg-[#B38822] text-white text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Our Team
              </a>
              <Link
                href="/products"
                className="border border-gray-200 hover:border-[#C89A2B] text-gray-700 hover:text-[#C89A2B] text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors"
              >
                Browse Catalogue
              </Link>
            </div>
          </motion.div>

          {/* Right Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient Golden Glow Background */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#C89A2B]/20 via-[#E5C158]/10 to-amber-500/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl border border-gray-100/90 group">
              <img
                src="/about-story-image.png"
                alt="One Pack Eco Friendly Disposable Packaging Collection"
                className="w-full h-[380px] sm:h-[430px] object-cover rounded-2xl group-hover:scale-102 transition-transform duration-500"
              />

              {/* Floating Badge Tag */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-amber-200/80 shadow-lg flex items-center gap-2.5 z-10">
                <div className="w-8 h-8 rounded-lg bg-[#FDF7EA] flex items-center justify-center text-[#C89A2B] shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#111111]">100% Eco Certified</h4>
                  <p className="text-[10px] text-gray-500 font-medium">Sustainable & Compostable</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* STATISTICS COUNTER CARDS */}
      <section className="bg-[#181818] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((st, idx) => (
              <div key={idx} className="text-center space-y-2 border-r last:border-r-0 border-gray-800 px-4">
                <span className="text-4xl sm:text-5xl font-black text-[#C89A2B] font-heading block">
                  {st.value}
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {st.label}
                </h3>
                <p className="text-xs text-gray-400">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF7EA] text-[#C89A2B] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#222222] font-heading">Our Mission</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              To provide every food business in the region with an uncompromised supply of certified eco-friendly packaging at direct wholesale prices, ensuring superior food safety, hygiene, and environmental preservation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF7EA] text-[#C89A2B] flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#222222] font-heading">Our Vision</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              To become South India&apos;s most trusted single-window destination for sustainable disposable packaging, helping food brands enhance their customer experience through clean, premium presentation.
            </p>
          </div>

        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#C89A2B] uppercase tracking-widest">
            JOURNEY & MILESTONES
          </span>
          <h2 className="text-3xl font-black text-[#222222] font-heading">
            Our Growth Timeline
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {timelineEvents.map((ev, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3 relative">
              <span className="text-xs font-black text-[#C89A2B] bg-[#FDF7EA] px-3 py-1 rounded-full border border-[#F3E2B8]">
                {ev.year}
              </span>
              <h4 className="text-sm font-bold text-[#222222] font-heading pt-2">{ev.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{ev.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F0] p-8 sm:p-12 rounded-3xl border border-[#F3E2B8] grid grid-cols-2 md:grid-cols-3 gap-6">
          {TRUST_FEATURES.map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#C89A2B] text-white flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#222222] uppercase tracking-wider">{f.title}</h4>
                <p className="text-[11px] text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
