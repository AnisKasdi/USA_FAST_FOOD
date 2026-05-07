import { LogOut } from "lucide-react";
import type { AdminTab } from "./AdminShell";
import { tabs } from "./AdminShell";

export default function AdminSidebar({
  active, onChange, onLogout,
}: {
  active: AdminTab;
  onChange: (t: AdminTab) => void;
  onLogout: () => void;
}) {
  return (
    <aside className="w-56 shrink-0 flex flex-col h-full" style={{ background: "#161616", borderRight: "1px solid #222" }}>
      <div className="px-5 py-6 border-b" style={{ borderColor: "#222" }}>
        <p className="font-bebas text-xl leading-tight" style={{ color: "#E63946" }}>
          Charcoal<span style={{ color: "#FFB703" }}> Chicken</span>
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#444" }}>Admin Panel</p>
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-0.5 px-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left w-full transition-all"
            style={{
              background: active === t.id ? "rgba(230,57,70,0.12)" : "transparent",
              color: active === t.id ? "#E63946" : "#666",
              borderLeft: active === t.id ? "2px solid #E63946" : "2px solid transparent",
            }}
          >
            <span style={{ color: active === t.id ? "#E63946" : "#444" }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t" style={{ borderColor: "#222" }}>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full transition-all hover:bg-red-900/10"
          style={{ color: "#444" }}
        >
          <LogOut size={16} strokeWidth={1.8} /> Log Out
        </button>
      </div>
    </aside>
  );
}
