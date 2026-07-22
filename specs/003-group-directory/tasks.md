---

description: "Task list for Group Directory implementation"
---

# Tasks: Group Directory

**Input**: Design documents from `/specs/003-group-directory/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/routes.md, quickstart.md

**Tests**: Unit tests are included for `data/groups.ts` schema conformance and `GroupsPage` filtering behavior — the plan's Project Structure explicitly lists `tests/unit/groups/`, and `quickstart.md` (§6) requires `npm run test` to cover it. No contract/integration test framework exists in this project beyond the manual `quickstart.md` scenarios, which are captured as Polish tasks instead.

**Organization**: Tasks are grouped by user story (spec.md priorities P1/P2/P3) to enable independent implementation and testing of each.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps task to US1 / US2 / US3
- File paths are exact, per `plan.md`'s Project Structure

---

## Phase 1: Setup

**Purpose**: Confirm this feature needs no new dependencies before implementation starts.

- [X] T001 Confirm no new npm dependencies are required (research.md R1/R3): category filtering uses local React state and the report action is a plain `mailto:` anchor; the existing Tailwind CSS, Vitest, and Testing Library setup already covers this feature

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared data schema, category list, and the verified-badge primitive every user story depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T002 [P] Create `lib/groups/categories.ts`: define the `GroupCategory` union (`hospo` | `cleaning` | `construction` | `warehouse` | `aged-care` | `jobs-general` | `community`), a `groupCategories` array of `{ key, label }` per data-model.md, and a `getCategoryLabel(key)` helper (mirrors the existing `data/categories.ts` convention; FR-013)
- [X] T003 Create `data/groups.ts`: define the `GroupPlatform` union (`whatsapp` | `telegram` | `facebook`) and the `Group` interface (`id`, `name`, `platform`, `category: GroupCategory`, `city`, `link`, `description`, `verified: boolean`, `lastVerified: string`) matching data-model.md exactly; seed a small set of real Sydney group entries spanning multiple categories — **every entry MUST have `verified: false` and a valid `lastVerified` date** (constitution IV, FR-011, FR-012) (depends on T002)
- [X] T004 [P] Unit test `tests/unit/groups/groups-data.test.ts`: asserts every entry in `groups` has all required fields populated (`city` and `lastVerified` never empty/missing), and asserts **zero** entries have `verified: true` — this is the trust-rule guardrail for FR-011/FR-012 and must fail loudly if violated (depends on T003)
- [X] T005 [P] Create `components/groups/VerifiedBadge.tsx`: pill badge per DESIGN.md's "Verified badge (group directory)" token spec (`--accent-soft` fill, `--accent-deep` text, pill radius 999, padding 4/10, weight 700); renders only when passed `verified === true` (no fallback "unverified" badge — see research.md R2)

**Checkpoint**: Foundation ready — user story implementation can now begin.

---

## Phase 3: User Story 1 - Browse vetted job groups by category (Priority: P1) 🎯 MVP

**Goal**: `/groups` renders every seeded entry with name, platform, category, description, and verification status, grouped/labeled by category (FR-001, FR-002, FR-003).

**Independent Test**: Visit `/groups` with no filter interaction and confirm every seeded entry renders correctly, grouped/labeled by category, with unverified entries visible (not hidden) and verified entries showing the badge.

### Implementation for User Story 1

- [X] T006 [P] [US1] Create `components/groups/GroupCard.tsx`: renders one entry's name, platform label, category, description, and `VerifiedBadge` (only when `verified === true`); a missing/malformed `link` MUST NOT break the card — the join/invite action is omitted or disabled instead (Edge Cases) (depends on T005)
- [X] T007 [US1] Create `components/groups/GroupsPage.tsx` (`"use client"`): imports `groups` from `data/groups.ts`, renders entries grouped/labeled by `category` via `GroupCard` (Acceptance Scenario 2); renders an explicit "No groups available yet" state when `groups.length === 0` (FR-006) (depends on T006, T003)
- [X] T008 [US1] Implement `app/groups/page.tsx`: static `generateMetadata` (title `Groups | OZMate` + a real meta description describing the Sydney job-group directory), renders `GroupsPage`, link back to home (depends on T007)

**Checkpoint**: User Story 1 is fully functional and independently testable — `/groups` lists every group correctly, with no filter or report action required yet.

---

## Phase 4: User Story 2 - Filter by category (Priority: P2)

**Goal**: Users can narrow the visible list to a single category and reset back to all (FR-004, FR-005).

**Independent Test**: On `/groups`, select a single category and confirm only matching entries remain; clear the filter and confirm all entries reappear; select a category with zero entries and confirm an explicit empty state.

### Implementation for User Story 2

- [X] T009 [US2] Create `components/groups/CategoryFilter.tsx`: renders a control (buttons or a select) listing `groupCategories` from `lib/groups/categories.ts` plus an "All" option; calls an `onChange(category | "all")` prop — has no knowledge of the groups data itself (depends on T002)
- [X] T010 [US2] Extend `components/groups/GroupsPage.tsx`: add `selectedCategory` state (`useState<GroupCategory | "all">("all")`), render `CategoryFilter` above the list, filter the rendered `groups` by `selectedCategory` when not `"all"` with no page reload (SC-005); render an explicit "No groups in this category yet" empty state when a specific category filter yields zero matches (FR-005) — distinct from the "no groups at all" state added in T007 (depends on T007, T009)

**Checkpoint**: User Stories 1 and 2 both work independently — browsing and filtering are both functional.

---

## Phase 5: User Story 3 - Report a dead or dodgy link (Priority: P3)

**Goal**: Every entry has a working "report a dead or dodgy link" action that identifies the group (FR-007).

**Independent Test**: On any group entry, activate "report a dead or dodgy link" and confirm the email client opens a message addressed to the fixed OZMate contact address, with the group's name/id identifiable in the subject or body.

### Implementation for User Story 3

- [X] T011 [P] [US3] Create `components/groups/ReportLinkAction.tsx`: renders an `<a href="mailto:...">` anchor to the fixed contact address — currently the placeholder `hello@ozmate.app` with a `// TODO: replace with real OZMate contact address before launch — see docs/pre-launch-checklist.md` comment at the address — with `subject`/`body` URL-encoded to include the group's `name` and `id` (FR-007)
- [X] T012 [US3] Extend `components/groups/GroupCard.tsx` to render `ReportLinkAction` for its entry (depends on T006, T011)

