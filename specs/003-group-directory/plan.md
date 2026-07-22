# Implementation Plan: Group Directory

**Branch**: `003-group-directory` | **Date**: 2026-07-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-group-directory/spec.md`

## Summary

Build Pillar 3: the `/groups` directory page listing vetted WhatsApp/Telegram/Facebook job-and-community groups for Sydney newcomers. Group data lives in a typed `data/groups.ts` file matching the constitution's exact schema (`id`, `name`, `platform`, `category`, `city`, `link`, `description`, `verified`, `lastVerified`). The page is statically generated with a client-side category filter (no reload, no URL/search dependency) and a per-entry "report a dead or dodgy link" `mailto:` action. All seed entries default to `verified: false`; nothing in this feature ever sets `verified: true`.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19, Next.js 15 (App Router)

**Primary Dependencies**: Existing only — Tailwind CSS 3.4. No new packages: category filtering is local client state, "report" action is a plain `mailto:` anchor.

**Storage**: None — group entries in `data/groups.ts`, committed to the repo (constitution I)

**Testing**: Vitest + Testing Library (existing setup in `tests/unit/`)

**Target Platform**: Mobile-first web (~380px baseline), statically generated shell with client-side filtering, PWA offline shell

**Project Type**: Static web app (existing Next.js App Router project)

**Performance Goals**: Lighthouse mobile ≥ 90 Performance/Accessibility/SEO (site-wide target, unaffected by this feature's small client component)

**Constraints**: No backend/database; no search box (constitution III); no accounts; `verified` MUST default to `false` and MUST NOT be set `true` by this feature (constitution IV); `city` MUST be a stored field, not a hardcoded constant, even though all launch entries use the same Sydney value (constitution III); category filter MUST update with no full-page reload (SC-005)

**Scale/Scope**: 1 route (`/groups`), 7 known categories, a small seed set of Sydney group entries at launch

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Static-First Architecture | ✅ PASS | `/groups` is statically generated; group content is repo-committed typed data (`data/groups.ts`); no backend, no database, no accounts. Category filter is client-only local state, no persistence needed. |
| II. Content Integrity & Freshness | ✅ PASS | `lastVerified` is a required, always-present field (FR-012), never dropped. Displayed per entry so the trust signal is visible. |
| III. Scope Discipline | ✅ PASS | Sydney only at launch (FR-010); `city` stored as data, not hardcoded logic, so a second city is a content change later. No search box — category filter only (FR-004). |
| IV. Trust & Responsibility | ✅ PASS | Every seed entry defaults `verified: false` (FR-011); this feature never sets `verified: true`; verification badge only visually distinguishes, never hides, unverified entries (FR-003). |
| V. Mobile-First Quality | ✅ PASS | 380px-first layout on existing DESIGN.md tokens; per-page `<title>` + meta description; SSG keeps performance headroom; report action is a plain link (no added JS weight). |
| Content Model Compliance | ✅ PASS | `data/groups.ts` schema matches constitution §Content Model Compliance exactly: `id`, `name`, `platform`, `category`, `city`, `link`, `description`, `verified`, `lastVerified`. No fields dropped or added. |
| Development Workflow | ⚠️ NOTE | Work happens on the `003-group-directory` feature branch (already checked out). Components/content/data separation preserved: no group content hardcoded in components. |

**Post-Phase-1 re-check**: ✅ PASS — design artifacts introduce no new violations; data model matches constitution content schema verbatim; no entry in the seed data model sets `verified: true`.

## Project Structure

### Documentation (this feature)

```text
specs/003-group-directory/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── routes.md        # Phase 1 output — page/URL contract
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
app/
└── groups/
    └── page.tsx                     # Route shell — metadata + renders GroupsPage

components/
└── groups/
    ├── GroupsPage.tsx                # "use client" — owns category filter state
    ├── GroupCard.tsx                 # Single entry: name, platform, category, description, verified badge
    ├── VerifiedBadge.tsx             # Small visual distinction for verified vs unverified
    ├── CategoryFilter.tsx            # Filter control (buttons/select) + "all" reset
    └── ReportLinkAction.tsx          # mailto: "report a dead or dodgy link" affordance

data/
└── groups.ts                        # Typed Group[] — schema per constitution, seed entries all verified: false

lib/
└── groups/
    └── categories.ts                 # Known category list/labels + derive-from-data helper (FR-013)

tests/
└── unit/
    └── groups/
        ├── groups-data.test.ts       # Schema conformance: every entry has all fields, verified defaults false
        └── GroupsPage.test.tsx       # Filtering behavior: select category, clear filter, empty state
```

**Structure Decision**: Follows the project's established separation (constitution Development Workflow, spec doc §B9): route in `app/groups/`, presentational components in `components/groups/`, typed data in `data/groups.ts`, small helper logic in `lib/groups/`. Mirrors the existing checklist feature's client-component pattern (`app/start/page.tsx` renders `ChecklistPage`, a `"use client"` component owning local state) rather than the guides feature's MDX/loader pattern, since groups have no long-form content or file-based loading — just a typed array and client-side filtering.

## Complexity Tracking

No constitution violations — table not required.
