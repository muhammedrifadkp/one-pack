"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ArrowUpDown, Package, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCms } from "@/context/CmsContext";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const { products, categories, generateWhatsAppUrl } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "name-asc" | "name-desc">("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "all" ||
          product.categoryId === selectedCategory ||
          product.categoryName.toLowerCase().replace(/\s+/g, "-") === selectedCategory;

        const matchesQuery =
          searchQuery.trim() === "" ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sizes.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        // Featured default
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Breadcrumb matching reference image */}
      <div className="space-y-1.5 pb-2">
        <h1 className="text-3xl sm:text-4xl font-black text-[#111111] font-heading tracking-tight">
          PRODUCTS
        </h1>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link href="/" className="hover:text-[#C89A2B] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#C89A2B]">
            {selectedCategory === "all" ? "Products" : activeCategoryObj?.name || "Products"}
          </span>
        </div>
      </div>

      {/* Main Page Layout Grid (Left Sidebar + Right Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
              <h3 className="text-xs font-black tracking-wider text-[#111111] uppercase font-heading">
                CATEGORIES
              </h3>
              {selectedCategory !== "all" && (
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="text-[11px] font-bold text-[#C89A2B] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="divide-y divide-gray-100 text-xs">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-4 py-3 font-bold transition-colors flex items-center justify-between ${
                  selectedCategory === "all"
                    ? "bg-[#C89A2B] text-white"
                    : "text-gray-700 hover:bg-[#FDF7EA] hover:text-[#C89A2B]"
                }`}
              >
                <span>All Products</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === "all" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {products.length}
                </span>
              </button>

              {categories.map((cat) => {
                const count = products.filter((p) => p.categoryId === cat.id).length;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 font-semibold transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-[#C89A2B] text-white font-bold"
                        : "text-gray-700 hover:bg-[#FDF7EA] hover:text-[#C89A2B]"
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Main Content Section */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Controls Bar (Search Box + Sort Dropdown) */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            
            {/* Search Input Box */}
            <div className="flex-1 w-full relative order-1 sm:order-2">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#C89A2B] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 order-2 sm:order-1">
              {/* Mobile Filter Drawer Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#FDF7EA] text-[#C89A2B] font-bold text-xs px-3.5 py-2.5 rounded-xl border border-[#F3E2B8] shrink-0 truncate"
              >
                <SlidersHorizontal className="w-4 h-4 shrink-0" />
                <span className="truncate">Category ({selectedCategory === "all" ? "All" : activeCategoryObj?.name})</span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 text-xs shrink-0">
                <span className="text-gray-500 font-bold whitespace-nowrap hidden xs:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-gray-200 font-bold text-gray-800 py-2.5 px-2.5 sm:px-3 rounded-xl focus:outline-none focus:border-[#C89A2B] cursor-pointer text-xs"
                >
                  <option value="featured">Featured</option>
                  <option value="name-asc">A - Z</option>
                  <option value="name-desc">Z - A</option>
                </select>
              </div>
            </div>

          </div>

          {/* Products Grid (2 Columns on Mobile, 3 Columns on Desktop) */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredProducts.map((prod, idx) => {
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
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
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

                    {/* Action Buttons Row */}
                    <div className="pt-4 flex items-center gap-2">
                      <Link
                        href={`/products/${prod.id}`}
                        className="flex-1 py-2 px-2 border border-gray-200 hover:border-[#C89A2B] text-gray-700 hover:text-[#C89A2B] text-[11px] font-extrabold uppercase tracking-wider rounded-lg transition-all text-center"
                      >
                        VIEW SPECS
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
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#222222]">No products found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try searching for a different product name or clear your category selection.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="bg-[#C89A2B] text-white text-xs font-bold px-6 py-2.5 rounded-xl uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Drawer Filter */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end lg:hidden">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xs bg-white h-full overflow-y-auto p-6 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-sm font-bold text-[#222222] uppercase tracking-wider">
                  Filter Categories
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="divide-y divide-gray-100 text-xs">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-3 font-bold flex items-center justify-between ${
                    selectedCategory === "all" ? "bg-[#C89A2B] text-white" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 font-semibold flex items-center justify-between ${
                      selectedCategory === cat.id ? "bg-[#C89A2B] text-white font-bold" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-gray-400">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
