import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
// Both verbatim reuses, diffed against the Contact frames before wiring: the FAQ
// carries the same three questions as /services, and the CTA the same
// "Ready to Transform…" copy /about and /services already pass.
import { FaqSection } from "@/components/services/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact — RedPear",
  description:
    "Whether you're looking to modernize operations, improve customer experiences, or explore AI-powered insurance solutions, our team is here to help.",
};

export default function ContactPage() {
  // Navbar and Footer live in app/layout.tsx; the hero stays unwrapped because
  // it is above the fold. Same shape as the landing page.
  return (
    <main>
      <ContactHero />
      <Reveal>
        <FaqSection />
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
