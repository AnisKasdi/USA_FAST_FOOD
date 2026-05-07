"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ccpa_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("ccpa_consent", "accepted");
    setVisible(false);
    // Fire GA4 pageview now that consent is given
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", { analytics_storage: "granted" });
    }
  };

  const decline = () => {
    localStorage.setItem("ccpa_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      style={{ background: "rgba(17,17,17,0.97)", borderTop: "1px solid #2a2a2a" }}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex-1">
          <p className="font-bold text-sm mb-1" style={{ color: "#F5F5F5" }}>We value your privacy</p>
          <p className="text-xs leading-relaxed" style={{ color: "#888" }}>
            We use cookies to improve your experience and analyze traffic (Google Analytics).
            Under CCPA, you have the right to opt out of the sale of your personal information.{" "}
            <a href="/about" className="underline hover:text-white" style={{ color: "#FFB703" }}>Learn more</a>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={decline}
            className="px-5 py-2.5 rounded-full text-sm font-bold border transition-all hover:opacity-80"
            style={{ borderColor: "#333", color: "#888" }}>
            Decline
          </button>
          <button onClick={accept}
            className="px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:opacity-90"
            style={{ background: "#E63946", color: "#fff" }}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
