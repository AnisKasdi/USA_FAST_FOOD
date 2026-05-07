"use client";
import { useEffect, useState } from "react";
import { Store, Truck, ArrowRight } from "lucide-react";

type Order = {
  id: string; customer: string;
  items: { name: string; quantity: number; price: number }[];
  total: number; status: string; type: string; createdAt: string;
  phone?: string; address?: string; notes?: string;
};

type Status = "pending" | "preparing" | "ready" | "completed" | "cancelled";

const statusColor: Record<string, string> = { pending: "#FFB703", preparing: "#E63946", ready: "#06C167", completed: "#555", cancelled: "#333" };
const statusBg: Record<string, string> = { pending: "rgba(255,183,3,0.15)", preparing: "rgba(230,57,70,0.15)", ready: "rgba(6,193,103,0.15)", completed: "#2a2a2a", cancelled: "#1e1e1e" };
const flow: Status[] = ["pending", "preparing", "ready", "completed"];

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [loading, setLoading] = useState(true);

  const load = () => fetch("/api/orders").then(r => r.json()).then(setOrders).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const advance = async (id: string, current: string) => {
    const idx = flow.indexOf(current as Status);
    if (idx < 0 || idx >= flow.length - 1) return;
    await fetch(`/api/orders/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: flow[idx + 1] }) });
    load();
  };

  const cancel = async (id: string) => {
    await fetch(`/api/orders/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "cancelled" }) });
    load();
  };

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);
  const revenue = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const counts: Record<string, number> = { all: orders.length, pending: 0, preparing: 0, ready: 0, completed: 0, cancelled: 0 };
  orders.forEach(o => { if (counts[o.status] !== undefined) counts[o.status]++; });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bebas text-4xl" style={{ color: "#F5F5F5" }}>Orders</h1>
          <p className="text-sm" style={{ color: "#555" }}>${revenue.toFixed(2)} total revenue</p>
        </div>
        <div className="flex gap-3">
          {[{ label: "Pending", s: "pending", color: "#FFB703" }, { label: "Cooking", s: "preparing", color: "#E63946" }, { label: "Ready", s: "ready", color: "#06C167" }].map(({ label, s, color }) => (
            <div key={s} className="text-center px-4 py-2 rounded-xl" style={{ background: `${color}18` }}>
              <p className="font-bebas text-2xl" style={{ color }}>{counts[s]}</p>
              <p className="text-xs" style={{ color: "#666" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["all", "pending", "preparing", "ready", "completed", "cancelled"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className="px-4 py-2 rounded-full text-sm font-bold capitalize transition-all"
            style={{ background: filter === s ? "#E63946" : "#1a1a1a", color: filter === s ? "#fff" : "#666", border: "1px solid #222" }}
          >
            {s} ({counts[s] ?? orders.length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-2xl h-48 animate-pulse" style={{ background: "#1a1a1a" }} />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((o) => {
            const idx = flow.indexOf(o.status as Status);
            const canAdvance = idx >= 0 && idx < flow.length - 1;
            return (
              <div key={o.id} className="rounded-2xl p-5" style={{ background: "#1a1a1a", border: "1px solid #222" }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs" style={{ color: "#555" }}>{o.id.slice(0, 8)}</span>
                      <span className="text-xs px-2 py-1 rounded-full inline-flex items-center gap-1.5" style={{ background: "#2a2a2a", color: "#aaa" }}>
                        {o.type === "pickup" ? <Store size={11} strokeWidth={2} /> : <Truck size={11} strokeWidth={2} />}
                        {o.type}
                      </span>
                      <span className="text-xs" style={{ color: "#555" }}>{new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                    <p className="font-semibold mb-1" style={{ color: "#F5F5F5" }}>{o.customer}</p>
                    {o.phone && <p className="text-xs mb-1" style={{ color: "#666" }}>{o.phone}</p>}
                    {o.address && <p className="text-xs mb-1" style={{ color: "#666" }}>{o.address}</p>}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {o.items.map((item, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-lg" style={{ background: "#2a2a2a", color: "#aaa" }}>
                          {item.quantity}× {item.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-bebas text-2xl" style={{ color: "#FFB703" }}>${o.total.toFixed(2)}</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full capitalize" style={{ background: statusBg[o.status], color: statusColor[o.status] }}>
                      {o.status}
                    </span>
                    <div className="flex gap-2">
                      {canAdvance && (
                        <button onClick={() => advance(o.id, o.status)}
                          className="text-xs px-3 py-1.5 rounded-lg font-bold inline-flex items-center gap-1"
                          style={{ background: "rgba(6,193,103,0.15)", color: "#06C167" }}
                        >
                          <ArrowRight size={11} strokeWidth={2.5} /> {flow[idx + 1]}
                        </button>
                      )}
                      {(o.status === "pending" || o.status === "preparing") && (
                        <button onClick={() => cancel(o.id)}
                          className="text-xs px-3 py-1.5 rounded-lg font-bold"
                          style={{ background: "rgba(230,57,70,0.15)", color: "#E63946" }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {o.status !== "cancelled" && (
                  <div className="mt-4 flex gap-1">
                    {flow.map((s, i) => (
                      <div key={s} className="h-1 flex-1 rounded-full transition-all duration-500" style={{ background: i <= idx ? "#E63946" : "#2a2a2a" }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: "#444" }}>
              <p className="font-bebas text-3xl mb-2">No orders</p>
              <p className="text-sm">Orders will appear here in real time.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
