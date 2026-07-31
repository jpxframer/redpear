import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const base =
  "relative inline-flex items-center justify-center rounded-lg px-6 py-2 text-body-lg transition-transform duration-150 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

const variants: Record<Variant, string> = {
  primary: "gloss-red bg-brand-red font-semibold text-brand-white",
  secondary: "gloss-white bg-brand-white font-normal text-brand-black",
};

/**
 * The button's *look*, separated from the element it renders.
 *
 * `Button` below is always a `Link`, which is right for every CTA on the site —
 * they all navigate. The contact form's submit is the one control that must be a
 * real `<button type="submit">`, so it pulls the same class list through here
 * rather than restating it and drifting.
 */
export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

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
    <Link href={href} className={buttonClasses(variant, className)} {...props}>
      {children}
    </Link>
  );
}
