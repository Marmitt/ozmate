# Quickstart Validation: Group Directory

Runnable scenarios proving the feature works end-to-end. See [contracts/routes.md](./contracts/routes.md) for page guarantees and [data-model.md](./data-model.md) for the schema.

## Prerequisites

```bash
npm install        # no new packages required for this feature
npm run dev        # http://localhost:3000
```

## 1. Browse all groups (User Story 1)

1. Open `http://localhost:3000/groups` at ~380px viewport (device toolbar).
2. Expect: every seeded entry renders with name, platform, category, description, and verification status; entries are grouped/labeled by category.
3. Confirm no entry shows a "verified" badge unless `data/groups.ts` explicitly sets `verified: true` for it (there should be none in the seed data — see step 6).

## 2. Filter by category (User Story 2)

1. On `/groups`, select a single category (e.g. "Construction").
2. Expect: only entries with that category remain visible, with no page reload/navigation.
3. Clear the filter (select "All") → every entry reappears.
4. Select a category with zero seeded entries (if any) → expect an explicit empty state, not a blank area.

## 3. Report a dead or dodgy link (User Story 3)

1. On any group entry, activate "report a dead or dodgy link".
2. Expect: the default email client opens a new message addressed to the fixed OZMate contact address, with the group's name/id identifiable in the subject or body.

## 4. Empty directory state (Edge Case, FR-006)

```bash
# Temporarily empty the array to verify the empty state, then restore:
# edit data/groups.ts, set: export const groups: Group[] = [];
npm run dev
# Visit /groups → expect an explicit "No groups available yet" message.
git checkout -- data/groups.ts   # restore seed data
```

## 5. Verified-flag safety check (constitution IV, FR-011)

```bash
grep -c "verified: true" data/groups.ts
# EXPECT: 0 — this feature must not ship any entry pre-marked verified.
```

## 6. Schema conformance (FR-009, SC-003)

```bash
npm run test       # includes tests/unit/groups/ (schema conformance, filtering)
npm run typecheck  # a missing/malformed field in data/groups.ts fails here
npm run lint
npm run build
```

## 7. Quality gate (constitution V)

Run Lighthouse (mobile) against `/groups` on the production build: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90.
