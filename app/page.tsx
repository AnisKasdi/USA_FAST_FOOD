import Hero from "@/components/home/Hero";
import Bestsellers from "@/components/home/Bestsellers";
import Countdown from "@/components/home/Countdown";
import Reviews from "@/components/home/Reviews";
import CTABanner from "@/components/home/CTABanner";
import { getConfig, getMenuItems } from "@/lib/getConfig";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [config, allItems] = await Promise.all([getConfig(), getMenuItems()]);
  const featured = allItems.filter(m => config.featuredItemIds.includes(m.id));
  const bestsellers = featured.length >= 1 ? featured : allItems.slice(0, 3);

  return (
    <>
      {config.announcementEnabled && config.announcementBar && (
        <div className="fixed top-0 left-0 right-0 z-[60] py-2 text-center text-sm font-semibold"
          style={{ background: "#E63946", color: "#fff" }}>
          {config.announcementBar}
        </div>
      )}
      <Hero title={config.heroTitle} subtitle={config.heroSubtitle} cta1={config.heroCta1} cta2={config.heroCta2} />
      <Bestsellers items={bestsellers} />
      <Countdown enabled={config.happyHourEnabled} endTime={config.happyHourEnd} label={config.happyHourLabel} />
      <Reviews />
      <CTABanner />
    </>
  );
}
