import { PlatformChat } from "@/components/platform/PlatformChat";

const features = [
  "Enterprise security by design (SOC2 Ready)",
  "Natively hooks into core insurance systems",
  "Live operational oversight dashboards",
];

export function PlatformSection() {
  return (
    <section className="flex scroll-mt-20 flex-col gap-6 px-4 py-6 lg:gap-[50px] lg:px-28 lg:py-[50px]">
      {/*
        Copy is taken from the DESKTOP nodes (20875-20078 / 20875-20079). The mobile
        frame's own text nodes (20875-20960 / 20875-20961) still hold section 2's
        copy — "Solutions Built for Modern Insurance Organizations" — which would
        render the same heading twice on mobile. Flagged to the user as a Figma
        content bug rather than reproduced.
      */}
      <div className="mx-auto flex w-full flex-col gap-4 text-center lg:w-[800px]">
        <h2 className="font-display text-h3-mobile font-medium text-brand-black lg:text-h2">
          Technology That Works Behind Every Insurance Journey
        </h2>
        <p className="text-body-md text-neutral-500 lg:text-body-lg">
          Built to support insurers with intelligent automation, seamless customer
          experiences, and enterprise-grade operational visibility.
        </p>
      </div>

      <div className="gloss-white mx-auto w-full max-w-content rounded-3xl bg-brand-white p-4 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-[92px]">
          <div className="flex flex-col gap-6 lg:w-[500px] lg:shrink-0">
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-h6 font-medium text-brand-black lg:text-h5">
                Automated claims routing and payout confirmation.
              </h3>
              <p className="text-body-md text-neutral-500 lg:text-body-lg">
                Insurers configure complex rules on RedPear&apos;s central platform,
                instantly feeding real-time operational workflows and secure payout APIs.
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {features.map((feature) => (
                <li key={feature} className="text-[16px] leading-6 font-medium text-brand-black">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full lg:h-[600px] lg:min-w-0 lg:flex-1">
            <PlatformChat />

            {/* Both floating cards are hidden on the mobile frame in Figma. */}
            <div className="gloss-white absolute top-[154px] -left-1.5 hidden w-[220px] flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 lg:flex">
              <p className="text-[13px] font-medium text-neutral-500">
                Claim Processing Speed
              </p>
              <p className="font-display text-[32px] font-bold text-brand-red">45 Sec</p>
              <p className="text-[11px] font-semibold text-positive">
                ✦ Average approval time
              </p>
            </div>

            <div className="gloss-white absolute right-[17px] bottom-[176px] hidden w-[240px] items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4 lg:flex">
              <span className="size-8 shrink-0 rounded-2xl bg-brand-red/10" />
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] font-semibold text-brand-black">ID Verified</p>
                <p className="text-[11px] text-neutral-500">Bio-verification Passed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
