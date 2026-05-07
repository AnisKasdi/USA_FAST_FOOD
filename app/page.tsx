import Hero from "@/components/home/Hero";
import Bestsellers from "@/components/home/Bestsellers";
import Countdown from "@/components/home/Countdown";
import Reviews from "@/components/home/Reviews";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />

      <Bestsellers />

      <Countdown />
      <Reviews />
      <CTABanner />
    </>
  );
}
