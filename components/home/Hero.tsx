"use client";
import Link from "next/link";

interface HeroProps {
  title?: string;
  subtitle?: string;
  cta1?: string;
  cta2?: string;
}

export default function Hero({ title = "Charcoal Chicken", subtitle, cta1 = "Order Now", cta2 = "See the Menu" }: HeroProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #1a0d00 50%, #1A1A1A 100%)" }} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "#E63946" }} />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "#FFB703" }} />

      <div className="absolute inset-0">
        <img src="/images/CharcoalChicken_Hero.jpg" alt="Charcoal Chicken Mediterranean spread"
          className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1A1A1A 0%, transparent 60%)" }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-sm font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#FFB703" }}>
          Halal Mediterranean · New York City
        </p>
        <h1 className="font-bebas text-7xl md:text-9xl leading-none mb-6" style={{ color: "#F5F5F5" }}>
          {title.includes(" ") ? (
            <>
              {title.split(" ")[0]}
              <br />
              <span style={{ color: "#E63946" }}>{title.split(" ").slice(1).join(" ")}</span>
            </>
          ) : (
            <span style={{ color: "#F5F5F5" }}>{title}</span>
          )}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto" style={{ color: "#bbb" }}>{subtitle}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/commander" className="px-8 py-4 rounded-full text-lg font-bold transition-all duration-200 hover:scale-105 hover:opacity-90"
            style={{ background: "#E63946", color: "#fff" }}>
            {cta1}
          </Link>
          <Link href="/menu" className="px-8 py-4 rounded-full text-lg font-bold border-2 transition-all duration-200 hover:scale-105"
            style={{ borderColor: "#FFB703", color: "#FFB703" }}>
            {cta2}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-20 right-8 w-16 h-16 rounded-full flex items-center justify-center text-center hidden md:flex"
        style={{ background: "#E63946", border: "2px solid #FFB703" }}>
        <span className="text-white font-bold text-xs leading-tight">HALAL<br />CERT.</span>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-widest uppercase" style={{ color: "#555" }}>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 9l5 5 5-5" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
