"use client";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { menuItems, type MenuItem } from "@/lib/data";

const categories = ["All", "Specials", "Wraps & Pitas", "Combos", "Salads", "Sides", "Desserts"] as const;

const allergenColors: Record<string, string> = {
  Gluten: "#b45309",
  Dairy: "#1d4ed8",
  Eggs: "#ca8a04",
  Nuts: "#166534",
  Sesame: "#6b21a8",
  Fish: "#0e7490",
};

function AllergenBadge({ name }: { name: string }) {
  const color = allergenColors[name] ?? "#555";
  return (
    <span
      className="text-xs px-2 py-0.5 rounded font-semibold"
      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
      title={name}
    >
      {name}
    </span>
  );
}

export default function MenuClient() {
  const [active, setActive] = useState<string>("All");
  const [zoom, setZoom] = useState<MenuItem | null>(null);

  const filtered = active === "All" ? menuItems : menuItems.filter((m) => m.category === active);

  return (
    <>
      {/* Halal badge */}
      <div className="flex items-center gap-3 mb-8">
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
          style={{ background: "#E63946", color: "#fff" }}
        >
          <ShieldCheck size={15} strokeWidth={2.5} />
          100% Halal Certified
        </span>
        <span className="text-sm" style={{ color: "#666" }}>All our meat is hand-slaughtered and halal</span>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
            style={{
              background: active === cat ? "#E63946" : "#222",
              color: active === cat ? "#fff" : "#888",
              border: active === cat ? "none" : "1px solid #333",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            style={{ background: "#222", border: "1px solid #2a2a2a" }}
            onClick={() => setZoom(item)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {item.isNew && (
                <span
                  className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: "#FFB703", color: "#1A1A1A" }}
                >
                  NEW
                </span>
              )}
              <span
                className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
                style={{ background: "rgba(0,0,0,0.65)", color: "#E63946" }}
              >
                <ShieldCheck size={11} strokeWidth={2.5} /> HALAL
              </span>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-bebas text-xl" style={{ color: "#F5F5F5" }}>{item.name}</h3>
                <span className="font-bold text-sm ml-2 shrink-0" style={{ color: "#FFB703" }}>${item.price.toFixed(2)}</span>
              </div>
              <p className="text-xs mb-3 line-clamp-2" style={{ color: "#777" }}>{item.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.allergens.map((a) => (
                    <AllergenBadge key={a} name={a} />
                  ))}
                </div>
                <span className="text-xs ml-2 shrink-0" style={{ color: "#555" }}>{item.calories} cal</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Zoom modal */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setZoom(null)}
        >
          <div
            className="rounded-3xl overflow-hidden max-w-lg w-full relative"
            style={{ background: "#222" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={zoom.image} alt={zoom.name} className="w-full h-72 object-cover" />
            <button
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center font-bold"
              style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}
              onClick={() => setZoom(null)}
            >
              ×
            </button>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-bebas text-3xl" style={{ color: "#F5F5F5" }}>{zoom.name}</h2>
                {zoom.isNew && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#FFB703", color: "#1A1A1A" }}>NEW</span>
                )}
              </div>
              <p className="mb-4" style={{ color: "#999" }}>{zoom.description}</p>

              <div className="flex items-center gap-4 mb-6 text-sm" style={{ color: "#666" }}>
                <span>{zoom.calories} cal</span>
                <span>{zoom.category}</span>
                <span className="inline-flex items-center gap-1 font-semibold" style={{ color: "#E63946" }}>
                  <ShieldCheck size={13} strokeWidth={2.5} /> Halal
                </span>
              </div>

              {zoom.allergens.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#555" }}>Allergens</p>
                  <div className="flex gap-2 flex-wrap">
                    {zoom.allergens.map((a) => (
                      <AllergenBadge key={a} name={a} />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="font-bebas text-3xl" style={{ color: "#FFB703" }}>${zoom.price.toFixed(2)}</span>
                <a
                  href="/commander"
                  className="px-6 py-3 rounded-full font-bold transition-all hover:opacity-90"
                  style={{ background: "#E63946", color: "#fff" }}
                >
                  Add to Order
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
