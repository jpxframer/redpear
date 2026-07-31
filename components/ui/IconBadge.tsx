import Image from "next/image";

/**
 * The red gloss square that heads a card, holding a 24px icon slot.
 *
 * Some Figma icon exports are *partial frames* — the artwork only, cropped tight,
 * with the surrounding padding expressed as insets on the parent. Their viewBox is
 * smaller than 24 (piggy-bank is 21.5x19.5, chart-evaluation is 20x20). Those must
 * render at their natural size centred in the slot; stretching them to 24 makes
 * them visibly larger than the full-frame icons beside them. Pass `sizeClass` for
 * any icon whose viewBox is not 24x24.
 */
export function IconBadge({
  src,
  sizeClass = "size-6",
  width = 24,
  height = 24,
  variant = "red",
}: {
  src: string;
  sizeClass?: string;
  width?: number;
  height?: number;
  /** Red is the section-heading badge; white is the LinkedIn badge on team cards. */
  variant?: "red" | "white";
}) {
  const surface =
    variant === "red" ? "gloss-red bg-brand-red" : "gloss-white bg-brand-white";

  return (
    <div
      className={`${surface} flex w-fit items-center justify-center rounded-lg p-2`}
    >
      <span className="flex size-6 items-center justify-center">
        <Image src={src} alt="" width={width} height={height} className={sizeClass} />
      </span>
    </div>
  );
}
