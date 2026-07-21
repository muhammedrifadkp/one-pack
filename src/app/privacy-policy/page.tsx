import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C89A2B] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#FDF7EA] text-[#C89A2B] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#222222] font-heading">Privacy Policy</h1>
            <span className="text-xs text-gray-400">Last updated: July 2026 • One Pack Eco Packaging</span>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <p>
            At <strong>One Pack</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), we prioritize the privacy and confidentiality of our B2B customers, wholesale partners, and website visitors. This Privacy Policy explains how information is handled when you browse our website and communicate with us.
          </p>

          <h3 className="text-base font-bold text-[#222222] pt-2">1. No Online Cart or User Accounts</h3>
          <p>
            One Pack is a digital product catalogue and inquiry website. We do NOT collect credit card numbers, process online payments, or maintain user registration databases on this website.
          </p>

          <h3 className="text-base font-bold text-[#222222] pt-2">2. Direct Communication via WhatsApp</h3>
          <p>
            When you click &ldquo;Enquire Now&rdquo; or submit our contact form, you are redirected to WhatsApp. Information provided in your message (such as your name, business name, phone number, and city) is transmitted directly via WhatsApp&apos;s end-to-end encrypted messaging service to our customer representative.
          </p>

          <h3 className="text-base font-bold text-[#222222] pt-2">3. Business Data Usage</h3>
          <p>
            Any contact information provided during wholesale inquiries is strictly used to fulfill product quotes, generate B2B tax invoices, arrange freight logistics, and communicate regarding order status. We never sell, rent, or trade customer details to third parties.
          </p>

          <h3 className="text-base font-bold text-[#222222] pt-2">4. Analytics & Cookies</h3>
          <p>
            We may use standard web performance monitoring tools (such as Google Analytics) to improve website speed, navigation, and accessibility. These tools aggregate anonymous technical data without identifying individual users.
          </p>

          <h3 className="text-base font-bold text-[#222222] pt-2">5. Contact Information</h3>
          <p>
            For any privacy inquiries or data update requests, please contact us via email at <strong>info@onepackonline.com</strong> or phone at <strong>+91 99952 16808</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
