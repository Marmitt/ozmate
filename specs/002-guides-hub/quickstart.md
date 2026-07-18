# Quickstart Validation: Guides Hub

Runnable scenarios proving the feature works end-to-end. See [contracts/routes.md](./contracts/routes.md) for page guarantees and [data-model.md](./data-model.md) for the schema.

## Prerequisites

```bash
npm install        # picks up next-mdx-remote + @tailwindcss/typography
npm run dev        # http://localhost:3000
```

## 1. Browse path (User Story 2)

1. Open `http://localhost:3000/guides` at ~380px viewport (device toolbar).
2. Expect: all seven categories visible; seeded categories are tappable; empty ones show an ochre "Coming soon" chip and aren't links.
3. Tap a live category → listing shows each guide's title, summary, and "Updated …" date, in editorial order.
4. Tap a guide → article page. Verify back-navigation links to the category and hub work.

## 2. Read a guide (User Story 1)

1. Open a seeded guide directly by URL, e.g. `http://localhost:3000/guides/transport/opal-card`.
2. Expect at 380px, without scrolling: title, summary, "Updated …" date.
3. Scroll to the end: Sources section lists the frontmatter `sources[]` as working external links.
4. View page source / dev tools: `<title>` is `<Guide title> | OZMate`; meta description equals the frontmatter summary.

## 3. Freshness display (User Story 3)

1. On the category listing and the guide page, confirm the same `lastUpdated` date appears in both places (SC-002).

## 4. Fail-loudly validation (FR-004)

```bash
# Break a guide on purpose: set `category: bikes` (unknown) in any seed guide's frontmatter
npm run build      # EXPECT: build fails, error names the file and the bad field
git checkout -- content/   # restore
```

## 5. Publish-without-code-changes (FR-011)

1. Add `content/guides/housing/test-guide.mdx` with valid frontmatter (copy a seed guide's shape) and a short body.
2. `npm run build && npm run start` → `/guides/housing/test-guide` exists; housing listing shows it; if housing was previously empty, its hub card is now live.
3. Delete the test file afterwards.

## 6. Not-found behaviour (FR-008)

1. Visit `/guides/transport/nope` and `/guides/bikes` → both show the not-found page with working links back to `/guides` and `/`.

## 7. Offline (FR-010)

1. `npm run build && npm run start` (service worker registers on production builds).
2. Visit a guide page, then in dev tools → Network, set Offline and reload → page still renders.

## 8. Automated checks

```bash
npm run test       # includes tests/unit/guides/ (frontmatter validation, loader sorting)
npm run typecheck
npm run lint
npm run build      # zero frontmatter errors across all seed content
```

## 9. Quality gate (SC-003)

Run Lighthouse (mobile) against `/guides`, one category page, one guide page on the production build: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90.
