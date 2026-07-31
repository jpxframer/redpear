export type ApproachStep = {
  number: string;
  title: string;
  body: string;
};

// The About page's wording. /services renders the same section as "How We Work"
// with its own steps — two of the four are reworded there.
const aboutSteps: ApproachStep[] = [
  {
    number: "01",
    title: "Discover",
    body: "We map your current claims flow, distribution channels, and the systems Maya needs to plug into.",
  },
  {
    number: "02",
    title: "Design",
    body: "We design conversation flows and dashboard views around how your team actually operates.",
  },
  {
    number: "03",
    title: "Build",
    body: "We build and configure the platform, connecting it to your policy, payment, and core systems.",
  },
  {
    number: "04",
    title: "Optimize",
    body: "We monitor claims and conversation volume with you post-launch and continuously improve performance.",
  },
];

export function ApproachSection({
  title = "Our Approach",
  steps = aboutSteps,
}: {
  title?: string;
  steps?: ApproachStep[];
}) {
  return (
    <section className="px-4 py-6 lg:px-28 lg:py-[50px]">
      <div className="mx-auto flex max-w-content flex-col gap-6 lg:gap-[50px]">
        <h2 className="text-center font-display text-h3-mobile font-medium text-brand-black lg:text-h2">
          {title}
        </h2>

        {/* lg:items-start, not the default stretch: Figma sizes these rows to
            fit-content and pins each card to the row top. All four are the same
            height today, so it only shows if one card's copy gets shorter. */}
        <div className="grid gap-4 lg:grid-cols-2 lg:items-start lg:gap-6">
          {steps.map((step) => (
            <article
              key={step.number}
              className="gloss-white flex flex-col gap-4 rounded-2xl bg-brand-white p-4"
            >
              <p className="font-display text-display-sm font-semibold text-brand-red lg:text-display-lg">
                {step.number}
              </p>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-h6 font-medium text-brand-black lg:text-h5">
                  {step.title}
                </h3>
                <p className="text-body-md text-neutral-500 lg:text-body-lg">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
