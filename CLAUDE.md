# RedPear â€” Project State

> **This file is the single source of truth for where the build has got to.**
> It is auto-loaded at the start of every Claude Code session. Update it at the end
> of every step (see [Update protocol](#update-protocol) at the bottom) so a fresh
> chat can pick up without re-deriving anything.

**Last updated:** 2026-07-30 (insurer logo sharpness fix)
**Repo:** https://github.com/jpxframer/redpear (private, default branch `main`)
**Owner:** jpxframer / promisejames0501@gmail.com

---

## What this is

RedPear is a platform that runs the entire insurance journey inside WhatsApp â€” buying
policies, processing claims, and customer service â€” sold to African insurers. This repo
is the marketing website, built from an existing Figma design.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) |
| Fonts | Geist (display) + Inter (body), via `next/font/google` |
| Package name | `redpear-web` |

The directory name (`03- RedPear`) is not a valid npm package name, so the project was
scaffolded by hand rather than with `create-next-app`. Don't try to re-scaffold it.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before any commit
```

---

## Layout

```
app/
  globals.css          design tokens + gloss utilities  â† read before styling anything
  layout.tsx           font wiring, metadata
  page.tsx             landing page composition
components/
  ui/Button.tsx        shared CTA (primary = red, secondary = white)
  layout/Navbar.tsx    responsive nav, client component (mobile menu state)
  sections/Hero.tsx    hero composition
  hero/                AnalyticsCard, ChatCard, ClaimsCard, InsurerLogos
public/
  brand/ icons/ chart/ avatars/ insurers/    exported Figma assets
```

---

## Design tokens

All defined in [`app/globals.css`](app/globals.css) under `@theme`. **Use the tokens, never
raw hex.** They came from the Figma variable collection, so they are authoritative.

| Token | Value | Figma name |
|---|---|---|
| `brand-red` | `#F40B0D` | RedPear Website/Red |
| `brand-black` | `#050000` | RedPear Website/Black |
| `brand-white` | `#FFFDFD` | RedPear Website/White |
| `neutral-500` | `#6B7280` | Neutral/500 (body copy) |
| `neutral-200` | `#E5E7EB` | Neutral/200 (hairlines) |
| `ink` / `ink-muted` / `ink-faint` | `#0F172A` / `#475569` / `#94A3B8` | in-card text |
| `surface` | `#F1F5F9` | in-card fills |
| `positive` | `#10B981` | trend green, send button |
| `chat-canvas` / `chat-outbound` | `#F4F3EE` / `#E7F8E8` | chat thread |

Type scale: `text-display-lg` (52/56), `text-h1-mobile` (36/44), `text-h3` (32/40),
`text-h3-mobile` (28/36), `text-body-lg` (18/28), `text-body-md` (16/24). Figma expresses
letter-spacing as a percentage (`-2` means âˆ’2%), already converted to px in the tokens.

**Gloss utilities** â€” the raised, lit-from-above look on buttons and cards. Three variants
because the inset highlight colour differs per surface: `gloss-red`, `gloss-white`,
`gloss-avatar`.

---

## Figma source of truth

File key `2fDOIcwXWFZn2BQtEO7dAV` ("RedPear (Copy)").
URL shape: `https://www.figma.com/design/2fDOIcwXWFZn2BQtEO7dAV/RedPear--Copy-?node-id=<id>`

The MCP server is **already authenticated** as Promise James. Never ask the user for, or
accept, a pasted `figd_` token â€” it is a credential leak with no upside.

### The 8 core screens

| # | Node ID | Screen | Status |
|---|---|---|---|
| 1 | `20875-19501` | Landing â€” Desktop | ðŸŸ¡ in progress |
| 2 | `20875-20474` | Landing â€” Mobile | ðŸŸ¡ in progress |
| 3 | `20875-18777` | not yet inspected | â¬œ not started |
| 4 | `20875-19146` | not yet inspected | â¬œ not started |
| 5 | `20875-21362` | not yet inspected | â¬œ not started |
| 6 | `20875-21622` | not yet inspected | â¬œ not started |
| 7 | `20875-21873` | not yet inspected | â¬œ not started |
| 8 | `20875-22083` | not yet inspected | â¬œ not started |

Screens 3â€“8 have not been opened yet; fill in their real names when each is picked up.

### Landing page sections

Built section by section. The user supplies node URLs per section â€” **do not build ahead
of what has been handed over.**

Desktop landing (`20875-19501`) is 1440Ã—9246 and holds the hero plus nine sections, all
named just "Section" in Figma. Named below by their heading copy.

| # | Section | Desktop node | Mobile node | Desktop height | Status |
|---|---|---|---|---|---|
| â€” | Nav bar | `20875-19503` | `20875-21353` | 80 | âœ… done |
| â€” | Hero | `20875-19517` | `20875-20475` | 1204 | âœ… done |
| 1 | Problem â€” "Insurance Shouldn't Be Slowed Down by Legacy Systems" | `20875-19668` | `20875-20550` | 1399 | â¬œ |
| 2 | Solutions â€” "Solutions Built for Modern Insurance Organizations" | `20875-19922` | `20875-20805` | 1229 | â¬œ |
| 3 | Platform â€” "Technology That Works Behind Every Insurance Journey" | `20875-20074` | `20875-20957` | 958 | â¬œ |
| 4 | Audiences â€” "Designed for Organizations Across Africa" | `20875-20195` | `20875-21077` | 656 | â¬œ |
| 5 | Differentiators â€” "Why Organizations Choose RedPear" | `20875-20244` | `20875-21126` | 1448 | â¬œ |
| 6 | Case studies â€” "Helping Organizations Modernize Insurance" | `20875-20275` | `20875-21156` | 680 | â¬œ |
| 7 | Blog â€” "Insights & Resources" | `20875-20310` | `20875-21190` | 693 | â¬œ |
| 8 | CTA band â€” "Ready to Modernize Your Insurance Operations?" | `20875-20347` | `20875-21227` | 488 | â¬œ |
| 9 | Footer â€” logo, newsletter signup | `20875-20371` | `20875-21251` | 378 | â¬œ |

Desktop and mobile nodes are paired by document order, which matches on section count and
correlates on height â€” but the pairing is **inferred, not confirmed**. Verify the mobile
node really is the same section when you open each one.

Sections 1, 2 and 5 are the large ones; 8 and 9 are small.

---

## Conventions and gotchas

**Responsive breakpoint.** Mobile-first base styles, `lg:` (1024px) switches to desktop.
Figma frames are 1440px desktop / 402px mobile. Desktop gutter is `lg:px-28` (112px),
mobile `px-4` (16px).

**Tailwind resolves conflicting `display` classes by its own property order, not by the
order you write them in the class attribute.** Passing `hidden` to a component whose base
class already sets `inline-flex` will silently lose. Wrap the component in a
`hidden lg:block` div instead. This caused a real bug where the desktop CTA leaked into
the mobile nav â€” see the comment in [`Navbar.tsx`](components/layout/Navbar.tsx).

**Figma asset URLs expire after 7 days.** Always download the bytes into `public/` and
reference local paths. Never leave a `figma.com/api/mcp/asset/...` URL in a component.

**`next/image`'s `width` prop must match the width the CSS actually renders at.** It drives
srcset generation, so if CSS renders wider than the prop, the browser is handed a file
sized for the smaller slot and the image looks blurry. This caused the insurer logos to
render soft: `width={59}` with `h-8 w-auto` let them lay out up to 146px wide.

**Size logos by their Figma box, not by height.** Figma gives every insurer logo an
identical 59Ã—32 box (60 for Hollard) with the artwork on a common baseline, so heights
vary and widths do not. Forcing `h-8 w-auto` inverts that â€” it makes wide, short marks
render *wider* than designed and upscales them past their native resolution.

**The insurer logos are raster, not vector, and 128px is all Figma will give.**
`get_screenshot` with a large `maxDimension` does not help: it reports the node's natural
size (59Ã—32) and will not render beyond it. 128px is enough for a 59px box at 2Ã— (â‰ˆ1.08Ã—),
but there is no headroom for a 3Ã— display.

**`img.naturalWidth` is density-corrected and will mislead you.** A 128px file selected as
the 2Ã— srcset candidate reports `naturalWidth === 64`, per the HTML spec. To judge real
sharpness, reload `img.currentSrc` into a standalone `Image` (no srcset, so no correction)
and measure that. Measuring the wrong thing here produced a confident false "UPSCALED"
verdict on already-correct output.

**Read the design-to-code skill before `get_design_context`.** It is a hard prerequisite:
`skill://figma/figma-design-to-code/SKILL.md` via the MCP resource.

**Large Figma metadata blows the context window.** `get_metadata` on a full page saves to
a file instead of returning inline; parse it with PowerShell `ConvertFrom-Json` (there is
no `jq` on this machine).

**Commits are authored by jpxframer alone.** Never add `Co-Authored-By: Claude` trailers
or "Generated with Claude Code" to PR bodies. The user does not want Claude listed as a
contributor.

**Verify visually, don't assume.** Chrome is at
`C:\Program Files\Google\Chrome\Application\chrome.exe` and can be driven with
`puppeteer-core` (install it in the scratchpad, not as a project dependency) to screenshot
at 1440px and 402px and diff against the Figma frames.

---

## Known follow-ups

- [ ] Avatar PNGs in `public/avatars/` are ~1.4 MB each but render at 28px. Re-export at
      ~64px. Next.js optimises delivery, so this is repo weight, not user-facing.
- [ ] The mobile menu open state is **not in Figma** â€” it was designed to match the system.
      Worth the user's review, or a proper Figma frame.
- [ ] Nav and CTA links are placeholder anchors (`#about`, `#demo`, `#services`, `#blog`,
      `#contact`, `#claims`). They resolve as sections get built.
- [ ] No tests and no CI yet.

---

## Session log

Newest first. One entry per step â€” what changed and anything that would surprise the next
session.

### 2026-07-30 â€” Fixed blurry insurer logos
User reported the insurer logos looked blurry. Cause was `h-8 w-auto` in
`InsurerLogos.tsx`: it forced height to 32px and let width run free, so wide/short marks
laid out up to 146px wide while `width={59}` told `next/image` to build a srcset for a
59px slot. Old Mutual was rendering at 0.54Ã— its native resolution. Fixed by constraining
each logo to its Figma box (59Ã—32, 60 for Hollard) with `object-contain object-bottom`,
which also corrects a fidelity bug â€” the logos had been rendering wider than designed.
All ten now measure â‰¥1.07Ã— at 2Ã— DPR. Build passes, no regressions at either viewport.

### 2026-07-30 â€” Mapped the remaining landing sections
Inspected `20875-19501` and enumerated the nine remaining landing sections with their
heading copy, node IDs and heights (table above). All nine are named just "Section" in
Figma, so the headings are the only way to tell them apart â€” that mapping is now recorded
and should not need re-deriving. Mobile counterparts paired by document order; pairing is
inferred, not verified.

### 2026-07-30 â€” Project doc
Added this file so state survives across chats.

### 2026-07-30 â€” GitHub repo
Initialised git, created private repo `jpxframer/redpear`, pushed `main` (47 files).
Verified the contributor list returns only `jpxframer` and the commit carries no
attribution trailer. Confirmed no `figd_`/`gho_` tokens or expiring Figma URLs were
committed.

### 2026-07-30 â€” Nav bar + hero
Scaffolded the project, mapped Figma variables to `@theme` tokens, downloaded 31 assets
into `public/`, and built the nav bar and hero for both desktop and mobile. `npm run build`
passes. Verified with headless Chrome at 1440px and 402px: no horizontal overflow, h1
computes to the exact Figma spec, no broken images. Fixed the desktop CTA leaking into the
mobile nav (the Tailwind `display` gotcha above). Confirmed the mobile hamburger toggles
`aria-expanded`, renders all five links, and locks body scroll.

---

## Update protocol

At the end of **every** step, before ending the turn:

1. Add a `### YYYY-MM-DD â€” <what>` entry at the top of the session log, including anything
   that would surprise a fresh session.
2. Flip the relevant status cell in **Figma source of truth** (â¬œ â†’ ðŸŸ¡ â†’ âœ…).
3. Add or tick anything in **Known follow-ups**.
4. Record any new gotcha in **Conventions and gotchas** â€” that section exists to stop the
   same bug being rediscovered.
5. Bump **Last updated**.
6. Commit it alongside the code change, not as a separate afterthought.
