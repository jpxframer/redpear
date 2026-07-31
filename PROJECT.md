# RedPear — Project State

> **This file is the single source of truth for where the build has got to.**
> Update it at the end of every step (see [Update protocol](#update-protocol) at the
> bottom) so a fresh chat can pick up without re-deriving anything.
>
> Claude Code only auto-loads `CLAUDE.md`, so a one-line `CLAUDE.md` sits alongside this
> file pointing here. Keep that pointer — without it a new session starts blind.

**Last updated:** 2026-07-31 (navbar fixed; page transitions + scroll reveals)
**Repo:** https://github.com/jpxframer/redpear (private, default branch `main`)
**Live:** https://redpear.vercel.app — **publicly reachable**, deployed from `main` via the
Vercel dashboard's GitHub integration, so every push to `main` redeploys. There is no
`.vercel` dir locally and no CLI auth on the dev machine; deploys are not driven from here.
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
| 3 — Platform / Technology | ✅ |
| 4 — Audiences | ✅ |
| 5 — Why RedPear | ✅ |
| 6 — Case studies | ✅ |
| 7 — Insights & Resources (blog) | ✅ |
| 8 — CTA band | ✅ |
| 9 — Footer (+ newsletter form) | ✅ (form not wired) |

**The landing page is structurally complete.** Every block is built and responsive.

### About page (`/about`) — in progress

Screen 3/4 of the eight core screens. Nine blocks; one is built.

| Block | Status |
|---|---|
| Hero — "Building the Future of Insurance Through Technology" | ✅ |
| 1 — Our Story / Mission / Vision | ✅ |
| 2 — What We Believe | ✅ |
| 3 — Our Team & Leadership | ✅ |
| 4 — Our Approach | ✅ |
| 5 — Why Organizations Choose RedPear | ✅ (reuses the landing `WhySection`) |
| 6 — Partners & Clients | ✅ |
| 7 — CTA band | ✅ (reuses the landing `CtaSection`) |
| 8 — Footer | ✅ (reuses the shared `Footer`) |

**The About page is structurally complete.** All nine blocks are built and responsive.

### Services page (`/services`) — in progress

Screens 5/6. Six blocks; the hero is built and four of the rest are already-built
components that just need wiring with new copy.

| Block | Status |
|---|---|
| Hero — "Technology Solutions Built for the Future of Insurance" + 6 bento cards | ✅ |
| 1 — How We Work | ✅ (reuses `ApproachSection`) |
| 2 — Why Organizations Choose RedPear | ✅ (reuses `WhySection`) |
| 3 — Frequently Asked Questions | ✅ |
| 4 — CTA band | ✅ (reuses `CtaSection`) |
| 5 — Footer | ✅ (reuses the shared `Footer`) |

**The Services page is structurally complete.** Only two of its six blocks needed new
components; the other four are reuses.

### Contact page (`/contact`) — in progress

Screens 7/8, opened on 2026-07-31. **The screen is "Contact"** — that was unknown until the
frame was mapped. Four blocks; only the hero was new work.

| Block | Status |
|---|---|
| Hero — "Let's Build the Future of Insurance Together" + form/panel/map card | ✅ |
| 1 — Frequently Asked Questions | ✅ (reuses the Services `FaqSection`) |
| 2 — CTA band | ✅ (reuses the shared `CtaSection`) |
| 3 — Footer | ✅ (reuses the shared `Footer`) |

**The Contact page is structurally complete.** Three of its four blocks are reuses.

**All eight core screens are now built.** What is left is wiring, not layout — see Known
follow-ups, of which the contact form having no destination is the most serious.

**Blocking launch, not just polish:** the footer newsletter form has no destination, the
CTA buttons have no booking flow, and most nav/footer links are placeholder anchors. All
logged under Known follow-ups.

**Two decisions still open**, both worth settling before the sections that need them:

1. **Where do the two forms post?** Mailchimp, Resend, a route handler writing to a
   database, or a `mailto:` stopgap. This now covers the footer newsletter *and* the
   contact form, which is the more urgent of the two — see Known follow-ups.
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
  globals.css          design tokens + gloss utilities + motion  ← read before styling
  layout.tsx           font wiring, metadata, Navbar + Footer, noscript guard
  template.tsx         remounts per navigation — drives the page transition
  page.tsx             landing page composition (section order lives here)
  about/page.tsx       /about composition + its own metadata
  services/page.tsx    /services composition + its own metadata
  contact/page.tsx     /contact composition + its own metadata
components/
  services/            Services page sections: ServicesHero, FaqSection
  about/               About page sections, in page order: AboutHero,
                         StorySection, BeliefsSection, TeamSection,
                         ApproachSection, PartnersSection
                       ApproachSection is SHARED — /services renders it as
                         "How We Work" via title/steps props.
  contact/             Contact page sections: ContactHero, ContactForm (client),
                         ContactPanel, ContactMap (Google embed, keyed off
                         NEXT_PUBLIC_GOOGLE_MAPS_API_KEY — see .env.example)
  ui/Button.tsx        shared CTA (primary = red, secondary = white). Always a
                         Link; `buttonClasses()` exports the look on its own for
                         the one real <button> on the site, the contact submit.
  ui/IconBadge.tsx     red gloss square + 24px icon slot (see the partial-frame gotcha)
  ui/Reveal.tsx        client wrapper — eases a section in when first scrolled to
  layout/Navbar.tsx    responsive nav + mobile overlay, client component
  sections/            one file per landing section, in page order:
                         Hero, ProblemSection, SolutionsSection,
                         AudiencesSection, WhySection, TestimonialsSection
                       WhySection and CtaSection are SHARED — /about renders both,
                         so editing either changes two pages. CtaSection takes
                         optional title/body props (defaults = landing copy).
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
| `text-display-sm` | 44/48 | Display/Semibold/Small |
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
| `text-label-lg` | 16/18 | Label/Large/Regular |
| `text-label-sm` | 12/14 | Label/Small/Medium and /Regular |

The label styles run deliberately tighter than the paragraph scale — 16px copy on an 18px
line. Used by the section 7 blog cards.

`text-h4-mobile` and `text-h5` carry identical values but different Figma names; keep both
so components read the way the design file does.

**Gloss utilities** — the raised, lit-from-above look on buttons and cards. Four variants,
because the inset highlight colour and outer shadow differ per surface:

| Utility | Used on |
|---|---|
| `gloss-red` | primary buttons, the red icon badge |
| `gloss-white` | secondary button, most cards |
| `gloss-bento` | section 2 bento cards — 10px outer blur as a real box-shadow, so corners stay crisp under the clipped image |
| `gloss-cta` | section 8 CTA band — red inset like `gloss-red`, 10px outer blur like `gloss-bento` |
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
| 3 | `20875-18777` | About — Desktop (1440x7356) | 🟡 in progress |
| 4 | `20875-19146` | About — Mobile (402x12801) | 🟡 in progress |
| 5 | `20875-21362` | Services — Desktop (1440x5769) | 🟡 in progress |
| 6 | `20875-21622` | Services — Mobile (402x8076) | 🟡 in progress |
| 7 | `20875-21873` | Contact — Desktop (1440x2965) | 🟡 in progress |
| 8 | `20875-22083` | Contact — Mobile | 🟡 in progress |

Screens 7–8 were handed over **together as one screen's desktop and mobile**, so that
pairing is stated by the user rather than inferred from document order — and it held up:
both frames are the Contact page.

**The prediction recorded here before the frames were opened was right.** The desktop hero
(`20875-21889`) and cards (`20875-21894`) are 5 apart, and `21894` turned out to be a
**child** of `21889`, not a sibling block — the same shape as the Services hero. They are
one component, `ContactHero`.

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
| 3 | Platform — "Technology That Works Behind Every Insurance Journey" | `20875-20074` | `20875-20957` | 958 | ✅ done |
| 4 | Audiences — "Designed for Organizations Across Africa" | `20875-20195` | `20875-21077` | 656 | ✅ done |
| 5 | Differentiators — "Why Organizations Choose RedPear" | `20875-20244` | `20875-21126` | 1448 | ✅ done |
| 6 | Case studies — "Helping Organizations Modernize Insurance" | `20875-20275` | `20875-21156` | 680 | ✅ done |
| 7 | Blog — "Insights & Resources" | `20875-20310` | `20875-21190` | 693 | ✅ done |
| 8 | CTA band — "Ready to Modernize Your Insurance Operations?" | `20875-20347` | `20875-21227` | 488 | ✅ done |
| 9 | Footer — logo, newsletter signup | `20875-20371` | `20875-21251` | 378 | ✅ done |

The footer's desktop node is `20875-20371` (its `Content` child is `20875-20372`). Note
the user supplied `20875-21228` for it, which is actually the section 8 **mobile CTA
card** — always sanity-check a pasted desktop node against the map above.

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

**Section 3 is a single wide card**, not a grid: a copy column (`20875-20082` desktop /
`20875-20964` mobile) beside a "Layered Canvas" (`20875-20093` / `20875-20975`) holding a
485x460 WhatsApp mock plus two floating cards. Both floating cards are `hidden` in the
mobile frame and are `hidden lg:flex` here. Copy column type is 24/32 + 18/28 on desktop,
20/28 + 16/24 on mobile; the feature list is 16/24 medium at both.

> **Figma content bug — not reproduced.** The mobile frame's own copy nodes
> (`20875-20960` / `20875-20961`) still contain **section 2's** text, "Solutions Built for
> Modern Insurance Organizations". Reproducing that would print the same heading twice on
> mobile, so the desktop copy (`20875-20078` / `20875-20079`) is used at both breakpoints.
> Fix the mobile frame in Figma; no code change needed when you do.

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

**Section 7 card node IDs.** Three blog cards, 3-up on desktop (389.33x433, 24px gaps) and
stacked on mobile (370x417, 16px gaps). Card padding is the only thing that changes across
breakpoints — 24 desktop, 16 mobile — so the inner content is an identical 385px tall at
both, thumbnail included. Type does not change: 20/28 title, 16/18 excerpt, 12/14 meta.

| Card | Desktop | Mobile | Thumbnail |
|---|---|---|---|
| Why WhatsApp is the Ultimate… | `20875-20317` | `20875-21197` | insights/whatsapp-distribution.png |
| Ditching the Queues… | `20875-20327` | `20875-21207` | insights/claims-pipeline.png |
| Designing Secure Chat Pipelines… | `20875-20337` | `20875-21217` | insights/secure-chat-pipelines.png |

Thumbnails export at 1344x768 (aspect 1.75) into a 341x220 slot (aspect 1.55), so they are
`object-cover` and crop slightly at the sides. That matches how Figma renders them.

One inconsistency normalised rather than reproduced: card 1's meta row is `leading-20`
where cards 2 and 3 are `leading-14`. The row is a fixed 15px with `items-center`, so the
difference is not visible; all three use `text-label-sm` (12/14).

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

### About page sections

Desktop `20875-18777` (1440x7356) and mobile `20875-19146` (402x12801), both enumerated in
full on 2026-07-31 — this map should not need re-deriving. Blocks are named "Section",
"Hero" or "Section Mobile" indiscriminately in Figma, so heading copy is the only reliable
way to tell them apart.

| # | Block | Desktop node | Mobile node | Desktop height |
|---|---|---|---|---|
| — | Hero — "Building the Future of Insurance Through Technology" | `20875-18778` | `20875-19147` | 988 |
| 1 | Our Story + Mission/Vision | `20875-18806` | `20875-19164` | 846 |
| 2 | What We Believe (4 value cards) | `20875-18825` | `20875-19182` | 594 |
| 3 | Our Team & Leadership (6 profiles) | `20875-18858` | `20875-19215` | 1682 |
| 4 | Our Approach (4 numbered steps) | `20875-18944` | `20875-19300` | 618 |
| 5 | Why Organizations Choose RedPear | `20875-18973` | `20875-19329` | 1448 |
| 6 | Partners & Clients (10 logos) | `20875-19004` | `20875-19359` | 314 |
| 7 | CTA — "Ready to Transform Your Insurance Operations?" | `20875-19019` | `20875-19374` | 488 |
| 8 | Footer | `20875-19043` | `20875-19398` | 378 |

The **footer is identical to the landing page's**, so it reuses the shared `Footer`
component. **Section 5 is the landing page's section 5 verbatim** — confirmed 2026-07-31 by
diffing the copy and the geometry: same heading, same sub, same four card titles and
bodies, same 800px copy column, same 592/544 card and image widths. `WhySection` is
imported into `/about` unchanged; no generalisation of `WhyCard` was needed.

The navbar in the About frames (`20875-18779` desktop, `20875-19156` mobile) is the shared
one. The mobile Nav frame is 133 tall because it includes a 53px iOS **StatusBar mock**
(`20875-19158`) — the real bar is 80.05 like everywhere else. Do not reproduce the status
bar.

**Hero node IDs.** Content frame is `20875-18793` desktop / `20875-19148` mobile (the
navbar is a sibling, not a child). Desktop is a centred 800px copy column over a
three-column collage of five images; mobile keeps **only the first and last** of those
five, stacked full width.

| Image | Slot (desktop) | On mobile | File |
|---|---|---|---|
| Enterprise Technology | col 1 top, 236 tall | ✅ shown | about/enterprise-technology.png |
| Built for Africa | col 1 bottom, 236 tall | hidden | about/built-for-africa.png |
| Technology Improving Insurance | col 2, full 488 tall | hidden | about/technology-improving-insurance.png |
| Insurance Trust | col 3 top, 236 tall | hidden | about/insurance-trust.png |
| RedPear Team Collaboration | col 3 bottom, 236 tall | ✅ shown | about/team-collaboration.png |

All five export at 1024x1024 into non-square slots, so they are `object-cover`.

**Section 1 node IDs** (Our Story / Mission / Vision). Wrapper `20875-18807` desktop /
`20875-19164` mobile; the card itself is `20875-18808` / `20875-19165`.

Three nested levels of the **same** raised card, all `gloss-white` on `brand-white`:

| Level | Desktop | Mobile |
|---|---|---|
| Outer shell | 1216x746, p-24, **r-24** | 370x1170, p-16, **r-16** |
| Our Story card | 1168x498, p-24, r-16 | 338x690, p-16, r-16 |
| Mission / Vision cards | 572x176 side by side, p-16, r-16 | 338x208 stacked, p-16, r-16 |

The outer shell is the **only** thing whose radius changes across breakpoints. Story image
is 488x450 on desktop and a 306x306 square on mobile — Figma exports the **same
1024x1024 file** for both (identical MD5), so it is one asset at `about/our-story.png`
with `object-cover`.

Headings here are `brand-red` **Geist Medium**, not black: 36/44 desktop (`text-h2`),
32/40 mobile (`text-h3`). Body is 18/28 → 16/24. Image-to-copy gap is 32 at both
breakpoints; every other gap steps 24 → 16.

**Section 2 node IDs** (What We Believe). Wrapper `20875-18826` desktop / `20875-19183`
mobile; heading `20875-18828` / `20875-19185`.

| Card | Desktop | Mobile | Icon |
|---|---|---|---|
| Insurance First | `20875-18830` | `20875-19187` | building-4 |
| Customer First | `20875-18837` | `20875-19194` | profile |
| Trust & Security | `20875-18844` | `20875-19201` | shield-security |
| Partnership | `20875-18851` | `20875-19208` | profile-2user |

All four icons are **full 24x24 viewBoxes**, so `IconBadge`'s default slot is correct — no
`sizeClass` needed. The badge itself (40x40, r-8, `brand-red`, gloss-red insets, 8px pad)
is exactly what `IconBadge` already renders.

Desktop is a 2x2 grid of 596x188 cards, 24px gaps, capped at `max-w-content`. Partnership's
body is one line where the other three are two, and Figma still draws all four at 188 — so
the grid uses `lg:auto-rows-fr`, same trick as the landing page's section 4.

Type steps down on mobile like every other section — 36/44 → **28/36** heading
(`text-h3-mobile`), 28/36 → **24/32** card titles (`text-h4-mobile`), 18/28 → **16/24**
body. The frame originally carried the desktop scale at both breakpoints; the user
corrected it in Figma on 2026-07-31 after it was flagged, and the code was re-pulled.

The card is **identical at both breakpoints**: `gloss-white bg-brand-white rounded-2xl p-4`,
no stroke. The mobile frame originally drew a flat bordered card with no gloss; the user
corrected it in Figma on 2026-07-31 after it was flagged.

**Pixel-exact at both breakpoints, no residual** — mobile 884 and cards 176/200/176/176
match Figma exactly, because dropping the border also dropped the 2px-per-card box-model
difference that a CSS stroke costs. Mobile cards are content-sized (not levelled like the
desktop grid), which is what Figma draws.

One sub-perceptual deviation: Figma fills the **mobile** card with Generic/White `#FFFFFF`
where desktop uses RedPear Website/White `#FFFDFD`. Both breakpoints use `bg-brand-white`
here — the difference is 2/255 on two channels and invisible, and using Tailwind's raw
`bg-white` on mobile only would have been the sole place on the page where a card skips the
brand token. Card width is likewise normalised to 370 (the standard `px-4` gutter) against
Figma's 367, because this frame's own wrapper is drawn 399 wide at x=2 rather than 402 at
x=0.

**Section 3 node IDs** (Our Team & Leadership). Wrapper `20875-18859` desktop /
`20875-19215` mobile; copy `20875-18861` / `20875-19217`; grid shell `20875-18864` /
`20875-19220`.

| Person | Desktop card | Mobile card | Avatar node | File |
|---|---|---|---|---|
| Alfred Ludwig Kissiedu | `20875-18866` | `20875-19222` | `20875-18869` | team/alfred-kissiedu.png |
| Lois Adusei | `20875-18879` | `20875-19235` | `20875-18882` | team/lois-adusei.png |
| Nimondo Zangui | `20875-18892` | `20875-19248` | `20875-18895` | team/nimondo-zangui.png |
| Robert Dieu Donne Tawiah | `20875-18905` | `20875-19261` | `20875-18908` | team/robert-tawiah.jpg |
| Rashad Muntar | `20875-18918` | `20875-19274` | `20875-18921` | team/rashad-muntar.jpg |
| Osmond Aboagye | `20875-18931` | `20875-19287` | `20875-18934` | team/osmond-aboagye.jpg |

**Pull avatars from the avatar node, not the card or the grid.** `download_assets` on the
grid returned 11 raw images for 6 avatars, and on a single card returned 2, with no way to
tell which was the portrait. Called on the `Rectangle 1` node itself, `rawImages[0]` is
unambiguous.

The card **re-lays out** rather than just resizing: desktop is avatar-left (fixed 188x188)
with name/role/LinkedIn in a `flex-1` column beside it, vertically centred; mobile stacks a
full-width square avatar above that same column. The Bio block sits below at full width in
both. Name steps 28/36 → 24/32 and the bio 18/28 → 16/24, but **role and the "Bio" label
stay 18/28 at both breakpoints** — the label is Paragraph/Large/**Medium**, i.e.
`text-body-lg font-medium`.

The LinkedIn badge is the icon badge geometry but **white**, so `IconBadge` grew a `variant`
prop (`"red" | "white"`, default red) rather than gaining a parallel component.

Use plain grid auto rows here, **not `auto-rows-fr`**. Figma levels each row against its own
tallest card (440 / 412 / 440), which is exactly what default grid stretching already does;
`auto-rows-fr` would level all three rows to the global tallest and add 56px the design does
not have.

> **Figma layout bug — normalised, not reproduced.** Each desktop card is 572 wide with
> 16px padding, so its content box is **540**. Figma draws the card's inner frame at
> **560** starting at x=16, putting its right edge at 576 — 4px past the card's own edge.
> 16 + 560 + 16 = 592, the landing page's card width, so the inner frame is stale from a
> 592-wide card that was never reflowed when the outer dropped to 572. Built at the correct
> 540. Consequences: two bios gain a line and "Robert Dieu Donne Tawiah" wraps onto two
> lines, so the section measures 1711 against Figma's 1682 and row 2 is 441 against 412.
> **Mobile has no such problem** — 338 − 32 = 306, exactly what Figma draws.

**Section 4 node IDs** (Our Approach). Wrapper `20875-18945` desktop / `20875-19301`
mobile. Four numbered step cards, 2x2 on desktop and stacked on mobile, no outer shell.

| Step | Desktop | Mobile |
|---|---|---|
| 01 Discover | `20875-18949` | `20875-19305` |
| 02 Design | `20875-18955` | `20875-19311` |
| 03 Build | `20875-18961` | `20875-19317` |
| 04 Optimize | `20875-18967` | `20875-19323` |

This is the only section whose **step number** carries a display size: 52/56 desktop
(`text-display-lg`) stepping to 44/48 mobile, which is where `text-display-sm` came from.
Titles are 24/32 → 20/28 (`text-h5` → `text-h6`), bodies 18/28 → 16/24, all in `brand-red`
Geist SemiBold for the number and `brand-black` Geist Medium for the title.

The grid uses **`lg:items-start`**, not the default stretch: Figma sizes these rows to
`fit-content` and pins each card to the row top. All four cards are 200 tall today so it
makes no visible difference — it only matters if one card's copy gets shorter.

**Pixel-exact at both breakpoints with no residual** — 618 / 980 sections, 596x200 /
370x204 cards, 24 / 16 gaps.

**Section 6 node IDs** (Partners & Clients). Wrapper `20875-19005` desktop / `20875-19360`
mobile; logo grid `20875-19008` / `20875-19363`.

A plain grid of fixed **89x48** cells with 24px gaps — 5x2 on desktop, 2x5 on mobile. The
cells sit at the *start* of each track rather than stretching, so the desktop row occupies
1081 of the 1216 column and leaves 135 trailing. That is how Figma draws it; do not
`justify-between` it.

**Ten slots, seven files.** Hollard, GLICO and BAS Capital each appear twice, in exactly the
same order the hero marquee uses. Reuses `public/insurers/` unchanged — the section 6
exports are **byte-identical** to the hero's (md5-verified), so no new assets.

`object-contain object-bottom`, not Figma's generated `size-full` with no object-fit: the
marks run 1.9:1 to 4.6:1 against a 1.85:1 box, so filling would squash the wide ones. Same
reasoning as [`InsurerLogos`](components/hero/InsurerLogos.tsx).

Desktop is **pixel-exact** — cells land at 0/248/496/744/992 within the grid, matching Figma
exactly; mobile at 0/197 likewise, grid 370x336. Mobile section runs 452 against 465 because
Figma fixes its inner frame at 417 where the content is 404; the 13px is slack in the frame,
not layout.

**Section 7 node IDs** (CTA band). Wrapper `20875-19019` desktop / **`20875-19374`** mobile.

> The user supplied `20875-19146` for the mobile CTA, which is the **entire About Mobile
> frame**. Same class of mix-up as the landing footer. Always check a pasted node against
> the tables here.

**Identical to the landing CTA in every respect except wording** — same 24px card, 64px
padding, `gloss-cta`, watermark at the same offsets and 10% opacity, 52/56 semibold heading
stepping to 32/40 **bold**, 640px sub, white button. So `CtaSection` gained optional
`title` / `body` props defaulting to the landing copy, and `/about` passes its own:

| | Landing | About |
|---|---|---|
| Heading | Ready to **Modernize** Your Insurance Operations? | Ready to **Transform** Your Insurance Operations? |
| Body | Let's build faster, smarter… technical briefing with our team. | Whether you're modernizing existing systems… take the next step. |

Both instances carry `id="demo"`. Legal — separate documents — but it means `#demo` on
`/about` now resolves to the About band rather than the landing one.

490 / 502 against Figma's 488 / 500, the same +2 border residual the landing band already
carried.

> **Figma layout bug — normalised, not reproduced.** The collage's left column is 394 wide
> against 384 for the other two. With 32px gaps that totals 1226 inside a 1216 container,
> i.e. it overflows its own frame by 10px. Built as three equal 384px columns, which is
> what the other two already are. Columns 2 and 3 therefore sit 10px left of Figma.

### Services page sections

Desktop `20875-21362` (1440x5769) and mobile `20875-21622` (402x8076). Enumerated on
2026-07-31. **Four of the six blocks are components that already exist**, which is the
point of this page — see the status table above.

| # | Block | Desktop node | Mobile node | Desktop height |
|---|---|---|---|---|
| — | Hero + 6 bento cards | `20875-21363` | `20875-21623` | 2354 |
| 1 | How We Work | `20875-21414` | `20875-21666` | 618 |
| 2 | Why Organizations Choose RedPear | `20875-21443` | `20875-21695` | 1448 |
| 3 | Frequently Asked Questions | `20875-21474` | `20875-21725` | 483 |
| 4 | CTA band | `20875-21495` | `20875-21746` | 488 |
| 5 | Footer | `20875-21519` | `20875-21770` | 378 |

The mobile frame's How We Work (`20875-21666`, 980 tall) and Why (`20875-21695`, 1950) are
**identical to the About page's** equivalents, so those reuse straight across. The mobile
FAQ is `20875-21725`; its first item is expanded like the desktop one.

**Hero node IDs.** Copy `20875-21380`; card grid `20875-21383`. Six bento cards, 2x3 with
24px gaps, inside the Figma "Hero" frame — so `ServicesHero` holds both the copy and the
grid, as the design groups them.

| Card | Node | Image |
|---|---|---|
| AI Solutions (featured) | `20875-21384` | solutions/ai-solutions.png *(reused)* |
| Insurance Platforms | `20875-21389` | solutions/insurance-platforms.png *(reused)* |
| WhatsApp Solutions | `20875-21394` | solutions/whatsapp-solutions.png |
| Digital Transformation | `20875-21399` | solutions/digital-transformation.png |
| Analytics & Insights | `20875-21404` | solutions/analytics-insights.png |
| Consulting & Integration | `20875-21409` | solutions/consulting-integration.png |

**All six are bento cards here**, unlike the landing page where only the first two are bento
and the other four are small cards with DOM micro-visuals. Cards 1 and 2 carry the landing's
copy **verbatim** and reuse its images; 3-6 needed new exports. `BentoCard` fits unchanged —
its `p-4 lg:p-6`, 16px gap, `h-[255px] lg:h-[430px]` image and 24px radius match this frame
exactly.

`mobileBodyLarge` is deliberately **not** set on Insurance Platforms here. That prop exists
for a landing-page-only Figma quirk that was flagged as a likely oversight; there is no
evidence for it on this frame.

**The two frames disagree on mobile bento metrics**, which is why `BentoCard` has a
`mobileVariant` prop. Desktop is identical either way; the default is `"landing"` so the
live landing page is untouched, and Services opts in with `mobileVariant="services"`.

| Mobile | `"landing"` | `"services"` |
|---|---|---|
| Card padding | 16 all round | **24 horizontal / 16 vertical** |
| Title → body gap | 16 | **8** |
| Featured title weight | semibold | **medium** (no featured distinction on mobile) |
| Gap between cards | 24 | **16** |

The landing's flat 16px pad is the deliberate deviation the user asked for over Figma's 24
— that is why it stays the default rather than being "corrected".

> **Watch the padding shorthand.** The services variant is spelled `px-6 py-4 lg:py-6`, not
> `px-6 py-4 lg:p-6`. Tailwind emits `padding-inline` / `padding-block` *after* the `padding`
> shorthand, so an unprefixed `py-4` beats `lg:p-6` at every width and desktop silently
> loses its 24px vertical padding.

Desktop measures 2280 against Figma's 2274 and mobile 3046 against 3034 — +2 per card in
both cases, from the CSS border that Figma's card does not draw at all (it relies on the
gloss shadow alone). The border is kept so these cards stay visually identical to the
landing's; dropping it for the services variant would make the section pixel-exact.

Mobile hero copy is 36/44 over 16/24 with a 16px gap, and 24px from copy to grid — verified
against `20875-21626`.

**How We Work** (`20875-21414` / `20875-21666`) is the About page's Approach section with a
different heading and two reworded steps, so `ApproachSection` took `title` and `steps`
props defaulting to the About wording. Step 2's body gains "…not a generic template" and
step 4 becomes **"Launch & Support"** rather than "Optimize". **Exact at both breakpoints**
— 618 / 980, cards 596x200 / 370x204.

**Why** (`20875-21444` / `20875-21695`) and the **CTA** (`20875-21495` / `20875-21746`) are
verbatim reuses; the CTA takes the same copy the About page passes. Both now render on
three pages and two pages respectively.

**FAQ node IDs** (`20875-21475` desktop / `20875-21726` mobile). Three gloss cards, p-16,
r-16, in a 24 / 16 gap stack.

| | Desktop | Mobile |
|---|---|---|
| Heading | 36/44 (`text-h2`) | 28/36 (`text-h3-mobile`) |
| Question | 28/36 (`text-h4`) | **20/28** (`text-h6`) |
| Answer | 16/24 (`text-body-md`) | 16/24 — same at both |
| Icons | `arrow-up-round.svg` open, `arrow-down-sharp.svg` closed — both full 24x24 | same |

Built as a **real accordion** ([`FaqSection`](components/services/FaqSection.tsx), a client
component): first item open as Figma draws it, each item toggling independently, with
`aria-expanded` / `aria-controls`. Figma has no open/closed states beyond the one frame, so
the interaction is ours.

> **Answers 2 and 3 are written copy, not from Figma.** The design authors an answer for
> question 1 only; the other two are drawn collapsed with nothing behind them. Written on
> 2026-07-31 at the user's request, grounded in the site's own claims (the landing page's
> Audiences section for who RedPear serves, and How We Work step 2 for the "not a generic
> template" line). **Both still need a factual check against what RedPear actually sells.**

Mobile FAQ is **exact** at 516, items 200/88/88 matching cell for cell. Desktop runs 486
against 483 because Figma fixes the open card's inner box at 73px, which squeezes its own
answer text to 21px where one line of 16/24 is 24 — the answer is left to size naturally
rather than clipped.

### Contact page sections

Desktop `20875-21873` (1440x2965) and mobile `20875-22083`. Enumerated 2026-07-31. Only the
hero is new work; the other three blocks are existing components.

| # | Block | Desktop node | Mobile node | Desktop height |
|---|---|---|---|---|
| — | Hero + form/panel/map card | `20875-21889` | `20875-22085` | 1536 |
| 1 | Frequently Asked Questions | `20875-21935` | `20875-22138` | 483 |
| 2 | CTA band | `20875-21956` | `20875-22158` | 488 |
| 3 | Footer | `20875-21980` | — | 378 |

Blocks 1-3 are **verbatim reuses, diffed before wiring.** The FAQ's three questions and its
one authored answer are word-for-word the `/services` ones; the CTA's heading and body are
the "Ready to Transform…" pair `/about` and `/services` already pass to `CtaSection`, with
the same 488/500 geometry, watermark offsets and 52/56 → 32/40 bold type.

> **The Contact FAQ frame is stale relative to the Services one.** Its mobile heading is
> 36/44 and its questions 24/32, which is what `/services` looked like *before* the user
> corrected it on 2026-07-31 to 28/36 and 20/28. `FaqSection` renders the corrected sizes on
> both pages, so the Contact mobile FAQ measures **516 against the frame's 588** — 52 of
> that is the heading dropping to one line at 28px, 20 is the smaller questions. Deliberate;
> update the Contact frame to match `/services` and the numbers converge.

Desktop FAQ is 486 against 483 and the CTA 490/502 against 488/500 — the same residuals both
components already carried on their other pages, not new ones.

**Hero node IDs.** Copy `20875-21891` / `20875-22087`; card `20875-21894` / `20875-22090`.
The card is a **child** of the hero frame, so `ContactHero` holds both — same grouping as
`ServicesHero`.

The copy block is metrically **identical to the Services hero's** — 800px centred column,
52/56 → 36/44 heading, 18/28 → 16/24 sub, 24/16 internal gap, 50/24 down to the card. Its
class list is the same one, deliberately.

Card structure, desktop / mobile:

| Level | Desktop | Mobile |
|---|---|---|
| Outer shell | 1216x1116, p-24, **r-24** | 370x1751, p-16, **r-16** |
| Form column | 734 wide, flex-1 | full width |
| Contact panel | **fixed 402**, p-24, r-16, red | full width, p-16, r-16 |
| Map card | full width, p-24, r-16 | p-24 — **does not step down** |
| Map viewport | 1120x483 | 290x483 — same height |

The outer shell is the only thing whose radius changes across breakpoints, the same shape as
the About page's Story card. The map card keeps 24px padding on mobile where every other
card on the page drops to 16.

**The map is a real Google embed, not Figma's screenshot.**
[`ContactMap`](components/contact/ContactMap.tsx) fills that 483px viewport with an
`iframe`, replacing the flat `map.png` the frame draws — which was a PNG of Google Maps
complete with baked-in UI chrome and attribution, upscaled from 1083 into a 1120 slot, and a
licensing question on top. The card and viewport geometry are unchanged, so nothing around it
moved.

It resolves **two URL shapes**, and which one you get depends on an env var:

| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | URL | Status |
|---|---|---|
| set | `/maps/embed/v1/place` | The documented Maps Embed API. `place` mode is free and unmetered. |
| unset | `maps.google.com/maps?…&output=embed` | Undocumented. Works today, no setup, can break without notice. |

The keyless URL is the **fallback so the page is never broken while the key is being sorted
out** — it is a stopgap, not the destination. Set the key and the component switches over on
its own, no code change. `.env.example` documents the whole thing, including the part that
matters most: `NEXT_PUBLIC_` inlines the key into the client bundle, so it **must** be
restricted by HTTP referrer and to the Maps Embed API in the Google Cloud console, or anyone
can lift it off the page and spend your quota against your other enabled APIs.

The address is a constant at the top of the component (`19 Kofi Annan Street, Airport
Residential Area, Accra, Ghana`, zoom 16) — change it there, not in a URL.

**The form fields come from an external Figma library, "Simple Design System".** Their Code
Connect snippets resolve to `InputField` / `SelectField` / `TextareaField`, none of which
exist in this repo — so pull those nodes with `disableCodeConnect: true` to get real
markup instead of unusable component calls. Field geometry: label 16/24 medium, 8px to the
control, control at 16/12 padding on an 8px radius. Rows are 20px apart; the two fields in a
row are 32px apart at **both** breakpoints, only the axis changes.

That library also brings its own `#1e1e1e` text token, which is not a RedPear colour. Label,
input and chevron all use it in Figma; all three are mapped to `brand-black` here. The
difference is invisible and it keeps the page on the token set.

**The Select is the odd field out in Figma** — it carries the filter-based `gloss-white`
where the three inputs and the textarea carry `gloss-bento` (a real box-shadow). All four are
unified on `gloss-bento` so one field in a row does not have visibly different corners.

**Figma fills every field with example content** ("Kwame Asante", a written message), which
is treated as **placeholders**, not values — pre-filling someone's name and message would be
wrong. On the user's instruction (2026-07-31) they are worded as *instructions* rather than
fake sample data: "Enter your full name", "Enter your email address", "Tell us what you're
looking to build or improve". The phone one is just "Enter your number" because the dial code
sits in its own control beside it. That control has since narrowed and the input now has 243px
rather than 193, so a longer phone placeholder would fit — the user's call on 2026-07-31 was
to leave it short.

One consequence for the textarea: Figma's mobile box is 120 tall only because the example
message wraps to four lines at 306px wide, while the component's declared min-height is 80 at
both breakpoints. The drawn height is reproduced (`min-h-30 lg:min-h-20`), because a two-line
message box on a phone is mean. `resize-y` matches the drag grip Figma draws in the corner.

**The dialling-code select is not in Figma** — added 2026-07-31 on the user's instruction so
visitors pick their code rather than typing it. Ghana leads and is the default; the rest are
the African markets the site claims to serve, then the likeliest sources of overseas
enquiries. Each option puts the **dial code first** ("+233 Ghana"), and no code appears twice
so every option's value is unambiguous. It posts as `countryCode` alongside `phone`.

**Closed it shows the code alone; open, the list still names the country.** Asked for by the
user on 2026-07-31. A native `<select>` paints the selected option's *whole* text when closed
and offers no way to shorten it, so the pattern is:

- the real `<select>` is laid over the field at **`opacity-0`** — still the focusable control,
  still what opens the popup, still what submits;
- a plain `<div>` underneath draws the code, from `useState`;
- the `<option>` elements are **untouched**, which is exactly why the popup reads in full.

Three things that pattern has to get right, all verified in-browser rather than assumed:

| Requirement | How |
|---|---|
| No dead strip that fails to open the popup | select is `absolute inset-0`, pixel-aligned over the box; hit-testing the box's centre returns the `SELECT` |
| Not announced twice by a screen reader | the box is `aria-hidden`; the select keeps the `aria-label` |
| Still shows a focus ring | `peer-focus-visible:` on the box, borrowed from the select — the box is never itself focused |

Do **not** try to solve this with `color: transparent` on the select instead. Browsers disagree
about whether an `option`'s own colour also paints the closed control, so the popup can go
invisible on some of them.

The wrapper is **100px** wide (was 150 when it had to fit "+233 Ghana"), which hands the phone
input the difference: 243 desktop, 230 mobile.

> **Watch the width.** `control` already sets `w-full`, so the 100px lives on the select's
> *wrapper*, not the select. Two width utilities on one element is the Tailwind
> property-order trap this file already warns about.

**The panel's 150px gap is expressed as `justify-between`.** Figma spells the space above
"Follow Us On" as a literal 150px on desktop and 16px on mobile. `lg:justify-between` says
the same thing without the magic number and survives the copy changing length. It costs 6px:
the panel stretches to the form column's 504 rather than sitting at 498, vertically centred.

**The panel's three headings are 24/32 (`text-h5`) where Figma sets 28/36.** Stepped down on
the user's instruction, 2026-07-31. Deliberate divergence at both breakpoints; the frame
still says 28. It takes 12px off the mobile hero (3 headings x 4px of line height), which is
why that section now measures 2087 rather than the frame's 2099.

**LinkedIn and Instagram are a different icon set from `public/social/`** — same brands,
different drawings, so they live in `public/contact/`. Both export as **20.5x20.5 partial
frames** centred in a 24px slot (`IconBadge`'s `sizeClass`), and Figma stores both
**vertically mirrored**, correcting them with a transform on the parent. That flip is baked
into the committed SVGs so the files are correct standalone — without it LinkedIn's "i" dot
sits below its stem.

> **Figma had the XRP (Ripple) mark in the third slot, not the X logo** — a different logo
> that looks alike at 24px. Replaced 2026-07-31 on the user's instruction with the official X
> glyph the footer already uses, recoloured red for the white badge
> (`public/contact/x.svg`). The two rows on this page now show the same three brands. **The
> Figma frame still has XRP**; swap it there too.

**Pixel-exact on mobile with no residual** — shell 1751, form 792, panel 364, map card 531,
every field 48; the section is 2087 rather than 2099 only because of the smaller panel
headings above. Desktop is exact too (1216x1115 shell, 734 form, 1168x531 map card, 1120x483
map, 351x48 fields) except the deliberate panel +6, and the submit button at 191.3 against
190 because it uses the site's `font-semibold` where Figma's button text is Inter Medium.

---

## Conventions and gotchas

**Mobile section headings are ALWAYS 28/36 — never the 36/44 desktop size.** Standing rule
from the user (2026-07-31), given after correcting it section by section three times. Write
`text-h3-mobile font-medium lg:text-h2` when building any new section, **even if the Figma
frame shows 36/44** — the user has said they may forget to set it in the design and would
rather the code lead. Flag the mismatch rather than reproducing it.

Three deliberate exceptions, all verified across the three pages:

| Exception | Mobile size | Why |
|---|---|---|
| Page `h1` (each hero) | 36/44 | A page title, not a section heading |
| "Our Story" / Mission / Vision | 32/40 | Card headings inside a section; Figma sets `text-h3` and they are already below desktop's 36 |
| CTA band | 32/40 **bold** | Figma gives it its own style, Heading/H2/Bold/Mobile |

**Nav links are root-relative (`/#blog`), never bare fragments (`#blog`).** There is more
than one route now, and a bare fragment resolves against whatever page you are already on —
so `#blog` from `/about` looks for a section that is not there. `About` and `Services` are
real routes; `Blog` and `Contact` still point at landing-page sections.
[`Navbar`](components/layout/Navbar.tsx) marks the active one by comparing `href` to
`usePathname()`, colouring it `brand-red` and setting `aria-current="page"`. Fragment links
never match, which is correct — they are not routes.

**`Navbar` and `Footer` live in `app/layout.tsx`, not in the pages.** This was the other way
round until 2026-07-31 — every page mounted its own — and that is what made navigation flash:
the layout is kept alive across a route change, but a page is not, so the sticky bar was torn
down and rebuilt on every click, `headerHeight` resetting to 0 and the ResizeObserver
re-attaching each time. A new route renders **only its `<main>`**; it gets the chrome for
free. Moving them also took the duplicated Navbar out of all four route bundles.

**The navbar is `fixed`, and it carries a spacer.** Changed from `sticky` on the user's
instruction (2026-07-31) — sticky was letting page content show through the bar while
scrolling on some browsers. Two things this depends on, both easy to break:

- **`inset-x-0` is not optional.** A fixed block with auto left/right shrinks to fit its
  contents instead of spanning the viewport.
- **A fixed bar occupies no space**, so [`Navbar`](components/layout/Navbar.tsx) renders an
  `aria-hidden` spacer directly after the header. Without it every page slides up underneath
  the nav. Its height is **81.05** — 48.05 logo + 32 padding + 1 border, identical at both
  breakpoints — hard-coded as the SSR default so nothing jumps on hydration, then replaced by
  the measured value so a logo or padding change cannot silently open a gap.

The measurement uses `getBoundingClientRect().height`, **not `offsetHeight`**, which rounds to
whole pixels and would put the spacer at 81 against a bar of 81.05.

`scroll-mt-20` is 80px against that 81.05 bar, so anchors land 1.05px behind it. That
predates all of this and is invisible; it is *not* evidence of a broken spacer.

**Motion — two effects, no dependencies.** Both are CSS; the only JavaScript is one
IntersectionObserver. Added 2026-07-31.

| Effect | Where | What |
|---|---|---|
| Page transition | [`app/template.tsx`](app/template.tsx) + `--animate-page-in` | 250ms, fades in over an 8px rise. Next remounts `template.tsx` per navigation, which restarts the CSS animation — that is the entire mechanism. |
| Scroll reveal | [`Reveal`](components/ui/Reveal.tsx) + `[data-reveal]` in globals.css | 500ms, 16px rise, once per section per page load. |

**Wrap new sections in `<Reveal>` in the page file**, not inside the section component —
the components stay presentational and the page keeps deciding what animates. **Heroes are
deliberately left unwrapped**: they are above the fold, so they would fight the page
transition already running on them.

> **Any section with an anchor id must be `<Reveal rise={false}>`.** A transform moves an
> element's box for *scrolling* as well as visually, so a section that lifts 16px part-way
> through a scroll comes to rest 16px higher than the browser aimed for — behind the fixed
> navbar. Measured at 17px of overlap on `#blog` before this was caught. `rise={false}` fades
> without the transform and the anchor lands exactly. There is no wrapper arrangement that
> keeps the rise and lands correctly, because only an *ancestor* transform causes it.
>
> Today that means `ProblemSection` (`#about`), `SolutionsSection` (`#services`),
> `InsightsSection` (`#blog`) and `CtaSection` (`#demo`) — the last on all four pages, since
> it is what every "Book a Demo" button targets.

> **The hidden state is the default, and that is the risk.** A `[data-reveal]` element is
> `opacity: 0` until something shows it, so anything that stops the observer running leaves a
> section **permanently invisible** rather than merely unanimated. Three guards exist and all
> three are load-bearing: no `IntersectionObserver` → shown immediately (in `Reveal`);
> reduced motion → forced visible in CSS; **scripting off → a `<noscript>` style block in
> `layout.tsx`**, which is the only guard that does not live in `Reveal.tsx` and so the easy
> one to delete by accident. All three are verified in-browser, not assumed.

**Reduced motion is respected here, unlike the marquee** — and the two are not in conflict.
Freezing a marquee makes it look broken, which is why the user had that guard removed; a
section that simply *is* there is the correct reduced-motion result. Never "fix" the
consistency by dropping the reveal guards.

Only `opacity` and `transform` are animated, both compositor-only, so **no amount of this can
introduce layout shift**. Do not animate height, margin or top.

**Anchor scrolling was already smooth before any of this** — `scroll-behavior: smooth` on
`html`, with every landing section carrying `scroll-mt-20` to clear the sticky bar. A new
section with an `id` needs that `scroll-mt-20` or it lands underneath the navbar.

> **`scroll-behavior: smooth` will break a naive scroll-through test.** `window.scrollTo()`
> animates, so a loop that scrolls and waits 100ms just re-targets the in-flight animation and
> the middle of the page is never actually traversed — sections then look like they failed to
> reveal when they are fine. This produced a false failure on `/about` (4 of 7 "stuck") on
> 2026-07-31. Set `document.documentElement.style.scrollBehavior = "auto"` first and pass
> `behavior: "instant"`.

**Responsive breakpoint.** Mobile-first base styles, `lg:` (1024px) switches to desktop.
Figma frames are 1440px desktop / 402px mobile. Desktop gutter is `lg:px-28` (112px),
mobile `px-4` (16px).

**The insurer logo row is a marquee, not a static row.** See
[`InsurerLogos.tsx`](components/hero/InsurerLogos.tsx). Two things there are easy to break:

- The gap is **padding-right on each item**, not a flex `gap`. A copy's width therefore
  includes its own trailing space, so two copies sit flush and `translateX(-50%)` lands
  exactly on the second copy's first logo. Switch to a flex `gap` and there is one extra
  gap between copies, so the loop visibly drifts.
- Every logo frame is **59x32, except Hollard at 60x32**, at both breakpoints, with
  `object-contain`. The source PNGs range from 4.6:1 to 1.9:1, so filling the box instead
  would badly squash the wide marks.

The animation is `--animate-marquee` in `globals.css`, running -50% -> 0 so logos travel
left to right. The edge fade mask is ours, not in the Figma frame.

**It deliberately does NOT respect `prefers-reduced-motion`.** It used to carry
`motion-reduce:animate-none`, which froze the row for anyone with iOS Reduce Motion,
Android "Remove animations", Windows "Show animations off" or certain battery savers on —
reported by the user as "not moving on some devices" and removed on their instruction
(2026-07-31). **Do not re-add it without asking.** The accessibility tradeoff is real and
was flagged; if it needs revisiting, a visible pause control or a much slower
reduced-motion variant is better than freezing it.

The hover pause stays. Tailwind v4 scopes `hover:` behind `@media (hover: hover)`, so it
cannot stick on a touch device after a tap — that was the other candidate for this bug and
it is already handled.

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

**Counting `cssRules` is not a valid "is the stylesheet loaded?" check under Tailwind v4.**
Everything sits inside `@layer` blocks, so the top-level rule count is tiny — 62 on the
live build — and looks broken when it is not. Assert on a computed value instead: the h1
being 52px on desktop and 36px on mobile, or the body font resolving to Inter.

**Next's dev overlay injects its own `<footer>` earlier in the DOM than yours.** So
`document.querySelector("footer")` in a verification script silently matches the overlay,
not the page footer, and every child lookup off it returns null. Reach the real one
through a known descendant: `document.querySelector("#newsletter-email").closest("footer")`.
The same risk applies to any generic tag selector while the dev server is running.

**Lazy images below the fold report as "broken" in element screenshots.** Puppeteer's
`elementHandle.screenshot()` scrolls the element into view but does not wait for the lazy
images that scroll just triggered, so they capture blank and `naturalWidth` reads 0. Walk
the page (driving `window.scrollTo` from Node, not in an in-page async loop, which can
blow the protocol timeout), `await img.decode()`, then capture.

**Bound every in-page `img.decode()` with a `Promise.race` timeout.** An image the dev
server has not finished building never settles, so an unbounded `Promise.all` over
`document.images` hangs until Puppeteer kills the connection with
`ProtocolError: Runtime.callFunctionOn timed out` — which reads like a browser crash and is
not one. Also pass `protocolTimeout` to `launch()`; the 30s default is tight for a cold dev
server. Separately, `display: none` images legitimately report `naturalWidth === 0` because
the browser never fetches them, so filter to *visible* images before calling any of them
broken.

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

**`TaskStop` on a backgrounded `npm run dev` leaves the `next dev` child running.** It kills
the npm wrapper only. So "I stopped dev" is not true, and the very next `rm -rf .next` pulls
the directory out from under a live server — which then 500s every route with
`ENOENT ... routes-manifest.json`, exactly the catastrophic-looking failure below. Meanwhile
a freshly started server silently takes **port 3001**, so `curl localhost:3000` is still
talking to the broken one. Hit on 2026-07-31.

Stop it by port instead, then confirm the port is free:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

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

**`claude mcp list` reporting "✔ Connected" does NOT mean the tools are in the session.**
Hit on 2026-07-31: the health check passed against `https://mcp.figma.com/mcp` while the
session itself had no `get_metadata`, `get_design_context`, `get_screenshot` or
`download_assets` — searching the tool registry by name, by keyword and by Figma-specific
names all returned nothing. The CLI probes the server; the tool registry is bound when the
session starts. A server that connects late is healthy and unusable at the same time.
**Fix is to restart Claude Code** (then `claude --continue` to resume the thread); `/mcp`
may also rebind. Nothing can be done about it from inside the session.

**A pasted `figd_` token is not a workaround for this, and is not to be used.** The
standing rule below holds even when the MCP is unreachable — the right move is to restart,
not to drive the REST API with a personal access token. One was pasted into the transcript
on 2026-07-31 and the user was told to revoke it.

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

- [x] ~~About section 2: mobile cards are flat and bordered, desktop cards are glossy.~~
      Fixed 2026-07-31: the user added Gloss and removed the stroke in Figma, and the code
      was re-pulled. The card is now one class list at both breakpoints.
- [x] ~~About section 2 keeps the desktop type scale on mobile.~~ Fixed 2026-07-31: the
      user corrected the Figma frame (28/36 heading, 24/32 titles, 16/24 body) and the code
      was re-pulled to match. **Figma and code agree; no divergence here.**
- [ ] **Services FAQ answers 2 and 3 are copy we wrote, not Figma's.** Written 2026-07-31 at
      the user's request and grounded in the site's own claims, but **nobody has confirmed
      they are factually true** — specifically which non-insurer segments RedPear sells to.
      Check before launch. See [`FaqSection`](components/services/FaqSection.tsx).
- [x] ~~About sections 4 and 6, and Services, keep the 36/44 heading on mobile.~~ Resolved
      2026-07-31: the user made 28/36 a standing rule for all mobile section headings. Every
      section on all three pages now steps down — audited in-browser. **The About frames for
      "Our Approach" and "Partners & Clients" still say 36/44, so the code deliberately
      diverges there**; those two sections are 8px shorter than their frames as a result.
- [ ] **About section 3: the desktop card's inner frame is 20px too wide in Figma** (560
      inside a 572 card with 16px padding, which only fits a 592 card). The code uses the
      correct 540, which makes the section 29px taller than the frame and wraps Robert's
      name. Reflow that frame in Figma; no code change needed when you do.
- [ ] **About section 3: the LinkedIn badges are not links.** Figma carries no profile
      URLs, so they render as presentational badges. They need real hrefs — and to become
      anchors with accessible names — before launch.
- [ ] **About section 2: "Trust & Security" has no closing full stop** where the other
      three cards do. Reproduced verbatim from Figma.

- [ ] **The contact form is built but NOT WIRED — and this is the worse of the two.**
      `ContactForm`'s `onSubmit` only calls `preventDefault`, so a visitor can fill in
      their name, email, phone, service and message, click "Send a Message", and the
      enquiry goes nowhere with no error. A silently-swallowed sales enquiry is worse than
      no form at all. Needs a real destination before `/contact` is linked from anywhere
      public — and the nav now links to it. Same open decision as the newsletter below;
      settling one probably settles both.
      See [`ContactForm.tsx`](components/contact/ContactForm.tsx).
- [ ] **The contact form's service options are copy we wrote, not Figma's.** The design
      authors one selected value ("Digital Transformation") and no option list, so the six
      options are taken verbatim from the six service cards on `/services`. Same class of
      thing as the FAQ answers, and it needs the same factual check.
- [ ] **The contact panel's social links have no hrefs.** Figma carries none, so all three
      point at `#`. They are real anchors with accessible names, they just have nowhere to
      go — the same state the footer's three are in.
- [x] ~~The contact panel's third social icon is the XRP (Ripple) mark, not the X logo.~~
      Fixed in code 2026-07-31 on the user's instruction — it now uses the footer's official
      X glyph, recoloured red. **The Figma frame still has XRP**; swap it there so the two
      stop disagreeing.
- [ ] **The contact form's dialling-code list is ours, not Figma's**, and it is a curated 39
      entries rather than every country. Ghana is the default. If an enquiry ever needs to
      come from somewhere not on the list there is no way to enter it — worth revisiting if
      that matters, either by completing the list or allowing a free-text code.
- [x] ~~The contact page's map is a flat screenshot, not a map.~~ Replaced 2026-07-31 with a
      real Google embed, [`ContactMap`](components/contact/ContactMap.tsx). `map.png` is
      gone, and with it the upscaling, the baked-in UI chrome and the licensing question.
- [ ] **The map is running on the keyless, undocumented Google URL.** It works today and
      needs no setup, which is why it is the fallback, but it is not a supported API and can
      break without notice. Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in the Vercel project
      settings (and `.env.local` for dev) and the component moves onto the real Maps Embed
      API on its own — **no code change, just the variable**. `place` mode is free and
      unmetered. **Restrict the key** by HTTP referrer and to the Maps Embed API when you
      create it; `NEXT_PUBLIC_` ships it to the browser by design. Full instructions are in
      [`.env.example`](.env.example). Worth doing before launch.
- [ ] **Nobody has confirmed the map's address.** `ContactMap` geocodes the one the contact
      panel displays, plus ", Accra, Ghana" for the geocoder — so if the panel's address is
      wrong or approximate, the pin is too, and the two now have to be kept in step by hand.
      Check the pin drops on the right building before launch.
- [ ] **Footer newsletter form is built but NOT WIRED.** Its `onSubmit` only calls
      `preventDefault`, so a visitor can type an email, click Subscribe, and nothing
      happens. The markup is correct and accessible (`type="email"`, `required`, label
      bound to input); it just needs an action. Mailchimp, Resend, a route handler writing
      to a database, or a `mailto:` stopgap. **Do not launch without this.**
      See [`NewsletterForm.tsx`](components/layout/NewsletterForm.tsx).
- [ ] **Sections 6 and 7 content is hardcoded.** Fine for now, but if it should be
      CMS-driven that shapes how section 7 gets built.
- [ ] **Section 3's mobile copy nodes hold section 2's text in Figma**
      (`20875-20960` / `20875-20961` say "Solutions Built for Modern Insurance
      Organizations"). The build uses the correct desktop copy at both breakpoints. Fix
      the Figma frame; the code already does the right thing.
- [ ] **Section 7's Figma mobile nodes still carry the desktop type scale**
      (`20875-21194` / `20875-21195` are 36/44 and 18/28). **The code deliberately
      diverges** — the user asked for the step-down to 28/36 + 16/24 so it matches every
      other section. Update the Figma frame to match; no code change needed when you do.
- [ ] **Section 7 blog cards are not links.** Figma has no URLs on them, so they are plain
      `article` elements. They need hrefs once the blog exists.
- [ ] **The CTA band's own button links to `#demo`, the section it sits in** — so clicking
      it does nothing. Now true on **both** pages, since `/about` renders the same shared
      `CtaSection`. Every other "Book a Demo" correctly scrolls to the band; this one needs
      a real destination (Calendly, a contact form, a route).
- [ ] **Section 6: Amara Okafor's card is drawn at a 20px radius**; the other three are
      24px. Reproduced as designed, isolated behind `TestimonialCard`'s `radiusClass`.
- [ ] **Section 6: quote punctuation is mixed** — straight quotes on cards 1 and 2, curly
      on 3 and 4. Reproduced verbatim from Figma.
- [ ] **Section 2: mobile small cards are content-sized** (262-287) where Figma fixes them
      at 290. Stacked with 16px gaps this reads better than forced uniform height.

**Engineering debt**

- [ ] **The insurer logos are under-resolved for the About page.** Sources cap at 128px
      (Figma's ceiling — see the note in Conventions). That is 2.17x in the hero's 59px box
      but only **1.44x** in section 6's 89px box, so they render visibly softer there on a
      retina display. Needs vector or higher-res originals from the insurers, not a
      re-export.
- [ ] `public/team/` holds six portraits at 482x482 to 800x800 (~1.9 MB total) for slots
      that render at 188 desktop / 306 mobile. Only `rashad-muntar.jpg` (482) is tight for
      a 306px slot at 2x; the rest have headroom.
- [ ] `public/icons/profile.svg` is **90 KB** where the three icons beside it are 1-9 KB.
      No embedded raster — Figma flattened a mask into seven paths at absurd coordinate
      precision. It renders correctly and gzips well, but it is worth re-exporting or
      running through SVGO.
- [ ] **About hero images are oversized.** `public/about/` is five 1024x1024 PNGs at
      ~1.2-1.7 MB each (7 MB total) rendering into 384x236 and 384x488 slots. Next.js
      optimises delivery, so this is repo weight rather than user-facing, but it is now the
      heaviest directory in the repo. Re-export at ~800px wide.
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
- [ ] Nav links: `About` and `Services` are real routes now. `/#blog`, `/#contact` and
      `/#demo` still resolve to landing-page sections; `#claims` resolves to nothing. Two
      landing sections keep ids the nav no longer references — `ProblemSection`'s
      `id="about"` and `SolutionsSection`'s `id="services"`. Harmless, but drop them if
      nothing else claims them.
- [x] ~~The hero's insurer logo row stretches on wide screens.~~ Fixed 2026-07-30 when the
      row became a marquee — the viewport is now `max-w-content` and holds 1216 at any
      width. The hero's three-card row still measures wide but is visually fine, since the
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

### 2026-07-31 — Navbar is fixed, not sticky
User reported page content showing through the bar while scrolling on some browsers, and
asked for `fixed` with everything else unchanged.

The catch is that a fixed bar leaves the flow, so the whole site would slide up 81.05px under
the nav. A measured `aria-hidden` spacer holds that space open. Verified as *identical*
rather than assumed: `mainTop` and `heroTop` are **81.05 on all four routes at both
breakpoints**, exactly what they measured before the change, and hit-testing the centre of the
bar while scrolled returns the header — nothing bleeding through.

**This surfaced a real bug in the reveal work from earlier today.** `#blog` was landing 17px
*behind* the bar, because an unrevealed section sits at `translateY(16px)` and transforms move
an element's box for scrolling too — so the browser scrolled to the shifted position and the
reveal then lifted it mid-flight. That affected `#demo` as well, which every "Book a Demo"
button targets. Fixed with a `rise={false}` variant on `Reveal` for anchor-target sections;
`#blog` now lands at 79.73, matching production to the pixel.

Two measurement traps caught here, both worth remembering:

- **A scroll-position assertion passes trivially when the page has not scrolled.** The first
  anchor run reported PASS with the target 4,709px below the fold. Assert that the page
  actually moved before asserting where it stopped.
- **The old deploy is a free baseline.** `redpear.vercel.app` still runs the pre-animation
  code, so comparing localhost against it settled "did I break same-page hash links?" in one
  run — identical on both (scrollY 7615, `#blog` top 79.73). Worth reaching for whenever
  "is this a regression?" is the question.

One disclosed residual: following `/#demo` **from another route** lands up to 8px high,
because the page transition's own 8px rise is still animating while the browser scrolls. It is
a race, so it varies between 0.6 and 9px. Invisible against the CTA band's 24-50px of internal
padding, and the only clean fix is dropping the rise from the page transition — which the user
chose deliberately. Same-page anchors are unaffected.

### 2026-07-31 — Page transitions and scroll reveals
User reported navigation "glitching" and asked for a soft page transition plus scroll
animation. Investigating first was worth it, because the brief did not match the code:

- **Smooth scrolling already existed** (`scroll-behavior: smooth`, plus `scroll-mt-20` on
  every landing section). So "smooth scroll through the sections" had to mean something else;
  asked, and it meant **reveal-on-scroll**. Building what was literally asked for would have
  produced nothing.
- **The glitch was structural, not missing animation.** Every page mounted its own `Navbar`
  and `Footer`, so a route change unmounted and rebuilt the sticky bar — `headerHeight` back
  to 0, ResizeObserver re-attached. A fade laid over that would have hidden the symptom.

So the fix is in two parts. `Navbar` and `Footer` moved into `app/layout.tsx`, which persists
across navigation; only `<main>` is swapped now. That reversed a convention this file used to
state, and it **shrank every route bundle** (landing and About 2.02 kB → 508 B) since the
Navbar is no longer duplicated four times.

Then the motion itself, **zero dependencies**: `app/template.tsx` remounts per navigation and
restarts a 250ms CSS fade-and-rise, and a `Reveal` wrapper eases each below-the-fold section
in at 500ms/16px via one IntersectionObserver, unobserving after the first appearance.

**The thing to be careful with is that hidden is the default state** — `opacity: 0` until
shown, so a broken observer means permanently invisible content, not just missing animation.
Three guards, all verified in Chrome rather than assumed: no IntersectionObserver, reduced
motion (forced visible in CSS — the opposite call to the marquee, deliberately), and
scripting off (a `<noscript>` block in `layout.tsx`, the only guard living outside
`Reveal.tsx`).

Verified across all four routes at 1440 and 402: every reveal reaches `shown` with none stuck,
the navbar stays `sticky` at top 0, and the header and footer DOM nodes **survive** three
consecutive client-side navigations — branded before navigating and still branded after, which
is the actual proof the remount is gone.

One test artifact worth knowing, now in the notes above: the first run reported 4 of 7 About
sections stuck, which was the test's own fault — `scroll-behavior: smooth` makes `scrollTo()`
animate, so a fast scroll loop re-targets it and never traverses the middle of the page.

### 2026-07-31 — Dial code shows "+233" closed, "+233 Ghana" open
User asked for the phone field's dialling-code control to show only the code when closed,
while still listing the country when opened.

A native `<select>` paints the selected option's whole text when closed and gives you no
handle on it, so the control is now the real select at **`opacity-0`** laid over a plain
`<div>` that draws the code from state. The options are untouched, which is what keeps the
popup reading in full. The alternative — `color: transparent` on the select — was rejected
because browsers disagree about whether an `option`'s own colour also paints the closed
control, so the popup can go invisible on some of them.

Verified in Chrome at 1440 and 402 rather than assumed, because an invisible control over a
visible one is exactly the kind of thing that looks right and is not: the select is
pixel-aligned over the box (hit-testing the box's centre returns the `SELECT`, so there is no
dead strip), the box is `aria-hidden` so the field is announced once, and the focus ring is
borrowed via `peer-focus-visible:`.

The wrapper dropped 150 → **100px**, since it no longer has to fit "+233 Ghana". The phone
input takes the difference (243 desktop, 230 mobile). That undoes the reason the phone
placeholder was kept terse; the user's call was to leave the copy as it is.

### 2026-07-31 — The contact map is a real map now
Replaced Figma's flat `map.png` — a screenshot of Google Maps, upscaled from 1083 into a 1120
slot, with Google's UI chrome and attribution baked into the pixels and a licensing question
attached — with an actual embed,
[`ContactMap`](components/contact/ContactMap.tsx). Card and viewport geometry are unchanged,
so nothing around it moved.

**It resolves two URLs.** With `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` set it uses the documented
Maps Embed API; without one it falls back to the keyless `output=embed` URL, which works
today with no setup but is undocumented and can break without notice. The fallback exists so
the page is never broken while the key is sorted out — setting the variable switches it over
with no code change. [`.env.example`](.env.example) carries the full setup, including the
part that matters: `NEXT_PUBLIC_` puts the key in the client bundle by design, so it has to
be restricted by referrer and to the Maps Embed API or it can be lifted off the page.

Live today on the fallback. Getting a restricted key onto Vercel is logged as a follow-up,
as is checking the pin actually lands on the right building — the address is a constant in
the component and duplicates the one the panel displays.

### 2026-07-31 — Contact page finished: FAQ + CTA wired, hero revised
Second pass, all from user instructions. **The Contact page is now structurally complete,
which makes all eight core screens built.**

Four changes to the hero, then the last two blocks.

**Icon swap.** The third social glyph was the XRP (Ripple) mark; it now uses the official X
glyph the footer already ships, recoloured red for the white badge. Figma still has XRP —
logged so the frame gets fixed rather than the mismatch being rediscovered later.

**Placeholders reworded** from Figma's fake sample data ("Kwame Asante") to instructions
("Enter your full name"). The phone one is deliberately short — "Enter your number" — because
the new dial-code control eats 150px and the remaining 193 clips anything longer. Caught by
looking at the render, not the markup.

**A dialling-code select**, which is not in Figma at all. 39 curated entries, Ghana default,
dial code written first in each label so it survives clipping. The width had to go on the
wrapper rather than the select, since `control` already carries `w-full` — the Tailwind
property-order trap this file has warned about twice now.

**Panel headings 28/36 → 24/32.** The user asked for "28 or 24"; 28 was already what it was,
so 24 is the only actual reduction. Deliberate divergence from the frame, and it takes 12px
off the mobile hero.

**FAQ and CTA are verbatim reuses**, diffed first rather than assumed. The CTA lands at the
same 490/502 it carries on two other pages. The FAQ turned up something worth knowing: the
**Contact frame is stale relative to the Services one** — mobile heading 36/44 and questions
24/32, i.e. what `/services` looked like before the user corrected it earlier the same day.
`FaqSection` renders the corrected sizes, so the section measures 516 against the frame's
588. That is the frame being behind, not the code.

One process note: `TaskStop` kills the npm wrapper but **leaves the `next dev` child alive**.
Deleting `.next` after "stopping" dev therefore hit the same catastrophic-looking failure
this file already documents — `/` 500ing on a missing `routes-manifest.json` while the new
server quietly took port 3001. Kill by port, not by task.

### 2026-07-31 — Contact page started: `/contact` route + hero
Screens 7/8. **The unnamed screen is Contact** — mapped the desktop root first, which
settled both the name and the shape: four blocks, of which only the hero is new work. The
FAQ, CTA and footer all look like verbatim reuses (flagged to diff, not assume).

Added [`app/contact/page.tsx`](app/contact/page.tsx),
[`ContactHero`](components/contact/ContactHero.tsx),
[`ContactForm`](components/contact/ContactForm.tsx) (client) and
[`ContactPanel`](components/contact/ContactPanel.tsx). The hero holds the copy *and* the
card, because Figma nests the card inside the Hero frame — exactly as predicted in this file
before the frames were opened. Nav `Contact` now points at `/contact` rather than
`/#contact`, the same treatment About and Services got.

The copy block reuses `ServicesHero`'s class list unchanged; its metrics are identical.
`IconBadge variant="white"` is exactly the 40x40 social badge. `Button` gained an exported
`buttonClasses()` so the submit — the only real `<button>` CTA on the site — shares the
look without `Button` having to become polymorphic.

**The form fields are the interesting part.** They come from an external Figma library
("Simple Design System") whose Code Connect snippets resolve to components this repo does
not have, so they had to be re-pulled with `disableCodeConnect: true`. That library also
drags in a `#1e1e1e` text token and an inconsistent gloss on the Select; both normalised
onto our tokens. Figma's field *values* are treated as placeholders, which is the one place
the build intentionally departs from what the frame draws.

**Mobile is pixel-exact with no residual** — 2099 section, 1751 shell, 792 form, 364 panel,
531 map card, 48 fields. Desktop is exact too apart from two disclosed items: the panel is
504 rather than 498 because its 150px magic gap became `justify-between`, and the submit
button is 191.3 against 190 because it keeps the site's semibold where Figma sets Inter
Medium.

Two asset gotchas worth remembering, both now in the notes above: Figma stores the LinkedIn
and Instagram glyphs **vertically mirrored** and corrects them on the parent frame (the flip
is baked into the committed SVGs instead), and the third "social" icon is the **XRP mark,
not the X logo**.

**The form is not wired**, which is logged as the most serious open item on the site — a
contact form that silently drops enquiries is worse than the newsletter one.

### 2026-07-31 — Insurer marquee now runs on every device
User reported the hero logos static on some devices. Cause was
`motion-reduce:animate-none` on the track: any device with reduce-motion enabled — iOS
Reduce Motion, Android "Remove animations", Windows "Show animations off", some battery
savers — got `animation: none`. Removed on the user's instruction.

Verified by measuring actual pixel travel over 1.2s rather than reading `animation-name`,
across four cases: normal and reduced motion, at 1440 and 402. All four move.

The other suspect — a `hover:` pause sticking after a tap on touch — was already handled:
Tailwind v4 scopes `hover:` behind `@media (hover: hover)`.

Accessibility tradeoff flagged to the user: continuous motion with no opt-out can affect
people with vestibular sensitivity. A pause control or a slow reduced-motion variant would
address that without freezing the row; noted in Conventions if it is ever revisited.

### 2026-07-31 — FAQ copy written; mobile heading rule made standing
Two things.

**A standing rule, now in Conventions and in memory:** mobile section headings are *always*
28/36, never the 36/44 desktop size, **even when the Figma frame says 36/44**. The user gave
this after correcting it section by section three times and said they may forget to set it in
the design. Audited every section on all three pages in-browser; all now step down. Three
exceptions stand: page `h1`s (36/44), the Story card headings (32/40, Figma's own), and the
CTA band (32/40 bold, its own style).

This means `ApproachSection` and `PartnersSection` **deliberately diverge from the About
frames**, which still say 36/44 — those two sections are 8px shorter than their frames now.

**FAQ answers 2 and 3 are written copy**, at the user's request; Figma only authors the
first. Grounded in the site's own claims — the landing Audiences section for who RedPear
serves, and How We Work step 2 for the "not a generic template" phrasing. Flagged for a
factual check, since nobody has confirmed the non-insurer segments.

The user also resized the mobile FAQ: question 24/32 → **20/28**, answer 14/20 → **16/24**,
heading → 28/36. Both mobile sections are now **pixel-exact** — How We Work 972 and FAQ 516,
items 200/88/88 cell for cell.

### 2026-07-31 — Services page completed: How We Work, Why, FAQ, CTA
Four sections in one pass. **Only the FAQ was new work** — the other three are reuses, which
was the point of this page.

`ApproachSection` took `title` / `steps` props (defaulting to the About wording) so
`/services` can render it as "How We Work" with two reworded steps and "Launch & Support"
in place of "Optimize". `WhySection` and `CtaSection` are dropped in unchanged.

[`FaqSection`](components/services/FaqSection.tsx) is the only genuinely new component: a
client-side accordion, first item open as Figma draws it, items toggling independently with
`aria-expanded` / `aria-controls`. Figma has only the one state, so the interaction is ours.

**How We Work is exact at both breakpoints** (618 / 980) and the **mobile FAQ is exact**
(588). Desktop FAQ runs 486 against 483 because Figma fixes the open card's inner box at
73px, squeezing its own answer to 21px where one line of 16/24 is 24 — left to size
naturally instead. Why and the CTA carry their existing residuals unchanged.

**Figma only authors an answer for FAQ question 1.** Questions 2 and 3 have no answer node
at all, so there is nothing to reveal; they render as static rows rather than dead toggles,
and adding `answer` to the array makes them expand. Needs copy from the user — logged.

### 2026-07-31 — Services hero mobile metrics corrected
User revised the mobile bento cards in Figma and supplied all 12 title/body nodes. Pulled
the whole mobile frame (`20875-21622`) rather than just those, because the change was as
much about **spacing** as type — and the type turned out to already be right.

Three real differences from the landing's mobile bento, none of which were type sizes:
padding 16 → **24 horizontal / 16 vertical**, title-to-body gap 16 → **8**, and the featured
card's title dropping from semibold to **medium** (that frame draws no featured distinction
on mobile). Card-to-card gap also goes 24 → 16.

`BentoCard` gained a `mobileVariant` prop rather than being changed outright, because the
landing's flat 16px mobile pad is a deviation the user explicitly asked for. Default is
`"landing"`, so the live page is untouched — **regression-checked at both breakpoints**: the
landing's bento cards still measure pad 16 / gap 16 / featured semibold on mobile and
596x604 on desktop.

One trap worth remembering, now in the notes above: `px-6 py-4 lg:p-6` does **not** work.
Tailwind emits padding-inline/block after the padding shorthand, so the unprefixed `py-4`
beats `lg:p-6` at every width. Spelled `lg:py-6` instead.

Mobile now measures 3046 against Figma's 3034 — +2 per card, from a border Figma does not
draw on these cards at all. Kept so they match the landing's visually; dropping it for the
services variant would make the section pixel-exact.

### 2026-07-31 — Services page started: `/services` route + hero
Screens 5/6. Mapped the whole desktop frame first (see [Services page
sections](#services-page-sections)) because the point of this page is how much already
exists: **four of its six blocks are components we have already built.** Only the hero and
an FAQ accordion are new work.

Added [`app/services/page.tsx`](app/services/page.tsx) and
[`ServicesHero`](components/services/ServicesHero.tsx). The hero holds the copy *and* the
six bento cards, because Figma groups them in one "Hero" frame.

`BentoCard` fits **unchanged** — padding, gap, image height and radius all match this frame
exactly. Cards 1 and 2 turned out to carry the landing's copy verbatim, so they reuse
`ai-solutions.png` and `insurance-platforms.png` too; only four new images were needed.

Nav `Services` now points at `/services` and highlights there, the same treatment `About`
got. That means the landing page's `SolutionsSection` keeps an `id="services"` the nav no
longer references — harmless, logged.

Desktop measures 2280 against Figma's 2274, the usual +2 per card row. **Mobile is not yet
verified against a frame** — screen 6 exists but has not been handed over, so the mobile
layout follows established patterns rather than measured nodes.

### 2026-07-31 — About section 7 (CTA band) reuses the landing `CtaSection`
The About CTA is the landing card with different wording — same geometry, watermark, gloss
and type at both breakpoints. Rather than fork it, `CtaSection` gained optional `title` /
`body` props defaulting to the landing copy, so the landing call site is unchanged.

**Regression-checked, because this edits a component the landing page renders**: measured
both pages at both breakpoints. Landing copy is byte-identical to before, and card, radius,
padding, heading weights, sub width, button and watermark all match across the two. About
runs 490 / 502 against Figma's 488 / 500 — the same +2 the landing band already carried.

Note both instances carry `id="demo"`, which is legal across separate documents but means
`#demo` on `/about` resolves to the About band. The dead self-link on the band's own button
is now a two-page issue.

The user's mobile node was `20875-19146`, the **whole About Mobile frame** rather than the
CTA; the real one is `20875-19374`.

### 2026-07-31 — About section 6 (Partners & Clients)
[`PartnersSection`](components/about/PartnersSection.tsx). A grid of fixed 89x48 logo cells,
5x2 on desktop and 2x5 on mobile.

**No new assets.** The section 6 exports are byte-identical to the hero's logos (md5-checked
before downloading anything), so it reuses `public/insurers/` — seven files across ten
slots, since Hollard, GLICO and BAS Capital each appear twice, in exactly the hero's order.

**Desktop is pixel-exact**: cells land at 0/248/496/744/992 within the 1216 column, matching
Figma cell for cell. Mobile likewise at 0/197 with a 370x336 grid; the section runs 452
against 465 only because Figma fixes that inner frame at 417 where its content is 404.

Two things not to "fix" later: the desktop row deliberately does **not** stretch to fill
1216 — the cells are fixed-width and start-aligned, leaving 135px trailing, which is how
Figma draws it. And the images are `object-contain object-bottom`, **not** Figma's generated
`size-full` with no object-fit, which would squash the wide marks.

Sharpness note: the logo sources top out at 128px (Figma's ceiling, already recorded), which
is 2.17x in the hero's 59px box but only **1.44x** in this section's 89px box — so these
render softer than the hero on a retina display. Logged as debt.

The mobile heading stays 36/44 like section 4's. Built as designed and flagged.

### 2026-07-31 — About section 5 reuses the landing `WhySection`
The user's call, and it checked out: the About frame's section 5 is the landing page's
section 5 **verbatim**, not a reworded variant as this file previously recorded. Diffed
before reusing — heading, sub, all four card titles and bodies identical; 800px copy
column, 10px heading gap, 592 cards and 544 images all matching.

So `/about` imports `WhySection` from `components/sections/` unchanged. No new component,
no new assets, no `WhyCard` generalisation. **It now renders on two pages — editing it
changes both**, which is why the Layout tree calls it out.

Verified it renders identically on both routes (1455 desktop, 596x586 cards, 544 images,
nothing broken), which is the real proof there is no page-specific drift. Against the About
frame the copy block (800x110) and images (544) are exact; the section at 1455 against
1448 and cards +4 are the same box-model residual the landing section already carried.

Note the About mobile frame is drawn 1950 tall against ~1908 of actual content, so the
40px gap there is slack in the frame, not a layout error.

### 2026-07-31 — About section 4 (Our Approach)
[`ApproachSection`](components/about/ApproachSection.tsx). Four numbered step cards, 2x2 on
desktop and stacked on mobile. **Pixel-exact at both breakpoints with no residual** —
sections 618 / 980, cards 596x200 / 370x204, gaps 24 / 16, every type size matching.

Added one token, `text-display-sm` (44/48, -0.88 — Figma's Display/Semibold/Small). This is
the only place on the site where a *step number* takes a display size, and it is the only
size in this section that did not already exist.

The grid uses `lg:items-start` rather than the default stretch, because Figma sizes these
rows `fit-content` and pins each card to the row top. Invisible today (all four cards are
200 tall) but it is a real difference from section 2, which explicitly stretches.

The mobile heading stays 36/44 where every other section on the page steps down to 28/36.
Built as designed and flagged — the copy is short enough that nothing overflows, so it is a
consistency call rather than a bug.

### 2026-07-31 — About section 3 (Our Team & Leadership)
[`TeamSection`](components/about/TeamSection.tsx). Six profile cards, 2x3 on desktop and
stacked on mobile, inside a `gloss-white` shell. The biggest block on the page.

The card **re-lays out** across breakpoints rather than just resizing — avatar-left on
desktop, avatar-on-top on mobile — so it is one component with a `lg:flex-row` switch, not
two. `IconBadge` grew a `variant` prop for the white LinkedIn badge instead of a parallel
component; the red default is unchanged, so the landing page is untouched.

**Mobile is faithful**: cards 771/795/771... against Figma's 770/794/770, avatar 306
exactly, the +1 per card being the divider's CSS border. The section runs 5014 against 5032
only because the intro paragraph wraps to 6 lines where Figma's box allows 7.

**Desktop carries one real deviation, and it is Figma's bug.** Each card is 572 wide with
16px padding — content 540 — but Figma draws its inner frame at 560 from x=16, i.e. 4px
past the card's own right edge. 16 + 560 + 16 = 592, the *landing page's* card width, so
that frame is stale from a 592 card that never reflowed when the outer dropped to 572.
Built at the correct 540, which costs two bios an extra line and wraps Robert's name onto
two lines: section 1711 against 1682, row 2 at 441 against 412. Mobile's equivalent maths
is exact, which confirms the desktop frame is the wrong one.

Also worth remembering: `download_assets` on the grid returned **11 raw images for 6
avatars** and on a single card returned 2, with nothing to disambiguate them. Calling it on
each `Rectangle 1` avatar node gives a clean 1:1.

### 2026-07-31 — About section 2 mobile cards given the gloss
User added the Gloss effect to all four mobile card nodes **and removed the 1px stroke**.
Re-pulled: the card is now a single class list at both breakpoints
(`gloss-white bg-brand-white rounded-2xl p-4`), and the breakpoint fork that carried the
flat bordered variant is gone.

Dropping the border also dropped the box-model residual it caused, so the section is now
**pixel-exact at both breakpoints with nothing left over** — mobile 884 and cards
176/200/176/176 match Figma exactly, where they were 892 and 178/202/178/178 a moment ago.

Figma still fills the mobile card with Generic/White `#FFFFFF` against desktop's
`#FFFDFD`. Both use `bg-brand-white` here: the difference is 2/255 on two channels,
invisible in render, and honouring it would have made this the one card on the page that
skips the brand token. Disclosed rather than silently absorbed.

### 2026-07-31 — About section 2 mobile type scale corrected
User updated the four mobile card nodes and the heading in Figma so the section steps down
on mobile like every other one: 28/36 heading, 24/32 card titles, 16/24 body. Re-pulled and
matched — all three map onto existing tokens (`text-h3-mobile`, `text-h4-mobile`,
`text-body-md`), so nothing was added to `globals.css`. Desktop is untouched.

Mobile now measures 892 against Figma's 884, cards 178/202/178/178 against 176/200/176/176
— purely the 1px-border residual. **Figma and the code now agree; this is no longer a
divergence.**

The other flag from this section is still open: mobile cards remain flat-and-bordered while
desktop cards are glossy.

### 2026-07-31 — About section 2 (What We Believe)
[`BeliefsSection`](components/about/BeliefsSection.tsx). Four icon-and-copy cards, 2x2 on
desktop and stacked on mobile. **Desktop is pixel-exact** — section 594, heading 1216x44,
all four cards 596x188 with 24px gaps. Mobile runs 1008 against 1000, entirely the
1px-border-vs-Figma-stroke residual at 2px per card.

Reused `IconBadge` unchanged — Figma's badge is exactly what it already renders, and all
four new icons export as full 24x24 viewBoxes so none needs a `sizeClass`. No new tokens
and no new CSS.

**The two frames disagree on the card surface and both are reproduced**: desktop is the
usual `gloss-white` raised card, mobile is flat pure white with a `neutral-200` stroke and
no gloss. That is the only card on the page that changes treatment across breakpoints, and
it sits right under the Story section whose mobile cards *are* glossy — so it is flagged as
a probable oversight rather than quietly unified. Type also does not step down here (36/44
and 28/36 + 18/28 at both breakpoints), the same thing that was flagged and later fixed in
Figma for landing sections 6 and 7.

Card width is normalised to the standard 370 gutter; this frame's own wrapper is drawn 399
wide at x=2 instead of 402 at x=0, which would otherwise make it the only section on the
page indented by 2px.

### 2026-07-31 — About section 1 (Our Story / Mission / Vision)
[`StorySection`](components/about/StorySection.tsx). **Pixel-exact at both breakpoints with
zero deviations** — every measured box matches Figma: section 846 / 1218, shell 1216x746 /
370x1170, story card 1168x498 / 338x690, image 488x450 / 306x306, pillar cards 572x176 /
338x208, all radii and padding, headings 36/44 → 32/40, body 18/28 → 16/24.

Nothing new was needed in `globals.css`: the Gloss effect Figma reports on all four cards
is byte-for-byte the existing `gloss-white` utility. Reused as-is, three levels deep.

Two things to know. The headings are **`brand-red` Geist Medium**, not black like every
section on the landing page — this is the first section where the heading is the accent
colour. And the **outer shell is the only element whose radius changes** across
breakpoints (24 desktop, 16 mobile); the three inner cards stay at 16.

Figma marks the Mission/Vision headings `text-center whitespace-nowrap`, which is inert —
they sit in a left-aligned column and are shrink-wrapped, so the design file renders them
left-aligned too. Not reproduced, since copying it would imply a centring that does not
exist.

### 2026-07-31 — About page started: `/about` route + hero
First page beyond the landing page. Added [`app/about/page.tsx`](app/about/page.tsx) and
[`AboutHero`](components/about/AboutHero.tsx), and mapped **both** About frames end to end
(see [About page sections](#about-page-sections)) so the remaining eight blocks do not need
re-deriving.

**Pixel-exact at both breakpoints** — desktop 908 and mobile 880 against Figma's 908/880,
heading 800x112 desktop and 370x132 mobile, sub 120 tall on mobile, tiles 384x236 /
384x488 / 370x236, all at a 16px radius.

Two things a fresh session should know. Figma's collage **left column is 394 wide against
384 for the other two**, which overflows its own 1216 frame by 10px — built as three equal
384px columns instead, so columns 2 and 3 sit 10px left of Figma. And the **mobile frame
keeps only 2 of the 5 images**; the other three are `hidden lg:block`, so they correctly
report `naturalWidth === 0` on mobile because the browser never fetches them.

The collage is a flat list of five images placed explicitly into a grid
(`lg:col-start-*` / `lg:row-start-*`) rather than nested column divs, so the mobile stack
is just `flex-col` over the same markup with no reordering.

**Nav now routes rather than scrolls.** `About` points at `/about` and is coloured
`brand-red` with `aria-current="page"` when active, in both the desktop bar and the mobile
overlay, driven by `usePathname()`. The other three links became **root-relative**
(`/#services`, `/#blog`, `/#contact`, and `/#demo` on both CTAs) — as bare fragments they
would have looked for landing-page sections on `/about` and done nothing. Verified active
on `/about` and inactive on `/` at both breakpoints.

Figma's mobile Nav frame is 133 tall only because it mocks a 53px iOS status bar; the real
bar is 80.05 as everywhere else. Not reproduced.

### 2026-07-30 — Deployed to Vercel and verified live
User deployed via the Vercel dashboard (no CLI auth exists on this machine, so deploys
cannot be driven from here). Live at **https://redpear.vercel.app**, wired to `main`, so
every push redeploys.

Verified the live site at 1440 and 402 rather than trusting the 200: all 9 sections and 10
headings present, footer form rendering, marquee animating, responsive type correct (h1
52px desktop / 36px mobile), no page errors, no horizontal overflow. The only failing
request is `favicon.ico`.

**The site is publicly reachable** while the newsletter form is a no-op, the demo CTAs have
no booking flow, and several nav/footer links are placeholders. Fine for sharing
internally; not fine to point a client or campaign at yet.

### 2026-07-30 — Insurer logo row became a marquee
User asked for this row to stop spanning the full screen, to hold Figma's exact logo
dimensions, and to scroll smoothly left to right.

The viewport is now capped at `max-w-content`, so it holds 1216 at 1440 **and** at 1920,
where it previously spread to 1696. Verified at 402/1440/1920.

Logos sit in exact 59x32 boxes (60 for Hollard) at both breakpoints. The track is two
identical copies with the gap carried as padding-right on each item, so the track measures
exactly 2x one run — 2462 = 1231 x 2 on desktop, 1662 = 831 x 2 on mobile — and the -50%
loop is seamless.

Added `hover` pause, `prefers-reduced-motion` handling, and an edge fade mask (ours, not in
the design). This closes the wide-screen stretch follow-up that had been open since the
hero was built.

### 2026-07-30 — Footer link columns top-aligned
User pointed out the mobile footer columns looked vertically centred. Cause was the `nav`
having no `align-items`, so flex defaulted to `stretch`: both columns grew to the height of
the taller Services column (whose "Transformation Consulting" wraps to two lines), and each
column's own `justify-center` then centred its contents inside that stretched box. Figma
sets `items-start` on this container at **both** breakpoints. Added it and dropped the now
redundant `justify-center`.

Columns now measure 177x204 and 177x232 on mobile, 284x204 on desktop, with both headings
at a 0px offset from the top of the row.

### 2026-07-30 — Section 7 mobile copy stepped down
User asked for section 7's mobile heading and sub to match the rest of the page. Figma's
nodes are unchanged (still 36/44 + 18/28), so **the code now intentionally diverges** from
the design file until that frame is corrected. Marked in the component and in Known
follow-ups.

Verified every section heading across the whole page afterwards. Mobile now uses 28/36
with a 16/24 sub for all seven content sections; desktop 36/44 with 18/28. The only
deliberate outliers are the hero's insurer-logo heading (32/40 desktop, an H3) and the CTA
band (52/56 desktop, 32/40 mobile).

### 2026-07-30 — Section 3 (Platform) built — landing page structurally complete
The last gap. A single wide card: copy column beside a Layered Canvas holding a full
WhatsApp mock ([`PlatformChat`](components/platform/PlatformChat.tsx)) and two floating
cards, both hidden on mobile as the design has them.

**Desktop is pixel-exact** — section 1440x958, card 1216x648, chat 485x460, all matching
Figma exactly.

Mobile runs 1068 against Figma's 1091. Figma's mobile Layered Canvas is a fixed 528 tall
holding a 460 chat box, leaving 68px of empty space that the hidden floating cards would
have occupied. Left content-sized rather than reserving dead space, same call as the
section 2 mobile cards.

Found and did not reproduce a Figma content bug: the mobile frame's copy nodes still hold
section 2's heading. See the note under Landing page sections.

### 2026-07-30 — Section 9 (Footer) built — landing page complete apart from section 3
Logo, tagline, newsletter form, two link columns, copyright and three social icons, via
[`Footer`](components/layout/Footer.tsx) and
[`NewsletterForm`](components/layout/NewsletterForm.tsx). Rendered as `<footer>` outside
`<main>`.

Desktop 1440x381 against Figma's 380, mobile 402x645 against 643. Link columns measure
284 and 177 — exact at both breakpoints.

The form input needed `leading-[1.2]` rather than the label's 14/20: Figma's Input frame
is 16.8px tall, i.e. normal leading, and using 20px made the form 5px too tall.

**The form is deliberately not wired** — `onSubmit` only calls `preventDefault`. Markup is
correct and accessible, but it needs a destination before launch.

Two things cost time here and are now in Conventions: Next's dev overlay renders its own
`<footer>`, which broke a verification script; and a `//` comment was placed between JSX
attributes again, which is a syntax error.

### 2026-07-30 — Section 8 (CTA band) built, desktop + mobile
A single red card in [`CtaSection`](components/sections/CtaSection.tsx). Adds the
`gloss-cta` utility and a `neutral-50` token.

Desktop 1440x490 against Figma's 488, mobile 402x502 against 500 — the usual +2 from CSS
borders consuming layout space where Figma strokes do not.

The oversized RedPear watermark is drawn as a **CSS mask over white at 10% opacity**,
reusing `brand/redpear-logo.svg`, rather than re-exporting Figma's three nested mask
layers. Same visual result, no new assets, and it clips at the card edge as designed.

Heading weight differs by breakpoint here: 52/56 semibold on desktop, 32/40 **bold** on
mobile. The button reuses the existing `Button` secondary variant, which matched exactly.

The section carries `id="demo"`, so every "Book a Demo" across the navbar, hero and mobile
menu now resolves here.

### 2026-07-30 — Section 7 (Insights & Resources) built, desktop + mobile
Three blog cards, 3-up on desktop and stacked on mobile, via
[`ArticleCard`](components/insights/ArticleCard.tsx). Added `text-label-lg` (16/18) and
`text-label-sm` (12/14) tokens for the tighter label scale these cards use.

**Pixel-exact at both breakpoints** — desktop 1440x693 and mobile 402x1493 both match
Figma exactly, as do every card (389x433 / 370x417) and thumbnail (341x220 / 338x220).

The section carries `id="blog"`, so the navbar's Blog link now resolves. Cards are not
links yet; Figma has no URLs on them.

Section 7's mobile copy repeats section 6's original issue — desktop type scale at both
breakpoints. Built as designed and flagged.

### 2026-07-30 — Renamed CLAUDE.md to PROJECT.md
User asked for the rename; done with `git mv` so history follows the file. Claude Code
only auto-loads `CLAUDE.md`, so a one-line `CLAUDE.md` pointer now sits alongside this
file. Without it a fresh session would start with no project context at all — which was
the whole point of the doc. Do not delete the pointer.

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
