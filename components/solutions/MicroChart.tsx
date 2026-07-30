import { PreviewPanel } from "./SolutionCard";

// April is the highlighted column and carries the tooltip.
const columns = [
  { month: "Jan", height: "h-[22px]", tone: "bg-neutral-100" },
  { month: "Feb", height: "h-[30px]", tone: "bg-neutral-100" },
  { month: "Mar", height: "h-[38px]", tone: "bg-brand-red" },
  { month: "Apr", height: "h-[44px]", tone: "bg-brand-red", highlighted: true },
  { month: "May", height: "h-[32px]", tone: "bg-neutral-100" },
  { month: "Jun", height: "h-[36px]", tone: "bg-brand-red" },
];

function LegendItem({ tone, label }: { tone: string; label: string }) {
  return (
    <div className="flex items-center gap-[3px]">
      <span className={`h-[3px] w-2 rounded-sm ${tone}`} />
      <span className="text-[7px] text-neutral-500">{label}</span>
    </div>
  );
}

export function MicroChart() {
  return (
    <PreviewPanel className="flex h-[134px] w-full max-w-[248px] flex-col justify-between">
      <div className="flex w-full items-center justify-between">
        <p className="text-[8px] font-semibold text-brand-black">Premium Revenue</p>
        <div className="flex items-center gap-2">
          <LegendItem tone="bg-brand-red" label="This Yr" />
          <LegendItem tone="bg-neutral-200" label="Last Yr" />
        </div>
      </div>

      <div className="flex h-[90px] w-full items-end gap-1.5">
        <div className="flex h-[56px] flex-col items-start justify-between text-[6px] text-neutral-400">
          <span>4k</span>
          <span>2k</span>
          <span>0</span>
        </div>

        <div className="flex h-[56px] min-w-0 flex-1 flex-col items-start">
          <div className="flex h-[44px] w-full items-end gap-1.5">
            {columns.map((column) => (
              <div
                key={column.month}
                className="relative flex h-full min-w-0 flex-1 flex-col items-center justify-end"
              >
                {column.highlighted && (
                  <span className="absolute -top-[18px] left-1/2 -translate-x-1/2 rounded-[3px] bg-brand-black px-1 py-0.5 text-[6px] font-semibold whitespace-nowrap text-white">
                    $3.8k
                  </span>
                )}
                <div className={`w-full rounded-t-sm ${column.tone} ${column.height}`} />
              </div>
            ))}
          </div>
          <div className="flex w-full gap-1.5 pt-[3px] text-center text-[6px]">
            {columns.map((column) => (
              <span
                key={column.month}
                className={`min-w-0 flex-1 ${
                  column.highlighted ? "font-semibold text-brand-red" : "text-neutral-400"
                }`}
              >
                {column.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PreviewPanel>
  );
}
