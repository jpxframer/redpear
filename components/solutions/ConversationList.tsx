import Image from "next/image";
import { PreviewPanel } from "./SolutionCard";

export function ConversationList() {
  return (
    <PreviewPanel className="flex h-[153px] w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[5px]">
          <span className="flex size-4 items-center justify-center rounded-lg bg-brand-red font-display text-[7px] font-bold text-white">
            M
          </span>
          <span className="text-[8px] font-semibold text-brand-black">Maya</span>
          <Image
            src="/solutions/online-dot.svg"
            alt=""
            width={5}
            height={5}
            className="size-[5px]"
          />
        </div>
        <span className="text-[7px] text-neutral-400">9:41 AM</span>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-end gap-1">
          <div className="max-w-[140px] rounded-tl-[2px] rounded-tr-lg rounded-b-lg bg-neutral-100 px-[7px] py-[5px]">
            <p className="text-[8px] text-brand-black">
              Hi! I&apos;d like a motor insurance quote. 🚗
            </p>
          </div>
          <span className="text-[6px] text-neutral-400">9:40</span>
        </div>

        <div className="flex w-full items-end justify-end gap-1">
          <span className="text-[6px] text-neutral-400">9:41</span>
          <div className="max-w-[140px] rounded-tl-lg rounded-tr-[2px] rounded-b-lg bg-chat-outbound px-[7px] py-[5px]">
            <p className="text-[8px] text-brand-black">
              Sure! Toyota Corolla 2018 - GHS 1,450/yr 🎉
            </p>
          </div>
        </div>

        <div className="flex w-full items-center gap-1">
          <Image
            src="/solutions/typing-bubble.svg"
            alt=""
            width={36}
            height={14}
            className="h-[14px] w-9"
          />
          <span className="text-[7px] text-neutral-400">Maya is typing...</span>
        </div>
      </div>
    </PreviewPanel>
  );
}
