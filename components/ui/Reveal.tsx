"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps a section so it eases up into place the first time it is scrolled into
 * view. The motion itself lives in globals.css under `[data-reveal]`; this only
 * decides *when* to flip the attribute.
 *
 * **The failure mode to keep in mind is that the hidden state is the default.**
 * A section starts at `opacity: 0`, so anything that stops this component from
 * running leaves that section permanently invisible rather than merely
 * unanimated. Three things guard against that:
 *
 * 1. **No IntersectionObserver** — shown immediately, no observer, no animation.
 * 2. **Reduced motion** — globals.css forces every `[data-reveal]` visible, so
 *    the attribute never has to be flipped for those users at all.
 * 3. **JavaScript disabled** — a `<noscript>` block in layout.tsx overrides the
 *    same way. That one is easy to lose track of: it is the only guard that does
 *    not live in this file.
 *
 * Observation stops once a section has appeared. These are entrances, not
 * scroll-linked effects — re-hiding a section when it leaves the viewport makes
 * scrolling back up feel broken, and it keeps a callback alive for the life of
 * the page for no reason.
 */
export function Reveal({
  children,
  className,
  rise = true,
}: {
  children: ReactNode;
  className?: string;
  /**
   * Set `false` for any section that is an **anchor target** (`#demo`, `#blog`,
   * `#about`, `#services`). Those fade without the 16px rise, and the difference
   * is not cosmetic.
   *
   * A hidden section sits at `translateY(16px)`, and transforms move an element's
   * box for scrolling purposes as well as visually. So the browser scrolls to the
   * shifted position, the reveal then fires part-way through that scroll and lifts
   * the section 16px — and it settles that far under the fixed navbar. Measured at
   * 17px of overlap on `#blog` before this existed.
   *
   * Only an ancestor transform causes it, so there is no arrangement of wrappers
   * that keeps the rise and lands the anchor correctly. Dropping the transform for
   * these few sections is the fix.
   */
  rise?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.dataset.reveal = "shown";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "shown");
          observer.unobserve(entry.target);
        }
      },
      {
        // Hold off until the section is 10% of the viewport past the bottom
        // edge, so it is settling as it arrives rather than finishing its
        // animation somewhere off-screen where nobody sees it.
        rootMargin: "0px 0px -10% 0px",
        threshold: 0,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={rise ? "" : "fade"} className={className}>
      {children}
    </div>
  );
}
