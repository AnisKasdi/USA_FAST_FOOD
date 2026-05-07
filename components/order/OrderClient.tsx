"use client";
import { useState, useEffect } from "react";
import { Check, Flame, Store, Truck, MapPin } from "lucide-react";
import type { MenuItem } from "@/lib/data";
import Link from "next/link";

type CartItem = MenuItem & { qty: number };

const DELIVERY_ZONES = ["Midtown", "Chelsea", "Flatiron", "Greenwich Village", "Hoboken"];

export default function OrderClient() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "placed" | "preparing" | "ready">("idle");

  useEffect(() => {
    fetch("/api/menu").then(r => r.json()).then(setItems).catch(() => {});
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(c => c.id !== id));
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  const placeOrder = async () => {
    setStatus("placed");
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: mode,
          customer: customerName.trim() || "Guest",
          phone: phone || undefined,
          address: mode === "delivery" ? address : undefined,
          items: cart.map(c => ({ menuItemId: c.id, quantity: c.qty, price: c.price, name: c.name })),
        }),
      });
    } catch { /* UI progresses even if DB write fails */ }
    setTimeout(() => setStatus("preparing"), 2000);
    setTimeout(() => setStatus("ready"), 6000);
  };

  if (status !== "idle") {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="flex items-center justify-center w-24 h-24 rounded-full mx-auto mb-6" style={{ background: "#222" }}>
          {status === "placed" && <Check size={40} strokeWidth={2} color="#FFB703" />}
          {status === "preparing" && <Flame size={40} strokeWidth={1.8} color="#E63946" />}
          {status === "ready" && <Check size={40} strokeWidth={2.5} color="#22c55e" />}
        </div>
        <h2 className="font-bebas text-4xl mb-3" style={{ color: "#F5F5F5" }}>
          {status === "placed" && "Order Received!"}
          {status === "preparing" && "Being Prepared..."}
          {status === "ready" && "Ready for Pickup!"}
        </h2>
        <p style={{ color: "#888" }}>
          {status === "placed" && "We've got your order. Give us a moment..."}
          {status === "preparing" && "Our team is grilling your order right now."}
          {status === "ready" && "Your order is ready. Come grab it!"}
        </p>
        <div className="flex items-center justify-center gap-2 mt-10">
          {[{ key: "placed", label: "Placed" }, { key: "preparing", label: "Preparing" }, { key: "ready", label: "Ready" }].map((step, i, arr) => {
            const statuses = ["placed", "preparing", "ready"];
            const currentIdx = statuses.indexOf(status);
            const stepIdx = statuses.indexOf(step.key);
            const done = stepIdx <= currentIdx;
            return (
              <div key={step.key} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500"
                    style={{ background: done ? "#E63946" : "#2a2a2a", color: done ? "#fff" : "#555" }}>
                    {stepIdx < currentIdx ? <Check size={16} strokeWidth={2.5} /> : i + 1}
                  </div>
                  <span className="text-xs" style={{ color: done ? "#F5F5F5" : "#555" }}>{step.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-12 h-0.5 mb-5 transition-all duration-500"
                    style={{ background: stepIdx < currentIdx ? "#E63946" : "#2a2a2a" }} />
                )}
              </div>
            );
          })}
        </div>
        {status === "ready" && (
          <button className="mt-10 px-8 py-3 rounded-full font-bold" style={{ background: "#E63946", color: "#fff" }}
            onClick={() => { setCart([]); setStatus("idle"); setCustomerName(""); setPhone(""); setAddress(""); }}>
            New Order
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 flex flex-col gap-8">
        <div className="flex gap-3">
          {(["pickup", "delivery"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className="flex-1 py-4 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all"
              style={{ background: mode === m ? "#E63946" : "#222", color: mode === m ? "#fff" : "#888", border: mode === m ? "none" : "1px solid #333" }}>
              <span className="flex items-center justify-center gap-2">
                {m === "pickup" ? <><Store size={15} strokeWidth={2} /> Click &amp; Collect</> : <><Truck size={15} strokeWidth={2} /> Delivery</>}
              </span>
            </button>
          ))}
        </div>

        {mode === "delivery" && (
          <div className="rounded-2xl p-5" style={{ background: "#222", border: "1px solid #2a2a2a" }}>
            <p className="font-bold mb-3" style={{ color: "#F5F5F5" }}>Delivery Zones</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {DELIVERY_ZONES.map(z => (
                <span key={z} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm" style={{ background: "#2d2d2d", color: "#aaa" }}>
                  <MapPin size={11} strokeWidth={2} style={{ color: "#E63946" }} /> {z}
                </span>
              ))}
            </div>
            <p className="text-sm" style={{ color: "#555" }}>Also available on DoorDash &amp; Uber Eats</p>
            <div className="flex gap-3 mt-3">
              <a href="#" className="px-4 py-2 rounded-xl text-sm font-bold" style={{ background: "#FF3008", color: "#fff" }}>DoorDash</a>
              <a href="#" className="px-4 py-2 rounded-xl text-sm font-bold" style={{ background: "#06C167", color: "#fff" }}>Uber Eats</a>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {items.length === 0 ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 rounded-2xl animate-pulse" style={{ background: "#222" }} />
            ))
          ) : (
            items.map(item => (
              <div key={item.id} className="flex items-center gap-4 rounded-2xl p-4" style={{ background: "#222", border: "1px solid #2a2a2a" }}>
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bebas text-xl" style={{ color: "#F5F5F5" }}>{item.name}</h3>
                    {item.isNew && <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#FFB703", color: "#1A1A1A" }}>NEW</span>}
                  </div>
                  <p className="text-xs truncate" style={{ color: "#666" }}>{item.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold" style={{ color: "#FFB703" }}>${item.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(item)}
                    className="w-9 h-9 rounded-full font-bold text-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "#E63946", color: "#fff" }}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-3xl p-6" style={{ background: "#222", border: "1px solid #2a2a2a" }}>
          <h2 className="font-bebas text-3xl mb-6" style={{ color: "#F5F5F5" }}>Your Order</h2>

          {cart.length === 0 ? (
            <p className="text-center py-10 text-sm" style={{ color: "#555" }}>Add items to get started</p>
          ) : (
            <div className="flex flex-col gap-3 mb-6">
              {cart.map(c => (
                <div key={c.id} className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: "#F5F5F5" }}>{c.name}</p>
                    <p className="text-xs" style={{ color: "#666" }}>x{c.qty} · ${(c.price * c.qty).toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeFromCart(c.id)} className="text-xs px-2 py-1 rounded-lg"
                    style={{ background: "#2d2d2d", color: "#E63946" }}>Remove</button>
                </div>
              ))}
            </div>
          )}

          <div className="border-t pt-4 mt-2 flex flex-col gap-3" style={{ borderColor: "#2a2a2a" }}>
            <div className="flex justify-between text-sm" style={{ color: "#888" }}>
              <span>Subtotal</span><span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm" style={{ color: "#888" }}>
              <span>Tax (9.5%)</span><span>${(total * 0.095).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-1" style={{ color: "#F5F5F5" }}>
              <span>Total</span><span style={{ color: "#FFB703" }}>${(total * 1.095).toFixed(2)}</span>
            </div>

            <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)}
              placeholder="Your name" className="mt-3 w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "#2d2d2d", color: "#F5F5F5", border: "1px solid #333" }} />

            {mode === "delivery" && (
              <>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="Phone number" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#2d2d2d", color: "#F5F5F5", border: "1px solid #333" }} />
                <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                  placeholder="Delivery address" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#2d2d2d", color: "#F5F5F5", border: "1px solid #333" }} />
              </>
            )}

            <button onClick={placeOrder} disabled={cart.length === 0}
              className="mt-3 w-full py-4 rounded-full font-bold text-sm uppercase tracking-wide transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "#E63946", color: "#fff" }}>
              Place Order
            </button>
            <p className="text-xs text-center" style={{ color: "#555" }}>Payment collected at pickup</p>
          </div>
        </div>
      </div>
    </div>
  );
}
