import Image from "next/image";

// Figma sizes every logo frame at 59x32, except Hollard at 60x32, at both
// breakpoints. The box classes are literals so Tailwind's scanner picks them up.
// object-contain keeps each mark undistorted inside its box — the source PNGs
// range from 4.6:1 to 1.9:1, so stretching them to fill would badly squash the
// wide ones.
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

/**
 * One full pass of the logo list.
 *
 * The gap lives as padding-right on each item rather than as a flex `gap`, so a
 * copy's width includes its own trailing space. Two copies then sit flush and
 * translating -50% lands exactly on the second copy's first logo. With a flex
 * gap there would be one extra gap between the copies and the loop would drift.
 */
function LogoRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-end">
      {insurers.map((insurer, index) => (
        <li
          key={`${insurer.name}-${index}`}
          className={`flex h-8 shrink-0 items-end pr-6 lg:pr-16 ${insurer.box} box-content`}
        >
          <Image
            src={insurer.src}
            alt={hidden ? "" : insurer.name}
            width={insurer.width}
            height={32}
            className="h-auto max-h-full w-full object-contain object-bottom"
          />
        </li>
      ))}
    </ul>
  );
}

export function InsurerLogos() {
  return (
    <div className="flex w-full flex-col items-center gap-4 lg:gap-6">
      <h2 className="w-full text-center font-display text-h3-mobile font-medium text-brand-black lg:text-h3">
        Trusted by Africa&apos;s Leading Insurers
      </h2>

      {/* Capped at the 1216px content column so the row never spans a wide
          monitor. The mask fades both edges so logos do not hard-cut at the
          boundary — our addition, not in the Figma frame. */}
      <div
        className="mx-auto w-full max-w-content overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        {/* Deliberately NOT gated on prefers-reduced-motion. The user asked for
            this row to scroll on every device (2026-07-31); an earlier
            `motion-reduce:animate-none` froze it for anyone with iOS Reduce
            Motion, Android "Remove animations" or a battery saver switched on.
            Do not re-add it without asking. The hover pause stays — Tailwind v4
            already scopes `hover:` to `@media (hover: hover)`, so it cannot
            stick on a touch device after a tap. */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <LogoRun />
          <LogoRun hidden />
        </div>
      </div>
    </div>
  );
}
