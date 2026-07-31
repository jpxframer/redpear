import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { AudiencesSection } from "@/components/sections/AudiencesSection";
import { WhySection } from "@/components/sections/WhySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Reveal } from "@/components/ui/Reveal";

// The Navbar and Footer are in app/layout.tsx, not here — they persist across
// navigation rather than remounting per route.
//
// The Hero is deliberately not wrapped in Reveal: it is above the fold on both
// breakpoints, so it would animate against the page transition already running
// on it, and hiding the first thing a visitor sees to fade it back in is the one
// place this effect costs more than it gives.
export default function Home() {
  return (
    <main>
      <Hero />
      {/* rise={false} on every section carrying an anchor id — #about, #services,
          #blog and #demo. See Reveal: the 16px rise would leave them under the
          fixed navbar when scrolled to. */}
      <Reveal rise={false}>
        <ProblemSection />
      </Reveal>
      <Reveal rise={false}>
        <SolutionsSection />
      </Reveal>
      <Reveal>
        <PlatformSection />
      </Reveal>
      <Reveal>
        <AudiencesSection />
      </Reveal>
      <Reveal>
        <WhySection />
      </Reveal>
      <Reveal>
        <TestimonialsSection />
      </Reveal>
      <Reveal rise={false}>
        <InsightsSection />
      </Reveal>
      <Reveal rise={false}>
        <CtaSection />
      </Reveal>
    </main>
  );
}
