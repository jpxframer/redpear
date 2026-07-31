import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { StorySection } from "@/components/about/StorySection";
import { BeliefsSection } from "@/components/about/BeliefsSection";
import { TeamSection } from "@/components/about/TeamSection";
import { ApproachSection } from "@/components/about/ApproachSection";
// Shared with the landing page: the About frame's section 5 is the same section,
// verbatim — same copy, same four cards, same geometry. Reused rather than forked.
import { WhySection } from "@/components/sections/WhySection";
import { PartnersSection } from "@/components/about/PartnersSection";
// Also shared: the About CTA band is the landing card with different wording.
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "About — RedPear",
  description:
    "RedPear Communications helps insurance organizations embrace digital transformation through intelligent platforms, AI-powered solutions, and customer-first experiences that drive measurable business impact.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <StorySection />
        <BeliefsSection />
        <TeamSection />
        <ApproachSection />
        <WhySection />
        <PartnersSection />
        <CtaSection
          title="Ready to Transform Your Insurance Operations?"
          body="Whether you're modernizing existing systems or building new digital experiences, RedPear is ready to help you take the next step."
        />
      </main>
      <Footer />
    </>
  );
}
