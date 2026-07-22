# Phase 0 Research: Group Directory

All Technical Context unknowns resolved. Decisions below.

## R1. Category filter mechanism

**Decision**: Client-side `"use client"` component (`GroupsPage`) holding a single `selectedCategory: CategoryKey | "all"` state value in `useState`. Filtering is a plain `.filter()` over the imported `groups` array on render — no URL query params, no server round-trip.

**Rationale**: SC-005 requires no full-page reload; the existing `ChecklistPage` component already establishes this exact pattern (client component, local `useState`, filters a statically imported typed array) for the project. Reusing it keeps the codebase consistent and needs zero new dependencies. Constitution III rules out a search box, so the only interaction is a single-select category filter — state doesn't need to survive navigation or reloads.

**Alternatives considered**:
- URL search params (`?category=hospo`) — enables shareable/bookmarkable filtered links, but adds routing complexity for a v1 feature the spec doesn't ask for (no such requirement in FR-004). Local state is simpler and matches "fast, good-enough" working style.
- Server-rendered per-category routes (`/groups/[category]`) — the spec explicitly describes this as an in-page filter ("Users can filter by category"), not a separate route per category; a client filter matches the requirement more directly and avoids a second static-params surface to maintain.

## R2. Verified-entry visual treatment (FR-003)

**Decision**: A small pill badge component (`VerifiedBadge`), rendered only when `verified === true`, using DESIGN.md's already-specified "Verified badge (group directory)" token spec: `--accent-soft` fill, `--accent-deep` text, pill radius 999, padding 4/10, weight 700. Unverified entries render the same card with no badge (not a "warning" badge) — the absence of the badge is itself informative, and the card otherwise renders identically so unverified entries are never visually hidden or suppressed.

**Rationale**: DESIGN.md already defines this exact component under "Verified badge (group directory)" — reusing it is both zero net-new design work and required consistency with the rest of the app's token system. Reusing the trust-green (`--accent`) family ties "verified" to the same signal as checklist progress, per DESIGN.md's own rationale.

**Alternatives considered**:
- A "not yet verified" warning-style badge on every unverified entry — over-signals risk for what is simply "not yet reviewed," and DESIGN.md doesn't define such a token; would require inventing new design language mid-feature.

## R3. "Report a dead or dodgy link" action (FR-007)

**Decision**: A plain `<a href="mailto:...">` anchor, no button/form/JS handler. The `mailto:` target is a fixed contact address (placeholder `hello@ozmate.app`, matching the constitution's existing `/about` contact-disclosure precedent), with `subject` and `body` populated via URL-encoded query params identifying the group by `name` and `id`.

<!-- TODO: `hello@ozmate.app` is a placeholder, not a live inbox. Replace with the real OZMate contact address before implementation ships — tracked in docs/pre-launch-checklist.md. -->

**Rationale**: Spec explicitly scopes this to a `mailto:` link with no backend/form dependency (assumption in spec.md). A plain anchor requires no JS, works identically in SSG output, and needs no new dependency. Encoding the group's `name`/`id` into the subject/body satisfies FR-007's "identifiable without further lookup" requirement with zero extra state.

**Alternatives considered**:
- A small client-side "copy report details to clipboard" affordance — adds JS and a "copied!" UI state for a marginal ergonomics gain the spec doesn't request; a plain mailto link is the documented, simpler choice.

## R4. Category list source (FR-013)

**Decision**: `lib/groups/categories.ts` exports a fixed `GroupCategory` union type and a `groupCategories` array (key + display label), mirroring the exact pattern of `data/categories.ts` for guides. The filter UI renders from this fixed list, not by scanning `data/groups.ts` at runtime, so a category with zero current entries still appears as a selectable (but empty-result) filter option — consistent with FR-005's explicit empty-state requirement.

**Rationale**: The spec names seven categories explicitly (hospo, cleaning, construction, warehouse, aged-care, jobs-general, community) as a known minimum set. A fixed list (rather than deriving categories only from whatever happens to be in the data file) guarantees the filter UI is stable even before every category has a seeded group, and matches the existing `data/categories.ts` convention already used for guides.

**Alternatives considered**:
- Deriving the filter list purely from `Set(groups.map(g => g.category))` — simpler, but would silently drop a category's filter option if its last group entry were ever removed, which is a worse UX regression than a fixed list.

## R5. `data/groups.ts` schema & typing

**Decision**: A single `Group` interface with a `GroupPlatform = "whatsapp" | "telegram" | "facebook"` union and `category: GroupCategory` (from R4), matching the constitution's Content Model Compliance section field-for-field: `id`, `name`, `platform`, `category`, `city`, `link`, `description`, `verified: boolean`, `lastVerified: string` (ISO `YYYY-MM-DD`, same convention as guides' `lastUpdated`). No `zod` or runtime schema validation — the array is hand-authored TypeScript, so the compiler is the schema gate (same approach as `data/checklist.ts`/`data/categories.ts`, no precedent for a validation library on these small hand-written arrays).

**Rationale**: Consistent with existing typed-data-file conventions already in the repo; a compile-time interface is sufficient because there's no untrusted input or file-based content pipeline here (unlike guides' MDX, which does warrant a runtime `parseFrontmatter` throw). Every field from the constitution's schema is present with no additions or omissions.

**Alternatives considered**:
- Runtime validation (zod) for `data/groups.ts` — unnecessary; the file is authored directly in TypeScript, so a missing/malformed field is already a compile error, not a runtime risk.

## R6. `lastVerified` date display

**Decision**: Reuse the existing `FreshnessDate`-style formatting (`Intl.DateTimeFormat("en-AU")`, wrapped in a semantic `<time dateTime>`), either by importing the existing `components/guides/FreshnessDate.tsx` directly or lifting its formatter into a shared location if the wording "Updated {date}" doesn't fit the groups context (label becomes "Last verified {date}" for unverified entries, or folded into the badge for verified ones).

**Rationale**: One formatting source avoids date-format drift between guides and groups (both are freshness signals per constitution II). `Intl` needs no new dependency.

**Alternatives considered**:
- A separate ad-hoc date formatter for groups — duplicate logic for the same underlying requirement (constitution's freshness-field display), rejected to avoid drift.
