# OZMate — Project Specification (v1 / MVP)

*This is the build spec for OZMate's first version. It is written to be pointed at directly by Claude Code in the build phase. Part A = product requirements (what & why). Part B = engineering requirements (how). Anything marked **[OPEN]** is a decision still to be made.*

**Owner:** Mateus · **Location:** Sydney, Australia
**Target ship date:** mid-to-late July 2026 (~6 week build window)
**Status:** Spec — pre-build

---

## 0. The two questions (Phase 1 framing)

**Q1 — Who is this for, and what is the one problem v1 solves?**
Newcomers to Australia in their first ~0–12 months (any nationality), plus people about to arrive. The one problem: *practical, trusted, lived-experience information is scattered and hard to find.* v1 puts the highest-value version of it in one mobile-first place.

**Q2 — What does "done" look like for v1?**
A newcomer can open OZMate on their phone and, within ~10 minutes, know their first 5 actions, find a real job lead (a vetted group), and know where to buy cheap workwear. Anything beyond that is out of scope for v1 (see §A4).

---

# PART A — PRODUCT REQUIREMENTS

## A1. Vision & positioning

**One-liner:** OZMate is the insider's survival guide for newcomers to Australia — the practical, street-level tips the official apps and government sites won't give you, in one place.

**Positioning / wedge:** Do **not** compete on visa/legal accuracy (Immi, VEVO, MyAus own that). OZMate's edge is the *unofficial, lived-experience layer*: vetted WhatsApp job groups, supermarket promo cycles, cheap workwear, industry uniform norms. Freshness + a real human voice = the moat.

## A2. Target users

Primary audience: **all newcomers, any nationality.** Three working personas:

| Persona | Primary needs in v1 |
|---|---|
| New arrival hustling for first job | Job groups, workwear, transport, cheap shopping |
| International student | Work rights (link out), Opal, part-time jobs, budgeting |
| Sponsored / skilled worker (+ family) | TFN/ABN, banking, Medicare, housing |

Secondary: **pre-arrival** users (still overseas, planning the move). Served by a lightweight "Before you fly" framing reusing arrival content. Low cost, high share value.

## A3. v1 scope — the three pillars

v1 delivers a **narrow-and-deep mix** of three things. Quality over breadth.

### Pillar 1 — "First 30 Days" checklist (the hook)
An interactive, ordered checklist of the essential setup actions for a new arrival.
- Items grouped by theme (e.g. Documents, Money, Phone, Transport, Health).
- Each item: a title, a short "what & why", an optional action link, and a tick state.
- Progress persists **locally on device** (no account) — see §B5.
- Tapping an item can deep-link to the relevant guide in Pillar 2.

### Pillar 2 — Tips hub (curated guides)
A browsable library of short, scannable guides, organised by category.
- v1 ships the **single highest-value guide per category** (~10–15 articles total), not 100 thin ones.
- Categories (the content backbone):
  - **A. Arrival essentials** — TFN, bank account, SIM, Medicare, emergencies (000)
  - **B. Visas & work rights** — plain-English overview + *link out* to official; how to check work rights (VEVO)
  - **C. Jobs & income** — Aussie-style resume, super/fair pay (link to Fair Work), industry uniform/workwear norms
  - **D. Shopping & saving** — cheap workwear & basics (Kmart, Big W, Best&Less, op shops, Marketplace), supermarket promo cycles, cashback apps, budget starter-home kit
  - **E. Transport** — Opal (get one, top up, daily/weekly caps, transfers); Sydney first, expandable
  - **F. Housing** — how rentals work, bond, no-rental-history tips, sharehouses, avoiding scams
  - **G. Daily life & culture** — slang/etiquette, bulk-billing & pharmacy, BPAY/PayID, public holidays
- Each guide ends with a "do this now" action and links to authoritative sources.
- Tone: like a switched-on mate explaining it over coffee. (Brand voice still **[OPEN]** — see §A6.)

