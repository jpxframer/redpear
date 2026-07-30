import Image from "next/image";

export function WhyCard({
  title,
  body,
  image,
  imageAlt,
}: {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <article className="gloss-white flex h-full flex-col items-start rounded-3xl border border-neutral-100 bg-brand-white p-4 lg:p-6">
      <div className="flex w-full flex-col gap-4">
        <div className="relative aspect-[1952/1400] w-full shrink-0 overflow-hidden rounded-2xl border border-neutral-100">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 544px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <h3 className="font-display text-h4-mobile font-medium text-brand-black lg:text-h4">
            {title}
          </h3>
          <p className="text-body-md text-neutral-500 lg:text-body-lg">{body}</p>
        </div>
      </div>
    </article>
  );
}
