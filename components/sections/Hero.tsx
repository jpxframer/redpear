import { Button } from "@/components/ui/Button";
import { AnalyticsCard } from "@/components/hero/AnalyticsCard";
import { ChatCard } from "@/components/hero/ChatCard";
import { ClaimsCard } from "@/components/hero/ClaimsCard";
import { InsurerLogos } from "@/components/hero/InsurerLogos";

export function Hero() {
  return (
    <section className="flex flex-col gap-6 px-4 py-[50px] lg:gap-[50px] lg:px-28 lg:pb-[50px] lg:pt-[100px]">
      <div className="flex flex-col items-center gap-6 lg:gap-[50px]">
        <div className="flex w-full flex-col items-center gap-6 lg:w-[800px]">
          <div className="flex w-full flex-col gap-4 text-center lg:gap-6">
            <h1 className="font-display text-h1-mobile font-semibold text-brand-black lg:text-display-lg">
              The Entire Insurance Journey, Inside{" "}
              <span className="text-brand-red">WhatsApp</span>
            </h1>
            <p className="text-body-md text-neutral-500 lg:text-body-lg">
              RedPear helps Africa&apos;s leading insurers sell policies, process claims,
              and serve customers on the app they already open every day. No downloads, no
              queues, no paperwork.
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch gap-4 lg:w-auto lg:flex-row lg:items-center lg:gap-6">
            <Button href="#demo">Book a Demo</Button>
            <Button href="#services" variant="secondary">
              Explore Services
            </Button>
          </div>
        </div>

        {/* The side cards are desktop-only; mobile shows the chat thread alone. */}
        <div className="flex w-full items-center justify-center gap-6">
          <div className="hidden lg:block">
            <AnalyticsCard />
          </div>
          <ChatCard />
          <div className="hidden lg:block">
            <ClaimsCard />
          </div>
        </div>
      </div>

      <InsurerLogos />
    </section>
  );
}
