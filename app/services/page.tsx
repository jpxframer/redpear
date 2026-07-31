import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { FaqSection } from "@/components/services/FaqSection";
// Shared with other pages. "How We Work" is the About page's Approach section
// with its own heading and two reworded steps; Why and the CTA are verbatim
// reuses (the CTA takes the same copy the About page passes).
import { ApproachSection } from "@/components/about/ApproachSection";
import { WhySection } from "@/components/sections/WhySection";
import { CtaSection } from "@/components/sections/CtaSection";

const howWeWork = [
  {
    number: "01",
    title: "Discover",
    body: "We map your current claims flow, distribution channels, and the systems Maya needs to plug into.",
  },
  {
    number: "02",
    title: "Design",
    body: "We design the conversation flows and dashboard views around how your team actually operates, not a generic template.",
  },
  {
    number: "03",
    title: "Build",
    body: "We build and configure the platform, connecting it to your policy, payment, and core systems.",
  },
  {
    number: "04",
    title: "Launch & Support",
    body: "We go live with a defined rollout, then monitor claims and conversation volume with you as adoption grows.",
  },
];

export const metadata: Metadata = {
  title: "Services — RedPear",
  description:
    "From AI-powered automation to enterprise insurance platforms, RedPear helps organizations modernize operations, improve customer experiences, and accelerate digital transformation with scalable technology solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ApproachSection title="How We Work" steps={howWeWork} />
        <WhySection />
        <FaqSection />
        <CtaSection
          title="Ready to Transform Your Insurance Operations?"
          body="Whether you're modernizing existing systems or building new digital experiences, RedPear is ready to help you take the next step."
        />
      </main>
      <Footer />
    </>
  );
}
