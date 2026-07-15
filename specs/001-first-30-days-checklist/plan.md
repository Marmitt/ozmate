# Implementation Plan: First 30 Days Checklist

**Branch**: `001-first-30-days-checklist` | **Date**: 2026-07-15 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-first-30-days-checklist/spec.md`

## Summary

Build the `/start` route: an interactive, locally-persisted checklist grouped by theme (Documents, Money, Phone, Transport, Health, etc.) that lets a newcomer scan essential first-30-days tasks, tick them off, see progress, and optionally deep-link to related guides. No backend, no accounts — state lives in `localStorage` on the device, keyed by each item's stable `id`. This feature ships the mechanism only, populated with 2-3 representative placeholder items per group (per resolved clarification in spec.md); full real checklist copy is a separate, later content task.

## Technical Context

**Language/Version**: TypeScript (strict mode) on Next.js App Router; Node.js 20+ for local dev/build.

**Primary Dependencies**: Next.js, React, Tailwind CSS (per CLAUDE.md stack). No state-management or persistence library is introduced — the browser's native `localStorage` API is wrapped in a small typed hook/module local to this feature.

**Storage**: Client-side `localStorage` only, keyed by checklist item `id`. No database, no backend, no server-side session (per constitution Principle I — Static-First Architecture). `data/checklist.ts` is a static, typed, repo-committed data file — not a runtime data store.

**Testing**: Vitest + React Testing Library for the persistence hook (toggle/read/stale-id handling) and checklist rendering/interaction logic. No automated visual-regression suite in v1; mobile layout and PWA offline behavior are verified manually on real devices per constitution Principle V, using the `quickstart.md` validation steps below.

**Target Platform**: Mobile-first responsive web (installable PWA), evergreen mobile browsers (iOS Safari, Android Chrome) as the primary target, desktop browsers as an enhancement layer.

**Project Type**: Web application — single Next.js project (no separate frontend/backend split; this feature adds one route, one data file, and supporting components/hooks within that single project).

**Performance Goals**: Lighthouse mobile Performance ≥ 90 (constitution Principle V). Checking/unchecking an item MUST feel instant (local state + `localStorage` write, no network round-trip).

**Constraints**: No user accounts/backend (constitution Principle I). Persistence is `localStorage`-only and MUST degrade gracefully to session-only behavior when storage is blocked/unavailable (FR-009). Layout MUST hold at ~380px width with no horizontal scroll (FR-013). The `/start` route must work from the PWA's offline shell once visited (per project-wide PWA requirement).

**Scale/Scope**: One route (`/start`), one data file (`data/checklist.ts`), a handful of theme groups (Documents, Money, Phone, Transport, Health, +) each with 2-3 placeholder items — roughly 10-18 items total for v1. Not sized for backend scale concerns; this is a purely client-side rendering/interaction concern.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|---|---|---|
| I. Static-First Architecture | No backend, no DB, no accounts; progress via `localStorage` keyed by stable item id; graceful handling when storage is unavailable (FR-009) | **PASS** |
| II. Content Integrity & Freshness | The constitution's checklist-item schema (`id, group, title, detail, link?, order`) has no `lastUpdated`/`lastVerified` fields — this principle's specific obligations apply to guides and groups, not checklist items | **N/A — not applicable to this entity** |
| III. Scope Discipline | Feature touches only `/start`; adds no accounts, monetisation, search, translation, or "trails" content; doesn't expand the group directory beyond Sydney | **PASS** |
| IV. Trust & Responsibility | Some placeholder items will sit in Money/Documents groups adjacent to visa/financial/legal topics (e.g. tax file number). Placeholder "what & why" copy MUST stay descriptive/generic and MUST NOT give prescriptive legal/financial/visa advice, consistent with how real content will later be written | **PASS, with a design constraint carried into Phase 1** |
| V. Mobile-First Quality | ~380px-first layout, Lighthouse ≥ 90 targets, offline-shell compatibility, installable PWA | **PASS** |

No violations requiring justification — Complexity Tracking is not needed.

**Post-Phase 1 re-check**: data-model.md, contracts/, and quickstart.md introduce nothing that changes this table — no schema fields were added beyond the constitution's locked checklist-item shape (group ordering is a code constant, not a schema field, per research.md), no backend/accounts were introduced, and placeholder item copy guidance (Principle IV) is now explicit in data-model.md's `detail` field notes. Gate still **PASSES**.

**Pre-existing condition to note**: this repository currently has no Next.js project scaffold (no `package.json`, `app/`, or config files exist yet). This feature is the first code to land, so its task list will need to include the minimal scaffold (Next.js + TypeScript + Tailwind + base PWA config) required to serve `/start` — not the full site shell, home page, or nav, which belong to other features per the spec's week-1/week-2 plan (`docs/OZMate_Project_Spec_v1_1.md` §B11).

## Project Structure

### Documentation (this feature)

```text
specs/001-first-30-days-checklist/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
ozmate/
├─ app/
│  ├─ layout.tsx                 # minimal root layout (PWA meta, global styles) — bootstrap only
│  └─ start/
│     └─ page.tsx                # /start route — renders the checklist
├─ data/
│  └─ checklist.ts                # typed checklist item data (id, group, title, detail, link?, order)
├─ lib/
│  └─ checklist/
│     ├─ storage.ts               # localStorage read/write/toggle, stale-id cleanup, feature-detection
│     └─ groups.ts                # fixed group display-order + group label metadata
├─ components/
│  └─ checklist/
│     ├─ ChecklistPage.tsx        # client component: wires data + storage hook + progress summary
│     ├─ ChecklistGroup.tsx       # renders one theme group section
│     └─ ChecklistItemRow.tsx     # one item: checkbox control + title/detail + optional link
├─ public/
│  └─ manifest.webmanifest        # minimal PWA manifest (bootstrap-level, not full icon set)
└─ ...config (next.config.ts, tailwind.config.ts, tsconfig.json, package.json)
```

**Structure Decision**: Single Next.js project (Option 1 style, adapted to the App Router layout from spec §B9). No frontend/backend split exists or is needed — this is a purely client-rendered feature within one app. Checklist logic is isolated under `lib/checklist/` and `components/checklist/` so it stays cleanly separated from data/content per CLAUDE.md's "don't hardcode content inside components" rule, and so later features (guides hub, group directory) don't collide with these paths.

## Complexity Tracking

*No constitution violations were found — this section is intentionally empty.*