### Pillar 3 — Group directory
A clean, categorised, **vetted** directory of WhatsApp / Telegram / Facebook groups.
- **Sydney first** for job/community groups (the hyper-local, freshness-sensitive part).
- Filterable by **industry/category** (hospo, cleaning, construction, warehouse, aged care, general jobs, community/social, etc.).
- Each entry: name, platform, category, city, join link, one-line description, "verified" flag, last-verified date.
- A **"report a dead or dodgy link"** action on each entry (mechanism **[OPEN]** — see §B5). Protecting credibility is critical: only list groups you've vetted.

### Content scope rule
**Group directory = Sydney only (v1). All other content = Australia-wide.** Brisbane/Perth groups come later via friend contributions.

## A4. Out of scope for v1 (explicit non-goals)

Parked, by design, to protect the timeline and focus:
- User accounts / login / profiles
- User-generated content / community posting
- Monetisation (agency listings, ads, referrals) — future phase
- Multi-language / translation (English first)
- Push notifications
- Bookmarks / saved items (consider v2)
- Search (consider v2; v1 relies on clear category navigation)
- **Trails / things-to-do / explore-your-city** — explicitly deferred. It dilutes the "survival" promise and competes in a crowded category. Revisit post-launch as a light "settle in & explore" add-on at most.
- Additional cities for the *group directory* (Brisbane, Perth) — content, not code, so easy to add later

## A5. Success metrics (how we know v1 worked)

Lightweight, privacy-friendly analytics (§B7). Watch:
- **Engagement:** % of visitors who open a guide or the checklist (not just bounce).
- **Checklist usage:** checklist starts, and items ticked per session.
- **Group directory:** outbound clicks to group links (the clearest "this was useful" signal).
- **Return / share:** returning visitors; direct + referral traffic share.
- **Qualitative:** feedback from your friend network during the build.

## A6. Open product decisions

- **[OPEN] Brand & voice** — no identity yet. Needs: a name treatment/logo direction, a tone definition (how casual/"mate-y"), and a simple colour/type direction. *Recommend deciding tone before writing the articles, since voice shapes every guide.*
- **[OPEN] Exact 12–15 launch articles** — pick the ones you know cold first (suggested first 3: Opal, cheap workwear, first-job WhatsApp groups).
- **[OPEN] "Report a link" mechanism** — mailto vs embedded form (see §B5).

---

# PART B — ENGINEERING REQUIREMENTS

## B1. Architecture summary

A **statically generated, mobile-first PWA**. No backend, no database in v1. All content lives in the repo as MDX + structured data files, compiled at build time. This keeps it fast, cheap, instantly updatable, SEO-friendly, and trivially maintainable by a solo dev.

## B2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router)** | SSG, great SEO + PWA story |
| Language | **TypeScript** | type-safe content schemas |
| Styling | **Tailwind CSS** | fast, consistent, mobile-first |
| Content | **MDX** (articles) + typed **TS/JSON data** (groups, checklist) | version-controlled, no CMS cost |
| PWA | Web App Manifest + service worker (e.g. `next-pwa` or `@ducanh2912/next-pwa`) | installable + offline shell |
| Analytics | **Plausible** or **PostHog** **[OPEN]** | privacy-friendly, free tier |
| Hosting | **Vercel** (default) *or* **AWS Amplify** **[OPEN]** | see §B6 |

