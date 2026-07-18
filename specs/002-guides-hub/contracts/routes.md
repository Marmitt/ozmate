# Route Contracts: Guides Hub

The feature's external interface is its URLs and the guarantees each page makes. All routes are statically generated at build time.

## `GET /guides` — Hub index

- **Renders**: page `<h1>`, intro line, all seven categories in `order` from `data/categories.ts`.
- **Live category card**: name, description, link to `/guides/[category]`.
- **Empty category card**: name, description, "Coming soon" chip (ochre, matching home page pattern), not a link, `aria-disabled`.
- **Metadata**: static title `Guides | OZMate` + real meta description.
- **Navigation**: link back to home.

## `GET /guides/[category]` — Category listing

- **Params generated for**: live categories only (≥ 1 guide).
- **Renders**: category name + description, guides sorted by `order` (ties → slug alphabetical), each row showing title, summary, and `lastUpdated` date, linking to the guide page.
- **Metadata**: title `<Category name> | OZMate`, description from category description.
- **Navigation**: link back to `/guides`.
- **Unknown/empty category URL** → 404 not-found page.

## `GET /guides/[category]/[slug]` — Guide page

- **Params generated for**: every valid MDX file under `content/guides/`.
- **Renders**:
  - `<h1>` title, summary, `lastUpdated` visible without scrolling at 380px (as `<time dateTime>`).
  - MDX body in the 720px token-styled reading column; `Callout` component available to content.
  - Tags row when `tags` non-empty; omitted entirely when empty.
  - Sources section listing every `sources[]` entry as an external link (`rel="noopener noreferrer"`).
- **Metadata**: title `<Guide title> | OZMate`, description = frontmatter `summary`.
- **Navigation**: breadcrumb/back links to the category listing and `/guides`.
- **Unknown slug** → 404 not-found page.

## `GET /<anything-unmatched>` — Not-found page

- **Renders**: friendly message + links to `/guides` and `/` (FR-008). Uses root `app/not-found.tsx`.

## Cross-cutting guarantees

- Every page above works at ~380px width with no horizontal scroll (SC-006).
- Every page is reachable by direct URL and previously visited pages load offline via the existing service worker (FR-009, FR-010).
- Build fails (non-zero exit) if any MDX file has invalid frontmatter — no route is ever generated from bad content (FR-004).
- Adding `content/guides/<category>/<slug>.mdx` with valid frontmatter is sufficient to publish: the new guide appears on its category listing and gets its own page on next build with no code changes (FR-011).
