"use client";
import { useState } from "react";

export default function AdminGate({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        onLogin();
      } else {
        setError(true);
        setLoading(false);
      }
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#111" }}>
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-10">
          <p className="font-bebas text-xl leading-tight mb-1" style={{ color: "#E63946" }}>
            Charcoal<span style={{ color: "#FFB703" }}> Chicken</span>
          </p>
          <p className="text-sm" style={{ color: "#555" }}>Admin Dashboard</p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#555" }}>
              Password
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: "#1a1a1a",
                color: "#F5F5F5",
                border: `1px solid ${error ? "#E63946" : "#2a2a2a"}`,
              }}
              placeholder="Enter password"
              autoFocus
            />
            {error && <p className="text-xs mt-2" style={{ color: "#E63946" }}>Incorrect password.</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "#E63946", color: "#fff" }}
          >
            {loading ? "Checking..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
