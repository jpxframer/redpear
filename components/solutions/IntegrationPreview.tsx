import Image from "next/image";
import type { ReactNode } from "react";
import { PreviewPanel } from "./SolutionCard";

// Each integration keeps its own pastel tint in the design. One-offs rather than
// tokens, since nothing else on the site uses them.
const integrations = [
  { label: "WhatsApp", tint: "border-[#bbf7d0] bg-[#f0fdf4]" },
  { label: "CRM", tint: "border-[#bfdbfe] bg-[#eff6ff]" },
  { label: "Stripe", tint: "border-[#e9d5ff] bg-[#fdf4ff]" },
];

function Node({
  box,
  label,
  labelClass = "text-neutral-500",
}: {
  box: ReactNode;
  label: string;
  labelClass?: string;
}) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-[3px]">
      {box}
      <span className={`text-[6px] whitespace-nowrap ${labelClass}`}>{label}</span>
    </div>
  );
}

function Connector() {
  return (
    <Image
      src="/solutions/connector-line.png"
      alt=""
      width={18}
      height={1}
      className="h-px w-[18px] shrink-0"
    />
  );
}

export function IntegrationPreview() {
  return (
    <PreviewPanel className="flex h-[128px] w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full items-center justify-between">
        <Node
          label="Database"
          box={
            <span className="flex size-6 items-center justify-center rounded-md border border-[#bfdbfe] bg-[#eff6ff]">
              <Image
                src="/solutions/database.svg"
                alt=""
                width={14}
                height={14}
                className="size-3.5"
              />
            </span>
          }
        />
        <Connector />
        <Node
          label="RedPear"
          labelClass="font-semibold text-brand-red"
          box={
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-red text-[7px] font-bold text-white">
              API
            </span>
          }
        />
        <Connector />
        <Node
          label="Payments"
          box={<span className="size-6 rounded-md border border-[#fed7aa] bg-[#fff7ed]" />}
        />
      </div>

      <div className="flex items-center gap-2">
        {integrations.map((integration, index) => (
          <div key={integration.label} className="flex items-center gap-2">
            {index > 0 && <span className="size-1 rounded-sm bg-brand-red" />}
            <Node
              label={integration.label}
              box={<span className={`size-[22px] rounded-[5px] border ${integration.tint}`} />}
            />
          </div>
        ))}
      </div>
    </PreviewPanel>
  );
}
