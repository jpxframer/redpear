import Image from "next/image";

// The designed row repeats a few brands to fill the width; keys are positional
// because the same logo legitimately appears more than once.
const insurers = [
  { name: "Old Mutual", src: "/insurers/oldmutual.png", width: 59 },
  { name: "Hollard", src: "/insurers/hollard.png", width: 60 },
  { name: "Glico", src: "/insurers/glico.png", width: 59 },
  { name: "Hollard", src: "/insurers/hollard.png", width: 59 },
  { name: "ILA", src: "/insurers/ila.png", width: 59 },
  { name: "BAS Capital", src: "/insurers/bascapital.png", width: 59 },
  { name: "Glico", src: "/insurers/glico.png", width: 59 },
  { name: "Sunu", src: "/insurers/sunu.png", width: 59 },
  { name: "Vanguard", src: "/insurers/vanguard.png", width: 59 },
  { name: "BAS Capital", src: "/insurers/bascapital.png", width: 59 },
];

export function InsurerLogos() {
  return (
    <div className="flex w-full flex-col items-center gap-4 lg:gap-6">
      <h2 className="w-full text-center font-display text-h3-mobile font-medium text-brand-black lg:text-h3">
        Trusted by Africa&apos;s Leading Insurers
      </h2>
      <ul className="flex w-full items-center gap-6 overflow-x-auto pb-1 lg:justify-between lg:gap-0 lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {insurers.map((insurer, index) => (
          <li key={`${insurer.name}-${index}`} className="shrink-0">
            <Image
              src={insurer.src}
              alt={insurer.name}
              width={insurer.width}
              height={32}
              className="h-8 w-auto object-contain object-bottom"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
