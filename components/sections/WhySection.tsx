import { WhyCard } from "@/components/why/WhyCard";

const reasons = [
  {
    title: "Enterprise Ready",
    body: "Engineered to scale securely with enterprise-level security, SLAs, and infrastructure robustly handling millions of transactions.",
    image: "/why/enterprise-ready.png",
    imageAlt:
      "A security, SLA, infrastructure and compliance ring around a central shield, with node, storage and user status chips",
  },
  {
    title: "AI Powered",
    body: "Natively integrated generative-agent pipelines enabling seamless complex customer conversations and smart operational auto-routing.",
    image: "/why/ai-powered.png",
    imageAlt:
      "A chat asking how to automate follow-ups, with an AI card suggesting a playbook and offering Run and Edit actions",
  },
  {
    title: "Secure Infrastructure",
    body: "Fully end-to-end encrypted messaging pipelines running strictly in tandem with certified cloud data environments.",
    image: "/why/secure-infrastructure.png",
    imageAlt:
      "A padlocked shield linked to user, verification, blocking and database nodes",
  },
  {
    title: "Customer Focused",
    body: "Dramatically lower drop-off rates and drive continuous customer retention by offering service on the platforms they use daily.",
    image: "/why/customer-focused.png",
    imageAlt:
      "A row of contact channels — chat, email, phone, desktop, mobile and social — funnelling into a single customer group",
  },
];

export function WhySection() {
  return (
    <section className="flex scroll-mt-20 flex-col gap-6 px-4 py-6 lg:gap-[50px] lg:px-28 lg:py-[50px]">
      <div className="mx-auto flex w-full flex-col gap-[10px] text-center lg:w-[800px]">
        <h2 className="font-display text-h3-mobile font-medium text-brand-black lg:text-h2">
          Why Organizations Choose RedPear
        </h2>
        <p className="text-body-md text-neutral-500 lg:text-body-lg">
          Transform operational realities through software designed specifically for the
          future of insurance.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {reasons.map((reason) => (
          <WhyCard key={reason.title} {...reason} />
        ))}
      </div>
    </section>
  );
}
