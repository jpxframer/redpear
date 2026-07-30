import type { ReactNode } from "react";

/** Shell for the four small cards in the lower row of the solutions section. */
export function SolutionCard({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <article className="gloss-white flex h-full flex-col items-start rounded-2xl border border-neutral-100 bg-brand-white p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          {/* Mobile is deliberately larger than desktop here: Figma sets these
              headings at 24/32 on mobile and 20/28 on desktop. */}
          <h3 className="font-display text-h4-mobile font-medium text-brand-black lg:text-h6">
            {title}
          </h3>
          <p className="text-body-md text-neutral-500">{body}</p>
        </div>
        {children}
      </div>
    </article>
  );
}

/** The white inner panel each small card's micro-visual sits in. */
export function PreviewPanel({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  // leading-[normal] for the same reason as the section 1 diagrams: this artwork
  // is 6-8px text, where Tailwind preflight's 1.5 line height blows the layout up.
  return (
    <div
      className={`overflow-hidden rounded-xl border border-neutral-200 bg-white p-2.5 leading-[normal] ${className}`}
    >
      {children}
    </div>
  );
}
