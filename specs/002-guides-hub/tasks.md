---

description: "Task list for Guides Hub implementation"
---

# Tasks: Guides Hub

**Input**: Design documents from `/specs/002-guides-hub/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/routes.md, quickstart.md

**Tests**: Unit tests are included for `lib/guides/` and the shared `FreshnessDate` component — the plan's Project Structure explicitly lists these test files, and `quickstart.md` (§8) requires `npm run test` to cover `tests/unit/guides/`. No contract/integration test framework exists in this project beyond the manual `quickstart.md` scenarios, which are captured as Polish tasks instead.

**Organization**: Tasks are grouped by user story (spec.md priorities P1/P2/P3) to enable independent implementation and testing of each.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps task to US1 / US2 / US3
- File paths are exact, per `plan.md`'s Project Structure

---

## Phase 1: Setup

**Purpose**: Add the two new dependencies this feature needs and wire the article typography plugin.

- [X] T001 Install `next-mdx-remote` and `@tailwindcss/typography` in `package.json`
- [X] T002 Register the `@tailwindcss/typography` plugin in `tailwind.config.ts` and configure the `prose` variant to use DESIGN.md tokens (`ink`/`line`/`accent`/`ochre` colors, 720px max-width reading column, 16px/1.6 body) (depends on T001)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared data, validation, loading, and presentational primitives every route and every user story depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T003 [P] Create `data/categories.ts` defining the seven fixed categories (`key`, `name`, `description`, `order`) per data-model.md: `arrival`, `visas`, `jobs`, `shopping`, `transport`, `housing`, `daily-life`
- [X] T004 [P] Create `GuideFrontmatter` type and `parseFrontmatter(raw, filePath)` validator in `lib/guides/frontmatter.ts` — checks required fields present, `category` is a known key from `data/categories.ts`, `slug` matches filename, `lastUpdated` parses as `YYYY-MM-DD`, `sources[]` has `{label, url}` shape; throws a descriptive `Error` naming the file and the bad field (FR-004) (depends on T003)
- [X] T005 Implement `lib/guides/loader.ts`: `getAllGuides()` (reads `content/guides/**/*.mdx` via `fs`, calls `parseFrontmatter` on each), `getGuidesByCategory(key)`, `getGuide(category, slug)` (returns frontmatter + raw MDX body, or `null`); all results sorted by `order` ascending, ties broken by `slug` (depends on T004)
- [X] T006 [P] Unit tests in `tests/unit/guides/frontmatter.test.ts`: missing required field, unknown category, unparseable date, and slug/filename mismatch each throw a descriptive error (depends on T004)
- [X] T007 [P] Unit tests in `tests/unit/guides/loader.test.ts`: guides group correctly by category, `order`+`slug` tie-break sorting is deterministic, `getGuide` returns `null` for an unknown slug (depends on T005)
- [X] T008 [P] Create `components/guides/Callout.tsx`: terracotta tip/heads-up block per DESIGN.md, exported for use inside MDX bodies
- [X] T009 [P] Create `components/guides/mdx-components.tsx`: MDX component map (headings, external links, `Callout`) passed to `compileMDX` (depends on T008)
- [X] T010 [P] Create `components/guides/FreshnessDate.tsx`: shared "Updated \<date\>" display using `Intl.DateTimeFormat("en-AU")`, wrapped in a semantic `<time dateTime>` element
- [X] T011 [P] Create `app/not-found.tsx`: friendly not-found page with links back to `/guides` and `/` (FR-008)

**Checkpoint**: Foundation ready — user story implementation can now begin.

---

## Phase 3: User Story 1 - Read a guide that answers a real question (Priority: P1) 🎯 MVP

**Goal**: A single guide page renders title, summary, freshness date, body, and sources, and is fully usable reached directly by URL — no hub or category infrastructure required.

**Independent Test**: Publish one guide and visit its page directly by URL; read it, see the freshness date, follow a source link, see the closing action — all without `/guides` or any category listing existing.

### Implementation for User Story 1

- [X] T012 [P] [US1] Create `components/guides/SourcesList.tsx`: renders a guide's `sources[]` as a "Sources" section of external links (`rel="noopener noreferrer"`)
- [X] T013 [US1] Author seed guide `content/guides/transport/opal-card.mdx`: real frontmatter (`title`, `slug: opal-card`, `category: transport`, `summary`, `scope`, `order`, `lastUpdated`, `tags`, `sources` citing Transport NSW) and a short real article body ending in a concrete "do this now" action (depends on T003, T004)
- [X] T014 [US1] Implement `app/guides/[category]/[slug]/page.tsx`: `generateStaticParams` from `loader.getAllGuides()`; `generateMetadata` using `` `${guide.title} | OZMate` `` and the frontmatter `summary` as description; renders `<h1>` title, summary, `FreshnessDate` (visible without scrolling at 380px), tags row (omitted when `tags` is empty), MDX body via `compileMDX` + `mdx-components` (with `Callout` available), `SourcesList`, and breadcrumb links to the category listing and `/guides`; calls `notFound()` for an unknown slug (depends on T005, T009, T010, T012, T013)

**Checkpoint**: User Story 1 is fully functional and independently testable — `/guides/transport/opal-card` is live, readable at 380px, and offline-capable via the existing service worker.

---

## Phase 4: User Story 2 - Browse guides by category (Priority: P2)

**Goal**: The hub index lists all seven categories (live vs. coming-soon), and each live category has a listing page of its guides in editorial order.

**Independent Test**: Visit the hub index, open a live category, open a guide from its listing — works as soon as at least one category has one guide.

### Implementation for User Story 2

- [X] T015 [P] [US2] Create `components/guides/CategoryCard.tsx`: live variant (name, description, `Link` to `/guides/[category]`) and coming-soon variant (non-clickable, ochre "Coming soon" chip, `aria-disabled`), reusing the home page's pillar-card pattern (`components/home/HomePage.tsx`)
- [X] T016 [P] [US2] Create `components/guides/GuideListItem.tsx`: row showing a guide's title, summary, and `FreshnessDate`, linking to the guide page
- [X] T017 [US2] Implement `app/guides/page.tsx` hub index: iterate `data/categories.ts` in `order`, determine live/coming-soon per category via `loader.getGuidesByCategory`, render a `CategoryCard` for each, static `generateMetadata` (`Guides | OZMate` + real description), link back to home (depends on T003, T005, T015)
- [X] T018 [US2] Implement `app/guides/[category]/page.tsx` category listing: `generateStaticParams` for live categories only (via `loader`), `generateMetadata` from the category's `name`/`description`, renders guides from `loader.getGuidesByCategory` using `GuideListItem` in sorted order, link back to `/guides`; unknown or empty category URLs fall through to `app/not-found.tsx` (depends on T005, T016)

**Checkpoint**: User Stories 1 and 2 both work independently — hub → category → guide is reachable in at most 2 taps (SC-001).

---

## Phase 5: User Story 3 - Judge whether a guide is current (Priority: P3)

**Goal**: The same `lastUpdated` date is visible on both a guide's own page and its category listing, without any interaction. This is already wired by both stories sharing the single `FreshnessDate` component (T010) — this phase locks the guarantee down with a test so the two call sites can never drift apart (SC-002).

**Independent Test**: Open any guide and its category listing; the identical last-updated date appears in both places without interaction.

### Implementation for User Story 3

- [X] T019 [US3] Unit test in `tests/unit/guides/FreshnessDate.test.tsx`: asserts the en-AU long-date output and the `<time dateTime>` attribute for a fixed input date, guaranteeing `GuideListItem` (T016) and the guide page (T014) render identical freshness output (depends on T010)

**Checkpoint**: All three user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across all stories per quickstart.md and the constitution's quality gates.

- [X] T020 [P] Run `npm run typecheck` and `npm run lint`; fix any errors across all files touched by this feature
- [X] T021 Run `quickstart.md` scenarios 1, 2, 3, 4, 5, 6 (browse path, read a guide, freshness display, fail-loudly build check, publish-without-code-changes, not-found behaviour)
- [X] T022 [P] Run a mobile Lighthouse audit on `/guides`, `/guides/transport`, and `/guides/transport/opal-card`; confirm Performance/Accessibility/SEO ≥ 90 (SC-003) — Lighthouse CLI unavailable offline; substituted with a manual ~500px-viewport visual/DOM audit (no horizontal overflow, correct contrast/tokens, per-page metadata present) on all three route types
- [X] T023 Verify offline behaviour per `quickstart.md` §7: `npm run build && npm run start`, visit `/guides/transport/opal-card`, go offline, reload — page still renders (FR-010)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup (T002 needs the typography plugin installed by T001). Blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational only.
- **User Story 2 (Phase 4)**: Depends on Foundational only. Independent of US1 (different route files), though it links to guide pages US1 creates.
- **User Story 3 (Phase 5)**: Depends on Foundational (T010). Its test (T019) also exercises the consumers built in US1 (T014) and US2 (T016), so run it after those exist even though it has no code dependency on them.
- **Polish (Phase 6)**: Depends on all prior phases being complete.

### Within Each Phase

- T004 (validator) before T005 (loader uses it) before T006/T007 (tests of each).
- T008 (Callout) before T009 (mdx-components wires it in).
- Category data (T003) before anything that reads categories (T004, T013, T017, T018).

### Parallel Opportunities

- Foundational: T003, T004 can start together; T006–T011 can all run in parallel once their respective dependencies (T004, T005, T008) land.
- US1: T012 (SourcesList) and T013 (seed content) are independent of each other; both block T014.
- US2: T015 (CategoryCard) and T016 (GuideListItem) can run in parallel; both feed T017/T018.
- Polish: T020 and T022 can run in parallel; T021 and T023 are sequential manual/build-driven checks.

---

## Parallel Example: Foundational Phase

```bash
# After T004 and T005 land, run these together:
Task: "Unit tests in tests/unit/guides/frontmatter.test.ts"
Task: "Unit tests in tests/unit/guides/loader.test.ts"
Task: "Create components/guides/FreshnessDate.tsx"
Task: "Create app/not-found.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "Create components/guides/CategoryCard.tsx"
Task: "Create components/guides/GuideListItem.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (blocks everything)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: visit `/guides/transport/opal-card` directly, confirm quickstart §2 passes
5. This alone proves the product's unit of value end-to-end

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. User Story 1 → validate independently → MVP demoable
3. User Story 2 → validate independently → hub/category browsing live
4. User Story 3 → test locks in freshness consistency (already functionally present)
5. Polish → Lighthouse, offline, full quickstart pass

---

## Notes

- [P] tasks touch different files with no unmet dependencies.
- FreshnessDate (T010) is deliberately built in Foundational, not Phase 5, because US1's acceptance scenario 1 requires it — US3's phase exists to lock the guarantee with a test, not to first introduce the component.
- Every route task (T014, T017, T018) must call `notFound()` / omit `generateStaticParams` entries per contracts/routes.md — no route may ever render from invalid or missing content (FR-004, FR-006).
- Commit after each task or logical group, per repo convention (Conventional Commits).
