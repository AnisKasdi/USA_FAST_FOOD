"use client";
import { useState } from "react";
import { LayoutDashboard, Home, UtensilsCrossed, Clock, ShoppingCart, MapPin } from "lucide-react";
import AdminGate from "./AdminGate";
import AdminSidebar from "./AdminSidebar";
import OverviewTab from "./tabs/OverviewTab";
import HomepageTab from "./tabs/HomepageTab";
import MenuTab from "./tabs/MenuTab";
import HappyHourTab from "./tabs/HappyHourTab";
import OrdersTab from "./tabs/OrdersTab";
import HoursContactTab from "./tabs/HoursContactTab";
import { defaultConfig, type SiteConfig } from "@/lib/adminData";
import { menuItems as initialItems, type MenuItem } from "@/lib/data";

export type AdminTab = "overview" | "homepage" | "menu" | "happyhour" | "orders" | "hourscontact";

export const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  { id: "overview",    label: "Overview",        icon: <LayoutDashboard size={16} strokeWidth={1.8} /> },
  { id: "homepage",    label: "Homepage",         icon: <Home size={16} strokeWidth={1.8} /> },
  { id: "menu",        label: "Menu",             icon: <UtensilsCrossed size={16} strokeWidth={1.8} /> },
  { id: "happyhour",   label: "Happy Hour",       icon: <Clock size={16} strokeWidth={1.8} /> },
  { id: "orders",      label: "Orders",           icon: <ShoppingCart size={16} strokeWidth={1.8} /> },
  { id: "hourscontact",label: "Hours & Contact",  icon: <MapPin size={16} strokeWidth={1.8} /> },
];

export default function AdminShell() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<AdminTab>("overview");
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [menu, setMenu] = useState<MenuItem[]>(initialItems);

  if (!authed) return <AdminGate onLogin={() => setAuthed(true)} />;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#111", color: "#F5F5F5" }}>
      <AdminSidebar active={tab} onChange={setTab} onLogout={() => setAuthed(false)} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {tab === "overview"     && <OverviewTab />}
          {tab === "homepage"     && <HomepageTab config={config} setConfig={setConfig} menu={menu} />}
          {tab === "menu"         && <MenuTab menu={menu} setMenu={setMenu} />}
          {tab === "happyhour"    && <HappyHourTab config={config} setConfig={setConfig} />}
          {tab === "orders"       && <OrdersTab />}
          {tab === "hourscontact" && <HoursContactTab config={config} setConfig={setConfig} />}
        </div>
      </main>
    </div>
  );
}
