import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { CmsProvider } from "@/context/CmsContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap"
});

export const metadata: Metadata = {
  title: "One Pack | Premium Eco Disposable B2B Packaging Solutions",
  description: "One Source. Every Pack. Leading wholesale supplier of biodegradable food packaging, paper cups, bio plates, wooden cutlery, meal boxes, and carry bags in Kasaragod, Kerala.",
  keywords: ["one pack", "bio packaging", "food packaging Kasaragod", "eco disposable tableware", "paper plates wholesale", "wooden cutlery Kerala"],
  openGraph: {
    title: "One Pack | Premium Eco Disposable B2B Packaging",
    description: "One Source. Every Pack. Bio eco-friendly disposable packaging for restaurants, cafes, hotels & caterers.",
    url: "https://onepackonline.com",
    siteName: "One Pack Eco Packaging",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WholesaleStore",
              "name": "One Pack Eco Packaging",
              "image": "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8",
              "description": "Premium bio disposable packaging solutions for restaurants, hotels, cafes, bakeries, juice shops, and caterers.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "NH 66, Opp. Municipal Complex",
                "addressLocality": "Kasaragod",
                "addressRegion": "Kerala",
                "postalCode": "671121",
                "addressCountry": "IN"
              },
              "telephone": "+919995216808",
              "priceRange": "₹"
            })
          }}
        />
      </head>
      <body className="bg-white text-gray-800 flex flex-col min-h-screen">
        <CmsProvider>
          <Navbar />
          <main className="flex-1 pt-16 sm:pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CmsProvider>
      </body>
    </html>
  );
}
