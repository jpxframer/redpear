import { IconBadge } from "@/components/ui/IconBadge";

export function AudienceCard({
  icon,
  iconSizeClass,
  title,
  body,
}: {
  icon: string;
  iconSizeClass?: string;
  title: string;
  body: string;
}) {
  return (
    <article className="gloss-white flex h-full flex-col items-start rounded-2xl bg-brand-white p-4">
      <div className="flex w-full flex-col gap-4">
        <IconBadge src={icon} sizeClass={iconSizeClass} />
        <div className="flex w-full flex-col gap-2">
          <h3 className="font-display text-h6 font-medium text-brand-black lg:text-h5">
            {title}
          </h3>
          <p className="text-body-sm text-neutral-500 lg:text-body-md">{body}</p>
        </div>
      </div>
    </article>
  );
}
