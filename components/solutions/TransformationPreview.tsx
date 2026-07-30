import Image from "next/image";
import { PreviewPanel } from "./SolutionCard";

export function TransformationPreview() {
  return (
    <PreviewPanel className="flex h-[134px] w-full items-center justify-center">
      <div className="flex w-[70px] shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-[#f9fafb] p-2">
        <span className="size-6 rounded-md bg-neutral-100" />
        <span className="text-[8px] font-semibold text-neutral-500">Paper Form</span>
        <div className="flex w-full flex-col gap-0.5">
          <span className="h-[3px] w-full rounded-sm bg-neutral-200" />
          <span className="h-[3px] w-full rounded-sm bg-neutral-200" />
          <span className="h-[3px] w-6 rounded-sm bg-neutral-200" />
        </div>
        <span className="rounded bg-danger-soft px-1.5 py-0.5 text-[6px] font-semibold text-[#dc2626]">
          Manual
        </span>
      </div>

      <div className="flex shrink-0 flex-col items-center justify-center gap-1 px-2">
        <span className="rounded bg-brand-red/8 px-1.5 py-0.5 text-[6px] font-semibold text-brand-red">
          RedPear
        </span>
        <Image
          src="/solutions/arrow-transform.svg"
          alt=""
          width={20}
          height={14}
          className="h-[14px] w-5"
        />
        <span className="text-[6px] text-neutral-400">instant</span>
      </div>

      <div className="flex w-[70px] shrink-0 flex-col items-center justify-center gap-2 rounded-lg bg-brand-black p-2">
        <span className="size-6 rounded-md bg-brand-red" />
        <span className="text-[8px] font-semibold text-white">Digital</span>
        <div className="flex w-full flex-col gap-0.5">
          <span className="h-[3px] w-full rounded-sm bg-white/10" />
          <span className="h-[3px] w-full rounded-sm bg-white/10" />
          <span className="h-[3px] w-6 rounded-sm bg-brand-red" />
        </div>
        <span className="rounded bg-positive px-1.5 py-0.5 text-[6px] font-semibold text-white">
          Live
        </span>
      </div>
    </PreviewPanel>
  );
}
