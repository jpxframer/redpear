import Image from "next/image";

export function TestimonialCard({
  quote,
  name,
  role,
  avatar,
  /**
   * Figma gives three of the four cards a 24px radius and one 20px. Reproduced
   * as designed and flagged to the user; almost certainly a stray nudge.
   */
  radiusClass = "rounded-3xl",
}: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  radiusClass?: string;
}) {
  return (
    <figure
      className={`gloss-white flex h-full flex-col items-start gap-6 border border-neutral-200 bg-brand-white p-8 ${radiusClass}`}
    >
      <blockquote className="text-body-lg text-neutral-500">{quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        <Image
          src={avatar}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover"
        />
        {/* Figma sets this nowrap, which overflows the card on mobile for the
            longer job titles. Allowed to wrap instead. */}
        <div className="flex min-w-0 flex-col gap-0.5 leading-[normal]">
          <p className="text-[14px] font-semibold text-brand-black">{name}</p>
          <p className="text-[12px] text-neutral-500">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
