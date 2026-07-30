import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const base =
  "relative inline-flex items-center justify-center rounded-lg px-6 py-2 text-body-lg transition-transform duration-150 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

const variants: Record<Variant, string> = {
  primary: "gloss-red bg-brand-red font-semibold text-brand-white",
  secondary: "gloss-white bg-brand-white font-normal text-brand-black",
};

type ButtonProps = {
  variant?: Variant;
  href: string;
} & Omit<ComponentProps<typeof Link>, "href">;

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
