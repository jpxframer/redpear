"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

// About, Services and Contact are their own routes; Blog is still a landing-page
// section. That href is root-relative rather than a bare fragment so it resolves
// from any page — a bare "#blog" would look for that section on whatever page
// you are already on.
const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Two things need the bar's real height: the overlay, which is fixed to the
  // viewport and has to start directly beneath it, and the spacer below, which
  // holds open the space the bar no longer occupies now that it is fixed.
  // Measured rather than hard-coded so changing the logo size or padding cannot
  // silently leave a gap or an overlap.
  //
  // getBoundingClientRect rather than offsetHeight: the latter rounds to whole
  // pixels, and the bar is 81.05 tall. The spacer has to match it exactly or the
  // whole page sits a fraction high.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const measure = () => setHeaderHeight(el.getBoundingClientRect().height);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The overlay covers the page, so the content behind it must not scroll.
  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    // Crossing into desktop widths hides the toggle, which would otherwise
    // strand the overlay open with no way to close it.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Fixed rather than sticky, on the user's instruction (2026-07-31): sticky
          was letting page content show through the bar while scrolling on some
          browsers. `inset-x-0` is required — a fixed block with auto left/right
          shrinks to fit its contents instead of spanning the viewport. */}
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-brand-white"
      >
        <div className="flex items-center justify-between px-4 py-4 lg:px-28">
          <Link href="/" aria-label="RedPear home" className="shrink-0">
            <Image
              src="/brand/redpear-logo.svg"
              alt="RedPear"
              width={70}
              height={48}
              priority
              className="h-[48.05px] w-[70px]"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-4 lg:flex">
            {navLinks.map((link) => {
              const active = link.href === pathname;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-4 py-1 text-body-lg transition-colors ${
                    active
                      ? "text-brand-red"
                      : "text-neutral-500 hover:text-brand-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Wrapped rather than given `hidden` directly: Button sets its own
              display utility, and Tailwind resolves conflicting display classes by
              property order, not by class-attribute order. */}
          <div className="hidden lg:block">
            <Button href="/#demo">Book a Demo</Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="gloss-red rounded-lg bg-brand-red p-2 lg:hidden"
          >
            <Image
              src={menuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
              alt=""
              width={24}
              height={24}
              className="size-6"
            />
          </button>
        </div>
      </header>

      {/* A fixed bar occupies no space in the flow, so this holds that space open
          and every page starts exactly where it did when the bar was sticky —
          without it the whole site slides up underneath the nav.

          81.05 is the bar's real height (48.05 logo + 32 padding + 1 border) and
          is identical at both breakpoints. It is hard-coded as the server-rendered
          default so there is no jump on hydration, then the measured value takes
          over and keeps it correct if the logo or padding ever change. */}
      <div aria-hidden style={{ height: headerHeight || 81.05 }} />

      {/* Rendered outside the header so it is positioned against the viewport
          rather than the bar. Fixed, so it overlays the page instead of pushing
          it down, and runs to the bottom edge. Figma has no open state for this,
          so the layout below is ours. */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          style={{ top: headerHeight }}
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto bg-brand-white px-4 pt-2 pb-8 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const active = link.href === pathname;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block py-4 text-body-lg ${
                      active ? "text-brand-red" : "text-neutral-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6">
            <Button href="/#demo" className="w-full" onClick={() => setMenuOpen(false)}>
              Book a Demo
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}
