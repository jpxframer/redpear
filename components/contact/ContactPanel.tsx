import { IconBadge } from "@/components/ui/IconBadge";

/**
 * Figma carries no hrefs for these, so they are placeholders like the footer's.
 *
 * LinkedIn and Instagram are a different icon set from `public/social/` — same
 * brands, different drawings — so they get their own files rather than reusing
 * the footer's. Both export as 20.5x20.5 *partial frames* that Figma centres in a
 * 24px slot, which is exactly what `IconBadge`'s `sizeClass` is for.
 *
 * X is the exception: Figma had the **XRP (Ripple) mark** there, a different logo
 * that looks alike at 24px. Replaced on the user's instruction with the official
 * X glyph the footer already uses, recoloured red for the white badge — so the
 * two rows on this page now show the same three brands.
 */
const socials = [
  {
    name: "LinkedIn",
    href: "#",
    icon: "/contact/linkedin.svg",
    sizeClass: "size-[20.5px]",
    size: 21,
  },
  {
    name: "Instagram",
    href: "#",
    icon: "/contact/instagram.svg",
    sizeClass: "size-[20.5px]",
    size: 21,
  },
  { name: "X", href: "#", icon: "/contact/x.svg", sizeClass: "size-6", size: 24 },
];

export function ContactPanel() {
  return (
    // The three headings are `text-h5` (24/32) at both breakpoints where Figma
    // sets 28/36 — stepped down on the user's instruction, 2026-07-31. Deliberate
    // divergence; the frame still says 28.
    //
    // Figma spells the space above "Follow Us On" as a literal 150px gap on
    // desktop and 16px on mobile. justify-between says the same thing without the
    // magic number, and survives the copy changing length. It costs 6px: the
    // panel stretches to the form column's height rather than sitting 6px shorter
    // and vertically centred against it, so the gap lands at 156 rather than 150.
    <div className="gloss-cta flex flex-col gap-4 rounded-2xl bg-brand-red p-4 lg:w-[402px] lg:shrink-0 lg:justify-between lg:gap-0 lg:p-6">
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-h5 font-medium text-brand-white">Address</h2>
          <p className="text-body-md text-neutral-200">
            19 Kofi Annan Street Airport Residential Area
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-display text-h5 font-medium text-brand-white">Contact</h2>
          {/* The label half of each line is white, the value neutral-200. */}
          <div className="flex flex-col gap-2 text-body-md text-neutral-200">
            <p>
              <span className="text-brand-white">Call Us On: </span>
              +233 (0) 26 620 5291
            </p>
            <p>
              <span className="text-brand-white">Email: </span>
              +233 (0) 26 620 5291
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-display text-h5 font-medium text-brand-white">Follow Us On</h2>
        <ul className="flex gap-4">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                aria-label={social.name}
                className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white"
              >
                <IconBadge
                  variant="white"
                  src={social.icon}
                  sizeClass={social.sizeClass}
                  width={social.size}
                  height={social.size}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
