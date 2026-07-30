import { ProblemCard } from "@/components/problem/ProblemCard";
import { ClaimsPipelineDiagram } from "@/components/problem/ClaimsPipelineDiagram";
import { SystemTopologyDiagram } from "@/components/problem/SystemTopologyDiagram";
import { CustomerJourneyDiagram } from "@/components/problem/CustomerJourneyDiagram";
import { AnalyticsDiagram } from "@/components/problem/AnalyticsDiagram";

// Cards 2 and 3 genuinely use the same bank glyph in Figma, exported as two
// separate assets. Kept as-is rather than deduped, so a future icon change to
// one card does not silently change the other.
const cards = [
  {
    icon: "/icons/timer.svg",
    title: "Manual Claims Processing",
    body: "Lengthy approval cycles reduce efficiency and customer satisfaction.",
    diagram: <ClaimsPipelineDiagram />,
  },
  {
    icon: "/icons/bank.svg",
    title: "Disconnected Systems",
    body: "Disconnected tools create operational complexity and duplicate work.",
    diagram: <SystemTopologyDiagram />,
  },
  {
    icon: "/icons/bank-alt.svg",
    title: "Poor Customer Experience",
    body: "Customers expect faster, digital-first insurance services.",
    diagram: <CustomerJourneyDiagram />,
  },
  {
    icon: "/icons/chart-evaluation.svg",
    title: "Limited Insights",
    body: "Without real-time analytics, making informed business decisions becomes difficult.",
    diagram: <AnalyticsDiagram />,
  },
];

export function ProblemSection() {
  return (
    // scroll-mt clears the sticky navbar when the #about anchor is followed.
    <section
      id="about"
      className="flex scroll-mt-20 flex-col gap-6 px-[18px] py-6 lg:gap-10 lg:px-28 lg:pt-[50px] lg:pb-[106px]"
    >
      <div className="mx-auto flex w-full flex-col gap-4 text-center lg:w-[800px]">
        <h2 className="font-display text-h3-mobile font-medium text-brand-black lg:text-h2">
          Insurance Shouldn&apos;t Be Slowed Down by Legacy Systems
        </h2>
        <p className="text-body-md text-neutral-500 lg:text-body-lg">
          Outdated systems, manual workflows, and fragmented customer experiences slow
          business growth. RedPear helps organizations simplify operations through
          intelligent technology.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        {cards.map((card) => (
          <ProblemCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            body={card.body}
          >
            {card.diagram}
          </ProblemCard>
        ))}
      </div>
    </section>
  );
}
