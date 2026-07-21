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
  title: "One Pack | Premium Bio Disposable & Packaging Solutions Kanhangad",
  description: "One Source. Every Pack. Leading wholesale supplier of 100% biodegradable food packaging in Kanhangad, Kasaragod. We only sell bio products - No Plastic. Call: +91 99952 16808 | WhatsApp: +91 90199 66790. GSTIN: 32AALFB1621M1ZN.",
  keywords: ["one pack", "bio packaging Kanhangad", "food packaging Kasaragod", "eco disposable tableware", "paper plates wholesale", "wooden cutlery Kerala", "GSTIN 32AALFB1621M1ZN"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "One Pack | Premium Bio Disposable & Packaging Solutions",
    description: "One Source. Every Pack. We only sell bio products - No plastic. Delivery all over Kasaragod.",
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
              "description": "Premium bio disposable packaging solutions for restaurants, hotels, cafes, bakeries, juice shops, and caterers. We only sell bio products - No plastic.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3rd floor, Brothers Traders, Railway Station road",
                "addressLocality": "Kanhangad",
                "addressRegion": "Kerala",
                "postalCode": "671315",
                "addressCountry": "IN"
              },
              "telephone": "+919995216808",
              "vatID": "32AALFB1621M1ZN",
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
