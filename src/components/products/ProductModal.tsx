"use client";

import React, { useState } from "react";
import { X, MessageCircle, Leaf, ShieldCheck, Check, Box, Truck, Layers, Info, User, Building, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { useCms } from "@/context/CmsContext";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { generateWhatsAppUrl, products } = useCms();

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [customerName, setCustomerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [customMsg, setCustomMsg] = useState("");

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const whatsappUrl = generateWhatsAppUrl({
    productName: product.name,
    size: selectedSize,
    moq: product.moq,
    customerName: customerName.trim(),
    businessName: businessName.trim(),
    city: city.trim(),
    message: customMsg.trim()
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative border border-gray-100"
        >
          {/* Header Close Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#C89A2B] uppercase tracking-wider">
                {product.categoryName}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500 font-medium">B2B Wholesale Item</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Main Content Scroll Area */}
          <div className="overflow-y-auto p-6 space-y-8 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Image Gallery & Zoom */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl bg-[#F8F8F8] overflow-hidden border border-gray-100 shadow-inner group cursor-zoom-in">
                  <img
                    src={galleryImages[activeImageIndex] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {product.ecoFriendly && (
                      <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                        <Leaf className="w-3.5 h-3.5" />
                        100% Eco Friendly
                      </span>
                    )}
                    {product.foodGrade && (
                      <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Food Grade Certified
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnails list */}
                {galleryImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {galleryImages.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          activeImageIndex === idx ? "border-[#C89A2B] scale-95" : "border-gray-200 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={imgUrl} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Product Specifications & Enquiry Form */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-[#222222] font-heading leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Ready Stock & Direct Factory Supply
                  </p>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Sizes Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                      Available Sizes:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                            selectedSize === sz
                              ? "bg-[#C89A2B] text-white border-[#C89A2B] shadow-sm"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:border-[#C89A2B]"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#F9FAFB] p-4 rounded-2xl border border-gray-100">
                  <div>
                    <span className="text-gray-400 font-medium block">MOQ (Minimum Order):</span>
                    <span className="font-bold text-[#222222] mt-0.5 block">{product.moq}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium block">Material Quality:</span>
                    <span className="font-bold text-[#222222] mt-0.5 block">{product.material}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium block">Best Used For:</span>
                    <span className="font-semibold text-gray-700 mt-0.5 block">{product.usage}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium block">Packaging Details:</span>
                    <span className="font-semibold text-gray-700 mt-0.5 block">{product.packagingDetails}</span>
                  </div>
                </div>

                {/* Optional Customer Contact Details for WhatsApp */}
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Pre-fill Your Business Details (Optional):
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C89A2B]"
                      />
                    </div>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Business/Restaurant Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C89A2B]"
                      />
                    </div>
                  </div>
                </div>

                {/* Main WhatsApp Enquiry Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2.5 group"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20 stroke-[2.5] group-hover:scale-110 transition-transform" />
                  ENQUIRE ON WHATSAPP NOW
                </a>
              </div>

            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Related Packaging Items
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        onClose();
                      }}
                      className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-[#FDF7EA] rounded-xl border border-gray-100 cursor-pointer transition-colors"
                    >
                      <img src={rel.image} alt={rel.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 truncate">{rel.name}</h4>
                        <span className="text-[10px] text-[#C89A2B] font-semibold">MOQ: {rel.moq}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
