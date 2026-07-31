import { IconBadge } from "@/components/ui/IconBadge";

const beliefs = [
  {
    icon: "/icons/building-4.svg",
    title: "Insurance First",
    body: "We build for insurers specifically, not enterprise software adapted after the fact.",
  },
  {
    icon: "/icons/profile.svg",
    title: "Customer First",
    body: "Every feature starts with the person filing a claim or renewing a policy, not the back office.",
  },
  {
    icon: "/icons/shield-security.svg",
    title: "Trust & Security",
    // Verbatim from Figma, which omits the closing full stop the other three have.
    body: "Financial and customer data held to the standard regulators and insurers expect",
  },
  {
    icon: "/icons/profile-2user.svg",
    title: "Partnership",
    body: "We stay involved after launch, not just through implementation.",
  },
];

export function BeliefsSection() {
  return (
    <section className="px-4 py-6 lg:px-28 lg:py-[50px]">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 lg:gap-[50px]">
        <h2 className="w-full text-center font-display text-h3-mobile font-medium text-brand-black lg:text-h2">
          What We Believe
        </h2>

        {/* auto-rows-fr levels the two desktop rows at 188px — Partnership's body
            is one line where the other three are two, and Figma still draws all
            four cards the same height. */}
        <div className="flex w-full flex-col gap-4 lg:grid lg:auto-rows-fr lg:grid-cols-2 lg:gap-6">
          {beliefs.map((belief) => (
            <article
              key={belief.title}
              className="gloss-white flex flex-col gap-4 rounded-2xl bg-brand-white p-4"
            >
              <IconBadge src={belief.icon} />
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-h4-mobile font-medium text-brand-black lg:text-h4">
                  {belief.title}
                </h3>
                <p className="text-body-md text-neutral-500 lg:text-body-lg">
                  {belief.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
