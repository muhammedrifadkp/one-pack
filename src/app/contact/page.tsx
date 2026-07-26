"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, User, Building, MapPin as CityIcon, FileCheck, ShieldCheck, Truck } from "lucide-react";
import { useCms } from "@/context/CmsContext";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required (at least 2 characters)"),
  phone: z.string().min(8, "Valid phone number is required"),
  businessName: z.string().min(2, "Business name is required"),
  city: z.string().min(2, "City name is required"),
  message: z.string().optional()
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { siteConfig, generateWhatsAppUrl } = useCms();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormData) => {
    const formattedMessage = `Hello,
My Name: ${data.name}

Business: ${data.businessName}
City: ${data.city}
Phone: ${data.phone}

Message: ${data.message || "I would like to enquire about your products and wholesale pricing."}

I would like to enquire about your products.`;

    const waPhone = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(formattedMessage)}`;

    window.open(waUrl, "_blank");
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#FAF7F0] border-b border-[#F3E2B8] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#122E1F] text-white px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider max-w-full">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E6C673] shrink-0" />
            <span className="truncate">WE ONLY SELL BIO PRODUCTS - NO PLASTIC</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#222222] font-heading">
            Contact One Pack
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have a bulk packaging enquiry or need a custom quote? Fill out the form below or reach us directly via phone or WhatsApp.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Company Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#C89A2B] uppercase tracking-wider">
                Wholesale Office
              </span>
              <h2 className="text-2xl font-black text-[#222222] font-heading">
                We &apos;re Here to Help Your Business Grow
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Reach out for bulk price lists, custom logo printing, or direct factory dispatch details.
              </p>
            </div>

            <div className="space-y-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              
              {/* Call Number */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FDF7EA] text-[#C89A2B] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Call Contact</h4>
                  <a href={`tel:${siteConfig.phoneNumber.replace(/[^0-9+]/g, "")}`} className="text-sm font-bold text-[#222222] hover:text-[#C89A2B] mt-0.5 block">
                    {siteConfig.phoneNumber}
                  </a>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E8F9EE] text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">WhatsApp Contact</h4>
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello One Pack, I have an inquiry.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[#25D366] hover:underline mt-0.5 block"
                  >
                    {siteConfig.secondaryPhone || "+91 90199 66790"}
                  </a>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FDF7EA] text-[#C89A2B] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</h4>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm font-bold text-[#222222] hover:text-[#C89A2B] mt-0.5 block"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* GST TIN */}
              {siteConfig.gstin && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FDF7EA] text-[#C89A2B] flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">GST TIN</h4>
                    <p className="text-sm font-bold text-[#222222] mt-0.5">{siteConfig.gstin}</p>
                  </div>
                </div>
              )}

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FDF7EA] text-[#C89A2B] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Office & Warehouse Address</h4>
                  <p className="text-sm font-bold text-[#222222] mt-0.5">{siteConfig.address}</p>
                  <p className="text-xs text-gray-500">{siteConfig.cityState}</p>
                </div>
              </div>

              {/* Delivery Area */}
              {siteConfig.deliveryArea && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] text-emerald-700 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Delivery Coverage</h4>
                    <p className="text-xs font-bold text-emerald-800 mt-0.5">{siteConfig.deliveryArea}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FDF7EA] text-[#C89A2B] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Working Hours</h4>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{siteConfig.workingHours}</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-64 bg-gray-100">
              <iframe
                title="One Pack Kasaragod Location Map"
                src={siteConfig.googleMapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#222222] font-heading">
                Send a Bulk Enquiry
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Submitting this form opens WhatsApp directly with your pre-filled inquiry.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Mohammed Rasheed"
                    {...register("name")}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C89A2B] focus:bg-white transition-colors"
                  />
                </div>
                {errors.name && (
                  <p className="text-[11px] text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Grid: Phone & Business */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. +91 98765 43210"
                      {...register("phone")}
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C89A2B] focus:bg-white transition-colors"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                {/* Business Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Business / Restaurant Name *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Royal Cafe"
                      {...register("businessName")}
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C89A2B] focus:bg-white transition-colors"
                    />
                  </div>
                  {errors.businessName && (
                    <p className="text-[11px] text-red-500">{errors.businessName.message}</p>
                  )}
                </div>

              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  City / Location *
                </label>
                <div className="relative">
                  <CityIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Kasaragod, Mangalore, Kannur"
                    {...register("city")}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C89A2B] focus:bg-white transition-colors"
                  />
                </div>
                {errors.city && (
                  <p className="text-[11px] text-red-500">{errors.city.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Requirement Details (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Specify items, quantities, or custom printing requirements..."
                  {...register("message")}
                  className="w-full p-3.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C89A2B] focus:bg-white transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#C89A2B] hover:bg-[#B38822] text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                SEND ENQUIRY ON WHATSAPP
              </button>

            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
