import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section
      id="demo"
      className="flex scroll-mt-20 flex-col px-4 py-6 lg:px-28 lg:py-[50px]"
    >
      <div className="gloss-cta relative mx-auto flex w-full max-w-content flex-col items-start overflow-hidden rounded-3xl border border-neutral-50 bg-brand-red px-4 py-16 lg:p-16">
        {/*
          Figma draws the oversized RedPear wordmark as a masked group at 10%
          opacity, clipped by the card. Reproduced as a CSS mask over white
          rather than re-exporting three mask layers — same result, no new
          assets. aria-hidden because it is pure decoration.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[7px] left-[15px] h-[365px] w-[500px] bg-white opacity-10 lg:top-[13px] lg:left-[803px] lg:w-[520px]"
          style={{
            maskImage: "url(/brand/redpear-logo.svg)",
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskImage: "url(/brand/redpear-logo.svg)",
            WebkitMaskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
          }}
        />

        <div className="relative flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center gap-6 text-center">
            <h2 className="font-display text-h3 font-bold text-white lg:text-display-lg lg:font-semibold">
              Ready to Modernize Your Insurance Operations?
            </h2>
            <p className="text-body-lg text-neutral-100 lg:w-[640px]">
              Let&apos;s build faster, smarter, and more connected insurance experiences
              together. Book a dedicated technical briefing with our team.
            </p>
          </div>
          <Button href="#demo" variant="secondary" className="w-full lg:w-auto">
            Book A Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
