import Image from "next/image";

// Figma gives every logo an identical 59x32 box (60 for Hollard) and lets the
// artwork sit on a common baseline inside it, so heights vary but widths do not.
// Sizing by height instead would upscale the wide, short marks past their native
// resolution — the source PNGs are only 128px wide. The box classes are written
// as literals so Tailwind's scanner picks them up.
const insurers = [
  { name: "Old Mutual", src: "/insurers/oldmutual.png", width: 59, box: "w-[59px]" },
  { name: "Hollard", src: "/insurers/hollard.png", width: 60, box: "w-[60px]" },
  { name: "Glico", src: "/insurers/glico.png", width: 59, box: "w-[59px]" },
  { name: "Hollard", src: "/insurers/hollard.png", width: 59, box: "w-[59px]" },
  { name: "ILA", src: "/insurers/ila.png", width: 59, box: "w-[59px]" },
  { name: "BAS Capital", src: "/insurers/bascapital.png", width: 59, box: "w-[59px]" },
  { name: "Glico", src: "/insurers/glico.png", width: 59, box: "w-[59px]" },
  { name: "Sunu", src: "/insurers/sunu.png", width: 59, box: "w-[59px]" },
  { name: "Vanguard", src: "/insurers/vanguard.png", width: 59, box: "w-[59px]" },
  { name: "BAS Capital", src: "/insurers/bascapital.png", width: 59, box: "w-[59px]" },
];

export function InsurerLogos() {
  return (
    <div className="flex w-full flex-col items-center gap-4 lg:gap-6">
      <h2 className="w-full text-center font-display text-h3-mobile font-medium text-brand-black lg:text-h3">
        Trusted by Africa&apos;s Leading Insurers
      </h2>
      <ul className="flex w-full items-end gap-6 overflow-x-auto pb-1 lg:justify-between lg:gap-0 lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {insurers.map((insurer, index) => (
          <li
            key={`${insurer.name}-${index}`}
            className={`flex h-8 shrink-0 items-end ${insurer.box}`}
          >
            <Image
              src={insurer.src}
              alt={insurer.name}
              width={insurer.width}
              height={32}
              className="h-auto max-h-full w-full object-contain object-bottom"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
