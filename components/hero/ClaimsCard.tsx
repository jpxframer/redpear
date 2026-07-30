import Image from "next/image";

const legend = [
  { label: "Approved", value: "62%", dot: "/icons/dot-green.svg" },
  { label: "In Review", value: "25%", dot: "/icons/dot-amber.svg" },
  { label: "Pending", value: "13%", dot: "/icons/dot-grey.svg" },
];

export function ClaimsCard() {
  return (
    <article className="gloss-white flex h-[380px] w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-surface bg-brand-white p-6">
      <header className="flex w-full items-center justify-between">
        <h3 className="text-[14px] font-semibold text-ink">Claims Overview</h3>
        <div className="flex items-center gap-1 rounded-md bg-surface px-2.5 py-1">
          <span className="text-[11px] font-medium text-ink-muted">This Month</span>
          <Image
            src="/icons/chevron-down.svg"
            alt=""
            width={10}
            height={10}
            className="size-2.5"
          />
        </div>
      </header>

      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-[11px] text-ink-muted">Total Claims</p>
          <p className="font-display text-[28px] font-bold text-ink">1,248</p>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/arrow-up-sm.svg"
              alt=""
              width={10}
              height={10}
              className="size-2.5"
            />
            <p className="text-[10px] font-semibold text-positive">+28%</p>
          </div>
        </div>
        <Image
          src="/chart/sparkline.svg"
          alt="Claims trend, rising over the month"
          width={120}
          height={35}
          className="h-[35px] w-[120px]"
        />
      </div>

      <hr className="w-full border-t border-surface" />

      <div className="flex w-full items-center gap-4">
        <Image
          src="/chart/donut.svg"
          alt="Claim status split: 62% approved, 25% in review, 13% pending"
          width={76}
          height={76}
          className="size-[76px] shrink-0"
        />
        <dl className="flex min-w-0 flex-1 flex-col gap-1.5">
          {legend.map((item) => (
            <div key={item.label} className="flex w-full items-center justify-between">
              <dt className="flex items-center gap-1.5">
                <Image
                  src={item.dot}
                  alt=""
                  width={6}
                  height={6}
                  className="size-1.5"
                />
                <span className="text-[11px] text-ink-muted">{item.label}</span>
              </dt>
              <dd className="text-[11px] font-semibold text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <hr className="w-full border-t border-surface" />

      <a href="#claims" className="flex items-center gap-1.5">
        <span className="text-[12px] font-semibold text-brand-red">View all claims</span>
        <Image
          src="/icons/arrow-right.svg"
          alt=""
          width={14}
          height={14}
          className="size-3.5"
        />
      </a>
    </article>
  );
}
