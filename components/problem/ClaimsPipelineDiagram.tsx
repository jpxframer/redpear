import Image from "next/image";
import { DiagramBadge, DiagramCallout, DiagramShell, MicroTag } from "./ProblemCard";

function StepNumber({ tone, children }: { tone: string; children: string }) {
  return (
    <span
      className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${tone}`}
    >
      {children}
    </span>
  );
}

function Connector({ line, tag }: { line: string; tag: { className: string; label: string } }) {
  return (
    <div className="flex items-center gap-1.5 pl-2.5">
      <Image src={line} alt="" width={4} height={20} className="h-5 w-1" />
      <MicroTag className={tag.className}>{tag.label}</MicroTag>
    </div>
  );
}

export function ClaimsPipelineDiagram() {
  return (
    <DiagramShell
      label="Claims Pipeline"
      badge={
        <DiagramBadge tone="warn">
          <Image
            src="/problem/clock-amber.svg"
            alt=""
            width={10}
            height={10}
            className="size-2.5"
          />
          Avg. 14 days
        </DiagramBadge>
      }
    >
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center gap-2">
          <StepNumber tone="bg-neutral-500">1</StepNumber>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-[7px] border border-neutral-200 bg-white px-2.5 py-[7px] drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.04)]">
            <Image src="/problem/file.svg" alt="" width={12} height={12} className="size-3" />
            <p className="text-[11px] font-medium whitespace-nowrap text-neutral-700">
              Claim Submitted
            </p>
            <MicroTag className="ml-auto bg-ok-soft font-semibold text-ok-ink">Auto</MicroTag>
          </div>
        </div>

        <Connector
          line="/problem/line-dot-1.svg"
          tag={{ className: "bg-warn-softer text-warn-deep", label: "+2 days" }}
        />

        <div className="flex w-full items-center gap-2">
          <StepNumber tone="bg-brand-red">2</StepNumber>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-[7px] border border-brand-red bg-danger-pale px-2.5 py-[7px] drop-shadow-[0_2px_3px_rgba(244,11,13,0.08)]">
            <Image src="/problem/user.svg" alt="" width={12} height={12} className="size-3" />
            <p className="text-[11px] font-semibold whitespace-nowrap text-brand-red">
              Manual Review
            </p>
            <Image
              src="/problem/review-marker.svg"
              alt=""
              width={17}
              height={9}
              className="ml-auto h-[9px] w-[17px]"
            />
          </div>
        </div>

        <Connector
          line="/problem/line-dot-2.svg"
          tag={{ className: "bg-warn-soft text-warn-deep", label: "+8 days" }}
        />

        <div className="flex w-full items-center gap-2">
          <StepNumber tone="bg-neutral-400">3</StepNumber>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-[7px] border border-neutral-200 bg-white px-2.5 py-[7px] opacity-60">
            <Image src="/problem/check.svg" alt="" width={12} height={12} className="size-3" />
            <p className="text-[11px] font-medium whitespace-nowrap text-neutral-400">Approval</p>
            <MicroTag className="ml-auto bg-neutral-100 font-semibold text-neutral-400">
              Pending
            </MicroTag>
          </div>
        </div>
      </div>

      <DiagramCallout
        icon="/problem/alert-triangle.svg"
        title="Bottleneck Detected"
        detail="8 claims awaiting manual adjuster"
      />
    </DiagramShell>
  );
}
