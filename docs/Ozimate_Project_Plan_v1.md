# Ozimate — Project Planning Document (v1)

*A starting-point doc to think through the project in a structured way. Nothing here is locked in — it's a thinking tool. Edit, delete, and argue with it freely.*

**Owner:** Mateus
**Location:** Sydney, Australia
**Status:** Pre-build / concept
**Last updated:** 6 June 2026

---

## 1. One-line pitch

> **Ozimate is the insider's survival guide for newcomers to Australia — the practical, street-level tips that the official apps and government sites won't tell you, all in one place.**

The test for every feature: *"Would a newcomer in their first 90 days actually use this, and would they tell a friend about it?"*

---

## 2. The problem

Newcomers to Australia (migrants, working-holiday-makers, international students, sponsored workers) face a brutal first few months:

- Information is scattered across government sites, Facebook groups, random WhatsApp links, YouTube and word-of-mouth.
- Official sources are accurate but generic, bureaucratic, and don't cover the *real-world hacks* (cheap workwear, which supermarket has specials this week, which WhatsApp groups actually post jobs).
- The most valuable knowledge — "what I wish someone had told me" — lives in people's heads and dies there.

**Ozimate's core insight:** the gap isn't *official information*, it's *trusted, lived-experience information*. That's the wedge.

---

## 3. Who it's for (audience)

**Primary (v1):** All newcomers to Australia, any nationality — people in roughly their first 0–12 months.

Within that, three rough personas:

| Persona | Needs most |
|---|---|
| **Working-holiday / new arrival hustling for first job** | Jobs, WhatsApp groups, workwear, transport, where to buy cheap stuff |
| **International student** | Visa work rights, transport (Opal), part-time jobs, budgeting |
| **Sponsored / skilled worker (with family)** | Banking, TFN/ABN, Medicare, schools, housing |

> **Note:** Starting "all nationalities" is the right call for reach, but it has a cost — you can't lean on one language or one diaspora's specific channels. Design content to be *nationality-agnostic by default*, with the option to layer community-specific content (e.g. Brazilian, Indian, Nepali WhatsApp groups) later as filters. Your own diaspora network could be a great *first* content source even if the product is for everyone.

---

## 4. Competitive landscape (and your edge)

| Product | What it is | Gap it leaves |
|---|---|---|
| **Immi App / VEVO** (Home Affairs) | Official visa status, work-rights check | Official only — zero lifestyle/practical tips |
| **MyAus App** (Migration Council) | Free, multilingual settlement info | Generic, institutional tone; no insider hacks |
| **mySSI / New Roots** (SSI) | Refugee-focused settlement support | Narrow audience, caseworker-paired |
| **SettleMate** (settlemate.au) | Arrival checklists + referrals to tax agents | Closest to your *future* model — watch closely |

**Your differentiation:**
1. **Lived-experience voice**, not institutional. Warm, real, "mate-to-mate."
2. **The unofficial layer** nobody else curates: WhatsApp job groups, supermarket promo cycles, cheap workwear, uniform norms by industry.
3. **Freshness** — this stuff changes weekly (specials, group links). If you keep it current, that *is* the moat.

⚠️ **Don't compete on visa accuracy.** Link out to official sources for anything legal/visa-related. Your value is the practical layer on top.

---

## 5. Platform recommendation

You asked me to advise. My recommendation:

> **Build v1 as a mobile-first Progressive Web App (PWA), not a native app.**

**Why, for a solo founder:**

- **One codebase, ship fastest.** Native iOS + Android = two builds, two stores, two review queues, ongoing fees ($99/yr Apple, $25 once Google) — overkill before you've validated demand.
- **Content changes constantly.** Promo cycles, group links, visa-rule updates — a web app lets you publish instantly with no app-store review delay.
- **Discoverability.** Newcomers Google *"how to get an Opal card"* or *"cheap workwear Sydney."* A web app gets SEO traffic; a native app is invisible to search.
- **Installable & app-like.** A PWA can be "Add to Home Screen," works offline-ish, and feels like an app — without the store friction.
- **Plays to your strengths.** Your AWS/DevOps background means hosting, CI/CD, and a content pipeline are squarely in your wheelhouse.

**Path to native later:** if you hit real traction and need proper push notifications / deeper device features, wrap the same web app with **Capacitor** (reuse ~all your code) or go native then. Don't pay that cost up front.

### Suggested lean stack (solo-friendly)

- **Framework:** Next.js (React) — great for SEO + PWA + content sites.
- **Content:** Start with Markdown/MDX files in the repo (zero CMS cost, version-controlled). Move to a headless CMS (Sanity / Contentful free tier) only when editing in-code gets annoying.
- **Styling:** Tailwind CSS.
- **Hosting:** Vercel (dead simple) *or* AWS Amplify / S3+CloudFront if you want to flex the AWS muscles and keep it in your ecosystem.
- **Analytics:** Plausible or PostHog (privacy-friendly, free tiers) — you'll want to see which guides get used.

*Keep it boring and shippable. The hard part of Ozimate is the content, not the tech.*

---

## 6. Content architecture

Everything you described, organised into navigable categories. This doubles as your content backlog.

**A. Arrival essentials ("First 30 Days" guide)**
- TFN (Tax File Number) — how & when
- Bank account (which banks, how before/after arrival)
- Medicare / health cover by visa type
- Australian phone SIM & plans
- Emergency numbers & how things work (000)

