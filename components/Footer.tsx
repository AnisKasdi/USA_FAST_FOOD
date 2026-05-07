import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-20" style={{ borderColor: "#2a2a2a", background: "#111" }}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <p className="font-bebas text-3xl mb-1" style={{ color: "#E63946" }}>
            Charcoal<span style={{ color: "#FFB703" }}> Chicken</span>
          </p>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#555" }}>Halal Mediterranean</p>
          <p className="text-sm" style={{ color: "#888" }}>
            Authentic charcoal-grilled Mediterranean cuisine. Halal certified. Fast & casual catering for all occasions.
          </p>
        </div>

        <div>
          <p className="font-bold mb-4 text-sm tracking-widest uppercase" style={{ color: "#FFB703" }}>Pages</p>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: "#aaa" }}>
            {[["Menu", "/menu"], ["Order", "/commander"], ["About", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-bold mb-4 text-sm tracking-widest uppercase" style={{ color: "#FFB703" }}>Hours</p>
          <ul className="flex flex-col gap-1 text-sm" style={{ color: "#aaa" }}>
            <li>Mon – Thu: 11am – 10pm</li>
            <li>Fri – Sat: 11am – 11pm</li>
            <li>Sunday: 12pm – 9pm</li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-4 text-sm tracking-widest uppercase" style={{ color: "#FFB703" }}>Find Us</p>
          <p className="text-sm" style={{ color: "#aaa" }}>
            15 W 29th St<br />New York, NY 10001<br /><br />
            <a href="tel:+12125550180" className="hover:text-white transition-colors">(212) 555-0180</a>
          </p>
          <p className="text-xs mt-3" style={{ color: "#555" }}>Halal Certified · Catering Available</p>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs" style={{ borderColor: "#2a2a2a", color: "#555" }}>
        © 2026 Charcoal Chicken. All rights reserved.
      </div>
    </footer>
  );
}
