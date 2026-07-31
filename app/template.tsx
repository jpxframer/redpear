/**
 * Next remounts `template.tsx` on every navigation, where `layout.tsx` is kept
 * alive — which is the whole reason this file exists. Remounting restarts the
 * CSS animation, so the page content fades up on each route change without a
 * single line of JavaScript or any dependency.
 *
 * The Navbar and Footer are deliberately *outside* this, in the layout. They
 * persist across navigations, so the bar does not flash and only the page body
 * animates. That is also what stops the transform here from breaking the
 * navbar's `position: sticky` — a transformed ancestor becomes the containing
 * block for anything positioned inside it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
