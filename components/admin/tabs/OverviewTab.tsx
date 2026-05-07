"use client";
import { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, TrendingUp, Clock } from "lucide-react";

type Order = {
  id: string; customer: string; items: { name: string }[];
  total: number; status: string; type: string; createdAt: string;
};

const statusColor: Record<string, string> = {
  pending: "#FFB703", preparing: "#E63946", ready: "#06C167",
  completed: "#555", cancelled: "#333",
};
const statusBg: Record<string, string> = {
  pending: "rgba(255,183,3,0.15)", preparing: "rgba(230,57,70,0.15)",
  ready: "rgba(6,193,103,0.15)", completed: "#2a2a2a", cancelled: "#1e1e1e",
};

export default function OverviewTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders").then(r => r.json()).then(setOrders).finally(() => setLoading(false));
  }, []);

  const active = orders.filter(o => o.status !== "cancelled" && o.status !== "completed");
  const revenue = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const avgOrder = orders.length ? revenue / orders.filter(o => o.status !== "cancelled").length : 0;

  const kpis = [
    { label: "Revenue", value: `$${revenue.toFixed(2)}`, icon: <DollarSign size={16} strokeWidth={1.8} />, color: "#FFB703" },
    { label: "Total Orders", value: orders.length, icon: <ShoppingBag size={16} strokeWidth={1.8} />, color: "#E63946" },
    { label: "Active", value: active.length, icon: <Clock size={16} strokeWidth={1.8} />, color: "#06C167" },
    { label: "Avg. Order", value: `$${avgOrder.toFixed(2)}`, icon: <TrendingUp size={16} strokeWidth={1.8} />, color: "#a78bfa" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-bebas text-4xl mb-1" style={{ color: "#F5F5F5" }}>Dashboard</h1>
        <p className="text-sm" style={{ color: "#555" }}>Live data from the database</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl p-5" style={{ background: "#1a1a1a", border: "1px solid #222" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#444" }}>{kpi.label}</span>
              <span style={{ color: kpi.color }}>{kpi.icon}</span>
            </div>
            <p className="font-bebas text-4xl mb-1" style={{ color: kpi.color }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-bebas text-2xl mb-4" style={{ color: "#F5F5F5" }}>Recent Orders</h2>
        {loading ? (
          <div className="rounded-2xl h-32 animate-pulse" style={{ background: "#1a1a1a" }} />
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #222" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#1a1a1a", color: "#444" }}>
                  {["ID", "Customer", "Items", "Type", "Total", "Status"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((o, i) => (
                  <tr key={o.id} style={{ background: i % 2 === 0 ? "#161616" : "#1a1a1a", borderTop: "1px solid #222" }}>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: "#555" }}>{o.id.slice(0, 8)}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "#F5F5F5" }}>{o.customer}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#888" }}>{o.items.map(i => i.name).join(", ").slice(0, 40)}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ background: "#2a2a2a", color: "#aaa" }}>
                        {o.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold" style={{ color: "#FFB703" }}>${o.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-full capitalize" style={{ background: statusBg[o.status], color: statusColor[o.status] }}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
