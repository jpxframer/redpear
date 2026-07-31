import Image from "next/image";

type BentoCardProps = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  /** The featured card is set in semibold and hairlined a shade lighter. */
  featured?: boolean;
  priority?: boolean;
  /**
   * Figma sets Insurance Platforms' mobile body at 18/28 while the other five
   * cards in this section use 16/24. Reproduced as designed rather than
   * normalised — flagged to the user as a likely oversight.
   */
  mobileBodyLarge?: boolean;
  /**
   * The two frames that use this card disagree on mobile metrics. Desktop is
   * identical either way.
   *
   * - `"landing"` (default): 16px padding all round, a 16px heading gap, and the
   *   featured card stays semibold. The 16px pad is a deliberate deviation the
   *   user asked for over Figma's 24.
   * - `"services"`: 24px horizontal / 16px vertical padding, an 8px heading gap,
   *   and the featured card drops to medium — that frame draws no featured
   *   distinction on mobile.
   */
  mobileVariant?: "landing" | "services";
};

export function BentoCard({
  title,
  body,
  image,
  imageAlt,
  featured = false,
  priority = false,
  mobileBodyLarge = false,
  mobileVariant = "landing",
}: BentoCardProps) {
  const services = mobileVariant === "services";

  // Spelled out per variant rather than layering `lg:p-6` over `px-6`: Tailwind
  // emits padding-inline/block after the padding shorthand, so an unprefixed
  // `py-4` would beat `lg:p-6` at every width.
  const padding = services ? "px-6 py-4 lg:py-6" : "p-4 lg:p-6";

  return (
    <article
      className={`gloss-bento flex h-full flex-col items-start gap-4 overflow-hidden rounded-3xl border bg-brand-white ${padding} ${
        featured ? "border-neutral-100" : "border-neutral-200"
      }`}
    >
      <div className={`flex w-full flex-col ${services ? "gap-2 lg:gap-4" : "gap-4"}`}>
        <h3
          className={`font-display text-h4-mobile text-brand-black lg:text-h4 ${
            featured
              ? services
                ? "font-medium lg:font-semibold"
                : "font-semibold"
              : "font-medium"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-neutral-500 ${
            mobileBodyLarge ? "text-body-lg" : "text-body-md lg:text-body-lg"
          }`}
        >
          {body}
        </p>
      </div>

      <div className="relative h-[255px] w-full shrink-0 overflow-hidden rounded-2xl lg:h-[430px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 596px, 100vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}
