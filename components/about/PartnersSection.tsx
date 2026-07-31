import Image from "next/image";

// The same ten slots, in the same order, as the hero marquee — Figma repeats
// Hollard, GLICO and BAS Capital to fill out the grid, so seven files cover ten
// cells. Reuses public/insurers/ unchanged; these exports are byte-identical.
const partners = [
  { name: "Old Mutual", src: "/insurers/oldmutual.png" },
  { name: "Hollard", src: "/insurers/hollard.png" },
  { name: "Glico", src: "/insurers/glico.png" },
  { name: "Hollard", src: "/insurers/hollard.png" },
  { name: "ILA", src: "/insurers/ila.png" },
  { name: "BAS Capital", src: "/insurers/bascapital.png" },
  { name: "Glico", src: "/insurers/glico.png" },
  { name: "Sunu", src: "/insurers/sunu.png" },
  { name: "Vanguard", src: "/insurers/vanguard.png" },
  { name: "BAS Capital", src: "/insurers/bascapital.png" },
];

export function PartnersSection() {
  return (
    <section className="px-4 py-6 lg:px-28 lg:py-[50px]">
      <div className="mx-auto flex max-w-content flex-col gap-6 lg:gap-[50px]">
        <h2 className="text-center font-display text-h3-mobile font-medium text-brand-black lg:text-h2">
          Partners &amp; Clients
        </h2>

        {/* 2x5 on mobile, 5x2 on desktop. The cells are a fixed 89x48 and sit at
            the start of each track, so the row does not stretch to fill 1216 —
            that is how Figma lays it out. */}
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-5">
          {partners.map((partner, index) => (
            <li key={`${partner.name}-${index}`} className="h-12 w-[89px]">
              {/* object-contain, not fill: these marks run from 1.9:1 to 4.6:1
                  against a 1.85:1 box, so stretching would badly squash the wide
                  ones. object-bottom puts them on a common baseline, as in the
                  hero row. */}
              <Image
                src={partner.src}
                alt={partner.name}
                width={89}
                height={48}
                className="h-full w-full object-contain object-bottom"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
