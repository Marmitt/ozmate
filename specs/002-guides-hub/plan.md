# Implementation Plan: Guides Hub

**Branch**: `002-guides-hub` | **Date**: 2026-07-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-guides-hub/spec.md`

## Summary

Build Pillar 2: the `/guides` hub index, `/guides/[category]` listings, and `/guides/[category]/[slug]` article pages. Guides are MDX files in `content/guides/<category>/<slug>.mdx` with typed, build-time-validated frontmatter; the seven categories are a typed data file. All pages are statically generated at build time, styled with the existing DESIGN.md token system, carry per-page metadata from frontmatter, and inherit offline support from the existing runtime-caching service worker. Ships with a small set of real seed guides; the full article library is separate content work.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19, Next.js 15 (App Router)

**Primary Dependencies**: Existing: Tailwind CSS 3.4. New: `next-mdx-remote` (RSC `compileMDX` for rendering MDX from `content/`), `@tailwindcss/typography` (prose styling for article bodies)

**Storage**: None — MDX files in `content/guides/`, category definitions in `data/categories.ts`, committed to the repo (constitution I)

**Testing**: Vitest + Testing Library (existing setup in `tests/unit/`)

**Target Platform**: Mobile-first web (~380px baseline), statically generated, PWA offline shell

**Project Type**: Static web app (existing Next.js App Router project)

**Performance Goals**: Lighthouse mobile ≥ 90 Performance/Accessibility/SEO on all three page types (SC-003)

**Constraints**: No backend/database; no search; build must fail loudly on invalid frontmatter (FR-004); previously visited pages readable offline (FR-010); publishing a guide = adding an MDX file, zero code changes (FR-011)

**Scale/Scope**: 7 fixed categories, ~10–15 guides at v1 launch (seed subset in this feature), 3 route types

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Static-First Architecture | ✅ PASS | All routes statically generated via `generateStaticParams`; content is repo-committed MDX + typed TS data; no backend, no database, no accounts. |
| II. Content Integrity & Freshness | ✅ PASS | `lastUpdated` is required frontmatter, validated at build, displayed on guide pages and category listings (FR-002/003, SC-002). No `verified`/group data touched. |
| III. Scope Discipline | ✅ PASS | No search, no accounts, no notifications, no trails content. Categories fixed at seven. |
| IV. Trust & Responsibility | ✅ PASS | `sources[]` required frontmatter rendered as a sources section; visa/legal/financial seed guides link out to official authorities and stay descriptive, not prescriptive. No analytics added in this feature. |
| V. Mobile-First Quality | ✅ PASS | 380px-first layouts on existing tokens; per-page `<title>` + meta description from frontmatter; SSG output keeps performance headroom. Sitemap/OG polish tracked for launch, not regressed here. |
| Content Model Compliance | ✅ PASS | Guide frontmatter schema matches constitution §B4 exactly: `title`, `slug`, `category`, `summary`, `scope`, `order`, `lastUpdated`, `tags`, `sources[]`. No fields dropped or added. |
| Development Workflow | ⚠️ NOTE | Work must happen on a `002-guides-hub` feature branch (currently on `main` — branch before implementation). Components/content/data separation preserved: no guide content hardcoded in components. |

**Post-Phase-1 re-check**: ✅ PASS — design artifacts introduce no new violations; data model matches constitution content schema verbatim.

## Project Structure

### Documentation (this feature)

```text
specs/002-guides-hub/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── routes.md        # Phase 1 output — page/URL contracts
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
app/
├── guides/
│   ├── page.tsx                     # Hub index — seven categories
│   ├── [category]/
│   │   ├── page.tsx                 # Category listing (generateStaticParams)
│   │   └── [slug]/
│   │       └── page.tsx             # Guide page (generateStaticParams + compileMDX)
└── not-found.tsx                    # Root not-found with link back to /guides + home

components/
└── guides/
    ├── CategoryCard.tsx             # Index card (live vs "coming soon" states)
    ├── GuideListItem.tsx            # Listing row: title, summary, lastUpdated
    ├── FreshnessDate.tsx            # "Updated <date>" display, shared by listing + article
    ├── SourcesList.tsx              # "Sources" section at end of a guide
    ├── Callout.tsx                  # Terracotta tip/heads-up block, exposed to MDX
    └── mdx-components.tsx           # MDX component map (headings, links, Callout)

content/
└── guides/
    └── <category>/<slug>.mdx        # Seed guides (real content, real sources)

data/
└── categories.ts                    # The 7 categories: key, name, description

lib/
└── guides/
    ├── frontmatter.ts               # Typed schema + validate() that throws on bad/missing fields
    └── loader.ts                    # fs-based: list categories' guides, load one guide, sort

tests/
└── unit/
    └── guides/
        ├── frontmatter.test.ts      # Validation: missing fields, bad category, bad date
        └── loader.test.ts           # Sorting, category filtering, slug resolution
```

**Structure Decision**: Follows the project's established separation (constitution Development Workflow, spec doc §B9): routes in `app/`, presentational components in `components/guides/`, content in `content/guides/`, typed data in `data/`, logic in `lib/guides/`. Mirrors the existing checklist feature's layout (`components/checklist/` + `lib/checklist/` + `data/checklist.ts`).

## Complexity Tracking

No constitution violations — table not required.
