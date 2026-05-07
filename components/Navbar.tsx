"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/commander", label: "Order" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(26,26,26,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid #2a2a2a" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bebas text-2xl tracking-wider leading-tight" style={{ color: "#E63946" }}>
          Charcoal<span style={{ color: "#FFB703" }}> Chicken</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium tracking-wide transition-colors duration-200 hover:text-yellow-400"
                style={{ color: "#F5F5F5" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/commander"
          className="hidden md:block px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90 hover:scale-105"
          style={{ background: "#E63946", color: "#fff" }}
        >
          Order Now
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: "#F5F5F5", transform: open ? "rotate(45deg) translateY(8px)" : "" }} />
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: "#F5F5F5", opacity: open ? 0 : 1 }} />
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: "#F5F5F5", transform: open ? "rotate(-45deg) translateY(-8px)" : "" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4" style={{ background: "rgba(26,26,26,0.98)" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-lg font-medium py-2 border-b"
              style={{ color: "#F5F5F5", borderColor: "#2a2a2a" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/commander"
            className="mt-2 px-5 py-3 rounded-full text-center font-bold"
            style={{ background: "#E63946", color: "#fff" }}
            onClick={() => setOpen(false)}
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  );
}
