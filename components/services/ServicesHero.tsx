import { BentoCard } from "@/components/solutions/BentoCard";

// Figma groups the copy and this grid inside one "Hero" frame, so they live in
// one component. All six are bento cards here — unlike the landing page, where
// only the first two are bento and the other four are small cards with DOM
// micro-visuals. Cards 1 and 2 carry the landing's copy verbatim and reuse its
// images; 3-6 are new.
const solutions = [
  {
    title: "AI Solutions",
    body: "Empower your service teams with intelligent virtual assistants natively processing end-to-end user requests over WhatsApp.",
    image: "/solutions/ai-solutions.png",
    imageAlt:
      "A WhatsApp conversation where the RedPear assistant renews a vehicle policy and confirms payment",
    featured: true,
    priority: true,
  },
  {
    title: "Insurance Platforms",
    body: "Seamless multi-tenant core administration system for distributors and agents.",
    image: "/solutions/insurance-platforms.png",
    imageAlt:
      "The RedPear policies dashboard listing active, review, pending and expired policies",
  },
  {
    title: "WhatsApp Solutions",
    body: "Engage customers through familiar messaging experiences for policy updates, claims tracking, support, and notifications.",
    image: "/solutions/whatsapp-solutions.png",
    imageAlt:
      "A RedPear Insurance chat thread confirming that claim CLM-0847 is approved and funds arrive in two to three business days",
  },
  {
    title: "Digital Transformation",
    body: "Replace fragmented legacy systems with integrated digital experiences that improve efficiency across your organization.",
    image: "/solutions/digital-transformation.png",
    imageAlt:
      "A Policy Manager screen showing an active motor policy beside a three-step progress tracker, all steps complete",
  },
  {
    title: "Analytics & Insights",
    body: "Transform operational data into actionable insights with dashboards and reporting tools.",
    image: "/solutions/analytics-insights.png",
    imageAlt:
      "An analytics dashboard with a rising claims trend line, a policy distribution donut, and active policy, claims and revenue totals",
  },
  {
    title: "Consulting & Integration",
    body: "Work with our experts to plan, implement, and integrate technology solutions that align with your business goals.",
    image: "/solutions/consulting-integration.png",
    imageAlt:
      "An integration hub linking a core insurance system to the RedPear platform and a payment gateway, with a recent sync activity log",
  },
];

export function ServicesHero() {
  return (
    <section className="px-4 py-[50px] lg:px-28 lg:pt-[100px] lg:pb-[50px]">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 lg:gap-[50px]">
        <div className="flex w-full flex-col gap-4 text-center lg:w-[800px] lg:gap-6">
          <h1 className="font-display text-h1-mobile font-semibold text-brand-black lg:text-display-lg">
            Technology Solutions Built for the Future of Insurance
          </h1>
          <p className="text-body-md text-neutral-500 lg:text-body-lg">
            From AI-powered automation to enterprise insurance platforms, RedPear helps
            organizations modernize operations, improve customer experiences, and
            accelerate digital transformation with scalable technology solutions.
          </p>
        </div>

        {/* 16px between stacked cards on mobile, 24 on the desktop grid. */}
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {solutions.map((solution) => (
            <BentoCard key={solution.title} mobileVariant="services" {...solution} />
          ))}
        </div>
      </div>
    </section>
  );
}
