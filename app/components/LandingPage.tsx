import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { SolutionsSection } from "./SolutionsSection";
import { AboutSection } from "./AboutSection";
import { PricingSection } from "./PricingSection";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div className="relative min-h-screen font-['Inter',sans-serif]">
      <Navbar />
      <HeroSection />
      <SolutionsSection />
      <AboutSection />
      <PricingSection />
      <Footer />
    </div>
  );
}