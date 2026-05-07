import OrderClient from "@/components/order/OrderClient";

export default function OrderPage() {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <p className="text-sm font-bold tracking-[0.3em] uppercase mb-2" style={{ color: "#E63946" }}>
          Ready in 15 min
        </p>
        <h1 className="font-bebas text-6xl md:text-7xl" style={{ color: "#F5F5F5" }}>
          Order Online
        </h1>
      </div>
      <OrderClient />
    </div>
  );
}
