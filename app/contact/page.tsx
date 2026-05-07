import { Phone, MessageCircle, MapPin, Car, Train, Bike, Accessibility } from "lucide-react";
import { getConfig } from "@/lib/getConfig";

export const dynamic = "force-dynamic";

function fmt24(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default async function ContactPage() {
  const config = await getConfig();
  const phone = config.phone || "+12125550180";
  const whatsapp = config.whatsapp || config.phone || "+12125550180";
  const address = config.address || "15 W 29th St, New York, NY 10001";
  const hours = config.hours;
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-6">
      <div className="mb-12">
        <p className="text-sm font-bold tracking-[0.3em] uppercase mb-2" style={{ color: "#E63946" }}>Get in Touch</p>
        <h1 className="font-bebas text-6xl md:text-7xl" style={{ color: "#F5F5F5" }}>Find Us</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl p-6" style={{ background: "#222", border: "1px solid #2a2a2a" }}>
            <h2 className="font-bebas text-2xl mb-4" style={{ color: "#FFB703" }}>Location</h2>
            <p className="text-lg mb-1" style={{ color: "#F5F5F5" }}>{address.split(",")[0]}</p>
            <p className="mb-4" style={{ color: "#888" }}>{address.split(",").slice(1).join(",").trim()}</p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={{ background: "#E63946", color: "#fff" }}>
                <Phone size={15} strokeWidth={2.5} /> Call Us
              </a>
              <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={{ background: "#25D366", color: "#fff" }}>
                <MessageCircle size={15} strokeWidth={2.5} /> WhatsApp
              </a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent("Charcoal Chicken Halal Mediterranean " + address)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={{ background: "#2d2d2d", color: "#F5F5F5", border: "1px solid #333" }}>
                <MapPin size={15} strokeWidth={2.5} /> Directions
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{ background: "#222", border: "1px solid #2a2a2a" }}>
            <h2 className="font-bebas text-2xl mb-4" style={{ color: "#FFB703" }}>Hours</h2>
            <table className="w-full text-sm">
              <tbody>
                {hours.map(({ day, open, close, closed }) => {
                  const isToday = day === today;
                  return (
                    <tr key={day} className="border-b"
                      style={{ borderColor: "#2a2a2a", background: isToday ? "rgba(230,57,70,0.08)" : "transparent" }}>
                      <td className="py-2.5 px-1 font-semibold" style={{ color: isToday ? "#E63946" : "#F5F5F5" }}>
                        <span className="flex items-center gap-2">
                          {isToday && <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ background: "#E63946" }} />}
                          {day}
                        </span>
                      </td>
                      <td className="py-2.5 text-right" style={{ color: "#888" }}>
                        {closed ? <span style={{ color: "#555" }}>Closed</span> : `${fmt24(open)} – ${fmt24(close)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl p-6" style={{ background: "#222", border: "1px solid #2a2a2a" }}>
            <h2 className="font-bebas text-2xl mb-3" style={{ color: "#FFB703" }}>Getting Here</h2>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: "#888" }}>
              {[
                { icon: <Train size={15} strokeWidth={1.8} />, text: "Subway N/R/W — 28th St Station (2 min walk)" },
                { icon: <Train size={15} strokeWidth={1.8} />, text: "Subway 1 — 28th St Station (3 min walk)" },
                { icon: <Car size={15} strokeWidth={1.8} />, text: "Parking garage on W 30th St" },
                { icon: <Bike size={15} strokeWidth={1.8} />, text: "Citi Bike station at 29th & Broadway" },
                { icon: <Accessibility size={15} strokeWidth={1.8} />, text: "Fully wheelchair accessible" },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span style={{ color: "#E63946" }}>{icon}</span>{text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #2a2a2a", minHeight: "500px" }}>
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent("Charcoal chicken halal Mediterranean restaurant, " + address)}&output=embed`}
            width="100%" height="100%"
            style={{ border: 0, minHeight: "500px" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>

      <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-50"
        style={{ background: "#25D366" }} aria-label="Chat on WhatsApp">
        <MessageCircle size={24} color="#fff" strokeWidth={2} />
      </a>
    </div>
  );
}
