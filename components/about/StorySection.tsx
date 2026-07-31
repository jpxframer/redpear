import Image from "next/image";

// Mission and Vision are the same card, so they are data rather than markup.
const pillars = [
  {
    title: "Our Mission",
    body: "To empower Africa's insurance organizations with technology that simplifies operations, strengthens customer relationships, and makes coverage accessible to more people.",
  },
  {
    title: "Our Vision",
    body: "To become Africa's trusted technology partner for insurance innovation, and the standard for how insurance is bought, serviced, and claimed across the continent.",
  },
];

export function StorySection() {
  return (
    <section className="px-4 py-6 lg:px-28 lg:py-[50px]">
      {/* Three nested levels of the same raised card: an outer shell holding the
          Our Story card and the Mission/Vision pair. Only the outer shell's
          radius changes across breakpoints (24 desktop, 16 mobile). */}
      <div className="gloss-white mx-auto flex max-w-content flex-col gap-4 rounded-2xl bg-brand-white p-4 lg:gap-6 lg:rounded-3xl lg:p-6">
        <article className="gloss-white rounded-2xl bg-brand-white p-4 lg:p-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            {/* Square on mobile, 488x450 on desktop — one 1024x1024 source
                cropped two ways, so object-cover rather than a second export. */}
            <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl lg:aspect-auto lg:h-[450px] lg:w-[488px]">
              <Image
                src="/about/our-story.png"
                alt="A woman checking her phone at an outdoor café table"
                fill
                sizes="(min-width: 1024px) 488px, calc(100vw - 96px)"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-4 lg:flex-1">
              <h2 className="font-display text-h3 font-medium text-brand-red lg:text-h2">
                Our Story
              </h2>
              <p className="text-body-md text-neutral-500 lg:text-body-lg">
                RedPear started with a simple observation: African insurers were losing
                customers to friction, not to competitors. Branch visits, paperwork, and
                slow claims pushed people away from coverage they needed. We built Maya and
                the platform behind it so insurers could meet customers on WhatsApp
                instead, where they already are, and replace weeks of manual process with a
                conversation.
              </p>
            </div>
          </div>
        </article>

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="gloss-white flex flex-col gap-4 rounded-2xl bg-brand-white p-4 lg:flex-1"
            >
              <h2 className="font-display text-h3 font-medium text-brand-red lg:text-h2">
                {pillar.title}
              </h2>
              <p className="text-body-md text-neutral-500 lg:text-body-lg">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
