"use client";
import { useState } from "react";
import type { SiteConfig } from "@/lib/adminData";

export default function HoursContactTab({ config, onSave }: { config: SiteConfig; onSave: (c: SiteConfig) => Promise<void> }) {
  const [local, setLocal] = useState(config);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const set = (k: keyof SiteConfig, v: unknown) => setLocal(prev => ({ ...prev, [k]: v }));

  const updateHour = (i: number, field: string, value: string | boolean) => {
    const updated = local.hours.map((h, idx) => idx === i ? { ...h, [field]: value } : h);
    set("hours", updated);
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(local);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="font-bebas text-4xl mb-1" style={{ color: "#F5F5F5" }}>Hours & Contact</h1>
        <p className="text-sm" style={{ color: "#555" }}>Updates the contact page and footer.</p>
      </div>

      <div className="rounded-2xl p-6" style={{ background: "#1a1a1a", border: "1px solid #222" }}>
        <h2 className="font-bebas text-2xl mb-5" style={{ color: "#F5F5F5" }}>Contact Info</h2>
        <div className="flex flex-col gap-4">
          <Field label="Address">
            <input value={local.address} onChange={e => set("address", e.target.value)} style={inputStyle} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone">
              <input value={local.phone} onChange={e => set("phone", e.target.value)} placeholder="+12125550180" style={inputStyle} />
            </Field>
            <Field label="WhatsApp Number">
              <input value={local.whatsapp} onChange={e => set("whatsapp", e.target.value)} placeholder="+12125550180" style={inputStyle} />
            </Field>
          </div>
          <Field label="Instagram Handle">
            <input value={local.instagramHandle} onChange={e => set("instagramHandle", e.target.value)} placeholder="@charcoalchickennyc" style={inputStyle} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl p-6" style={{ background: "#1a1a1a", border: "1px solid #222" }}>
        <h2 className="font-bebas text-2xl mb-5" style={{ color: "#F5F5F5" }}>Opening Hours</h2>
        <div className="flex flex-col gap-3">
          {local.hours.map((h, i) => (
            <div key={h.day} className="flex items-center gap-4 py-2 border-b" style={{ borderColor: "#222" }}>
              <span className="w-24 text-sm font-semibold shrink-0" style={{ color: "#F5F5F5" }}>{h.day}</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative w-10 h-5 rounded-full transition-all" style={{ background: h.closed ? "#333" : "#E63946" }}
                  onClick={() => updateHour(i, "closed", !h.closed)}>
                  <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                    style={{ left: h.closed ? "2px" : "calc(100% - 18px)" }} />
                </div>
                <span className="text-xs" style={{ color: h.closed ? "#E63946" : "#06C167" }}>
                  {h.closed ? "Closed" : "Open"}
                </span>
              </label>
              {!h.closed && (
                <>
                  <input type="time" value={h.open} onChange={e => updateHour(i, "open", e.target.value)}
                    className="text-sm rounded-lg px-3 py-1.5 outline-none"
                    style={{ background: "#111", color: "#F5F5F5", border: "1px solid #2a2a2a" }} />
                  <span style={{ color: "#555" }}>→</span>
                  <input type="time" value={h.close} onChange={e => updateHour(i, "close", e.target.value)}
                    className="text-sm rounded-lg px-3 py-1.5 outline-none"
                    style={{ background: "#111", color: "#F5F5F5", border: "1px solid #2a2a2a" }} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} disabled={saving}
        className="py-4 rounded-xl font-bold uppercase tracking-wide transition-all"
        style={{ background: saved ? "#06C167" : saving ? "#555" : "#E63946", color: "#fff" }}>
        {saved ? "✓ Saved!" : saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

const inputStyle: React.CSSProperties = { background: "#111", color: "#F5F5F5", border: "1px solid #2a2a2a", borderRadius: "12px", padding: "10px 14px", width: "100%", fontSize: "14px", outline: "none" };
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: "#555" }}>{label}</label>{children}</div>;
}
