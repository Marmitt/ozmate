# Data Model: Guides Hub

Schemas mirror the constitution's Content Model Compliance section and spec doc §B4 exactly. No fields added or dropped.

## Guide

One MDX file per guide at `content/guides/<category>/<slug>.mdx`. Frontmatter is the typed record; the MDX body is the article content.

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `title` | string | yes | Non-empty. Page `<h1>` and `<title>`. |
| `slug` | string | yes | URL segment; must equal the filename (sans `.mdx`); lowercase kebab-case. |
| `category` | enum | yes | One of the seven category keys (below). Must equal the parent directory name. Unknown value → build fails. |
| `summary` | string | yes | 1–2 lines. Shown in listings; used as meta description. |
| `scope` | enum | yes | `national` \| `sydney`. Default `national` if omitted. |
| `order` | number | yes | Sort within category, ascending. Ties broken by slug (alphabetical) for deterministic order. |
| `lastUpdated` | date | yes | `YYYY-MM-DD`. Displayed on guide page + category listing. Must update on substantive content change (constitution II). |
| `tags` | string[] | yes | May be empty `[]`; page renders without a tags area when empty. |
| `sources` | { label: string, url: string }[] | yes | Authoritative links. Rendered as the guide's Sources section. May not be empty for visa/legal/financial-topic guides (editorial rule, checked in review). |

**Validation** (`lib/guides/frontmatter.ts`): every rule above that is mechanically checkable (required fields present, category known, slug/filename match, date parses, sources shape) throws a descriptive error naming file and field → `next build` fails (FR-004).

## Category

Typed static data in `data/categories.ts`. Fixed set of seven; changing it is a content-model amendment, not feature work.

| Field | Type | Rules |
|-------|------|-------|
| `key` | enum | `arrival` \| `visas` \| `jobs` \| `shopping` \| `transport` \| `housing` \| `daily-life`. Doubles as the URL segment and the content subdirectory name. |
| `name` | string | Display name, e.g. "Arrival essentials". |
| `description` | string | One line for the hub index card and the category page meta description. |
| `order` | number | Display order on the hub index (A–G order from spec doc §A3). |

## Relationships

- **Category 1 → 0..n Guide**: a guide belongs to exactly one category via `category` key; the loader groups guides by category and sorts by `order`, then slug.
- **Guide → 1..n Source**: embedded array, no independent lifecycle.

## Derived states

- **Category "live"**: has ≥ 1 guide file. Live categories are clickable on the hub and get a static listing page.
- **Category "coming soon"**: zero guide files. Rendered as a non-clickable marked card on the hub; no listing page generated (URL → not-found).

## Loader contract (`lib/guides/loader.ts`)

- `getAllGuides()` — reads `content/guides/**/*.mdx`, validates all frontmatter, returns guides sorted by category then order.
- `getGuidesByCategory(key)` — sorted guides for one category.
- `getGuide(category, slug)` — one guide's frontmatter + raw MDX body, or null (caller triggers not-found).
- All functions are build-time only (fs access); no client bundle inclusion.
