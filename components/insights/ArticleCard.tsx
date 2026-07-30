import Image from "next/image";

export function ArticleCard({
  category,
  readTime,
  title,
  excerpt,
  thumbnail,
  thumbnailAlt,
}: {
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  thumbnailAlt: string;
}) {
  return (
    <article className="gloss-white flex h-full items-center rounded-2xl bg-brand-white p-4 lg:p-6">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-2xl">
          <Image
            src={thumbnail}
            alt={thumbnailAlt}
            fill
            sizes="(min-width: 1024px) 341px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="flex h-[15px] w-full items-center justify-between text-label-sm whitespace-nowrap">
            <p className="font-medium text-brand-red">{category}</p>
            <p className="text-neutral-500">{readTime}</p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <h3 className="font-display text-h6 font-medium text-brand-black">{title}</h3>
            <p className="text-label-lg text-neutral-500">{excerpt}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
