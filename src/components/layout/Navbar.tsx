"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Menu, X, ChevronDown, PackageSearch, SlidersHorizontal, Phone, ShieldCheck, Truck } from "lucide-react";
import { useCms } from "@/context/CmsContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { siteConfig, generateWhatsAppUrl, categories } = useCms();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 30) {
        setShowTopBar(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 10) {
        setShowTopBar(true);
      }

      lastScrollY = Math.max(0, currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "PRODUCTS", href: "/products", hasDropdown: true },
    { name: "ABOUT", href: "/about" },
    { name: "BRANDS", href: "/brands" },
    { name: "CONTACT", href: "/contact" },
  ];

  const orderWhatsAppUrl = generateWhatsAppUrl({
    message: "Hi, I would like to place an order / get a bulk pricing quote."
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Company Info Bar - hides smoothly on scroll down */}
      <div
        className={`bg-[#122E1F] text-white transition-all duration-300 ease-in-out overflow-hidden ${
          showTopBar
            ? "max-h-12 opacity-100 py-1.5 border-b border-emerald-900/40"
            : "max-h-0 opacity-0 py-0 border-b-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-medium">
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
            <span className="inline-flex items-center gap-1 text-[#E6C673] font-bold truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E6C673] shrink-0" />
              WE ONLY SELL BIO PRODUCTS - NO PLASTIC
            </span>
            <span className="hidden md:inline-block text-emerald-700">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-emerald-200">
              <Truck className="w-3.5 h-3.5 text-[#E6C673] shrink-0" />
              DELIVERY ALL OVER KASARAGOD
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 sm:gap-4 ml-auto shrink-0">
            <a
              href={`tel:${siteConfig.phoneNumber.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-1 hover:text-[#E6C673] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E6C673]" />
              <span>Call: <strong className="text-white">{siteConfig.phoneNumber}</strong></span>
            </a>
            <span className="text-emerald-700">|</span>
            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-[#25D366]" />
              <span>WhatsApp: <strong className="text-white">{siteConfig.secondaryPhone}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100"
            : "bg-white py-4 border-b border-gray-100"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group py-0.5">
            <Image
              src="/LOGO.png"
              alt="One Pack Logo"
              width={220}
              height={60}
              priority
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <Link
                      href="/products"
                      className={`flex items-center gap-1 text-xs font-bold tracking-wider transition-colors duration-200 py-2 ${
                        isActive ? "text-[#C89A2B]" : "text-[#222222] hover:text-[#C89A2B]"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:rotate-180 transition-transform" />
                    </Link>

                    {/* Products Mega Dropdown */}
                    <AnimatePresence>
                      {productsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 px-1 z-50 mt-1"
                        >
                          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              Categories
                            </span>
                            <Link
                              href="/products"
                              className="text-[11px] font-semibold text-[#C89A2B] hover:underline"
                            >
                              View All →
                            </Link>
                          </div>
                          <div className="max-h-80 overflow-y-auto py-1">
                            {categories.slice(0, 10).map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/products?category=${cat.id}`}
                                className="block px-3 py-2 text-xs text-gray-700 hover:bg-[#FDF7EA] hover:text-[#C89A2B] rounded-lg transition-colors font-medium"
                              >
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-bold tracking-wider transition-colors duration-200 relative py-2 ${
                    isActive ? "text-[#C89A2B]" : "text-[#222222] hover:text-[#C89A2B]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C89A2B] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C89A2B] hover:bg-[#B38822] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              Order on WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#C89A2B] text-white rounded-lg shadow-sm"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200 overflow-y-auto max-h-[85vh] shadow-xl"
          >
            <div className="px-5 py-6 space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm font-bold tracking-wider py-2 border-b border-gray-50 ${
                      isActive ? "text-[#C89A2B]" : "text-[#222222]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Popular Categories
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg hover:bg-[#FDF7EA] hover:text-[#C89A2B]"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={orderWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#C89A2B] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
};
