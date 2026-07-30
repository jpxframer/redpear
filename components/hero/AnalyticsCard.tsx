import Image from "next/image";

const avatars = [
  { src: "/avatars/avatar-1.png", alt: "" },
  { src: "/avatars/avatar-2.png", alt: "" },
  { src: "/avatars/avatar-3.png", alt: "" },
];

export function AnalyticsCard() {
  return (
    <article className="gloss-white flex h-[380px] w-[280px] shrink-0 flex-col justify-between rounded-2xl border border-surface bg-brand-white p-6">
      <header className="flex w-full flex-col gap-1.5">
        <div className="flex w-fit items-start rounded-lg bg-surface p-2">
          <Image
            src="/icons/message-square.svg"
            alt=""
            width={18}
            height={18}
            className="size-[18px]"
          />
        </div>
        <p className="text-[14px] font-medium text-ink-muted">Conversations Handled</p>
      </header>

      <div className="flex w-full flex-col gap-1">
        <p className="font-display text-[48px] font-bold text-ink">2M+</p>
        <div className="flex items-center gap-1.5">
          <Image
            src="/icons/phone-small.svg"
            alt=""
            width={12}
            height={12}
            className="size-3"
          />
          <p className="text-[12px] text-ink-muted">On WhatsApp</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        <hr className="w-full border-t border-surface" />
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            {avatars.map((avatar) => (
              <Image
                key={avatar.src}
                src={avatar.src}
                alt={avatar.alt}
                width={28}
                height={28}
                className="-mr-2 size-7 rounded-full border-2 border-white object-cover"
              />
            ))}
            <span className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-surface text-[10px] font-semibold text-ink-muted">
              +2k
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/arrow-up.svg"
              alt=""
              width={12}
              height={12}
              className="size-3"
            />
            <p className="text-[11px] font-semibold text-positive">+45% this Quarter</p>
          </div>
        </div>
      </div>
    </article>
  );
}
