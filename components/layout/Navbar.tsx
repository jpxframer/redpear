"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // The overlay is fixed to the viewport, so it needs the bar's real height to
  // start directly beneath it. Measured rather than hard-coded so changing the
  // logo size or padding cannot silently leave a gap or an overlap.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const measure = () => setHeaderHeight(el.offsetHeight);
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
      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-neutral-200 bg-brand-white"
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
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-1 text-body-lg text-neutral-500 transition-colors hover:text-brand-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Wrapped rather than given `hidden` directly: Button sets its own
              display utility, and Tailwind resolves conflicting display classes by
              property order, not by class-attribute order. */}
          <div className="hidden lg:block">
            <Button href="#demo">Book a Demo</Button>
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
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-neutral-200 py-4 text-body-lg text-neutral-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <Button href="#demo" className="w-full" onClick={() => setMenuOpen(false)}>
              Book a Demo
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}
