"use client";
import { useState } from "react";
import type { MenuItem } from "@/lib/data";

const categories = ["Specials", "Wraps & Pitas", "Combos", "Salads", "Sides", "Desserts"] as const;
const allergenOptions = ["Gluten", "Dairy", "Eggs", "Nuts", "Soy", "Shellfish", "Sesame", "Fish"];

const emptyItem = (): Omit<MenuItem, "id"> => ({
  name: "", description: "", price: 0, category: "Specials",
  image: "/images/CharcoalChicken_Hero.jpg", calories: 0, allergens: [], isNew: false,
});

async function apiSave(id: string, data: Partial<MenuItem>) {
  const res = await fetch(`/api/menu/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function apiCreate(data: Omit<MenuItem, "id">) {
  const res = await fetch("/api/menu", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function apiDelete(id: string) {
  await fetch(`/api/menu/${id}`, { method: "DELETE" });
}

export default function MenuTab({ menu, setMenu }: { menu: MenuItem[]; setMenu: (m: MenuItem[]) => void }) {
  const [filter, setFilter] = useState<string>("All");
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Omit<MenuItem, "id">>(emptyItem());
  const [saving, setSaving] = useState(false);

  const visible = menu.filter((m: any) => m.available !== false);
  const hidden = menu.filter((m: any) => m.available === false);
  const filtered = (filter === "All" ? visible : visible.filter(m => m.category === filter));

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    const updated = await apiSave(editing.id, editing);
    setMenu(menu.map(m => m.id === editing.id ? { ...m, ...updated } : m));
    setEditing(null);
    setSaving(false);
  };

  const saveNew = async () => {
    setSaving(true);
    const created = await apiCreate(draft);
    setMenu([...menu, created]);
    setAdding(false);
    setDraft(emptyItem());
    setSaving(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Hide this item from the site?")) return;
    await apiDelete(id);
    setMenu(menu.map(m => m.id === id ? { ...m, available: false } as any : m));
  };

  const restoreItem = async (id: string) => {
    const updated = await apiSave(id, { available: true } as any);
    setMenu(menu.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const toggleNew = async (item: MenuItem) => {
    const updated = await apiSave(item.id, { isNew: !item.isNew });
    setMenu(menu.map(m => m.id === item.id ? { ...m, ...updated } : m));
  };

  const ItemForm = ({
    data, onChange, onSave, onCancel, title,
  }: {
    data: Partial<MenuItem>; onChange: (k: string, v: unknown) => void;
    onSave: () => void; onCancel: () => void; title: string;
  }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.85)" }}>
      <div className="rounded-3xl p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
        <h3 className="font-bebas text-3xl mb-6" style={{ color: "#F5F5F5" }}>{title}</h3>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name">
              <input value={data.name ?? ""} onChange={e => onChange("name", e.target.value)} style={fieldStyle} />
            </Field>
            <Field label="Category">
              <select value={data.category ?? "Specials"} onChange={e => onChange("category", e.target.value)} style={fieldStyle}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Description">
            <textarea rows={2} value={data.description ?? ""} onChange={e => onChange("description", e.target.value)}
              className="resize-none" style={{ ...fieldStyle, width: "100%" }} />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Price ($)">
              <input type="number" step="0.01" value={data.price ?? 0} onChange={e => onChange("price", parseFloat(e.target.value))} style={fieldStyle} />
            </Field>
            <Field label="Calories">
              <input type="number" value={data.calories ?? 0} onChange={e => onChange("calories", parseInt(e.target.value))} style={fieldStyle} />
            </Field>
            <Field label="Badge NEW">
              <div className="flex items-center h-full pt-1">
                <input type="checkbox" checked={!!data.isNew} onChange={e => onChange("isNew", e.target.checked)} className="w-5 h-5 accent-red-500" />
                <span className="ml-2 text-sm" style={{ color: "#888" }}>Show badge</span>
              </div>
            </Field>
          </div>
          <Field label="Photo URL">
            <input value={data.image ?? ""} onChange={e => onChange("image", e.target.value)} style={fieldStyle} />
          </Field>
          {data.image && <img src={data.image} alt="preview" className="w-full h-40 object-cover rounded-xl" />}
          <Field label="Allergens">
            <div className="flex flex-wrap gap-2 pt-1">
              {allergenOptions.map(a => {
                const selected = (data.allergens ?? []).includes(a);
                return (
                  <button key={a} type="button"
                    onClick={() => { const cur = data.allergens ?? []; onChange("allergens", selected ? cur.filter(x => x !== a) : [...cur, a]); }}
                    className="px-3 py-1 rounded-full text-sm transition-all"
                    style={{ background: selected ? "#E63946" : "#2a2a2a", color: selected ? "#fff" : "#888" }}>
                    {a}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>
        <div className="flex gap-3 mt-8">
          <button onClick={onSave} disabled={saving} className="flex-1 py-3 rounded-xl font-bold transition-all" style={{ background: saving ? "#555" : "#E63946", color: "#fff" }}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl font-bold" style={{ background: "#2a2a2a", color: "#888" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bebas text-4xl" style={{ color: "#F5F5F5" }}>Menu</h1>
          <p className="text-sm" style={{ color: "#555" }}>{visible.length} items visible · {hidden.length} hidden</p>
        </div>
        <button onClick={() => setAdding(true)} className="px-5 py-2.5 rounded-xl font-bold text-sm"
          style={{ background: "#E63946", color: "#fff" }}>
          + Add Item
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", ...categories].map(c => (
          <button key={c} onClick={() => setFilter(c)} className="px-4 py-2 rounded-full text-sm font-bold transition-all"
            style={{ background: filter === c ? "#E63946" : "#1a1a1a", color: filter === c ? "#fff" : "#666", border: "1px solid #222" }}>
            {c}
          </button>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #222" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "#1a1a1a", color: "#444" }}>
              {["Item", "Category", "Price", "Cal.", "NEW", "Allergens", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={item.id} style={{ background: i % 2 === 0 ? "#161616" : "#1a1a1a", borderTop: "1px solid #222" }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div>
                      <p className="font-semibold" style={{ color: "#F5F5F5" }}>{item.name}</p>
                      <p className="text-xs truncate max-w-[160px]" style={{ color: "#555" }}>{item.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: "#888" }}>{item.category}</td>
                <td className="px-4 py-3 font-bold" style={{ color: "#FFB703" }}>${item.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-xs" style={{ color: "#666" }}>{item.calories}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleNew(item)} className="text-xs font-bold px-2 py-1 rounded-full transition-all"
                    style={{ background: item.isNew ? "#FFB703" : "#2a2a2a", color: item.isNew ? "#1A1A1A" : "#555" }}>
                    {item.isNew ? "NEW" : "—"}
                  </button>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: "#666" }}>{item.allergens.join(", ") || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(item)} className="text-xs px-3 py-1.5 rounded-lg font-bold"
                      style={{ background: "rgba(255,183,3,0.15)", color: "#FFB703" }}>Edit</button>
                    <button onClick={() => deleteItem(item.id)} className="text-xs px-3 py-1.5 rounded-lg font-bold"
                      style={{ background: "rgba(230,57,70,0.15)", color: "#E63946" }}>Hide</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hidden.length > 0 && (
        <div className="rounded-2xl p-4" style={{ background: "#1a1a1a", border: "1px solid #222" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#444" }}>Hidden Items</p>
          <div className="flex flex-col gap-2">
            {hidden.map(item => (
              <div key={item.id} className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: "#111" }}>
                <span className="text-sm" style={{ color: "#555" }}>{item.name}</span>
                <button onClick={() => restoreItem(item.id)} className="text-xs px-3 py-1 rounded-lg font-bold"
                  style={{ background: "rgba(6,193,103,0.15)", color: "#06C167" }}>Restore</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {editing && (
        <ItemForm title="Edit Item" data={editing}
          onChange={(k, v) => setEditing({ ...editing, [k]: v })}
          onSave={saveEdit} onCancel={() => setEditing(null)} />
      )}
      {adding && (
        <ItemForm title="New Item" data={draft}
          onChange={(k, v) => setDraft({ ...draft, [k]: v } as Omit<MenuItem, "id">)}
          onSave={saveNew} onCancel={() => { setAdding(false); setDraft(emptyItem()); }} />
      )}
    </div>
  );
}

const fieldStyle: React.CSSProperties = {
  background: "#111", color: "#F5F5F5", border: "1px solid #2a2a2a",
  borderRadius: "12px", padding: "10px 14px", width: "100%", fontSize: "14px", outline: "none",
};
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: "#555" }}>{label}</label>
      {children}
    </div>
  );
}
