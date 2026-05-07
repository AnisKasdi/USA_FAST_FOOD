import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div
        className="rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        style={{ background: "#222" }}
      >
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "#FFB703" }}
        />
        <div className="relative z-10">
          <h2 className="font-bebas text-4xl md:text-6xl mb-3" style={{ color: "#F5F5F5" }}>
            Ready to Eat?
          </h2>
          <p style={{ color: "#888" }}>
            Click & Collect in 15 minutes or book a table for tonight.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <Link
            href="/commander"
            className="px-8 py-4 rounded-full font-bold text-center transition-all hover:scale-105"
            style={{ background: "#E63946", color: "#fff" }}
          >
            Order Online
          </Link>
          <Link
            href="/menu"
            className="px-8 py-4 rounded-full font-bold text-center border-2 transition-all hover:scale-105"
            style={{ borderColor: "#FFB703", color: "#FFB703" }}
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
