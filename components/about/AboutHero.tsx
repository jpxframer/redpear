import Image from "next/image";

// Figma lays the collage out as three columns (32px apart): two stacked 236px
// images, one full-height 488px image, then two more stacked. Mobile keeps only
// the first and last of those five. Modelled as an explicitly-placed grid rather
// than nested column divs so the mobile stack is a plain flex column over the
// same flat list of images.
const images = [
  {
    src: "/about/enterprise-technology.png",
    alt: "A team reviewing an insurance analytics dashboard on a wall display",
    // Column 1, top — one of the two the mobile frame keeps.
    className: "lg:col-start-1 lg:row-start-1",
  },
  {
    src: "/about/built-for-africa.png",
    alt: "A city skyline at sunset",
    className: "hidden lg:block lg:col-start-1 lg:row-start-2",
  },
  {
    src: "/about/technology-improving-insurance.png",
    alt: "Two colleagues working together at a laptop",
    // The tall middle image spans both rows, so it sizes to the row pair.
    className: "hidden lg:block lg:col-start-2 lg:row-span-2 lg:h-full",
  },
  {
    src: "/about/insurance-trust.png",
    alt: "An adviser talking with a client across a desk",
    className: "hidden lg:block lg:col-start-3 lg:row-start-1",
  },
  {
    src: "/about/team-collaboration.png",
    alt: "The RedPear team collaborating around a whiteboard",
    // Column 3, bottom — the second image the mobile frame keeps.
    className: "lg:col-start-3 lg:row-start-2",
  },
];

export function AboutHero() {
  return (
    <section className="px-4 py-[50px] lg:px-28 lg:pt-[100px] lg:pb-[50px]">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 lg:gap-[50px]">
        <div className="flex w-full flex-col gap-4 text-center lg:w-[800px] lg:gap-6">
          <h1 className="font-display text-h1-mobile font-semibold text-brand-black lg:text-display-lg">
            Building the Future of Insurance Through Technology
          </h1>
          <p className="text-body-md text-neutral-500 lg:text-body-lg">
            At RedPear Communications, we help insurance organizations embrace digital
            transformation through intelligent platforms, AI-powered solutions, and
            customer-first experiences that drive measurable business impact.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-3 lg:grid-rows-[236px_236px] lg:gap-x-8 lg:gap-y-4">
          {images.map((image) => (
            <div
              key={image.src}
              className={`relative h-[236px] overflow-hidden rounded-2xl ${image.className}`}
            >
              {/* Sources are 1024x1024 into 370-384px wide slots, so they crop
                  rather than fit. `sizes` matches the real rendered width at each
                  breakpoint so next/image builds the right srcset. */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 384px, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
