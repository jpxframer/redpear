import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

// Figma gives no hrefs for these. Anchors point at the sections that exist;
// the rest are placeholders until real pages do.
const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Blog & Insights", href: "#blog" },
      { label: "Contact Support", href: "#contact" },
      { label: "Careers", href: "#careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AI Claim Assistant", href: "#services" },
      { label: "WhatsApp Platforms", href: "#services" },
      { label: "Insurance API Suite", href: "#services" },
      { label: "Transformation Consulting", href: "#services" },
    ],
  },
];

const socials = [
  { name: "X", href: "#", icon: "/social/x.svg" },
  { name: "Instagram", href: "#", icon: "/social/instagram.svg" },
  { name: "LinkedIn", href: "#", icon: "/social/linkedin.svg" },
];

export function Footer() {
  return (
    <footer className="bg-brand-white px-4 py-6 lg:px-28 lg:py-[50px]">
      <div className="mx-auto flex w-full max-w-content flex-col gap-6 lg:gap-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-center lg:gap-8">
          <div className="flex w-full flex-col justify-center gap-4 lg:min-w-0 lg:flex-1">
            <div className="flex w-full flex-col justify-center gap-2">
              <Image
                src="/brand/redpear-logo.svg"
                alt="RedPear"
                width={70}
                height={48}
                className="h-[48.05px] w-[70px]"
              />
              <p className="text-body-lg text-neutral-500">
                The Entire Insurance Journey, Inside WhatsApp
              </p>
            </div>
            <NewsletterForm />
          </div>

          {/* items-start keeps each column sized to its own content. Without it the
              columns stretch to match the tallest, and their contents end up
              vertically centred against it — noticeable on mobile, where
              "Transformation Consulting" wraps and makes the Services column taller. */}
          <nav
            aria-label="Footer"
            className="flex w-full flex-wrap items-start gap-x-4 gap-y-6 lg:min-w-0 lg:flex-1 lg:flex-nowrap lg:justify-end lg:gap-6"
          >
            {columns.map((column) => (
              <div key={column.title} className="flex min-w-0 flex-1 flex-col gap-2">
                <h2 className="text-body-lg font-medium text-brand-black">
                  {column.title}
                </h2>
                <ul className="flex flex-col justify-center gap-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="block py-1 text-body-lg text-neutral-500 transition-colors hover:text-brand-black"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <p className="text-body-lg text-neutral-500 lg:min-w-0 lg:flex-1">
            © 2026 RedPear. All rights reserved.
          </p>
          {/* Figma pads this 90px from the right rather than sitting flush. */}
          <div className="flex items-center gap-2 pr-[90px] lg:min-w-0 lg:flex-1 lg:justify-end">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="flex items-center justify-center p-2"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
