import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
// Both verbatim reuses, diffed against the Contact frames before wiring: the FAQ
// carries the same three questions as /services, and the CTA the same
// "Ready to Transform…" copy /about and /services already pass.
import { FaqSection } from "@/components/services/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Contact — RedPear",
  description:
    "Whether you're looking to modernize operations, improve customer experiences, or explore AI-powered insurance solutions, our team is here to help.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
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