*Rationale recap: a web PWA = one codebase, instant content updates (essential when the value is freshness), Google-discoverable (native apps aren't), and squarely in Mateus's AWS/DevOps wheelhouse. Native (via Capacitor) is a later option if traction demands it.*

## B3. Information architecture / routes

```
/                         Home — intro + entry points to the 3 pillars
/start                    "First 30 Days" checklist (Pillar 1)
/guides                   Tips hub index — all categories (Pillar 2)
/guides/[category]        Category listing (e.g. /guides/transport)
/guides/[category]/[slug] Single guide (e.g. /guides/transport/opal-card)
/groups                   Group directory — Sydney, filterable (Pillar 3)
/about                    About + disclaimer (visa/legal/financial)
manifest + service worker PWA installability + offline shell
sitemap.xml, robots.txt   SEO
```

## B4. Content model / data schemas

**Guide (MDX frontmatter):**
```yaml
title: string
slug: string                # url segment
category: enum              # arrival | visas | jobs | shopping | transport | housing | daily-life
summary: string             # 1-2 lines, used in listings + meta description
scope: enum                 # national | sydney (default national)
order: number               # sort within category
lastUpdated: date           # freshness signal (shown to users + for maintenance)
tags: string[]
sources: { label: string, url: string }[]   # authoritative links
```

**Group (typed data file, e.g. `data/groups.ts`):**
```ts
{
  id: string
  name: string
  platform: 'whatsapp' | 'telegram' | 'facebook'
  category: string            // hospo | cleaning | construction | warehouse | aged-care | jobs-general | community | ...
  city: string                // 'sydney' for v1
  link: string                // join URL
  description: string         // one line
  verified: boolean
  lastVerified: string        // ISO date — drives the maintenance routine
}
```

**Checklist item (typed data file, e.g. `data/checklist.ts`):**
```ts
{
  id: string                  // stable key for localStorage progress
  group: string               // documents | money | phone | transport | health | ...
  title: string
  detail: string              // short what & why
  link?: string               // optional deep-link to a guide or external resource
  order: number
}
```

## B5. Key technical decisions

- **No database in v1.** Content is committed to the repo. Editing = a commit/PR = an auto-deploy. This is the freshness engine.
- **Checklist progress** persists via **`localStorage`**, keyed by checklist item `id` (works fine in a real deployed web app; no account needed). Handle the "no storage / private mode" case gracefully.
- **"Report a link"** — without a backend, the lean options are: (a) a `mailto:` link prefilled with the group id, or (b) an embedded **Tally / Google Form**. Recommend a Form (lower friction than email). **[OPEN]**
- **Freshness display** — surface `lastUpdated` / `lastVerified` in the UI so users trust currency and you can spot stale content.
- **Disclaimer** — a clear, persistent note that OZMate provides general information, not visa/legal/financial advice, with links to official sources. Lives on `/about` and footer.

## B6. Hosting & deployment

Two valid paths — pick one **[OPEN]**:
- **Vercel (recommended default):** best Next.js DX, zero-config SSG, automatic **PR preview deploys**, push-to-`main` → production. Fastest path to shipping.
- **AWS Amplify (the "flex your AWS" option):** keeps everything in your ecosystem (good for your portfolio/DevOps story), Git-based CI/CD, S3+CloudFront under the hood. Slightly more setup than Vercel.

CI/CD requirement either way: **push to `main` auto-deploys to prod; PRs get preview URLs** for review before merge.

## B7. Non-functional requirements

- **Mobile-first**, responsive, thumb-friendly. Design at 380px width first.
- **Performance:** fast LCP, good Core Web Vitals (this is an SEO ranking factor and the wedge is discoverability). Target Lighthouse Performance ≥ 90 on mobile.
- **PWA:** installable ("Add to Home Screen"), offline shell for already-visited content.
- **Accessibility:** semantic HTML, sufficient colour contrast, keyboard-navigable, alt text. Target Lighthouse Accessibility ≥ 90.
- **SEO (critical):** per-page `<title>` + meta description, Open Graph/Twitter cards, `sitemap.xml`, `robots.txt`, clean semantic markup. Each guide should target a real search query (e.g. "how to get an Opal card", "cheap workwear Sydney").
- **Privacy:** privacy-friendly analytics only; minimal/no personal data collected; a short privacy note (mind the Australian Privacy Principles).

## B8. Repo & dev workflow (Claude Code-oriented)

- **GitHub repo**, public or private. `main` is always deployable.
- **Issue-based development:** one issue per feature or per article. Each Claude Code session targets one issue → focused, reviewable scope. This is the main discipline mechanism for a solo build.
- **Branching:** feature branch per issue → PR → preview deploy → merge.
- **Conventional commits** (you already use this — keep it).
- **`CLAUDE.md` at repo root** containing: the stack, this spec's key conventions, the content schemas (§B4), folder structure, commit style, and explicit "do not touch" rules. Point Claude Code at this spec + CLAUDE.md.
- **Pre-set permissions** for routine commands (install, build, test) to avoid re-approving constantly. Skip heavy multi-agent / git-worktree setups for v1 — coordination overhead isn't worth it at this codebase size; revisit if the project grows.

## B9. Suggested project structure

```
ozmate/
├─ CLAUDE.md
├─ app/
│  ├─ page.tsx                      # home
│  ├─ start/page.tsx                # checklist
│  ├─ guides/page.tsx               # hub index
│  ├─ guides/[category]/page.tsx    # category listing
│  ├─ guides/[category]/[slug]/page.tsx
│  ├─ groups/page.tsx               # directory
│  └─ about/page.tsx
├─ content/guides/                  # MDX articles, by category
├─ data/
│  ├─ groups.ts                     # group directory data
│  └─ checklist.ts                  # checklist items
├─ components/                      # UI components
├─ lib/                             # content loaders, helpers
├─ public/                          # icons, manifest, og images
└─ ...config (next, tailwind, ts)
```

## B10. Definition of done (v1)

**Product DoD:** the §0 Q2 outcome is met — a newcomer can, within ~10 minutes on mobile, know their first 5 actions, find a vetted job-group lead, and know where to buy cheap workwear.

**Technical DoD:**
- Three pillars live: checklist (with persistent progress), tips hub (~12–15 guides across all categories), Sydney group directory (filterable + report mechanism).
- Installable PWA with offline shell.
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90.
- Deployed to production (ideally on `ozmate.com`) with auto-deploy + PR previews.
- Disclaimer + privacy note present.
- Tested on real iOS + Android devices.

---

## B11. Suggested 6-week build plan

*From ~8 June → mid/late July. The long pole is content, not code — plan accordingly.*

| Week | Code | Content (in parallel) |
|---|---|---|
| **1** | Repo, scaffolding, CLAUDE.md, deploy pipeline + PR previews, layout shell, design tokens, content schemas (§B4) | Draft first 3 articles (Opal, workwear, job groups); decide brand voice **[OPEN]** |
| **2** | Tips hub: category index + MDX guide rendering + freshness display | Write to ~6–8 articles |
| **3** | "First 30 Days" checklist + localStorage progress + deep-links | Write checklist items copy |
| **4** | Group directory (Sydney): data-driven listing, filters, report mechanism | Vet & write ~15–20 group entries; finish articles to ~12–15 |
| **5** | PWA polish (manifest, install, offline), full SEO pass (sitemap, OG, metadata), analytics, accessibility pass | Source authoritative links, freshness review |
| **6** | QA on real devices, perf tuning to hit Lighthouse targets, launch + landing | Final content polish; buffer |

---

## Open decisions checklist (resolve as you go)

- [ ] **Brand & voice** identity (decide tone before writing articles)
- [ ] Final 12–15 launch articles
- [ ] Hosting: **Vercel** vs **AWS Amplify**
- [ ] Analytics: **Plausible** vs **PostHog**
- [ ] "Report a link" mechanism: **form** vs **mailto**
- [ ] Domain secured (`ozmate.com`?)

---

*Hand-off note for the build phase: point Claude Code at this spec + a root `CLAUDE.md`, work issue-by-issue, and keep `lastUpdated`/`lastVerified` honest — freshness is the product.*
