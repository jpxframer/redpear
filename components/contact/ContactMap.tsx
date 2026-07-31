/**
 * The real Google Map that replaces Figma's flat screenshot.
 *
 * Two URL shapes, because the official one needs a key and the site should not
 * ship a broken map while that is being sorted out:
 *
 * 1. **Maps Embed API** (`/maps/embed/v1/place`) when
 *    `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set. This is the documented, supported
 *    product — free for `place` mode, but the key must exist and be restricted.
 * 2. **The keyless `output=embed` URL** otherwise. It works today with no setup,
 *    which is why it is the fallback, but it is *not* a documented API and Google
 *    can change it without notice. Treat it as a stopgap, not the destination.
 *
 * Set the key and the component silently upgrades — see `.env.example`.
 *
 * `NEXT_PUBLIC_` means the key is inlined into the client bundle and is public by
 * design. That is normal for Maps keys and is exactly why the restriction matters:
 * lock it to an HTTP referrer (`redpear.vercel.app/*`, plus localhost for dev) and
 * to the Maps Embed API in the Google Cloud console, or anyone can spend your
 * quota.
 */
const ADDRESS = "19 Kofi Annan Street, Airport Residential Area, Accra, Ghana";
const ZOOM = 16;

export function ContactMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const src = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(ADDRESS)}&zoom=${ZOOM}`
    : `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=${ZOOM}&output=embed`;

  return (
    // Same card as the screenshot sat in: 24px padding at both breakpoints, and
    // an inner 483px box that keeps the height Figma draws on desktop and mobile.
    <div className="gloss-white rounded-2xl bg-brand-white p-6">
      <div className="h-[483px] w-full overflow-hidden rounded-2xl bg-neutral-100">
        <iframe
          src={src}
          title={`Google Map showing the RedPear office at ${ADDRESS}`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0"
        />
      </div>
    </div>
  );
}
