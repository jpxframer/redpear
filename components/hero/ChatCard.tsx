import Image from "next/image";
import type { ReactNode } from "react";

type Message = {
  id: string;
  from: "agent" | "customer";
  body: ReactNode;
};

const messages: Message[] = [
  { id: "m1", from: "agent", body: "Hi Ama 👋 What would you like to do today?" },
  { id: "m2", from: "customer", body: "I'd like to buy motor insurance." },
  {
    id: "m3",
    from: "agent",
    body: "Great! I'll get a quick quote for you. What type of vehicle do you have?",
  },
  { id: "m4", from: "customer", body: "Toyota Corolla 2018" },
  {
    id: "m5",
    from: "agent",
    body: (
      <>
        Perfect. Your comprehensive quote is{" "}
        <strong className="font-bold">GHS 1,450 per year</strong>. Shall I proceed?
      </>
    ),
  },
  { id: "m6", from: "customer", body: "Yes, let's do it." },
  { id: "m7", from: "agent", body: "🎉 Payment successful. Your policy is now active." },
];

export function ChatCard() {
  return (
    <div className="gloss-white w-full rounded-2xl bg-brand-white px-2 py-4 lg:w-[588px] lg:shrink-0 lg:p-4">
      <div className="w-full overflow-hidden rounded-3xl border border-surface-hairline bg-white shadow-[0_16px_32px_0_rgb(0_0_0/0.05)]">
        <header className="flex w-full items-center justify-between border-b border-surface px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="gloss-avatar flex size-10 items-center justify-center rounded-full bg-brand-red">
              <span className="font-display text-[18px] font-bold text-white">M</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <p className="text-[15px] font-semibold text-ink">Maya</p>
                <Image
                  src="/icons/dot-green.svg"
                  alt=""
                  width={6}
                  height={6}
                  className="size-1.5"
                />
                <span className="sr-only">Online</span>
              </div>
              <p className="text-[12px] text-ink-muted">Insurance Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Image src="/icons/video.svg" alt="" width={20} height={20} className="size-5" />
            <Image src="/icons/phone.svg" alt="" width={18} height={18} className="size-[18px]" />
            <Image
              src="/icons/more-vertical.svg"
              alt=""
              width={18}
              height={18}
              className="size-[18px]"
            />
          </div>
        </header>

        <div className="flex h-[460px] w-full flex-col gap-3 overflow-hidden bg-chat-canvas p-5 lg:h-[442px]">
          {messages.map((message) => {
            const isAgent = message.from === "agent";
            return (
              <div
                key={message.id}
                className={`flex w-full items-start ${isAgent ? "" : "justify-end"}`}
              >
                <div
                  className={`flex max-w-[292px] flex-col items-start rounded-b-xl p-3 text-[13px] leading-[1.4] text-ink lg:max-w-[360px] ${
                    isAgent ? "rounded-tr-xl bg-white" : "rounded-tl-xl bg-chat-outbound"
                  }`}
                >
                  <p className="w-full">{message.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <footer className="flex w-full items-center gap-3 border-t border-surface px-4 py-3">
          <Image src="/icons/smile.svg" alt="" width={20} height={20} className="size-5" />
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-surface px-3.5 py-2">
            <p className="min-w-0 flex-1 text-[13px] text-ink-faint">Type a message...</p>
            <Image
              src="/icons/paperclip.svg"
              alt=""
              width={16}
              height={16}
              className="size-4"
            />
          </div>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-positive">
            <Image src="/icons/mic.svg" alt="" width={16} height={16} className="size-4" />
          </div>
        </footer>
      </div>
    </div>
  );
}
