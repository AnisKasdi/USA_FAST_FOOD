import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  themeColor: "#E63946",
};

export const metadata: Metadata = {
  title: "Charcoal Chicken — Halal Mediterranean | New York",
  description: "Authentic charcoal-grilled shawarma, kofta & kebabs. 100% halal. Fast & casual dining and catering in New York City.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Charcoal Chicken" },
  openGraph: {
    title: "Charcoal Chicken — Halal Mediterranean | New York",
    description: "Authentic charcoal-grilled shawarma, kofta & kebabs. 100% halal.",
    type: "website",
    locale: "en_US",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Charcoal Chicken Halal Mediterranean",
  description: "Authentic charcoal-grilled shawarma, kofta & kebabs. 100% halal. Fast & casual dining and catering.",
  url: "https://charcoalchicken.com",
  telephone: "+12125550180",
  address: {
    "@type": "PostalAddress",
    streetAddress: "15 W 29th St",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10001",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 40.7455, longitude: -73.9877 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday"], opens: "11:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday","Saturday"], opens: "11:00", closes: "23:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "12:00", closes: "21:00" },
  ],
  servesCuisine: ["Mediterranean", "Halal", "Middle Eastern"],
  priceRange: "$$",
  hasMenu: "https://charcoalchicken.com/menu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', { analytics_storage: 'denied' });
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}</Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col" style={{ background: "#1A1A1A", color: "#F5F5F5" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
