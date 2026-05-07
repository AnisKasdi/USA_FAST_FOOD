import MenuClient from "@/components/menu/MenuClient";

export default function MenuPage() {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <p className="text-sm font-bold tracking-[0.3em] uppercase mb-2" style={{ color: "#E63946" }}>
          What We Serve
        </p>
        <h1 className="font-bebas text-6xl md:text-7xl" style={{ color: "#F5F5F5" }}>
          Our Menu
        </h1>
      </div>
      <MenuClient />
    </div>
  );
}
