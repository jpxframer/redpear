# RedPear — Project State

> **This file is the single source of truth for where the build has got to.**
> It is auto-loaded at the start of every Claude Code session. Update it at the end
> of every step (see [Update protocol](#update-protocol) at the bottom) so a fresh
> chat can pick up without re-deriving anything.

**Last updated:** 2026-07-30 (section 1 "Problem" built)
**Repo:** https://github.com/jpxframer/redpear (private, default branch `main`)
**Owner:** jpxframer / promisejames0501@gmail.com

---

## What this is

RedPear is a platform that runs the entire insurance journey inside WhatsApp — buying
policies, processing claims, and customer service — sold to African insurers. This repo
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
  globals.css          design tokens + gloss utilities  ← read before styling anything
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
letter-spacing as a percentage (`-2` means −2%), already converted to px in the tokens.

**Gloss utilities** — the raised, lit-from-above look on buttons and cards. Three variants
because the inset highlight colour differs per surface: `gloss-red`, `gloss-white`,
`gloss-avatar`.

---

## Figma source of truth

File key `2fDOIcwXWFZn2BQtEO7dAV` ("RedPear (Copy)").
URL shape: `https://www.figma.com/design/2fDOIcwXWFZn2BQtEO7dAV/RedPear--Copy-?node-id=<id>`

The MCP server is **already authenticated** as Promise James. Never ask the user for, or
accept, a pasted `figd_` token — it is a credential leak with no upside.

### The 8 core screens

| # | Node ID | Screen | Status |
|---|---|---|---|
| 1 | `20875-19501` | Landing — Desktop | 🟡 in progress |
| 2 | `20875-20474` | Landing — Mobile | 🟡 in progress |
| 3 | `20875-18777` | not yet inspected | ⬜ not started |
| 4 | `20875-19146` | not yet inspected | ⬜ not started |
| 5 | `20875-21362` | not yet inspected | ⬜ not started |
| 6 | `20875-21622` | not yet inspected | ⬜ not started |
| 7 | `20875-21873` | not yet inspected | ⬜ not started |
| 8 | `20875-22083` | not yet inspected | ⬜ not started |

Screens 3–8 have not been opened yet; fill in their real names when each is picked up.

### Landing page sections

Built section by section. The user supplies node URLs per section — **do not build ahead
of what has been handed over.**

Desktop landing (`20875-19501`) is 1440×9246 and holds the hero plus nine sections, all
named just "Section" in Figma. Named below by their heading copy.

| # | Section | Desktop node | Mobile node | Desktop height | Status |
|---|---|---|---|---|---|
| — | Nav bar | `20875-19503` | `20875-21353` | 80 | ✅ done |
| — | Hero | `20875-19517` | `20875-20475` | 1204 | ✅ done |
| 1 | Problem — "Insurance Shouldn't Be Slowed Down by Legacy Systems" | `20875-19668` | `20875-20550` | 1399 | ✅ done |
| 2 | Solutions — "Solutions Built for Modern Insurance Organizations" | `20875-19922` | `20875-20805` | 1229 | ⬜ |
| 3 | Platform — "Technology That Works Behind Every Insurance Journey" | `20875-20074` | `20875-20957` | 958 | ⬜ |
| 4 | Audiences — "Designed for Organizations Across Africa" | `20875-20195` | `20875-21077` | 656 | ⬜ |
| 5 | Differentiators — "Why Organizations Choose RedPear" | `20875-20244` | `20875-21126` | 1448 | ⬜ |
| 6 | Case studies — "Helping Organizations Modernize Insurance" | `20875-20275` | `20875-21156` | 680 | ⬜ |
| 7 | Blog — "Insights & Resources" | `20875-20310` | `20875-21190` | 693 | ⬜ |
| 8 | CTA band — "Ready to Modernize Your Insurance Operations?" | `20875-20347` | `20875-21227` | 488 | ⬜ |
| 9 | Footer — logo, newsletter signup | `20875-20371` | `20875-21251` | 378 | ⬜ |

Desktop and mobile nodes are paired by document order, which matches on section count and
correlates on height — but the pairing is **inferred, not confirmed**. Verify the mobile
node really is the same section when you open each one.

Sections 1, 2 and 5 are the large ones; 8 and 9 are small.

**Section 1 card node IDs** (2x2 grid on desktop, stacked on mobile; 592x506 desktop
cards with 32px gaps, 367-wide mobile cards with 16px gaps):

| Card | Desktop | Mobile |
|---|---|---|
| Manual Claims Processing | `20875-19673` | `20875-20556` |
| Disconnected Systems | `20875-19736` | `20875-20619` |
| Poor Customer Experience | `20875-19802` | `20875-20685` |
| Limited Insights | `20875-19860` | `20875-20743` |

---

## Conventions and gotchas

**Responsive breakpoint.** Mobile-first base styles, `lg:` (1024px) switches to desktop.
Figma frames are 1440px desktop / 402px mobile. Desktop gutter is `lg:px-28` (112px),
mobile `px-4` (16px).

**Cap section content with `mx-auto max-w-content`.** Figma lays every section out on a
1216px column (1440 frame minus the 112px gutters), exposed as the `--container-content`
token. Without the cap, content matches the design only at exactly 1440px and stretches
on wider screens. Apply it to each section's content wrapper as sections are built.

**Tailwind resolves conflicting `display` classes by its own property order, not by the
order you write them in the class attribute.** Passing `hidden` to a component whose base
class already sets `inline-flex` will silently lose. Wrap the component in a
`hidden lg:block` div instead. This caused a real bug where the desktop CTA leaked into
the mobile nav — see the comment in [`Navbar.tsx`](components/layout/Navbar.tsx).

**Figma asset URLs expire after 7 days.** Always download the bytes into `public/` and
reference local paths. Never leave a `figma.com/api/mcp/asset/...` URL in a component.

**`next/image`'s `width` prop must match the width the CSS actually renders at.** It drives
srcset generation, so if CSS renders wider than the prop, the browser is handed a file
sized for the smaller slot and the image looks blurry. This caused the insurer logos to
render soft: `width={59}` with `h-8 w-auto` let them lay out up to 146px wide.

**Size logos by their Figma box, not by height.** Figma gives every insurer logo an
identical 59x32 box (60 for Hollard) with the artwork on a common baseline, so heights
vary and widths do not. Forcing `h-8 w-auto` inverts that: it makes wide, short marks
render *wider* than designed and upscales them past their native resolution.

**The insurer logos are raster, not vector, and 128px is all Figma will give.**
`get_screenshot` with a large `maxDimension` does not help, because it reports the node's
natural size (59x32) and will not render beyond it. 128px is enough for a 59px box at 2x
(about 1.08x), but there is no headroom for a 3x display.

**`img.naturalWidth` is density-corrected and will mislead you.** A 128px file selected as
the 2x srcset candidate reports `naturalWidth === 64`, per the HTML spec. To judge real
sharpness, reload `img.currentSrc` into a standalone `Image` (no srcset, so no correction)
and measure that. Measuring the wrong thing here produced a confident false "UPSCALED"
verdict on output that was already correct.

**Tailwind's preflight sets `line-height: 1.5`; Figma's `leading-[normal]` is ~1.2.**
Anywhere a design specifies `leading-[normal]` on dense micro-copy, set
`leading-[normal]` on a container so it inherits. Left unset, this alone made every
section-1 card ~30px taller than its Figma frame. See `DiagramShell` in
[`ProblemCard.tsx`](components/problem/ProblemCard.tsx).

**Pass git commit messages via `git commit -F <file>`, never inline.** PowerShell 5.1
does not escape quotes when passing arguments to native executables, so a message
containing double quotes gets split and git reads the tail as a pathspec. A here-string
does not help. Write the message file with the **Write tool**, not
`Set-Content -Encoding utf8` — the latter emits a UTF-8 BOM that git keeps, leaving a
stray `﻿` at the front of the commit subject.

**A `//` comment cannot go inside a JSX opening tag.** It is valid immediately after
`return (`, before the element, but placing it between attributes is a syntax error.

**Never run `npm run build` while `npm run dev` is running.** They share the `.next`
directory, so the production build overwrites the dev server's compiled assets underneath
it. The dev server keeps answering `200` and its log looks healthy, but the page it serves
references a stylesheet that no longer exists, so the browser renders raw unstyled HTML.
The symptom looks like a catastrophic CSS failure and is nothing of the sort. Recovery:
stop the dev server, `Remove-Item .next -Recurse -Force`, restart. Either stop dev before
building, or build against a separate `--distdir`.

**Never round-trip a text file through PowerShell 5.1 `Get-Content`/`Set-Content`.**
`Get-Content -Raw` reads as ANSI, not UTF-8, so writing it back with `-Encoding utf8`
double-encodes every non-ASCII character and turns em dashes and emoji into mojibake. This
corrupted this file once. Use the Edit or Write tools for text edits; reserve PowerShell
for running commands.

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
- [ ] The mobile menu open state is **not in Figma** — it was designed to match the system.
      Worth the user's review, or a proper Figma frame.
- [ ] Nav and CTA links are placeholder anchors (`#about`, `#demo`, `#services`, `#blog`,
      `#contact`, `#claims`). They resolve as sections get built.
- [ ] **The hero's insurer logo row still stretches on wide screens.** It uses
      `lg:justify-between` on a full-width `ul`, so it spreads to 1696px at 1920 and
      2336px at 2560 instead of holding Figma's 1216. Same fix as section 1:
      `mx-auto max-w-content`. Not applied yet because it changes already-approved hero
      work. The hero's three-card row measures wide too but is visually fine, since the
      cards are fixed-width and `justify-center` keeps them at 1216 centred.
- [ ] The navbar's inner row spans the full viewport at any width. Figma only shows it at
      1440, so whether it should cap at 1216 on large screens is a design decision.
- [ ] No tests and no CI yet.

---

## Session log

Newest first. One entry per step — what changed and anything that would surprise the next
session.

### 2026-07-30 — Capped the section 1 grid at 1216px
User asked for the desktop card grid (`20875-19672`) to have a max width and stay
centred rather than filling the viewport. Added the `--container-content` token (1216px)
and applied `mx-auto max-w-content` to the grid. Unchanged at 1440 and below; caps with
equal margins at 1600/1920/2560 with cards holding 592px. While measuring, found the
hero's insurer logo row has the same defect — logged under Known follow-ups, not fixed,
because it changes already-approved hero work.

### 2026-07-30 — Section 1 (Problem) built, desktop + mobile
Four illustrated cards in a 2x2 desktop grid, stacked on mobile. Each card wraps a
distinct diagram: claims pipeline, system topology, customer journey, analytics
dashboard. New components under [`components/problem/`](components/problem/) with a
shared `ProblemCard` / `DiagramShell` / `DiagramBadge` / `MicroTag` / `DiagramCallout`
vocabulary the later sections should reuse.

Added `text-h2`, `text-h4`, `text-h4-mobile` type tokens and a diagram status palette
(danger/warn/ok/info) to `globals.css`. The palette is declared explicitly rather than
using Tailwind's defaults, whose v4 OKLCH values do not match Figma's hexes.

The user's node list had two errors worth remembering: they listed three desktop cards
when there are four (`20875-19802`, "Poor Customer Experience", was missing), and gave
`20875-20693` for mobile card 3, which is the Workflow Diagram nested inside the real
card `20875-20685`. Verify card counts against the grid dimensions rather than trusting
the pasted list.

Cards measure 510-519 tall against Figma's 506, and the section 1417 against 1399. The
residual is font-metric rounding between Figma and the web fonts, not a structural
error. Added `scroll-mt-20` so the `#about` anchor clears the sticky navbar.

### 2026-07-30 — Unstyled page after a build/dev collision
User reported the local site rendering as raw unstyled HTML. Cause was running
`npm run build` in the same step as the screenshot check while `npm run dev` was still
serving on port 3000: both use `.next`, so the production build clobbered the dev server's
assets. The dev server still returned `200` for the page and its log showed only
successful compiles, but `/_next/static/css/app/layout.css` returned `404`. Fixed by
stopping dev, deleting `.next`, and restarting. Stylesheet now serves 29,715 bytes with
the tokens and gloss utilities intact. No code was wrong; nothing needed reverting.

### 2026-07-30 — Fixed blurry insurer logos
User reported the insurer logos looked blurry. Cause was `h-8 w-auto` in
`InsurerLogos.tsx`: it forced height to 32px and let width run free, so wide/short marks
laid out up to 146px wide while `width={59}` told `next/image` to build a srcset for a
59px slot. Old Mutual was rendering at 0.54x its native resolution. Fixed by constraining
each logo to its Figma box (59x32, 60 for Hollard) with `object-contain object-bottom`,
which also corrects a fidelity bug: the logos had been rendering wider than designed.
All ten now measure at least 1.07x at 2x DPR. Build passes, no regressions at either
viewport.

Also corrupted this file mid-step with a PowerShell `Get-Content`/`Set-Content` round-trip
and had to restore it from git. See the encoding note in Conventions and gotchas.

### 2026-07-30 — Mapped the remaining landing sections
Inspected `20875-19501` and enumerated the nine remaining landing sections with their
heading copy, node IDs and heights (table above). All nine are named just "Section" in
Figma, so the headings are the only way to tell them apart — that mapping is now recorded
and should not need re-deriving. Mobile counterparts paired by document order; pairing is
inferred, not verified.

### 2026-07-30 — Project doc
Added this file so state survives across chats.

### 2026-07-30 — GitHub repo
Initialised git, created private repo `jpxframer/redpear`, pushed `main` (47 files).
Verified the contributor list returns only `jpxframer` and the commit carries no
attribution trailer. Confirmed no `figd_`/`gho_` tokens or expiring Figma URLs were
committed.

### 2026-07-30 — Nav bar + hero
Scaffolded the project, mapped Figma variables to `@theme` tokens, downloaded 31 assets
into `public/`, and built the nav bar and hero for both desktop and mobile. `npm run build`
passes. Verified with headless Chrome at 1440px and 402px: no horizontal overflow, h1
computes to the exact Figma spec, no broken images. Fixed the desktop CTA leaking into the
mobile nav (the Tailwind `display` gotcha above). Confirmed the mobile hamburger toggles
`aria-expanded`, renders all five links, and locks body scroll.

---

## Update protocol

At the end of **every** step, before ending the turn:

1. Add a `### YYYY-MM-DD — <what>` entry at the top of the session log, including anything
   that would surprise a fresh session.
2. Flip the relevant status cell in **Figma source of truth** (⬜ → 🟡 → ✅).
3. Add or tick anything in **Known follow-ups**.
4. Record any new gotcha in **Conventions and gotchas** — that section exists to stop the
   same bug being rediscovered.
5. Bump **Last updated**.
6. Commit it alongside the code change, not as a separate afterthought.
