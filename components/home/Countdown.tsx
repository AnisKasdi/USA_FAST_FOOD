"use client";
import { useState, useEffect } from "react";

function getTimeUntil9pm() {
  const now = new Date();
  const target = new Date();
  target.setHours(21, 0, 0, 0);
  if (now >= target) target.setDate(target.getDate() + 1);
  const diff = target.getTime() - now.getTime();
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeUntil9pm());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeUntil9pm()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#E63946" }}>
      <div className="absolute inset-0 opacity-5">
        <div className="font-bebas text-[20rem] leading-none text-white select-none">HAPPY HOUR</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-sm font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
          Ends tonight at 9pm
        </p>
        <h2 className="font-bebas text-5xl md:text-6xl text-white mb-8">
          Happy Hour — 20% off Sides & Dips
        </h2>

        <div className="flex items-center justify-center gap-4 md:gap-8 mb-10">
          {[["HRS", pad(time.hours)], ["MIN", pad(time.minutes)], ["SEC", pad(time.seconds)]].map(([label, val]) => (
            <div key={label} className="text-center">
              <div
                className="font-bebas text-6xl md:text-8xl w-24 md:w-32 h-24 md:h-32 flex items-center justify-center rounded-2xl"
                style={{ background: "rgba(0,0,0,0.25)", color: "#FFB703" }}
              >
                {val}
              </div>
              <p className="text-xs font-bold tracking-widest mt-2 text-white opacity-70">{label}</p>
            </div>
          ))}
        </div>

        <a
          href="/commander"
          className="inline-block px-10 py-4 rounded-full text-lg font-bold transition-all hover:scale-105"
          style={{ background: "#FFB703", color: "#1A1A1A" }}
        >
          Order Before It&apos;s Gone
        </a>
      </div>
    </section>
  );
}
