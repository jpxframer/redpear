import Image from "next/image";
import type { ReactNode } from "react";
import { DiagramBadge, DiagramShell, MicroTag } from "./ProblemCard";

/** "Expected" vs "Reality" progress rows. */
function GaugeRow({
  tag,
  tagClass,
  trackClass,
  fillClass,
  fillWidth,
  verdict,
  verdictClass,
}: {
  tag: string;
  tagClass: string;
  trackClass: string;
  fillClass: string;
  fillWidth: string;
  verdict: string;
  verdictClass: string;
}) {
  return (
    <div className="flex w-full items-center gap-2">
      <span
        className={`rounded px-2 py-[3px] text-[9px] font-semibold whitespace-nowrap ${tagClass}`}
      >
        {tag}
      </span>
      <div className={`flex h-1.5 min-w-0 flex-1 rounded-[3px] ${trackClass}`}>
        <span className={`h-1.5 rounded-[3px] ${fillClass} ${fillWidth}`} />
      </div>
      <span className={`text-[9px] font-semibold whitespace-nowrap ${verdictClass}`}>
        {verdict}
      </span>
    </div>
  );
}

function Touchpoint({
  shell,
  icon,
  title,
  titleClass,
  detail,
  badge,
  children,
}: {
  shell: string;
  icon: ReactNode;
  title: string;
  titleClass: string;
  detail?: string;
  badge: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className={`flex w-full items-center gap-2 rounded-[7px] border px-2 py-1.5 ${shell}`}>
      {icon}
      <div className="flex min-w-0 flex-1 flex-col gap-px">
        <p className={`text-[10px] font-medium ${titleClass}`}>{title}</p>
        {detail && <p className="text-[9px] text-neutral-400">{detail}</p>}
        {children}
      </div>
      {badge}
    </div>
  );
}

export function CustomerJourneyDiagram() {
  return (
    <DiagramShell
      label="Customer Journey"
      badge={<DiagramBadge tone="danger">68% Drop-off</DiagramBadge>}
    >
      <GaugeRow
        tag="Expected"
        tagClass="bg-info-pale text-info-ink"
        trackClass="bg-info-soft"
        fillClass="bg-info-ink"
        fillWidth="w-[160px]"
        verdict="Fast"
        verdictClass="text-info-ink"
      />
      <GaugeRow
        tag="Reality"
        tagClass="bg-[#fef2f2] text-brand-red"
        trackClass="bg-danger-soft"
        fillClass="bg-brand-red"
        fillWidth="w-12"
        verdict="Stuck"
        verdictClass="text-brand-red"
      />

      <div className="flex w-full flex-col gap-4">
        <Touchpoint
          shell="border-neutral-200 bg-white"
          icon={<span className="size-6 shrink-0 rounded-md bg-neutral-100" />}
          title="Paper Form Required"
          titleClass="text-neutral-700"
          detail="Print, sign, scan, email"
          badge={<MicroTag className="bg-warn-soft text-warn-ink">3 days</MicroTag>}
        />

        <Touchpoint
          shell="border-danger-border bg-danger-pale"
          icon={
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-danger-soft">
              <Image
                src="/problem/phone.svg"
                alt=""
                width={14}
                height={14}
                className="size-3.5"
              />
            </span>
          }
          title="On Hold"
          titleClass="text-brand-red"
          badge={<MicroTag className="bg-danger-soft text-brand-red">45 min</MicroTag>}
        >
          <span className="flex items-center gap-[3px]">
            {["hold-dot-1", "hold-dot-2", "hold-dot-3"].map((dot) => (
              <Image
                key={dot}
                src={`/problem/${dot}.svg`}
                alt=""
                width={4}
                height={4}
                className="size-1"
              />
            ))}
            <span className="text-[9px] text-brand-red">Connecting...</span>
          </span>
        </Touchpoint>

        <Touchpoint
          shell="border-dashed border-neutral-200 bg-[#f9fafb]"
          icon={<span className="size-6 shrink-0 rounded-md bg-neutral-100" />}
          title="Customer Drops Off"
          titleClass="text-neutral-400"
          badge={<MicroTag className="bg-neutral-100 text-neutral-400">Lost</MicroTag>}
        >
          <p className="text-[9px] text-[#cbd5e1]">68% abandon at this stage</p>
        </Touchpoint>
      </div>

      <div className="flex w-full items-center gap-2">
        <span className="text-[9px] text-neutral-400">NPS</span>
        <div className="flex h-1 min-w-0 flex-1 rounded-sm bg-neutral-100">
          <span className="h-1 w-7 rounded-sm bg-brand-red" />
        </div>
        <span className="text-[9px] font-semibold text-brand-red">&#8722;32</span>
      </div>
    </DiagramShell>
  );
}
