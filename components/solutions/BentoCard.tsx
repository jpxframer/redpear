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
};

export function BentoCard({
  title,
  body,
  image,
  imageAlt,
  featured = false,
  priority = false,
  mobileBodyLarge = false,
}: BentoCardProps) {
  return (
    <article
      className={`gloss-bento flex h-full flex-col items-start gap-4 overflow-hidden rounded-3xl border bg-brand-white p-4 lg:p-6 ${
        featured ? "border-neutral-100" : "border-neutral-200"
      }`}
    >
      <div className="flex w-full flex-col gap-4">
        <h3
          className={`font-display text-h4-mobile text-brand-black lg:text-h4 ${
            featured ? "font-semibold" : "font-medium"
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
