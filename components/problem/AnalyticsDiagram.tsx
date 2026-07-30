import Image from "next/image";
import type { ReactNode } from "react";
import { DiagramBadge, DiagramCallout, DiagramShell } from "./ProblemCard";

// Two months have no data behind them, which is the whole point of the card.
const months = [
  { label: "Jul", height: "h-[38px]" },
  { label: "Aug", height: "h-[28px]" },
  { label: "Sep", height: "h-[40px]", missing: true },
  { label: "Oct", height: "h-[22px]" },
  { label: "Nov", height: "h-[34px]", missing: true },
  { label: "Dec", height: "h-[16px]" },
];

function Kpi({
  shell,
  icon,
  label,
  labelClass,
  value,
  valueClass,
  note,
  noteClass,
}: {
  shell: string;
  icon?: ReactNode;
  label: string;
  labelClass: string;
  value: string;
  valueClass: string;
  note: string;
  noteClass: string;
}) {
  return (
    <div className={`flex min-w-0 flex-1 flex-col gap-1 rounded-lg border px-2.5 py-2 ${shell}`}>
      <div className="flex items-center gap-1">
        {icon}
        <p className={`text-[9px] whitespace-nowrap ${labelClass}`}>{label}</p>
      </div>
      <p className={`text-[16px] font-bold whitespace-nowrap ${valueClass}`}>{value}</p>
      <p className={`text-[8px] ${noteClass}`}>{note}</p>
    </div>
  );
}

export function AnalyticsDiagram() {
  return (
    <DiagramShell
      label="Analytics Dashboard"
      badge={<DiagramBadge tone="danger">Data Missing</DiagramBadge>}
    >
      <div className="flex w-full flex-col gap-1.5">
        <p className="text-[9px] text-neutral-400">Policy Sales - Last 6 Months</p>
        <div className="flex h-[52px] w-full items-end gap-1.5">
          {months.map((month) => (
            <div
              key={month.label}
              className="flex h-[52px] min-w-0 flex-1 flex-col items-center justify-end gap-[3px]"
            >
              {month.missing ? (
                <div
                  className={`flex w-full items-center justify-center rounded-t-[3px] border border-dashed border-danger-border bg-danger-pale ${month.height}`}
                >
                  <span className="text-[10px] font-bold text-brand-red">?</span>
                </div>
              ) : (
                <div className={`w-full rounded-t-[3px] bg-neutral-200 ${month.height}`} />
              )}
              <span
                className={`text-[8px] ${month.missing ? "text-brand-red" : "text-neutral-400"}`}
              >
                {month.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full items-start gap-2">
        <Kpi
          shell="border-neutral-200 bg-white"
          label="Renewals"
          labelClass="text-neutral-400"
          value="-"
          valueClass="text-neutral-300"
          note="No data source"
          noteClass="text-brand-red"
        />
        <Kpi
          shell="border-neutral-200 bg-white"
          icon={
            <Image src="/problem/clock.svg" alt="" width={12} height={12} className="size-3" />
          }
          label="Revenue"
          labelClass="text-neutral-400"
          value="$24k"
          valueClass="text-neutral-700"
          note="Stale - 30d ago"
          noteClass="text-warn-mid"
        />
        <Kpi
          shell="border-danger-border bg-danger-pale"
          icon={
            <Image src="/problem/eye-off.svg" alt="" width={12} height={12} className="size-3" />
          }
          label="Claims"
          labelClass="text-brand-red"
          value="?"
          valueClass="text-brand-red"
          note="Blind spot"
          noteClass="text-brand-red"
        />
      </div>

      <DiagramCallout
        icon="/problem/chart-column.svg"
        title="No Real-Time Visibility"
        detail="Decisions made on incomplete data"
      />
    </DiagramShell>
  );
}
