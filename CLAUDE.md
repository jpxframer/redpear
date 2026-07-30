# RedPear — Project State

> **This file is the single source of truth for where the build has got to.**
> It is auto-loaded at the start of every Claude Code session. Update it at the end
> of every step (see [Update protocol](#update-protocol) at the bottom) so a fresh
> chat can pick up without re-deriving anything.

**Last updated:** 2026-07-30
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

| Section | Desktop node | Mobile node | Status |
|---|---|---|---|
| Nav bar | `20875-19503` | `20875-21353` | ✅ done |
| Hero | `20875-19517` | `20875-20475` | ✅ done |
| Remaining sections | — | — | ⬜ awaiting node URLs |

Mobile landing page sections live under `20875-20474` as sibling "Section Mobile" frames
at `20875-20550`, `20875-20805`, `20875-20957`, `20875-21077`, `20875-21126`,
`20875-21156`, `20875-21190`, `20875-21227`, `20875-21251`.

---

## Conventions and gotchas

**Responsive breakpoint.** Mobile-first base styles, `lg:` (1024px) switches to desktop.
Figma frames are 1440px desktop / 402px mobile. Desktop gutter is `lg:px-28` (112px),
mobile `px-4` (16px).

**Tailwind resolves conflicting `display` classes by its own property order, not by the
order you write them in the class attribute.** Passing `hidden` to a component whose base
class already sets `inline-flex` will silently lose. Wrap the component in a
`hidden lg:block` div instead. This caused a real bug where the desktop CTA leaked into
the mobile nav — see the comment in [`Navbar.tsx`](components/layout/Navbar.tsx).

**Figma asset URLs expire after 7 days.** Always download the bytes into `public/` and
reference local paths. Never leave a `figma.com/api/mcp/asset/...` URL in a component.

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
- [ ] No tests and no CI yet.

---

## Session log

Newest first. One entry per step — what changed and anything that would surprise the next
session.

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