**B. Visas & work rights** *(link out to official; don't advise)*
- Plain-English overview of common visa types
- How to check work rights (VEVO)
- Where to get *real* legal help (registered migration agents)

**C. Jobs & income**
- WhatsApp / Telegram job groups by industry (hospo, cleaning, construction, warehouse, aged care, etc.)
- How to write an Aussie-style resume
- Cash-vs-payroll, super, fair pay (link to Fair Work)
- Industry uniform/workwear norms (what to wear day one)

**D. Shopping & saving (the "insider hacks")**
- Where to buy cheap workwear & basics (Kmart, Big W, Best&Less, op shops, Facebook Marketplace)
- Supermarket promo cycles — Woolies/Coles half-price rhythms, Kmart/Target sales
- Apps for specials & cashback
- Setting up a starter kitchen/home on a budget

**E. Getting around (transport)**
- Opal card — get one, top up, daily/weekly caps, transfers
- City-by-city basics (start Sydney, expand later)
- Cheap intercity travel (you personally love overland/ferry — there's a content angle here)

**F. Housing**
- How rentals work (inspections, applications, bond, references with no rental history)
- Sharehouses & where to find them
- Avoiding rental scams

**G. Daily life & culture**
- Slang & etiquette, public holidays, tipping norms
- Healthcare beyond Medicare (bulk-billing, pharmacy)
- Banking, BPAY, PayID

> **Pattern:** each item = a short, scannable guide + a "do this now" action + links. Keep the tone like a switched-on mate explaining it over coffee.

---

## 7. MVP scope (v1)

You chose "a mix of all three." For a solo build, the trick is to do the mix *narrow and deep*, not wide and shallow. Proposed v1:

**Ship:**
1. **"First 30 Days" interactive checklist** (your guided spine — the hook).
2. **A curated tips hub** covering categories A–G above, but only the *highest-value* article in each to start (~10–15 great articles, not 100 thin ones).
3. **A WhatsApp/jobs group directory** — a clean, categorised, *vetted* list of groups (this is the part the big apps can't/won't do).

**Explicitly NOT in v1** (park these):
- User accounts / login
- User-generated content / community posting
- Monetisation / agency features
- Multi-language (English first; translate once content is proven)
- Push notifications

**Definition of done for v1:** a newcomer can land in Sydney, open Ozimate, and within 10 minutes know their first 5 actions, where to find a job lead, and where to buy work clothes cheaply.

---

## 8. Roadmap beyond v1

| Phase | Focus | Example features |
|---|---|---|
| **v1 (MVP)** | Prove people want it | First-30-Days checklist, tips hub, group directory |
| **v2** | Engagement & retention | Save/bookmark, city expansion (Melbourne/Brisbane), "specials this week" feed, email/notify on updates |
| **v3** | Community & language | Multi-language, user accounts, user-submitted tips/groups (moderated) |
| **v4** | Monetisation | Agency/recruiter listings, sponsored placements, lead-gen, referral partnerships |

---

## 9. Monetisation thinking (future — not now)

You mentioned agencies paying to reach/recruit users. Keep this *for later*, but the realistic options to keep in mind:

- **Affiliate / referral** — banks, SIMs, money-transfer (Wise), insurance. Low-friction, common in this space.
- **Recruiter / labour-hire listings** — agencies pay to post verified jobs or get leads. *This is SettleMate's lane; doable but needs trust + volume first.*
- **Sponsored placements** — clearly labelled, e.g. a workwear retailer in the shopping section.
- **Premium content** — paid "deep-dive" guides or a paid concierge tier.

⚠️ **Guardrail:** the moment money enters, *trust is the asset you're selling.* Never let paid placements masquerade as genuine tips, or the whole proposition dies. Label ads clearly. Vet any agency you partner with — you don't want Ozimate associated with dodgy labour-hire.

---

## 10. Key risks & things to get right

1. **Content freshness** — your biggest operational challenge. Stale group links / old promo info = broken trust. Plan a *maintenance rhythm* from day one (even a monthly review).
2. **Accuracy & liability** — never give visa/legal/financial *advice*; inform and link out. Add a clear disclaimer.
3. **WhatsApp group quality** — vet groups before listing. Scams and spam groups will hurt your credibility. Consider a "report a dead/dodgy link" button early.
4. **Privacy** — even without accounts, be clean on analytics and any data you collect (Australian Privacy Principles).
5. **Solo founder burnout** — content is a treadmill. Build systems (templates, a backlog, maybe community contributions later) so it's not all you forever.
6. **Differentiation drift** — if you start looking like MyAus/SettleMate, you've lost. Protect the lived-experience voice.

---

## 11. Open questions to resolve next

- **City scope:** Sydney-only for v1 (recommended), or national from the start?
- **Voice & brand:** how "mate-y" / casual? Any visual identity ideas for Ozimate yet?
- **Content sourcing:** all from you initially, or do you want to interview/crowd-source from your network early?
- **Validation:** are you happy to validate demand *before* building (landing page + waitlist), or do you want to build first because you'll do it for yourself anyway?
- **Domain/name:** is "Ozimate" available as a .com.au / .com? Worth checking early.
- **Time budget:** how many hours/week can you realistically give this?

---

## 12. Suggested immediate next steps

1. **Pick city scope** (suggest: Sydney first).
2. **Write 3 articles** from the content list — pick the 3 you personally know cold (e.g. Opal, cheap workwear, first job WhatsApp groups). This tests whether the *content* is fun for you to make; that's the real sustainability question.
3. **Stand up a one-page landing site** ("Coming soon — the newcomer's survival guide to Australia") with an email signup, to start gauging interest with near-zero effort.
4. **Sketch the v1 information architecture** (the menu / category structure) on paper.
5. **Check the domain + socials** for "Ozimate."
6. Only *then* start the build.

---

*Next time we work on this, good things to bring: which city scope you've chosen, any of the 3 sample articles you've drafted, and answers to the open questions in §11. I can then help with the information architecture, the landing page, or the actual build.*
