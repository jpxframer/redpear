import Image from "next/image";
import type { ReactNode } from "react";
import { DiagramBadge, DiagramCallout, DiagramShell, MicroTag } from "./ProblemCard";

function NodeChip({
  icon,
  label,
  isolated = false,
}: {
  icon?: string;
  label: string;
  isolated?: boolean;
}) {
  const shell = isolated
    ? "border-danger-border bg-danger-pale text-brand-red"
    : "border-neutral-200 bg-white text-neutral-700 drop-shadow-[0_2px_2px_rgba(0,0,0,0.04)]";

  return (
    <div className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 ${shell}`}>
      {icon && <Image src={icon} alt="" width={12} height={12} className="size-3" />}
      <span className="text-[10px] font-semibold whitespace-nowrap">{label}</span>
    </div>
  );
}

/** A severed connection between two systems: line, red cross, line. */
function BrokenLink() {
  return (
    <div className="flex w-[50px] shrink-0 items-center justify-center gap-0.5">
      <span className="h-[1.5px] w-2 bg-neutral-300" />
      <span className="rounded-[3px] bg-danger-soft px-1 py-0.5 text-[9px] font-bold text-brand-red">
        &#10005;
      </span>
      <span className="h-[1.5px] w-2 bg-neutral-300" />
    </div>
  );
}

function SiloNode({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-[90px] shrink-0 flex-col items-center gap-1">
      {children}
      <MicroTag className="bg-danger-soft text-[8px] text-brand-red">Isolated silo</MicroTag>
    </div>
  );
}

export function SystemTopologyDiagram() {
  return (
    <DiagramShell
      label="System Topology"
      badge={
        <DiagramBadge tone="danger">
          <Image src="/problem/dot-red.svg" alt="" width={5} height={5} className="size-[5px]" />
          4 disconnected
        </DiagramBadge>
      }
    >
      <div className="flex w-full flex-1 flex-col justify-center gap-4">
        <div className="flex w-full items-center justify-center">
          <div className="flex w-[70px] shrink-0 flex-col items-center">
            <NodeChip icon="/problem/node-user.svg" label="CRM" />
          </div>
          <BrokenLink />
          <div className="flex w-[70px] shrink-0 flex-col items-center">
            <NodeChip icon="/problem/file.svg" label="Claims" />
          </div>
          <BrokenLink />
          <div className="flex w-[70px] shrink-0 flex-col items-center">
            <NodeChip label="Policy" />
          </div>
        </div>

        {/* Two stubs dropping from the top row toward the isolated nodes below. */}
        <div className="relative flex h-6 w-full items-start justify-center">
          <span className="absolute top-0 left-[35px] h-6 w-px bg-neutral-200" />
          <span className="absolute top-0 right-[35px] h-6 w-px bg-neutral-200" />
        </div>

        <div className="flex w-full items-center justify-center">
          <SiloNode>
            <NodeChip icon="/problem/wallet.svg" label="Billing" isolated />
          </SiloNode>
          <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1">
            <span className="h-px w-full bg-neutral-100" />
            <MicroTag className="bg-neutral-100 text-[8px] text-neutral-400">No sync</MicroTag>
          </div>
          <SiloNode>
            <NodeChip label="Core" isolated />
          </SiloNode>
        </div>
      </div>

      <DiagramCallout
        icon="/problem/slash.svg"
        title="Data Lost in Transit"
        detail="Manual re-entry required across 4 systems"
      />
    </DiagramShell>
  );
}
