"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Leaf, ShieldCheck, MessageCircle, Eye, Box, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useCms } from "@/context/CmsContext";
import { ProductModal } from "./ProductModal";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { generateWhatsAppUrl } = useCms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");

  const directWhatsAppUrl = generateWhatsAppUrl({
    productName: product.name,
    size: selectedSize || product.sizes.join(", "),
    moq: product.moq
  });

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-6px_rgba(200,154,43,0.15)] transition-all duration-300 overflow-hidden flex flex-col justify-between group"
      >
        {/* Top Image Area */}
        <div className="relative aspect-[4/3] bg-[#F8F8F8] overflow-hidden cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {product.ecoFriendly && (
              <span className="inline-flex items-center gap-1 bg-emerald-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm">
                <Leaf className="w-3 h-3" />
                Eco
              </span>
            )}
            {product.foodGrade && (
              <span className="inline-flex items-center gap-1 bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm">
                <ShieldCheck className="w-3 h-3" />
                Food Grade
              </span>
            )}
          </div>

          {/* Quick View Hover Button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <span className="bg-white text-gray-800 font-bold text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
              <Eye className="w-4 h-4 text-[#C89A2B]" />
              Quick View
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C89A2B]">
              {product.categoryName}
            </span>
            <h3
              onClick={() => setIsModalOpen(true)}
              className="text-base font-bold text-[#222222] font-heading mt-0.5 line-clamp-1 hover:text-[#C89A2B] transition-colors cursor-pointer"
            >
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="bg-[#F9FAFB] rounded-xl p-3 space-y-1.5 text-xs text-gray-600 border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#C89A2B]" />
                Sizes:
              </span>
              <span className="font-semibold text-gray-800 line-clamp-1 text-right">
                {product.sizes.join(", ")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium flex items-center gap-1">
                <Box className="w-3.5 h-3.5 text-[#C89A2B]" />
                MOQ:
              </span>
              <span className="font-bold text-[#C89A2B]">{product.moq}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-1 flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 py-2.5 px-3 border border-gray-200 hover:border-[#C89A2B] text-gray-700 hover:text-[#C89A2B] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center"
            >
              Details
            </button>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 bg-[#C89A2B] hover:bg-[#B38822] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 text-center group/btn"
            >
              <MessageCircle className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
              Enquire
            </a>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      {isModalOpen && (
        <ProductModal
          product={product}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