**Checkpoint**: All three user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across all stories per quickstart.md and the constitution's quality gates.

- [X] T013 [P] Unit test `tests/unit/groups/GroupsPage.test.tsx`: selecting a category filters the rendered list, clearing/selecting "All" restores every entry, selecting a category with zero entries shows its empty state, and (with a mocked/empty `groups` array) zero total entries shows the "no groups yet" state
- [X] T014 [P] Run `npm run typecheck` and `npm run lint`; fix any errors across all files touched by this feature
- [X] T015 Run `quickstart.md` scenarios 1–5 (browse all groups, filter by category, report a dead/dodgy link, empty directory state, verified-flag safety `grep` check)
- [X] T016 [P] Run a mobile Lighthouse audit on `/groups` (or a manual ~380px visual/DOM audit if the Lighthouse CLI is unavailable); confirm Performance/Accessibility/SEO ≥ 90 (constitution V)
- [X] T017 Verify offline behaviour: `npm run build && npm run start`, visit `/groups`, go offline, reload — page still renders via the existing service worker (contracts/routes.md cross-cutting guarantee)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup (informational only — no code dependency). Blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational only.
- **User Story 2 (Phase 4)**: Depends on Foundational and on US1's `GroupsPage.tsx` existing (T007) — it extends the same file rather than creating a new one, since filtering is additive behavior on the same page.
- **User Story 3 (Phase 5)**: Depends on Foundational and on US1's `GroupCard.tsx` existing (T006) — it extends the same file to add the report action per entry.
- **Polish (Phase 6)**: Depends on all prior phases being complete.

### Within Each Phase

- T002 (category list) before T003 (data file uses `GroupCategory`) before T004 (test of the data file).
- T005 (VerifiedBadge) before T006 (GroupCard uses it).
- T006 before T007 (GroupsPage renders GroupCard) before T008 (route renders GroupsPage).
- T009 before T010 (GroupsPage wires in CategoryFilter).
- T011 before T012 (GroupCard wires in ReportLinkAction).

### Parallel Opportunities

- Foundational: T002 and T005 can start together (independent files); T004 runs once T003 lands.
- US1: T006 is a prerequisite for T007/T008, so little true parallelism within the story once Foundational is done.
- US3: T011 can be built in parallel with US2's work (T009/T010) since it touches different files; only T012 needs to wait for both T006 (already done in US1) and T011.
- Polish: T013, T014, and T016 can run in parallel; T015 and T017 are sequential manual/build-driven checks.

---

## Parallel Example: Foundational Phase

```bash
Task: "Create lib/groups/categories.ts"
Task: "Create components/groups/VerifiedBadge.tsx"
```

## Parallel Example: User Story 3 alongside User Story 2

```bash
# Once Foundational + US1 are done, these can proceed at the same time:
Task: "Create components/groups/CategoryFilter.tsx"          # US2
Task: "Create components/groups/ReportLinkAction.tsx"        # US3
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (blocks everything)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: visit `/groups`, confirm quickstart §1 passes and no seed entry is `verified: true` (`grep -c "verified: true" data/groups.ts` → 0)
5. This alone proves the directory's core value — a newcomer can browse every vetted (or pending-vetting) group

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. User Story 1 → validate independently → MVP demoable (browse-only directory)
3. User Story 2 → validate independently → category filtering live
4. User Story 3 → validate independently → report action live
5. Polish → typecheck/lint, full quickstart pass, Lighthouse, offline check

---

## Notes

- [P] tasks touch different files with no unmet dependencies.
- US2 and US3 both extend files US1 creates (`GroupsPage.tsx`, `GroupCard.tsx`) rather than creating new ones — this is expected for a single-route feature with layered functionality, and each story remains independently testable/shippable in sequence (US1 alone is a valid MVP; adding US2 doesn't break US1; adding US3 doesn't break US1 or US2).
- The verified-flag safety check (T004, and re-run in T015 via quickstart §5) is the load-bearing guardrail for constitution IV — no task in this list ever sets `verified: true`, and the automated test exists specifically to catch a future accidental regression.
- `hello@ozmate.app` in T011 is a placeholder; the `TODO` comment and `docs/pre-launch-checklist.md` entry (already created) are what carries the "replace before launch" requirement forward from planning into code.
- Commit after each task or logical group, per repo convention (Conventional Commits).
