"use client";
import { useEffect, useState } from "react";
import { reviews as fallbackReviews } from "@/lib/data";

type Review = {
  author: string;
  rating: number;
  text: string;
  when: string;
  avatar: string;
};

type PlacesData = {
  rating: number;
  total: number;
  reviews: Review[];
};

function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i <= count ? "#FFB703" : "#333"}>
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, isFallback }: { review: Review | (typeof fallbackReviews)[number]; isFallback: boolean }) {
  if (isFallback) {
    const r = review as (typeof fallbackReviews)[number];
    return (
      <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: "#222", border: "1px solid #2a2a2a" }}>
        <Stars count={r.rating} />
        <p className="text-sm leading-relaxed" style={{ color: "#bbb" }}>&ldquo;{r.text}&rdquo;</p>
        <div className="flex items-center gap-3 mt-auto">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "#E63946", color: "#fff" }}>
            {r.avatar}
          </div>
          <span className="text-sm font-semibold" style={{ color: "#F5F5F5" }}>{r.name}</span>
        </div>
      </div>
    );
  }

  const r = review as Review;
  const initials = r.author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: "#222", border: "1px solid #2a2a2a" }}>
      <Stars count={r.rating} />
      <p className="text-sm leading-relaxed line-clamp-4" style={{ color: "#bbb" }}>&ldquo;{r.text}&rdquo;</p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          {r.avatar ? (
            <img src={r.avatar} alt={r.author} className="w-9 h-9 rounded-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "#E63946", color: "#fff" }}>
              {initials}
            </div>
          )}
          <span className="text-sm font-semibold" style={{ color: "#F5F5F5" }}>{r.author}</span>
        </div>
        <span className="text-xs" style={{ color: "#555" }}>{r.when}</span>
      </div>
    </div>
  );
}

export default function Reviews() {
  const [data, setData] = useState<PlacesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => { if (d.reviews?.length) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const useFallback = !data;
  const rating = data?.rating ?? 4.9;
  const total = data?.total ?? 347;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-14">
        <p className="text-sm font-bold tracking-[0.3em] uppercase mb-2" style={{ color: "#E63946" }}>
          What People Say
        </p>
        <h2 className="font-bebas text-5xl md:text-6xl" style={{ color: "#F5F5F5" }}>
          Google Reviews
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Stars count={5} size={20} />
          <span className="ml-2 font-bold" style={{ color: "#FFB703" }}>{rating.toFixed(1)}</span>
          <span className="text-sm ml-1" style={{ color: "#666" }}>({total.toLocaleString()} reviews)</span>
          {data && (
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
              Live
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl h-48 animate-pulse" style={{ background: "#222" }} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useFallback
            ? fallbackReviews.map((r) => <ReviewCard key={r.name} review={r} isFallback />)
            : data!.reviews.slice(0, 4).map((r) => <ReviewCard key={r.author + r.text} review={r} isFallback={false} />)
          }
        </div>
      )}

      <div className="text-center mt-10">
        <a
          href="https://maps.app.goo.gl/DPYmr47WeLbjpN7a8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
          style={{ color: "#FFB703" }}
        >
          See all reviews on Google Maps
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
