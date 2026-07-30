import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { AudiencesSection } from "@/components/sections/AudiencesSection";
import { WhySection } from "@/components/sections/WhySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { InsightsSection } from "@/components/sections/InsightsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionsSection />
        <AudiencesSection />
        <WhySection />
        <TestimonialsSection />
        <InsightsSection />
      </main>
    </>
  );
}
