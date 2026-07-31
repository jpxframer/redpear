import { ContactForm } from "./ContactForm";
import { ContactMap } from "./ContactMap";
import { ContactPanel } from "./ContactPanel";

/**
 * Figma nests the card (`20875:21894`) *inside* the Hero frame (`20875:21889`)
 * exactly as the Services hero nests its bento grid, so copy and card live in one
 * component. The copy block's metrics are identical to `ServicesHero`'s — 800px
 * centred column, 24/16 internal gap, 50/24 down to the card.
 */
export function ContactHero() {
  return (
    <section className="px-4 py-[50px] lg:px-28 lg:pt-[100px] lg:pb-[50px]">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 lg:gap-[50px]">
        <div className="flex w-full flex-col gap-4 text-center lg:w-[800px] lg:gap-6">
          <h1 className="font-display text-h1-mobile font-semibold text-brand-black lg:text-display-lg">
            Let&apos;s Build the Future of Insurance Together
          </h1>
          <p className="text-body-md text-neutral-500 lg:text-body-lg">
            Whether you&apos;re looking to modernize operations, improve customer
            experiences, or explore AI-powered insurance solutions, our team is here to
            help. Let&apos;s discuss how RedPear can support your digital transformation
            journey.
          </p>
        </div>

        {/* The outer shell is the only thing whose radius changes across
            breakpoints, the same shape as the About page's Story card. */}
        <div className="gloss-white flex w-full flex-col gap-4 rounded-2xl bg-brand-white p-4 lg:gap-8 lg:rounded-3xl lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
            {/* min-w-0 so the 734px form column can shrink; without it the fixed
                402px panel would push the row past the 1216 container. */}
            <div className="min-w-0 flex-1">
              <ContactForm />
            </div>
            <ContactPanel />
          </div>

          {/* Figma draws this as a flat screenshot of Google Maps. It is a live
              embed instead — the card geometry is unchanged. */}
          <ContactMap />
        </div>
      </div>
    </section>
  );
}
