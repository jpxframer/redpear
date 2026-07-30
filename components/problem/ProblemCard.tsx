import Image from "next/image";
import type { ReactNode } from "react";
import { IconBadge } from "@/components/ui/IconBadge";

type ProblemCardProps = {
  icon: string;
  /** Set for partial-frame icon exports whose viewBox is smaller than 24x24. */
  iconSizeClass?: string;
  title: string;
  body: string;
  children: ReactNode;
};

export function ProblemCard({
  icon,
  iconSizeClass,
  title,
  body,
  children,
}: ProblemCardProps) {
  return (
    <article className="gloss-white flex h-full flex-col items-start rounded-2xl bg-brand-white p-4 lg:p-6">
      <div className="flex h-full w-full flex-col gap-[19px]">
        <header className="flex w-full flex-col justify-center gap-4">
          <IconBadge src={icon} sizeClass={iconSizeClass} />
          <div className="flex w-full flex-col gap-2">
            <h3 className="font-display text-h4-mobile font-medium text-brand-black lg:text-h4">
              {title}
            </h3>
            <p className="text-body-md text-neutral-500 lg:text-body-lg">{body}</p>
          </div>
        </header>
        {children}
      </div>
    </article>
  );
}

/** The white inner panel every problem card wraps its illustration in. */
export function DiagramShell({
  label,
  badge,
  children,
}: {
  label: string;
  badge: ReactNode;
  children: ReactNode;
}) {
  // leading-[normal] is inherited by every label inside the panel. Figma sets the
  // diagram micro-copy to `normal` (~1.2), while Tailwind's preflight defaults to
  // 1.5 — across this much 8-11px text that alone added ~30px per card.
  return (
    <div className="flex w-full flex-1 flex-col gap-4 rounded-xl border border-neutral-100 bg-white p-5 leading-[normal]">
      <div className="flex w-full items-center justify-between">
        <p className="text-[11px] font-semibold uppercase text-neutral-700">{label}</p>
        {badge}
      </div>
      {children}
    </div>
  );
}

/** Pill in the top-right of a diagram panel. */
export function DiagramBadge({
  tone,
  children,
}: {
  tone: "warn" | "danger";
  children: ReactNode;
}) {
  const tones = {
    warn: "bg-warn-soft text-warn-ink",
    danger: "bg-danger-soft text-brand-red",
  } as const;

  return (
    <div
      className={`flex items-center gap-1 rounded-[20px] px-2 py-[3px] text-[10px] font-semibold ${tones[tone]}`}
    >
      {children}
    </div>
  );
}

/** Small status chip used inside rows: "Auto", "+2 days", "Lost", "3 days". */
export function MicroTag({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={`rounded px-1.5 py-0.5 text-[9px] whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}

/** Two-line callout that closes each diagram panel. */
export function DiagramCallout({
  icon,
  title,
  detail,
}: {
  icon: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg border border-danger-border bg-white px-2.5 py-[7px]">
      <Image src={icon} alt="" width={14} height={14} className="size-3.5 shrink-0" />
      <div className="flex flex-col gap-px">
        <p className="text-[10px] font-semibold text-brand-red">{title}</p>
        <p className="text-[9px] text-neutral-400">{detail}</p>
      </div>
    </div>
  );
}
