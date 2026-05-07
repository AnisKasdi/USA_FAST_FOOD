"use client";
import { useState } from "react";
import type { SiteConfig } from "@/lib/adminData";

const categoryOptions = ["Specials", "Wraps & Pitas", "Combos", "Salads", "Sides", "Desserts"];

export default function HappyHourTab({ config, onSave }: { config: SiteConfig; onSave: (c: SiteConfig) => Promise<void> }) {
  const [local, setLocal] = useState(config);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const set = (k: keyof SiteConfig, v: unknown) => setLocal(prev => ({ ...prev, [k]: v }));

  const toggleCategory = (cat: string) => {
    const cats = local.happyHourCategories;
    set("happyHourCategories", cats.includes(cat) ? cats.filter(c => c !== cat) : [...cats, cat]);
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
        <h1 className="font-bebas text-4xl mb-1" style={{ color: "#F5F5F5" }}>Happy Hour</h1>
        <p className="text-sm" style={{ color: "#555" }}>Controls the countdown section and discount visibility on the homepage.</p>
      </div>

      <div className="rounded-2xl p-6 flex items-center justify-between" style={{ background: "#1a1a1a", border: "1px solid #222" }}>
        <div>
          <p className="font-semibold" style={{ color: "#F5F5F5" }}>Happy Hour Active</p>
          <p className="text-sm" style={{ color: "#555" }}>Shows the countdown on the homepage when enabled.</p>
        </div>
        <button onClick={() => set("happyHourEnabled", !local.happyHourEnabled)}
          className="relative w-14 h-7 rounded-full transition-all duration-300 shrink-0"
          style={{ background: local.happyHourEnabled ? "#E63946" : "#333" }}>
          <span className="absolute top-1 w-5 h-5 rounded-full transition-all duration-300"
            style={{ background: "#fff", left: local.happyHourEnabled ? "calc(100% - 24px)" : "4px" }} />
        </button>
      </div>

      {local.happyHourEnabled && (
        <>
          <div className="rounded-2xl p-6" style={{ background: "#1a1a1a", border: "1px solid #222" }}>
            <h2 className="font-bebas text-2xl mb-5" style={{ color: "#F5F5F5" }}>Time Window</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Start Time">
                <input type="time" value={local.happyHourStart} onChange={e => set("happyHourStart", e.target.value)} style={inputStyle} />
              </Field>
              <Field label="End Time">
                <input type="time" value={local.happyHourEnd} onChange={e => set("happyHourEnd", e.target.value)} style={inputStyle} />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{ background: "#1a1a1a", border: "1px solid #222" }}>
            <h2 className="font-bebas text-2xl mb-5" style={{ color: "#F5F5F5" }}>Discount</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Discount %">
                <div className="relative">
                  <input type="number" min="5" max="90" value={local.happyHourDiscount}
                    onChange={e => set("happyHourDiscount", parseInt(e.target.value))}
                    style={{ ...inputStyle, paddingRight: "40px" }} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#555" }}>%</span>
                </div>
              </Field>
              <Field label="Banner Label">
                <input value={local.happyHourLabel} onChange={e => set("happyHourLabel", e.target.value)} style={inputStyle} />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{ background: "#1a1a1a", border: "1px solid #222" }}>
            <h2 className="font-bebas text-2xl mb-2" style={{ color: "#F5F5F5" }}>Applies To</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {categoryOptions.map(cat => {
                const on = local.happyHourCategories.includes(cat);
                return (
                  <button key={cat} onClick={() => toggleCategory(cat)} className="px-5 py-2.5 rounded-full font-bold text-sm transition-all"
                    style={{ background: on ? "#E63946" : "#2a2a2a", color: on ? "#fff" : "#888", border: on ? "none" : "1px solid #333" }}>
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: "#E63946" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Homepage Preview</p>
            <p className="font-bebas text-3xl text-white mb-1">{local.happyHourLabel}</p>
            <p className="text-sm text-white opacity-80">{local.happyHourStart} – {local.happyHourEnd} · {local.happyHourDiscount}% off {local.happyHourCategories.join(", ")}</p>
          </div>
        </>
      )}

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
