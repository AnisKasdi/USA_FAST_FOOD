import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Charcoal Chicken — Halal Mediterranean | New York",
  description: "Authentic charcoal-grilled shawarma, kofta & kebabs. 100% halal. Fast & casual dining and catering in New York City.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ background: "#1A1A1A", color: "#F5F5F5" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
