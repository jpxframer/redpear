import { AudienceCard } from "@/components/audiences/AudienceCard";

type Audience = {
  icon: string;
  iconSizeClass?: string;
  title: string;
  body: string;
};

const audiences: Audience[] = [
  {
    icon: "/icons/piggy-bank.svg",
    // Partial-frame export: 21.5x19.5 viewBox, so it must not stretch to 24px.
    iconSizeClass: "h-[19.5px] w-[21.5px]",
    title: "Insurance Providers",
    body: "Direct-to-consumer digital policies, automated claims, and core systems support.",
  },
  {
    icon: "/icons/bank-linear.svg",
    title: "Financial Services",
    body: "Digital policy management, automated claims processing, and end-to-end core systems modernization.",
  },
  {
    icon: "/icons/courthouse.svg",
    title: "Government",
    body: "Citizen-facing service portals, compliance-ready platforms, and secure data infrastructure.",
  },
  {
    icon: "/icons/health.svg",
    title: "Healthcare",
    body: "Patient management systems, telemedicine platforms, and health records digitization.",
  },
  {
    icon: "/icons/briefcase.svg",
    title: "Enterprise",
    body: "Scalable workflow automation, ERP integration, and enterprise-grade digital transformation.",
  },
  {
    icon: "/icons/wallet-money.svg",
    title: "Microfinance",
    body: "Mobile-first lending platforms, agent network tools, and financial inclusion solutions.",
  },
];

export function AudiencesSection() {
  return (
    <section className="flex scroll-mt-20 flex-col gap-6 px-4 py-6 lg:gap-[50px] lg:px-28 lg:py-[50px]">
      {/* This section sets the heading and body 10px apart, not the 16px the
          earlier sections use. */}
      <div className="mx-auto flex w-full flex-col gap-[10px] text-center lg:w-[800px]">
        <h2 className="font-display text-h3-mobile font-medium text-brand-black lg:text-h2">
          Designed for Organizations Across Africa
        </h2>
        <p className="text-body-md text-neutral-500 lg:text-body-lg">
          Flexible solutions that adapt to different industries and operational needs.
        </p>
      </div>

      {/* auto-rows-fr on desktop only: Figma gives every card a uniform 200px
          height, but the second row's copy is shorter and would otherwise size
          down to 176. Mobile keeps content-sized cards, as the design does. */}
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-4 lg:auto-rows-fr lg:grid-cols-3 lg:gap-6">
        {audiences.map((audience) => (
          <AudienceCard
            key={audience.title}
            icon={audience.icon}
            iconSizeClass={audience.iconSizeClass}
            title={audience.title}
            body={audience.body}
          />
        ))}
      </div>
    </section>
  );
}
