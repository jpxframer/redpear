import type { Metadata } from "next";
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
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About — RedPear",
  description:
    "RedPear Communications helps insurance organizations embrace digital transformation through intelligent platforms, AI-powered solutions, and customer-first experiences that drive measurable business impact.",
};

export default function AboutPage() {
  // Navbar and Footer live in app/layout.tsx; the hero stays unwrapped because
  // it is above the fold. Same shape as the landing page.
  return (
    <main>
      <AboutHero />
      <Reveal>
        <StorySection />
      </Reveal>
      <Reveal>
        <BeliefsSection />
      </Reveal>
      <Reveal>
        <TeamSection />
      </Reveal>
      <Reveal>
        <ApproachSection />
      </Reveal>
      <Reveal>
        <WhySection />
      </Reveal>
      <Reveal>
        <PartnersSection />
      </Reveal>
      {/* rise={false}: CtaSection carries id="demo", the target of every
          "Book a Demo" button. See Reveal. */}
      <Reveal rise={false}>
        <CtaSection
          title="Ready to Transform Your Insurance Operations?"
          body="Whether you're modernizing existing systems or building new digital experiences, RedPear is ready to help you take the next step."
        />
      </Reveal>
    </main>
  );
}
