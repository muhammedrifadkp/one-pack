import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C89A2B] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#FDF7EA] text-[#C89A2B] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#222222] font-heading">Terms & Conditions</h1>
            <span className="text-xs text-gray-400">Last updated: July 2026 • One Pack B2B Wholesale</span>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <p>
            Welcome to <strong>One Pack</strong>. By accessing our website, browsing our product catalogue, or submitting inquiries, you agree to comply with and be bound by the following B2B terms and conditions.
          </p>

          <h3 className="text-base font-bold text-[#222222] pt-2">1. Nature of Website</h3>
          <p>
            This website functions as an online product showcase and digital catalogue. It does not contain an online payment gateway or automated cart checkout. All commercial transactions, price confirmations, and delivery arrangements are negotiated directly via WhatsApp or phone.
          </p>

          <h3 className="text-base font-bold text-[#222222] pt-2">2. Minimum Order Quantities (MOQ)</h3>
          <p>
            All products listed specify a Minimum Order Quantity (MOQ) tailored for B2B wholesale supply. Orders below MOQ are subject to stock availability and management discretion.
          </p>

          <h3 className="text-base font-bold text-[#222222] pt-2">3. Product Specifications & Customization</h3>
          <p>
            While we strive for maximum accuracy, product dimensions, volumetric capacities (ml/oz), and color shades of unbleached eco-friendly paper/bagasse materials may vary slightly by production batch. Custom branding and logo printing require advance artwork approval.
          </p>

          <h3 className="text-base font-bold text-[#222222] pt-2">4. Tax & Billing Compliance</h3>
          <p>
            Official tax invoices (GST compliant under GSTIN: <strong>32AALFB1621M1ZN</strong>) are issued for all processed business orders. Applicable GST rates and transport freight charges are specified transparently during order confirmation.
          </p>

          <h3 className="text-base font-bold text-[#222222] pt-2">5. Jurisdiction</h3>
          <p>
            Any legal claims or disputes regarding products or services provided by One Pack shall be governed by the laws of India and subject to the exclusive jurisdiction of courts in Kasaragod, Kerala.
          </p>
        </div>
      </div>
    </div>
  );
}
