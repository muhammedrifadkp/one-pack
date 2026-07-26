"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  Leaf as LeafIcon,
  ShieldCheck as ShieldIcon,
  MessageCircle as MessageIcon,
  Phone as PhoneIcon,
  Download as DownloadIcon,
  Share2 as ShareIcon,
  CheckCircle2 as CheckCircleIcon,
  Package as PackageIcon,
  Layers as LayersIcon,
  Box as BoxIcon,
  Truck as TruckIcon,
  FileText as FileTextIcon,
  Maximize2 as MaximizeIcon,
  X as XIcon,
  ArrowLeft as ArrowLeftIcon,
  Sparkles as SparklesIcon,
  Info as InfoIcon,
  Check as CheckIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCms } from "@/context/CmsContext";
import { Product } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : "";

  const { products, siteConfig, generateWhatsAppUrl } = useCms();

  // Find product by id or slug
  const product = useMemo(() => {
    if (!rawId) return null;
    const decoded = decodeURIComponent(rawId).toLowerCase();
    return (
      products.find(
        (p) =>
          p.id.toLowerCase() === decoded ||
          p.slug.toLowerCase() === decoded ||
          p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === decoded
      ) || null
    );
  }, [products, rawId]);

  // Selected size state
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Initialize size and image once product is resolved
  React.useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      setSelectedImage(product.image);
    }
  }, [product]);

  // Gallery array
  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.gallery) && product.gallery.length > 0) {
      return Array.from(new Set([product.image, ...product.gallery]));
    }
    return [product.image];
  }, [product]);

  // Related products from same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && (p.categoryId === product.categoryId || p.categoryName === product.categoryName))
      .slice(0, 4);
  }, [products, product]);

  // WhatsApp Enquiry Link
  const whatsappUrl = useMemo(() => {
    if (!product) return "#";
    return generateWhatsAppUrl({
      productName: product.name,
      size: selectedSize || product.sizes.join(", "),
      moq: product.moq
    });
  }, [product, selectedSize, generateWhatsAppUrl]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // 404 Product Not Found State
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-50 text-[#C89A2B] flex items-center justify-center mx-auto border border-[#F3E2B8]">
          <PackageIcon className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111] font-heading">
            PRODUCT NOT FOUND
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            The product you are looking for may have been updated, renamed, or moved. Browse our complete catalog below.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/products"
            className="bg-[#C89A2B] hover:bg-[#B38822] text-white text-xs font-extrabold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Browse All Products
          </Link>
          <Link
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const currentActiveImage = selectedImage || product.image;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Lightbox Full Screen Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
            >
              <XIcon className="w-6 h-6" />
            </button>
            <div className="relative max-w-4xl w-full max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={currentActiveImage}
                alt={product.name}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[#C89A2B] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link href="/products" className="hover:text-[#C89A2B] transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link
            href={`/products?category=${product.categoryId}`}
            className="hover:text-[#C89A2B] transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-[#C89A2B] font-bold line-clamp-1 truncate max-w-xs sm:max-w-none">
            {product.name}
          </span>
        </div>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#C89A2B] bg-gray-50 hover:bg-[#FDF7EA] px-3.5 py-2 rounded-xl border border-gray-200 transition-colors"
        >
          {copiedLink ? <CheckIcon className="w-4 h-4 text-emerald-600" /> : <ShareIcon className="w-4 h-4 text-gray-500" />}
          <span>{copiedLink ? "Link Copied!" : "Share Product"}</span>
        </button>
      </div>

      {/* Main Showcase Layout (Left Image Gallery + Right Product Info) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Image Viewer with Zoom & Gallery Thumbnails */}
        <div className="lg:col-span-6 space-y-4">
          {/* Primary Main Image Frame */}
          <div className="relative aspect-[4/3] bg-[#FAF7F2] rounded-3xl overflow-hidden border border-gray-200/80 shadow-md group">
            {/* Zoom / Lightbox Trigger Button */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-gray-700 hover:text-[#C89A2B] p-2.5 rounded-2xl backdrop-blur-md shadow-sm transition-all border border-gray-200"
              title="Click to Zoom Fullscreen"
            >
              <MaximizeIcon className="w-4 h-4" />
            </button>

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
              {product.ecoFriendly && (
                <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  <LeafIcon className="w-3.5 h-3.5" />
                  Eco-Friendly
                </span>
              )}
              {product.foodGrade && (
                <span className="inline-flex items-center gap-1 bg-[#C89A2B] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  <ShieldIcon className="w-3.5 h-3.5" />
                  Food Grade
                </span>
              )}
            </div>

            {/* Main Interactive Zoom Image */}
            <motion.img
              key={currentActiveImage}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={currentActiveImage}
              alt={product.name}
              onClick={() => setIsLightboxOpen(true)}
              className="w-full h-full object-cover object-center cursor-zoom-in group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>

          {/* Gallery Thumbnails List */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {galleryImages.map((imgUrl, idx) => {
                const isActive = imgUrl === currentActiveImage;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? "border-[#C89A2B] ring-2 ring-[#C89A2B]/30 scale-102"
                        : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Wholesale Guarantee Banner */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#F3E2B8] flex items-center gap-3.5 text-xs text-gray-700">
            <div className="w-10 h-10 rounded-xl bg-[#C89A2B]/15 text-[#C89A2B] flex items-center justify-center shrink-0">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <p className="font-extrabold text-[#111111] uppercase tracking-wider font-heading">
                WHOLESALE & BULK SUPPLY GUARANTEE
              </p>
              <p className="text-gray-500 font-medium">
                100% Bio-degradable products with official GST invoicing & fast delivery across Kasaragod.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Product Title, Specifications, Size Selection & Action CTAs */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header Info */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#C89A2B] uppercase tracking-wider bg-[#FDF7EA] px-3 py-1 rounded-full border border-[#F3E2B8]">
                {product.categoryName}
              </span>
              {product.isFeatured && (
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                  ★ Featured
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#111111] font-heading leading-tight tracking-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Specs Highlights Bar (MOQ + Material) */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-white rounded-2xl border border-gray-200/80 shadow-2xs">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <BoxIcon className="w-3.5 h-3.5 text-[#C89A2B]" />
                Min Order (MOQ)
              </span>
              <p className="text-sm font-extrabold text-[#111111]">{product.moq}</p>
            </div>

            <div className="space-y-1 border-l border-gray-100 pl-4">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <PackageIcon className="w-3.5 h-3.5 text-[#C89A2B]" />
                Material Grade
              </span>
              <p className="text-xs font-bold text-gray-800 line-clamp-1">{product.material || "Food Grade"}</p>
            </div>
          </div>

          {/* Size Selection Chips */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3 pt-1">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#111111] font-heading flex items-center justify-between">
                <span>Select Required Size ({product.sizes.length} Options Available):</span>
                {selectedSize && (
                  <span className="text-[#C89A2B] font-bold">Selected: {selectedSize}</span>
                )}
              </label>
              
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#C89A2B] text-white border-[#C89A2B] shadow-md scale-102"
                          : "bg-white text-gray-700 border-gray-200 hover:border-[#C89A2B] hover:bg-[#FDF7EA]"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            {/* Primary WhatsApp Order Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#C89A2B] hover:bg-[#B38822] text-white text-sm font-black uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2.5 text-center group"
            >
              <MessageIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>ENQUIRE / ORDER ON WHATSAPP</span>
            </a>

            {/* Call Action Button */}
            <div>
              <a
                href={`tel:${siteConfig.phoneNumber.replace(/[^0-9+]/g, "")}`}
                className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 text-center shadow-xs"
              >
                <PhoneIcon className="w-4 h-4 text-[#C89A2B]" />
                <span>Call Us Now ({siteConfig.phoneNumber})</span>
              </a>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-gray-200/80 space-y-3 text-xs">
            <h3 className="font-extrabold text-[#111111] uppercase tracking-wider font-heading border-b border-gray-200/80 pb-2">
              TECHNICAL SPECIFICATIONS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-gray-700">
              <div>
                <span className="text-gray-400 font-medium block text-[11px]">Recommended Usage:</span>
                <span className="font-bold">{product.usage || "Takeaway & Food Packaging"}</span>
              </div>

              <div>
                <span className="text-gray-400 font-medium block text-[11px]">Packaging & Cartons:</span>
                <span className="font-bold">{product.packagingDetails || "Standard Master Carton"}</span>
              </div>

              <div>
                <span className="text-gray-400 font-medium block text-[11px]">Food Safety:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircleIcon className="w-3.5 h-3.5" /> 100% Food Grade Certified
                </span>
              </div>

              <div>
                <span className="text-gray-400 font-medium block text-[11px]">Delivery Area:</span>
                <span className="font-bold text-[#C89A2B]">{siteConfig.deliveryArea || "DELIVERY ALL OVER KASARAGOD"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-gray-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#111111] font-heading tracking-tight">
                MORE FROM {product.categoryName.toUpperCase()}
              </h2>
              <p className="text-xs text-gray-500">Explore similar eco-friendly packaging options</p>
            </div>
            <Link
              href={`/products?category=${product.categoryId}`}
              className="text-xs font-extrabold text-[#C89A2B] hover:underline uppercase tracking-wider"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProd, idx) => {
              const relWhatsAppUrl = generateWhatsAppUrl({
                productName: relProd.name,
                size: relProd.sizes.join(", "),
                moq: relProd.moq
              });

              return (
                <Link key={relProd.id} href={`/products/${relProd.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-[#C89A2B]/60 hover:ring-1 hover:ring-[#C89A2B]/30 hover:-translate-y-2 shadow-2xs hover:shadow-[0_20px_40px_-12px_rgba(200,154,43,0.2)] transition-all duration-300 flex flex-col justify-between group h-full cursor-pointer"
                  >
                    <div>
                      <div className="relative aspect-[4/3] bg-[#F8F8F8] rounded-xl overflow-hidden mb-3">
                        <img
                          src={relProd.image}
                          alt={relProd.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-xs font-extrabold text-[#111111] group-hover:text-[#C89A2B] transition-colors line-clamp-1 font-heading mb-1">
                        {relProd.name}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-medium line-clamp-1">
                        Sizes: {relProd.sizes.join(", ")}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#C89A2B]">{relProd.moq}</span>
                      <span className="text-[11px] font-bold text-gray-600 group-hover:text-[#C89A2B] underline">
                        View Specs →
                      </span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* JSON-LD Product Schema for SEO Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: [product.image, ...galleryImages],
            description: product.description,
            category: product.categoryName,
            material: product.material,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: siteConfig.companyName
              }
            }
          })
        }}
      />
    </div>
  );
}
