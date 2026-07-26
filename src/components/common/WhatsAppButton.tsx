"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCms } from "@/context/CmsContext";

export const WhatsAppButton: React.FC = () => {
  const { siteConfig, generateWhatsAppUrl } = useCms();
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = generateWhatsAppUrl({
    message: "Hello One Pack team, I would like to enquire about your products."
  });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Pop-up message tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2 bg-white text-gray-800 px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 text-xs font-medium relative"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
              aria-label="Close tooltip"
              suppressHydrationWarning
            >
              <X className="w-3 h-3" />
            </button>
            <span>Need Wholesale Packaging? <strong>Chat on WhatsApp</strong></span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"></span>

        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white/20 stroke-[2.5]" />
      </a>
    </div>
  );
};
