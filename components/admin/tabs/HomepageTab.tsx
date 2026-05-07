"use client";
import type { SiteConfig } from "@/lib/adminData";
import type { MenuItem } from "@/lib/data";

export default function HomepageTab({
  config,
  setConfig,
  menu,
}: {
  config: SiteConfig;
  setConfig: (c: SiteConfig) => void;
  menu: MenuItem[];
}) {
  const set = (k: keyof SiteConfig, v: unknown) => setConfig({ ...config, [k]: v });

  const toggleFeatured = (id: string) => {
    const ids = config.featuredItemIds;
    if (ids.includes(id)) {
      set("featuredItemIds", ids.filter((i) => i !== id));
    } else if (ids.length < 3) {
      set("featuredItemIds", [...ids, id]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-bebas text-4xl mb-1" style={{ color: "#F5F5F5" }}>Homepage</h1>
        <p className="text-sm" style={{ color: "#555" }}>Changes are live immediately on save.</p>
      </div>

      {/* Announcement Bar */}
      <Section title="Announcement Bar">
        <div className="flex items-center gap-4 mb-4">
          <Toggle value={config.announcementEnabled} onChange={(v) => set("announcementEnabled", v)} />
          <span className="text-sm" style={{ color: config.announcementEnabled ? "#F5F5F5" : "#555" }}>
            {config.announcementEnabled ? "Visible on site" : "Hidden"}
          </span>
        </div>
        <Input
          label="Announcement text"
          value={config.announcementBar}
          onChange={(v) => set("announcementBar", v)}
          placeholder="Now open for catering — contact us for group bookings"
        />
        {config.announcementEnabled && (
          <div className="mt-3 rounded-xl px-4 py-3 text-sm text-center" style={{ background: "#E63946", color: "#fff" }}>
            Preview: {config.announcementBar}
          </div>
        )}
      </Section>

      {/* Hero */}
      <Section title="Hero Section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Main title" value={config.heroTitle} onChange={(v) => set("heroTitle", v)} />
          <Input label="CTA Button 1" value={config.heroCta1} onChange={(v) => set("heroCta1", v)} />
          <Input label="CTA Button 2" value={config.heroCta2} onChange={(v) => set("heroCta2", v)} />
        </div>
        <div className="mt-4">
          <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: "#555" }}>Subtitle</label>
          <textarea
            rows={3}
            value={config.heroSubtitle}
            onChange={(e) => set("heroSubtitle", e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
            style={{ background: "#1a1a1a", color: "#F5F5F5", border: "1px solid #2a2a2a" }}
          />
        </div>

        {/* Live preview */}
        <div className="mt-4 rounded-2xl p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A1A1A, #2d0a0f)" }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#FFB703" }}>Preview</p>
          <p className="font-bebas text-4xl mb-2" style={{ color: "#F5F5F5" }}>{config.heroTitle || "—"}</p>
          <p className="text-sm mb-4" style={{ color: "#888" }}>{config.heroSubtitle}</p>
          <div className="flex gap-3">
            <span className="px-5 py-2 rounded-full text-sm font-bold" style={{ background: "#E63946", color: "#fff" }}>{config.heroCta1}</span>
            <span className="px-5 py-2 rounded-full text-sm font-bold border" style={{ borderColor: "#FFB703", color: "#FFB703" }}>{config.heroCta2}</span>
          </div>
        </div>
      </Section>

      {/* Bestsellers / Featured */}
      <Section title="Featured Items (max 3)">
        <p className="text-sm mb-4" style={{ color: "#666" }}>
          These appear in the homepage Bestsellers section.
          {config.featuredItemIds.length === 3 && " Deselect one to change."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {menu.filter(m => m.category === "Specials").map((item) => {
            const selected = config.featuredItemIds.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleFeatured(item.id)}
                disabled={!selected && config.featuredItemIds.length >= 3}
                className="flex items-center gap-3 rounded-xl p-3 text-left transition-all"
                style={{
                  background: selected ? "rgba(230,57,70,0.15)" : "#1a1a1a",
                  border: `1px solid ${selected ? "#E63946" : "#2a2a2a"}`,
                  opacity: !selected && config.featuredItemIds.length >= 3 ? 0.4 : 1,
                  cursor: !selected && config.featuredItemIds.length >= 3 ? "not-allowed" : "pointer",
                }}
              >
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div>
                  <p className="text-sm font-semibold" style={{ color: selected ? "#F5F5F5" : "#888" }}>{item.name}</p>
                  <p className="text-xs" style={{ color: selected ? "#E63946" : "#555" }}>${item.price.toFixed(2)}</p>
                </div>
                {selected && <svg className="ml-auto shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-7" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </button>
            );
          })}
        </div>
      </Section>

      <SaveButton />
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
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
        style={{ background: "#111", color: "#F5F5F5", border: "1px solid #2a2a2a" }}
      />
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-12 h-6 rounded-full transition-all duration-300"
      style={{ background: value ? "#E63946" : "#333" }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300"
        style={{ background: "#fff", left: value ? "calc(100% - 22px)" : "2px" }}
      />
    </button>
  );
}

function SaveButton() {
  return (
    <button
      className="w-full py-4 rounded-xl font-bold uppercase tracking-wide transition-all hover:opacity-90"
      style={{ background: "#E63946", color: "#fff" }}
      onClick={() => alert("Changes saved!")}
    >
      Save Changes
    </button>
  );
}
