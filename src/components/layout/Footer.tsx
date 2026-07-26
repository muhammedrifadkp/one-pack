"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, Mail, MapPin, Download, Globe, Share2, FileCheck, ShieldCheck, Truck } from "lucide-react";
import { useCms } from "@/context/CmsContext";

export const Footer: React.FC = () => {
  const { siteConfig, categories, generateWhatsAppUrl } = useCms();

  const catalogueWhatsAppUrl = generateWhatsAppUrl({
    message: "Hi, please send me your latest PDF Product Catalogue and Wholesale Price List."
  });

  return (
    <footer className="bg-[#181818] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block bg-white px-3 py-2 rounded-xl shadow-md hover:shadow-lg transition-all group">
              <Image
                src="/LOGO.png"
                alt="One Pack Logo"
                width={190}
                height={50}
                className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed">
              Premium bio disposable packaging solutions. We only sell bio products — no plastic.
            </p>

            {/* Bio notice badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#122E1F] border border-emerald-800/60 px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#E6C673]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E6C673]" />
              <span>NO PLASTIC — 100% BIO</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={catalogueWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#C89A2B] text-gray-300 hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href={catalogueWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#C89A2B] text-gray-300 hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href={catalogueWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#C89A2B] text-gray-300 hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#C89A2B] pl-2">
              QUICK LINKS
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-[#C89A2B] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#C89A2B] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C89A2B] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-[#C89A2B] transition-colors">
                  Our Brands
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C89A2B] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Products */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#C89A2B] pl-2">
              PRODUCTS
            </h3>
            <ul className="space-y-2.5 text-xs">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.id}`}
                    className="hover:text-[#C89A2B] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#C89A2B] pl-2">
              CONTACT & GST
            </h3>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C89A2B] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>Call: <strong className="text-white">{siteConfig.phoneNumber}</strong></span>
                  <span>WhatsApp: <strong className="text-[#25D366]">{siteConfig.secondaryPhone}</strong></span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C89A2B] shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[#C89A2B] transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C89A2B] shrink-0 mt-0.5" />
                <span>
                  {siteConfig.address}, {siteConfig.cityState}
                </span>
              </li>
              {siteConfig.gstin && (
                <li className="flex items-center gap-2.5 text-gray-300">
                  <FileCheck className="w-4 h-4 text-[#C89A2B] shrink-0" />
                  <span>GSTIN: <strong className="text-white">{siteConfig.gstin}</strong></span>
                </li>
              )}
              {siteConfig.deliveryArea && (
                <li className="flex items-center gap-2.5 text-emerald-400 font-semibold">
                  <Truck className="w-4 h-4 text-[#C89A2B] shrink-0" />
                  <span>{siteConfig.deliveryArea}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Download Catalogue Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-2xl border border-gray-800 flex flex-col justify-between space-y-4 shadow-xl">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                DOWNLOAD CATALOGUE
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Download our complete product catalogue and wholesale price list in PDF format.
              </p>
            </div>
            <a
              href={catalogueWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C89A2B] hover:bg-[#B38822] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md group"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              DOWNLOAD PDF
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} One Pack. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/terms-and-conditions" className="hover:text-gray-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
