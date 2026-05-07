import { Flame, ShieldCheck, UtensilsCrossed } from "lucide-react";

const values = [
  {
    icon: <Flame size={28} strokeWidth={1.8} color="#E63946" />,
    title: "Real Charcoal",
    text: "Every dish is grilled over authentic charcoal — no shortcuts. The smoke flavor is our signature and it cannot be replicated.",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.8} color="#E63946" />,
    title: "Halal Certified",
    text: "We are fully halal certified. Every cut of meat is hand-slaughtered and verified. Our community deserves nothing less.",
  },
  {
    icon: <UtensilsCrossed size={28} strokeWidth={1.8} color="#E63946" />,
    title: "Catering for All",
    text: "From intimate family gatherings to large corporate events, we bring the same quality charcoal grill experience to your door.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="relative h-80 overflow-hidden">
        <img src="/images/CharcoalChicken_Hero.jpg" alt="Charcoal Chicken spread" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(to top, #1A1A1A 0%, transparent 80%)" }}>
          <div className="text-center">
            <p className="text-sm font-bold tracking-[0.3em] uppercase mb-2" style={{ color: "#E63946" }}>Our Story</p>
            <h1 className="font-bebas text-6xl md:text-8xl" style={{ color: "#F5F5F5" }}>Built on Fire & Flavor</h1>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-xl leading-relaxed" style={{ color: "#bbb" }}>
          Charcoal Chicken is a halal Mediterranean restaurant in the heart of New York City.
          We grill every piece of chicken, every kofta, every shawarma over real charcoal —
          because that&apos;s the only way to get the flavor right.
          Fast, casual, and catering for all occasions.
        </p>
      </div>

      {/* Values */}
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-bebas text-5xl text-center mb-12" style={{ color: "#F5F5F5" }}>What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl p-6" style={{ background: "#222", border: "1px solid #2a2a2a" }}>
              <div className="mb-4">{v.icon}</div>
              <h3 className="font-bebas text-2xl mb-2" style={{ color: "#FFB703" }}>{v.title}</h3>
              <p className="text-sm" style={{ color: "#888" }}>{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 pt-20 text-center">
        <p className="text-sm font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#E63946" }}>Catering</p>
        <h2 className="font-bebas text-5xl mb-4" style={{ color: "#F5F5F5" }}>Feeding a Crowd?</h2>
        <p className="mb-8" style={{ color: "#888" }}>
          We cater for all occasions — weddings, corporate events, family gatherings and more.
          Contact us to discuss your event.
        </p>
        <a href="/contact" className="inline-block px-8 py-4 rounded-full font-bold transition-all hover:scale-105" style={{ background: "#E63946", color: "#fff" }}>
          Get in Touch
        </a>
      </div>
    </div>
  );
}
