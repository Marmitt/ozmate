# Route Contracts: Group Directory

The feature's external interface is its URL and the guarantees the page makes. The route is statically generated at build time; all interactivity (category filter) happens client-side within the single page.

## `GET /groups` — Group directory

- **Renders**: page `<h1>`, intro line, a category filter control (including an "All" option that is the default/reset state), and the list of group entries.
- **Each group entry (`GroupCard`)**: name, platform (icon/label), category, description, `VerifiedBadge` (only when `verified === true`), `lastVerified` date, and a "report a dead or dodgy link" action.
- **Filtering (client-side, no reload)**:
  - Selecting a category shows only entries with a matching `category`.
  - Selecting "All" (or clearing the filter) restores every entry.
  - A category with zero matching entries shows an explicit empty state ("No groups in this category yet") rather than a blank area.
- **Zero-entries state**: if `data/groups.ts` is empty, the page shows an explicit "No groups available yet" message instead of an empty list or error.
- **Report action**: a `mailto:` anchor per entry, addressed to a fixed OZMate contact address, with the entry's `name`/`id` pre-filled into the subject/body.
- **Broken/missing `link`**: the card still renders fully (name, category, description, report action); the join/invite action degrades gracefully (e.g. omitted or disabled) instead of linking to an empty/malformed URL.
- **Metadata**: static title `Groups | OZMate` + a real meta description describing the Sydney job-group directory.
- **Navigation**: link back to home.

## Cross-cutting guarantees

- The page works at ~380px width with no horizontal scroll.
- The page is reachable by direct URL and, once visited, loads offline via the existing service worker (same runtime-caching mechanism already covering `/guides`).
- Category filtering never triggers a full page navigation or reload (SC-005).
- No group entry is ever rendered with `verified: true` unless that value was explicitly set by a human in `data/groups.ts` — this feature's own seed data ships with every entry `verified: false` (constitution IV, FR-011).
