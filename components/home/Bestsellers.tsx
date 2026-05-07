import Link from "next/link";
import { bestsellers } from "@/lib/data";

export default function Bestsellers() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-sm font-bold tracking-[0.3em] uppercase mb-2" style={{ color: "#E63946" }}>
            Fan Favorites
          </p>
          <h2 className="font-bebas text-5xl md:text-6xl" style={{ color: "#F5F5F5" }}>
            Bestsellers
          </h2>
        </div>
        <Link href="/menu" className="text-sm font-semibold hover:underline" style={{ color: "#FFB703" }}>
          Full menu →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {bestsellers.map((item, i) => (
          <div
            key={item.id}
            className="group rounded-2xl overflow-hidden relative cursor-pointer transition-transform duration-300 hover:-translate-y-2"
            style={{ background: "#222" }}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #222 0%, transparent 50%)" }} />
              {item.isNew && (
                <span
                  className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: "#FFB703", color: "#1A1A1A" }}
                >
                  NEW
                </span>
              )}
              <span
                className="absolute top-3 right-3 font-bebas text-2xl"
                style={{ color: "#E63946" }}
              >
                #{i + 1}
              </span>
            </div>

            <div className="p-5">
              <h3 className="font-bebas text-2xl mb-1" style={{ color: "#F5F5F5" }}>{item.name}</h3>
              <p className="text-sm mb-4" style={{ color: "#888" }}>{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg" style={{ color: "#FFB703" }}>${item.price.toFixed(2)}</span>
                <Link
                  href="/commander"
                  className="text-sm font-bold px-4 py-2 rounded-full transition-all hover:opacity-90"
                  style={{ background: "#E63946", color: "#fff" }}
                >
                  Add to order
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
