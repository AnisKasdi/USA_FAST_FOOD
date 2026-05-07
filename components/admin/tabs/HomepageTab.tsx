"use client";
import { useState } from "react";
import type { SiteConfig } from "@/lib/adminData";
import type { MenuItem } from "@/lib/data";

export default function HomepageTab({
  config, onSave, menu,
}: {
  config: SiteConfig; onSave: (c: SiteConfig) => Promise<void>; menu: MenuItem[];
}) {
  const [local, setLocal] = useState(config);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const set = (k: keyof SiteConfig, v: unknown) => setLocal(prev => ({ ...prev, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    await onSave(local);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleFeatured = (id: string) => {
    const ids = local.featuredItemIds;
    if (ids.includes(id)) set("featuredItemIds", ids.filter(i => i !== id));
    else if (ids.length < 3) set("featuredItemIds", [...ids, id]);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-bebas text-4xl mb-1" style={{ color: "#F5F5F5" }}>Homepage</h1>
        <p className="text-sm" style={{ color: "#555" }}>Changes are live immediately on save.</p>
      </div>

      <Section title="Announcement Bar">
        <div className="flex items-center gap-4 mb-4">
          <Toggle value={local.announcementEnabled} onChange={v => set("announcementEnabled", v)} />
          <span className="text-sm" style={{ color: local.announcementEnabled ? "#F5F5F5" : "#555" }}>
            {local.announcementEnabled ? "Visible on site" : "Hidden"}
          </span>
        </div>
        <Input label="Announcement text" value={local.announcementBar} onChange={v => set("announcementBar", v)}
          placeholder="Now open for catering — contact us for group bookings" />
        {local.announcementEnabled && (
          <div className="mt-3 rounded-xl px-4 py-3 text-sm text-center" style={{ background: "#E63946", color: "#fff" }}>
            Preview: {local.announcementBar}
          </div>
        )}
      </Section>

      <Section title="Hero Section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Main title" value={local.heroTitle} onChange={v => set("heroTitle", v)} />
          <Input label="CTA Button 1" value={local.heroCta1} onChange={v => set("heroCta1", v)} />
          <Input label="CTA Button 2" value={local.heroCta2} onChange={v => set("heroCta2", v)} />
        </div>
        <div className="mt-4">
          <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: "#555" }}>Subtitle</label>
          <textarea rows={3} value={local.heroSubtitle} onChange={e => set("heroSubtitle", e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
            style={{ background: "#1a1a1a", color: "#F5F5F5", border: "1px solid #2a2a2a" }} />
        </div>
        <div className="mt-4 rounded-2xl p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A1A1A, #2d0a0f)" }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#FFB703" }}>Preview</p>
          <p className="font-bebas text-4xl mb-2" style={{ color: "#F5F5F5" }}>{local.heroTitle || "—"}</p>
          <p className="text-sm mb-4" style={{ color: "#888" }}>{local.heroSubtitle}</p>
          <div className="flex gap-3">
            <span className="px-5 py-2 rounded-full text-sm font-bold" style={{ background: "#E63946", color: "#fff" }}>{local.heroCta1}</span>
            <span className="px-5 py-2 rounded-full text-sm font-bold border" style={{ borderColor: "#FFB703", color: "#FFB703" }}>{local.heroCta2}</span>
          </div>
        </div>
      </Section>

      <Section title="Featured Items (max 3)">
        <p className="text-sm mb-4" style={{ color: "#666" }}>
          Displayed in the homepage Bestsellers section.
          {local.featuredItemIds.length === 3 && " Deselect one to change."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {menu.filter((m: any) => m.available !== false).map(item => {
            const selected = local.featuredItemIds.includes(item.id);
            return (
              <button key={item.id} onClick={() => toggleFeatured(item.id)}
                disabled={!selected && local.featuredItemIds.length >= 3}
                className="flex items-center gap-3 rounded-xl p-3 text-left transition-all"
                style={{
                  background: selected ? "rgba(230,57,70,0.15)" : "#1a1a1a",
                  border: `1px solid ${selected ? "#E63946" : "#2a2a2a"}`,
                  opacity: !selected && local.featuredItemIds.length >= 3 ? 0.4 : 1,
                  cursor: !selected && local.featuredItemIds.length >= 3 ? "not-allowed" : "pointer",
                }}>
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div>
                  <p className="text-sm font-semibold" style={{ color: selected ? "#F5F5F5" : "#888" }}>{item.name}</p>
                  <p className="text-xs" style={{ color: selected ? "#E63946" : "#555" }}>${item.price.toFixed(2)}</p>
                </div>
                {selected && (
                  <svg className="ml-auto shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l4 4 6-7" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </Section>

      <button onClick={handleSave} disabled={saving}
        className="w-full py-4 rounded-xl font-bold uppercase tracking-wide transition-all"
        style={{ background: saved ? "#06C167" : saving ? "#555" : "#E63946", color: "#fff" }}>
        {saved ? "✓ Saved!" : saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: "#1a1a1a", border: "1px solid #222" }}>
      <h2 className="font-bebas text-2xl mb-5" style={{ color: "#F5F5F5" }}>{title}</h2>
      {children}
    </div>
  );
}
function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: "#555" }}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
        style={{ background: "#111", color: "#F5F5F5", border: "1px solid #2a2a2a" }} />
    </div>
  );
}
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)} className="relative w-12 h-6 rounded-full transition-all duration-300"
      style={{ background: value ? "#E63946" : "#333" }}>
      <span className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300"
        style={{ background: "#fff", left: value ? "calc(100% - 22px)" : "2px" }} />
    </button>
  );
}
