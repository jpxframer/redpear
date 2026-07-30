import Image from "next/image";
import type { ReactNode } from "react";

function BotAvatar() {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-red font-display text-[11px] font-bold text-white">
      M
    </span>
  );
}

/** Inbound message from Maya: avatar on the left, flat top-left corner. */
function FromBot({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-end gap-2">
      <BotAvatar />
      {children}
    </div>
  );
}

function BotBubble({ body, time }: { body: ReactNode; time: string }) {
  return (
    <div className="flex w-[260px] max-w-[280px] flex-col gap-1 rounded-tl-[2px] rounded-tr-2xl rounded-b-2xl bg-white p-3 drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.04)]">
      <p className="text-[13px] leading-[18px] text-ink">{body}</p>
      <p className="text-[10px] text-neutral-400">{time}</p>
    </div>
  );
}

/** Outbound message from the customer: flat top-right corner, read ticks. */
function FromCustomer({ body, time, ticks = true }: { body: string; time: string; ticks?: boolean }) {
  return (
    <div className="flex w-full items-start justify-end">
      <div className="flex max-w-[280px] flex-col gap-1 rounded-tl-2xl rounded-tr-[2px] rounded-b-2xl bg-chat-outbound p-3">
        <p className="text-[13px] leading-[18px] text-ink">{body}</p>
        <div className="flex w-full items-center justify-end gap-1">
          <p className="text-[10px] text-neutral-400">{time}</p>
          {ticks && (
            <Image
              src="/platform/ticks.svg"
              alt=""
              width={14}
              height={8}
              className="h-2 w-3.5"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function QuoteRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-start justify-between text-[11px] whitespace-nowrap">
      <p className="text-neutral-500">{label}</p>
      <p className="font-semibold text-ink">{value}</p>
    </div>
  );
}

export function PlatformChat() {
  return (
    <div className="gloss-white flex h-[460px] w-full flex-col items-start overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_4px_10px_0_rgb(0_0_0/0.15)] lg:absolute lg:top-[50px] lg:right-[19px] lg:w-[485px]">
      <header className="flex w-full items-center justify-between bg-brand-black px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="gloss-avatar flex size-10 items-center justify-center rounded-2xl bg-brand-red">
            <span className="font-display text-[14px] font-bold text-white">M</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <p className="font-display text-[15px] font-semibold text-white">Maya</p>
              <span className="size-1.5 rounded-[3px] bg-positive" />
            </div>
            <p className="text-[11px] text-neutral-400">AI Insurance Assistant · Online</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Image src="/platform/video.svg" alt="" width={20} height={20} className="size-5" />
          <Image src="/platform/phone.svg" alt="" width={20} height={20} className="size-5" />
        </div>
      </header>

      <div className="flex min-h-0 w-full flex-1 flex-col gap-3 overflow-hidden bg-chat-canvas p-4 leading-[normal]">
        <div className="flex w-full items-start justify-center">
          <span className="rounded-[10px] bg-black/8 px-2.5 py-[3px] text-[10px] text-neutral-500">
            Today, 9:41 AM
          </span>
        </div>

        <FromBot>
          <BotBubble
            time="9:41 AM"
            body="Hi Ama 👋 Welcome to RedPear Insurance. I'm Maya, your AI assistant. What can I help you with today?"
          />
        </FromBot>

        <FromCustomer body="I'd like to buy motor insurance for my car. 🚗" time="9:42 AM" />

        <FromBot>
          <BotBubble
            time="9:42 AM"
            body="Great! I can help with that. What type of vehicle do you own?"
          />
        </FromBot>

        <FromCustomer body="Toyota Corolla 2018, petrol" time="9:43 AM" />

        <FromBot>
          <div className="flex w-[260px] max-w-[280px] flex-col overflow-hidden rounded-tl-[2px] rounded-tr-2xl rounded-b-2xl bg-white shadow-[0_1px_3px_0_rgb(0_0_0/0.04)]">
            <div className="w-full bg-brand-black px-3 py-2.5">
              <p className="text-[11px] font-semibold text-white">
                🛡️ Comprehensive Motor Quote
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 p-3">
              <QuoteRow label="Vehicle" value="Toyota Corolla 2018" />
              <QuoteRow label="Coverage" value="Comprehensive" />
              <hr className="w-full border-t border-neutral-200" />
              <div className="flex w-full items-center justify-between whitespace-nowrap">
                <p className="text-[11px] text-neutral-500">Annual Premium</p>
                <p className="font-display text-[18px] font-bold text-brand-black">GHS 1,450</p>
              </div>
              <div className="flex w-full items-start gap-2">
                <span className="min-w-0 flex-1 rounded-lg bg-brand-red py-2 text-center text-[11px] font-semibold text-white">
                  Accept &amp; Pay
                </span>
                <span className="min-w-0 flex-1 rounded-lg bg-neutral-100 py-2 text-center text-[11px] font-medium text-neutral-500">
                  Decline
                </span>
              </div>
            </div>
            <div className="w-full px-3 pt-1 pb-2">
              <p className="text-[10px] text-neutral-400">9:44 AM</p>
            </div>
          </div>
        </FromBot>

        <FromCustomer body="Yes, let's proceed! 🎉" time="9:45 AM" ticks={false} />

        <FromBot>
          <div className="flex w-[260px] max-w-[280px] flex-col gap-1.5 rounded-tl-[2px] rounded-tr-2xl rounded-b-2xl bg-white p-3 drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.04)]">
            <div className="w-full rounded-md bg-[#d1fae5] px-2 py-[3px]">
              <p className="text-[10px] font-semibold text-[#059669]">✓ Payment Successful</p>
            </div>
            <p className="text-[13px] leading-[18px] text-ink">
              🎉 Your policy is now <strong className="font-bold">active</strong>! Policy ID:{" "}
              <span className="font-semibold text-brand-red">POL-00241</span>. Check your
              WhatsApp for the certificate.
            </p>
            <p className="text-[10px] text-neutral-400">9:45 AM</p>
          </div>
        </FromBot>
      </div>

      <footer className="flex w-full items-center gap-2.5 border-t border-neutral-200 bg-white px-3 py-2.5">
        <Image src="/platform/emoji.svg" alt="" width={22} height={22} className="size-[22px]" />
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-2">
          <p className="min-w-0 flex-1 text-[13px] text-ink-faint">Type a message...</p>
          <Image
            src="/platform/attach.svg"
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
        </div>
        <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-positive">
          <Image src="/platform/mic.svg" alt="" width={16} height={16} className="size-4" />
        </div>
      </footer>
    </div>
  );
}
