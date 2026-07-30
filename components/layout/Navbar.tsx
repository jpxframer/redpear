"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // The mobile sheet covers the page, so stop the body scrolling behind it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-brand-white">
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
            src="/icons/menu.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-neutral-200 bg-brand-white px-4 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-body-lg text-neutral-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="#demo" className="mt-2 w-full" onClick={() => setMenuOpen(false)}>
            Book a Demo
          </Button>
        </nav>
      )}
    </header>
  );
}
