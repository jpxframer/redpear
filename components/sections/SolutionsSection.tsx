import { BentoCard } from "@/components/solutions/BentoCard";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import { MicroChart } from "@/components/solutions/MicroChart";
import { ConversationList } from "@/components/solutions/ConversationList";
import { TransformationPreview } from "@/components/solutions/TransformationPreview";
import { IntegrationPreview } from "@/components/solutions/IntegrationPreview";

const solutions = [
  {
    title: "Analytics & Insights",
    body: "Detailed metrics on conversion rates, drop-offs, and claims volume.",
    preview: <MicroChart />,
  },
  {
    title: "WhatsApp Solutions",
    body: "Turn chat windows into robust, transactional self-service hubs.",
    preview: <ConversationList />,
  },
  {
    title: "Digital Transformation",
    body: "Ditch physical forms. Digitalize entire policy underwriting funnels.",
    preview: <TransformationPreview />,
  },
  {
    title: "Consulting & Integration",
    body: "No rip-and-replace required. Connect seamlessly with modern APIs.",
    preview: <IntegrationPreview />,
  },
];

export function SolutionsSection() {
  return (
    <section
      id="services"
      className="flex scroll-mt-20 flex-col gap-6 px-4 py-6 lg:gap-[50px] lg:px-28 lg:pt-[50px] lg:pb-[53px]"
    >
      <div className="mx-auto flex w-full flex-col gap-4 text-center lg:w-[800px]">
        <h2 className="font-display text-h3-mobile font-medium text-brand-black lg:text-h2">
          Solutions Built for Modern Insurance Organizations
        </h2>
        <p className="text-body-md text-neutral-500 lg:text-body-lg">
          Everything your organization needs to streamline operations, engage customers,
          and grow confidently.
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-content flex-col gap-4 lg:gap-6">
        {/* Figma draws these at 600 and 592 wide. Equal columns land within 4px of
            both, which is not worth an asymmetric grid to chase. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BentoCard
            featured
            priority
            title="AI Solutions"
            body="Empower your service teams with intelligent virtual assistants natively processing end-to-end user requests over WhatsApp."
            image="/solutions/ai-solutions.png"
            imageAlt="A WhatsApp conversation where the RedPear assistant renews a vehicle policy and confirms payment"
          />
          <BentoCard
            title="Insurance Platforms"
            body="Seamless multi-tenant core administration system for distributors and agents."
            image="/solutions/insurance-platforms.png"
            imageAlt="The RedPear policies dashboard listing active, review, pending and expired policies"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
          {solutions.map((solution) => (
            <SolutionCard key={solution.title} title={solution.title} body={solution.body}>
              {solution.preview}
            </SolutionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
