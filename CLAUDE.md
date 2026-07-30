# RedPear — Project State

> **This file is the single source of truth for where the build has got to.**
> It is auto-loaded at the start of every Claude Code session. Update it at the end
> of every step (see [Update protocol](#update-protocol) at the bottom) so a fresh
> chat can pick up without re-deriving anything.

**Last updated:** 2026-07-30 (consolidated progress pass; 6 of 10 landing blocks built)
**Repo:** https://github.com/jpxframer/redpear (private, default branch `main`)
**Owner:** jpxframer / promisejames0501@gmail.com

---

## Progress at a glance

Landing page, section by section. Six of ten blocks are built and pushed.

| Block | Status |
|---|---|
| Nav bar (+ mobile overlay) | ✅ |
| Hero | ✅ |
| 1 — Problem / Legacy Systems | ✅ |
| 2 — Solutions | ✅ |
| **3 — Platform / Technology** | ⬜ **skipped — the one gap in the page** |
| 4 — Audiences | ✅ |
| 5 — Why RedPear | ✅ |
| 6 — Case studies | ✅ |
| 7 — Insights & Resources (blog) | ⬜ |
| 8 — CTA band | ⬜ |
| 9 — Footer (+ newsletter form) | ⬜ |

**Next up:** section 3 closes the gap; then 7, 8, 9 finish the page. Screens 2–8 of the
eight core screens have not been started at all.

**Two decisions still open**, both worth settling before the sections that need them:

1. **Where does the footer's newsletter form post?** Mailchimp, Resend, a route handler
   writing to a database, or a `mailto:` stopgap. Needed for section 9.
2. **Are sections 6 and 7 content hardcoded or CMS-driven?** Hardcoded now; extracting
   later is fine, but it shapes how section 7 gets built.

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
  page.tsx             landing page composition (section order lives here)
components/
  ui/Button.tsx        shared CTA (primary = red, secondary = white)
  ui/IconBadge.tsx     red gloss square + 24px icon slot (see the partial-frame gotcha)
  layout/Navbar.tsx    responsive nav + mobile overlay, client component
  sections/            one file per landing section, in page order:
                         Hero, ProblemSection, SolutionsSection,
                         AudiencesSection, WhySection, TestimonialsSection
  hero/                AnalyticsCard, ChatCard, ClaimsCard, InsurerLogos
  problem/             ProblemCard + DiagramShell/Badge/MicroTag/Callout,
                         and 4 diagrams (ClaimsPipeline, SystemTopology,
                         CustomerJourney, Analytics)
  solutions/           BentoCard, SolutionCard, PreviewPanel, and 4 micro-visuals
                         (MicroChart, ConversationList, TransformationPreview,
                         IntegrationPreview)
  audiences/           AudienceCard
  why/                 WhyCard
  testimonials/        TestimonialCard
public/
  brand/ icons/ chart/ avatars/ insurers/     hero + shared assets
  problem/ solutions/ why/ testimonials/      per-section assets
```

**Reuse before adding.** `problem/` established the diagram vocabulary
(`DiagramShell`, `DiagramBadge`, `MicroTag`, `DiagramCallout`) and `solutions/` the
preview-panel one (`PreviewPanel`). Later sections should lean on these rather than
inventing parallel components.

---

## Design tokens

All defined in [`app/globals.css`](app/globals.css) under `@theme`. **Use the tokens, never
raw hex.** They came from the Figma variable collection, so they are authoritative.

| Token | Value | Figma name |
|---|---|---|
| `brand-red` | `#F40B0D` | RedPear Website/Red |
| `brand-black` | `#050000` | RedPear Website/Black |
| `brand-white` | `#FFFDFD` | RedPear Website/White |
| `neutral-100/200/300/400/500/700` | `#F3F4F6` / `#E5E7EB` / `#D1D5DB` / `#9CA3AF` / `#6B7280` / `#374151` | Neutral/* |
| `ink` / `ink-muted` / `ink-faint` | `#0F172A` / `#475569` / `#94A3B8` | in-card text |
| `surface` | `#F1F5F9` | in-card fills |
| `positive` | `#10B981` | trend green, send button |
| `chat-canvas` / `chat-outbound` | `#F4F3EE` / `#E7F8E8` | chat thread |
| `danger-pale/soft/border` | `#FFF5F5` / `#FEE2E2` / `#FCA5A5` | diagram status |
| `warn-soft/softer/ink/deep/mid` | `#FEF3C7` / `#FEF9C3` / `#D97706` / `#92400E` / `#F59E0B` | diagram status |
| `ok-soft` / `ok-ink` | `#DCFCE7` / `#16A34A` | diagram status |
| `info-pale/soft/ink` | `#EFF6FF` / `#DBEAFE` / `#3B82F6` | diagram status |

The diagram palette is declared explicitly rather than using Tailwind's defaults, whose v4
OKLCH values do not match these hexes. There is also `--container-content: 1216px`, which
drives `max-w-content`.

Type scale — Figma expresses letter-spacing as a percentage (`-2` means −2%), already
converted to px in the tokens:

| Token | Size/line | Figma style |
|---|---|---|
| `text-display-lg` | 52/56 | Display/Semibold/Large |
| `text-h1-mobile` | 36/44 | Heading/H1/Semibold/Mobile |
| `text-h2` | 36/44 | Heading/H2/Medium/Desktop |
| `text-h3` | 32/40 | Heading/H3/Medium/Desktop |
| `text-h3-mobile` | 28/36 | Heading/H3/Medium/Mobile |
| `text-h4` | 28/36 | Heading/H4/*/Desktop |
| `text-h4-mobile` | 24/32 | Heading/H4/*/Mobile |
| `text-h5` | 24/32 | Heading/H5/Medium/Desktop |
| `text-h6` | 20/28 | Heading/H6/Medium/Desktop, H5/Medium/Mobile |
| `text-body-lg` | 18/28 | Paragraph/Large/Regular |
| `text-body-md` | 16/24 | Paragraph/Medium/Regular |
| `text-body-sm` | 14/20 | Paragraph/Small/Regular |

`text-h4-mobile` and `text-h5` carry identical values but different Figma names; keep both
so components read the way the design file does.

**Gloss utilities** — the raised, lit-from-above look on buttons and cards. Four variants,
because the inset highlight colour and outer shadow differ per surface:

| Utility | Used on |
|---|---|
| `gloss-red` | primary buttons, the red icon badge |
| `gloss-white` | secondary button, most cards |
| `gloss-bento` | section 2 bento cards — 10px outer blur as a real box-shadow, so corners stay crisp under the clipped image |
| `gloss-avatar` | the chat avatar in the hero |

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
| 2 | Solutions — "Solutions Built for Modern Insurance Organizations" | `20875-19922` | `20875-20805` | 1229 | ✅ done |
| 3 | Platform — "Technology That Works Behind Every Insurance Journey" | `20875-20074` | `20875-20957` | 958 | ⬜ |
| 4 | Audiences — "Designed for Organizations Across Africa" | `20875-20195` | `20875-21077` | 656 | ✅ done |
| 5 | Differentiators — "Why Organizations Choose RedPear" | `20875-20244` | `20875-21126` | 1448 | ✅ done |
| 6 | Case studies — "Helping Organizations Modernize Insurance" | `20875-20275` | `20875-21156` | 680 | ✅ done |
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

**Section 2 card node IDs.** Desktop is two bento cards over a row of four small cards;
mobile stacks all six. Bento cards are 600 and 592 wide by 602 tall (built as equal
columns, within 4px); small cards are 286x290 with 24px gaps.

| Card | Desktop | Mobile |
|---|---|---|
| AI Solutions (featured bento) | `20875-19929` | `20875-20812` |
| Insurance Platforms (bento) | `20875-19934` | `20875-20817` |
| Analytics & Insights | `20875-19940` | `20875-20823` |
| WhatsApp Solutions | `20875-19983` | `20875-20866` |
| Digital Transformation | `20875-20011` | `20875-20894` |
| Consulting & Integration | `20875-20041` | `20875-20924` |

Both bento visuals are flattened PNG exports (1644x1290 and 1632x1290), not DOM. The four
small cards' micro-visuals are rebuilt as DOM.

**Section 2 card type, as revised by the user on 2026-07-30.** Verified against the live
DOM at both breakpoints:

| Card | Heading mobile | Heading desktop | Body mobile | Body desktop |
|---|---|---|---|---|
| AI Solutions | 24/32 semibold | 28/36 semibold | 16/24 | 18/28 |
| Insurance Platforms | 24/32 medium | 28/36 medium | **18/28** | 18/28 |
| The four small cards | 24/32 medium | 20/28 medium | 16/24 | 16/24 |

Two things here look wrong but are deliberate. The small-card headings are **larger on
mobile than desktop** (24 vs 20). And Insurance Platforms' mobile body is 18/28 where the
other five are 16/24 — reproduced as designed via `BentoCard`'s `mobileBodyLarge` prop,
and flagged to the user as a likely oversight. If a future Figma pass sets it to 16/24,
drop the prop.

**Per the user, mobile bento cards use 16px padding, not Figma's 24px.** Desktop keeps 24.
This is a deliberate deviation, not a mistake — see `BentoCard`'s `p-4 lg:p-6`.

**Section 4 card node IDs.** Six cards, 3x2 on desktop (384/384/400 wide by 200 tall,
24px gaps — built as equal 389px columns), stacked on mobile. Card type differs by
breakpoint: 24/32 + 16/24 on desktop, 20/28 + 14/20 on mobile. The heading and body sit
10px apart here, not the 16px the earlier sections use.

| Card | Desktop | Mobile | Icon |
|---|---|---|---|
| Insurance Providers | `20875-20202` | `20875-21084` | piggy-bank (21.5x19.5) |
| Financial Services | `20875-20209` | `20875-21091` | bank-linear |
| Government | `20875-20216` | `20875-21098` | courthouse |
| Healthcare | `20875-20223` | `20875-21105` | health |
| Enterprise | `20875-20230` | `20875-21112` | briefcase |
| Microfinance | `20875-20237` | `20875-21119` | wallet-money |

**Section 5 card node IDs.** Four image-and-copy cards, 2x2 on desktop (592x582 with 24px
gaps) and stacked on mobile. Each card is a 1952x1400 PNG export above a title and body;
type is 28/36 + 18/28 on desktop, 24/32 + 16/24 on mobile. Heading and body sit 10px apart
in the section copy, as in section 4.

| Card | Desktop | Mobile | Image |
|---|---|---|---|
| Enterprise Ready | `20875-20251` | `20875-21132` | why/enterprise-ready.png |
| AI Powered | `20875-20257` | `20875-21138` | why/ai-powered.png |
| Secure Infrastructure | `20875-20263` | `20875-21144` | why/secure-infrastructure.png |
| Customer Focused | `20875-20269` | `20875-21150` | why/customer-focused.png |

**Section 6 card node IDs.** Four testimonial cards, 2x2 on desktop (596x212, 24px gaps)
and stacked on mobile, all `p-32` with a 40px avatar.

| Card | Desktop | Mobile | Avatar |
|---|---|---|---|
| Kofi Antwi | `20875-20282` | `20875-21162` | testimonials/kofi-antwi.png |
| Zola Ndlovu | `20875-20289` | `20875-21169` | testimonials/zola-ndlovu.png |
| Amara Okafor | `20875-20296` | `20875-21176` | testimonials/amara-okafor.png |
| Kwame Mensah | `20875-20303` | `20875-21183` | testimonials/kwame-mensah.png |

Two oddities remain here, both reproduced as designed and flagged to the user:

1. **Amara Okafor's card has a 20px radius**; the other three are 24px.
2. **Quote punctuation is mixed** — cards 1 and 2 use straight quotes, 3 and 4 curly.

Section copy steps down on mobile like every other section (28/36 heading, 16/24 sub). It
originally carried the desktop scale at both breakpoints; the user corrected that in Figma
on 2026-07-30 after it was flagged. The card **quotes** stay 18/28 at both breakpoints.

One deliberate *deviation*: Figma sets the profile meta `nowrap`, which overflows the card
on mobile for the longer job titles (its own Profile Wrapper measures 320px inside a 306px
content box). Allowed to wrap instead, which makes mobile cards ~11px taller than Figma
but keeps the text inside the card.

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

**Some Figma icon exports are partial frames — check the viewBox before sizing.** Most
icons export as a full 24x24, but a few come back cropped to the artwork with the padding
expressed as insets on the parent (`piggy-bank` is 21.5x19.5, `chart-evaluation` is 20x20,
`redpear-logo` is 70x48.05). Rendering those at `size-6` stretches them noticeably larger
than the full-frame icons beside them. Use
[`IconBadge`](components/ui/IconBadge.tsx), which centres the icon in a fixed 24px slot,
and pass `sizeClass` for any icon whose viewBox is not 24x24. To audit:
`Get-ChildItem public -Recurse -Filter *.svg` and read each `viewBox`.

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

**Lazy images below the fold report as "broken" in element screenshots.** Puppeteer's
`elementHandle.screenshot()` scrolls the element into view but does not wait for the lazy
images that scroll just triggered, so they capture blank and `naturalWidth` reads 0. Walk
the page (driving `window.scrollTo` from Node, not in an in-page async loop, which can
blow the protocol timeout), `await img.decode()`, then capture.

**Read `img.currentSrc`, never `getAttribute("src")`, to check what `next/image` served.**
The `src` attribute is the largest fallback candidate, so it always looks like the biggest
variant was fetched. This produced a false "mobile is downloading a 3840px image" scare
when the browser had correctly chosen the 828px candidate.

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

**The two JSX comment forms are valid in opposite places. Both have broken this repo.**

- `// line comment` — valid immediately after `return (`, before the element. A syntax
  error between attributes inside an opening tag.
- `{/* block comment */}` — valid inside JSX children. A syntax error between `return (`
  and the element, where `{...}` parses as a block rather than a comment.

The second failure is quiet: the dev server keeps answering 200 and serves a stale or
partial page, so it looks like a layout bug rather than a compile error. If a component's
markup vanishes from the DOM, check for this before debugging CSS.

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

**Awaiting a decision from the user**

- [ ] **Footer newsletter form has no destination.** Mailchimp, Resend, a route handler
      writing to a database, or a `mailto:` stopgap. Blocks finishing section 9.
- [ ] **Sections 6 and 7 content is hardcoded.** Fine for now, but if it should be
      CMS-driven that shapes how section 7 gets built.
- [ ] **Section 6: Amara Okafor's card is drawn at a 20px radius**; the other three are
      24px. Reproduced as designed, isolated behind `TestimonialCard`'s `radiusClass`.
- [ ] **Section 6: quote punctuation is mixed** — straight quotes on cards 1 and 2, curly
      on 3 and 4. Reproduced verbatim from Figma.
- [ ] **Section 2: mobile small cards are content-sized** (262-287) where Figma fixes them
      at 290. Stacked with 16px gaps this reads better than forced uniform height.

**Engineering debt**

- [ ] Avatar PNGs are oversized for their display size: `public/avatars/` is ~1.4 MB each
      at 28px, `public/testimonials/` ~1.2 MB each (1024x1024) at 40px. Re-export at
      ~64-96px. Next.js optimises delivery, so this is repo weight, not user-facing.
- [ ] The mobile menu open state is **not in Figma**. It is now a fixed full-height
      overlay starting below the bar, with the toggle swapping to an X, undecorated links,
      and the CTA 24px below the last link. `public/icons/close.svg` was authored
      to match the exported hamburger (24x24, 1.5 stroke, round caps, `#FFFDFD`) rather
      than exported from Figma, since no close icon exists there. Worth a proper frame.
- [ ] The overlay has no open/close animation, because it is conditionally rendered so a
      CSS transition has nothing to animate from. Would need an always-mounted panel with
      a translate/opacity toggle.
- [ ] The overlay does not trap focus. Escape closes it and the toggle is reachable, but
      tabbing can still reach content behind it.
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
- [ ] No tests and no CI yet. Verification is currently a `puppeteer-core` script per
      section, run from the scratchpad and driving the installed Chrome. Worth promoting
      to a committed visual-regression check if the page keeps growing.
- [ ] `favicon.ico` 404s — no icon has been set.
- [ ] Both the Figma MCP and `git push` intermittently fail with network timeouts and need
      retries. Not a code problem, but budget for retries in any scripted run.

---

## Session log

Newest first. One entry per step — what changed and anything that would surprise the next
session.

### 2026-07-30 — Consolidated progress pass
User asked for a progress save. Refreshed the parts of this file that had drifted while
sections were being built one at a time: the Layout tree still listed only the hero
components, the colour token table was missing the neutrals and the whole diagram palette,
and the gloss utilities said three variants when there are four. Added a
[Progress at a glance](#progress-at-a-glance) table at the top and split Known follow-ups
into decisions awaiting the user versus engineering debt. No code changed.

### 2026-07-30 — Section 6 mobile copy scale corrected
User updated `20875-21159` / `20875-21160` in Figma so the section heading and sub step
down on mobile (28/36 and 16/24) like every other section, rather than carrying the
desktop scale. This was one of the three oddities flagged when section 6 shipped; it is
now resolved, and the mobile section measures 1456. Card quotes are unchanged at 18/28.

### 2026-07-30 — Section 6 (Case studies) built, desktop + mobile
Four testimonial cards, 2x2 on desktop and stacked on mobile, via
[`TestimonialCard`](components/testimonials/TestimonialCard.tsx). Marked up as
`figure`/`blockquote`/`figcaption` rather than generic divs, since these are attributed
quotations.

Desktop 1440x684 against Figma's 680, cards 596x214 against 596x212. Mobile runs ~54px
taller than Figma because the profile meta wraps rather than overflowing — see the note
above.

Also recorded three design oddities kept as-is: mobile keeping the desktop type scale, one
card at a 20px radius, and mixed straight/curly quote punctuation.

### 2026-07-30 — Section 5 (Why RedPear) built, desktop + mobile
Four image-and-copy cards, 2x2 on desktop and stacked on mobile, via
[`WhyCard`](components/why/WhyCard.tsx). All four visuals are flattened 1952x1400 PNG
exports. Desktop 1440x1455 against Figma's 1448; mobile 402x1910 against 1908, with card
heights 427/427/403/403 against 426.4/426.4/402.4/402.4.

The residual few px is a box model difference, not a layout error: Figma strokes do not
consume layout space, while a CSS `border` does under `box-sizing: border-box`. A 370px
mobile card therefore has 336px of content here against Figma's 338. Not worth chasing.

Section 3 remains skipped — it now sits between four finished sections.

### 2026-07-30 — Section 4 (Audiences) built, desktop + mobile
Six icon-and-copy cards, 3x2 on desktop and stacked on mobile. New
[`AudienceCard`](components/audiences/AudienceCard.tsx) plus a shared
[`IconBadge`](components/ui/IconBadge.tsx) that `ProblemCard` now uses too.

Pixel-exact at both breakpoints: desktop 1440x656 and mobile 402x1286 both match Figma
exactly, and mobile card heights (164/184/164/164/164/164) match card for card. Desktop
needed `lg:auto-rows-fr` — the second row's copy is shorter, so without it the row sized
down to 176 against Figma's uniform 200.

Added `text-h5` (24/32) and `text-body-sm` (14/20) tokens.

**Fixed a latent bug in section 1 while here.** An audit of every SVG viewBox found
`chart-evaluation.svg` is a 20x20 partial-frame export being rendered at 24x24, so the
"Limited Insights" icon was 20% larger than its three siblings. Both it and section 4's
`piggy-bank` (21.5x19.5) now render at natural size inside `IconBadge`'s 24px slot.

**Note: the user skipped section 3.** These node IDs are section 4. Section 3, "Technology
That Works Behind Every Insurance Journey" (`20875-20074` / `20875-20957`), is still
unbuilt and now sits between two finished sections.

### 2026-07-30 — Analytics micro chart now fills on mobile
User spotted the Analytics & Insights chart sitting about two thirds width on mobile. The
`max-w-[248px]` cap was applied at all breakpoints, but Figma only fixes 248px on desktop
(`20875-19945`, inside a 254px card); the mobile node `20875-20828` is `size-full`. Scoped
the cap to `lg:`. All four preview panels now measure 336 of 336 on mobile, and desktop
keeps Analytics at 248 of 252 as designed.

### 2026-07-30 — Section 2 mobile card type revised
User updated the mobile text sizes in Figma and supplied all 12 text nodes. Mobile
headings across all six cards are now 24/32; the four small-card headings are therefore
larger on mobile than on desktop (20/28). Bodies are 16/24 except Insurance Platforms,
which Figma sets at 18/28 — implemented as designed behind `BentoCard`'s
`mobileBodyLarge` prop and flagged as a likely oversight. Desktop is unchanged. All 12
heading/body pairs verified against computed styles at 402 and 1440: 12 pass, 0 fail.

### 2026-07-30 — Section 2 (Solutions) built, desktop + mobile
Two bento cards over a row of four small cards on desktop, all six stacked on mobile.
New components under [`components/solutions/`](components/solutions/): `BentoCard`,
`SolutionCard`, `PreviewPanel`, plus four micro-visuals (`MicroChart`,
`ConversationList`, `TransformationPreview`, `IntegrationPreview`).

Added the `text-h6` token (20/28, -0.4) and a `gloss-bento` utility — bento cards use the
same inset highlights as `gloss-white` but a 10px outer blur as a real box-shadow rather
than a filter, so corners stay crisp under the clipped image.

Desktop measures 1233 against Figma's 1229, bento 596x604 against 600/592x602, small
cards 286x292 against 286x290. Mobile small cards are content-sized (262-287) where Figma
fixes them at 290; stacked with 16px gaps that reads better than forced uniform height.

The user's node list was wrong again: desktop "copy" and "cards" both listed
`19925`/`19926`, which are the two heading text nodes. Derived the real six card IDs from
the grid structure instead.

### 2026-07-30 — Mobile nav overlay
Reworked the mobile menu per user request: the toggle now swaps to an X, the panel is
fixed rather than in flow so it no longer pushes the page down, and it runs from below
the bar to the bottom of the viewport.

The bar's height is measured with a `ResizeObserver` and applied as the overlay's `top`,
rather than hard-coded at 81px, so changing the logo or padding cannot leave a gap. The
overlay renders outside `<header>` so it positions against the viewport rather than the
bar. Also added Escape-to-close and an auto-close when crossing to desktop widths, which
would otherwise strand the overlay open with its toggle hidden.

Verified at 402x812: icon swaps, hero stays at y=131 open and closed (no shift), overlay
is `fixed` with top=81 exactly matching header height and bottom=812 at the viewport
edge, body scroll locks and unlocks, Escape closes.

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
