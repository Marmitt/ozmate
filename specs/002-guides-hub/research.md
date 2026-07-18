# Phase 0 Research: Guides Hub

All Technical Context unknowns resolved. Decisions below.

## R1. MDX rendering approach

**Decision**: `next-mdx-remote` v5 (`next-mdx-remote/rsc` → `compileMDX`) reading files from `content/guides/` with Node `fs` at build time, combined with `generateStaticParams` on both dynamic routes for full static generation. Frontmatter parsed via `compileMDX`'s `parseFrontmatter: true` (no separate gray-matter dependency).

**Rationale**: The constitution mandates content in `content/guides/` separate from `app/` routes, which rules out file-convention MDX routing. `next-mdx-remote`'s RSC API is the standard way to render repo-committed MDX from an arbitrary directory in App Router, adds one dependency, ships zero client-side JS for article bodies, and its built-in frontmatter parsing keeps the dependency count down. Server-only usage at build time preserves static-first (constitution I).

**Alternatives considered**:
- `@next/mdx` — file-based: MDX files would have to live inside `app/`, violating the components/content separation rule.
- Contentlayer — effectively unmaintained; risky for a solo 6-week build.
- Velite / Content Collections — heavier build-pipeline abstractions than a ~15-article site needs ("fast, good-enough" working style).

## R2. Frontmatter validation (FR-004 "fail loudly")

**Decision**: Hand-rolled typed validator in `lib/guides/frontmatter.ts`: a `GuideFrontmatter` interface matching constitution §B4 exactly, plus a `parseFrontmatter(raw, filePath)` function that throws a descriptive `Error` (naming the file and field) on any missing/invalid required field or unknown category. Called in the loader, so `next build` fails when content is bad.

**Rationale**: One schema, seven enum values — a zod dependency isn't warranted. Throwing during `generateStaticParams`/page build makes `next build` exit non-zero, which is exactly the "reject loudly at publish time" behaviour FR-004 requires, with no separate lint step to forget.

**Alternatives considered**:
- Zod — fine choice, but an extra dependency for one small schema; hand-rolled is equally type-safe here and matches the dep-light working style.
- Separate CI validation script — a second place to maintain the schema; build-time throw covers CI automatically since CI runs `next build`.

## R3. Article body typography

**Decision**: `@tailwindcss/typography` plugin; article bodies wrapped in a `prose` class customised to DESIGN.md tokens (ink/line/accent/ochre colors, 720px reading column, 16px/1.6 body per DESIGN.md §3/§5).

**Rationale**: MDX output is arbitrary HTML (headings, lists, tables); styling it element-by-element by hand is exactly the busywork the plugin eliminates. Official Tailwind plugin, zero runtime cost, themeable to the token variables in one place.

**Alternatives considered**:
- Hand-written global CSS for article HTML — more code to maintain, easy to miss elements (blockquotes, nested lists), no upside.
- Styling via MDX component map only — the map is still needed for `Callout`/links, but covering every HTML element through it is verbose; the plugin handles the long tail.

## R4. Offline support (FR-010)

**Decision**: No changes. The existing service worker (`public/sw.js`) already runtime-caches every successful GET and serves cache on network failure, so any visited guide page (and its static assets) works offline.

**Rationale**: Verified the current implementation is a cache-then-network runtime cache keyed by request — new routes are covered automatically. Matches the spec assumption ("existing offline shell mechanism is extended… no new offline behaviour").

**Alternatives considered**:
- Precaching all guide pages at install — nicer offline story but adds build-manifest complexity; out of scope per spec assumptions.

## R5. Empty-category treatment (FR-006)

**Decision**: `data/categories.ts` defines all seven categories statically. The hub index renders every category; those with zero guides render as a non-clickable "Coming soon" card reusing the home page's ochre-chip pattern. Category routes only generate static params for non-empty categories, so an empty category's URL falls through to the not-found page (which links back to the hub).

**Rationale**: Matches the spec's documented assumption (show the full content backbone) and reuses an existing, already-styled UI pattern. Generating listing pages only for non-empty categories means no route can ever render an empty list.

**Alternatives considered**:
- Generating "coming soon" pages for empty category URLs — slightly friendlier for guessed URLs, but adds a page state nobody links to; not-found + hub link covers it (edge case in spec handled either way).

## R6. Date display

**Decision**: `lastUpdated` stored as `YYYY-MM-DD` in frontmatter, rendered as "Updated 12 July 2026" (en-AU long date) via a shared `FreshnessDate` component using `Intl.DateTimeFormat("en-AU")` at build time, wrapped in a semantic `<time dateTime>` element.

**Rationale**: One component guarantees listing and article pages can't drift (SC-002); `Intl` needs no dependency; en-AU format matches the audience; `<time>` aids SEO/accessibility.

**Alternatives considered**:
- Relative dates ("3 weeks ago") — decays instantly on a static site between deploys; absolute dates are the honest freshness signal the constitution treats as load-bearing.
- A date library (date-fns) — unnecessary for formatting one field.

## R7. Per-page metadata (FR-007)

**Decision**: `generateMetadata` on all three routes: hub uses static copy; category pages derive title/description from the category's name + description; guide pages use frontmatter `title` and `summary` (spec doc §B4 says summary doubles as the meta description). Titles follow the existing `… | OZMate` pattern.

**Rationale**: Native App Router mechanism, statically resolved, zero dependencies; frontmatter-driven so publishing a guide automatically publishes correct SEO metadata (FR-011).

**Alternatives considered**: none needed — this is the platform default.
