---

description: "Task list template for feature implementation"
---

# Tasks: First 30 Days Checklist

**Input**: Design documents from `/specs/001-first-30-days-checklist/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md (all present)

**Tests**: Included. `plan.md`'s Technical Context commits to Vitest + React Testing Library for the persistence/logic layer (per `research.md`'s testing decision) — those test tasks are treated as part of the design, not optional filler. Mobile/PWA/device criteria remain manual (`quickstart.md`), per constitution Principle V.

**Organization**: Tasks are grouped by user story (from `spec.md`, priorities P1-P4) to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US4)
- Exact file paths are included in every task

## Path Conventions

Single Next.js project at repository root, per `plan.md`'s Project Structure: `app/`, `data/`, `lib/checklist/`, `components/checklist/`, `tests/unit/checklist/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Stand up the Next.js project scaffold — none exists in this repository yet (per plan.md's noted pre-existing condition).

- [ ] T001 Initialize Next.js (App Router) + TypeScript project scaffold at repository root: `package.json`, `tsconfig.json`, `next.config.ts`, base `app/` directory
- [ ] T002 [P] Configure Tailwind CSS: `tailwind.config.ts`, `postcss.config.js`, `app/globals.css`
- [ ] T003 [P] Configure Vitest + React Testing Library: `vitest.config.ts`, `tests/setup.ts`, `test` script in `package.json`
- [ ] T004 [P] Configure ESLint + Prettier per project conventions: `.eslintrc.json`, `.prettierrc`
- [ ] T005 Add minimal offline-capable PWA setup sufficient to cache `/start` for the offline shell: `public/manifest.webmanifest` + service worker registration (depends on T001)

**Checkpoint**: Project builds and runs (`npm run dev`) with linting and test runner wired up.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data, storage, and routing that every user story depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T006 [P] Define `ChecklistItem` type and 2-3 placeholder items per group (Documents, Money, Phone, Transport, Health) in `data/checklist.ts`, per `contracts/checklist-data-contract.md` and spec.md FR-014 (placeholder-only content; external/official links only, per research.md)
- [ ] T007 [P] Define the fixed group display order and labels (`GROUP_ORDER`) in `lib/checklist/groups.ts`, per research.md's group-ordering decision
- [ ] T008 [P] Implement the persistence module (`readCompletedIds`, `toggleItem`, `filterToKnownIds`) in `lib/checklist/storage.ts`, per `contracts/storage-contract.md`
- [ ] T009 [P] Unit tests for the persistence module — read/write/toggle, stale-id filtering, storage-unavailable fallback — in `tests/unit/checklist/storage.test.ts` (depends on T008)
- [ ] T010 Create minimal root layout (`app/layout.tsx`): global stylesheet import, manifest link, base metadata (depends on T001-T005)
- [ ] T011 Create the `/start` route shell (`app/start/page.tsx`) ready to render the checklist (depends on T010)

**Checkpoint**: Data, persistence, and routing exist and are tested — user story implementation can now begin.

---

## Phase 3: User Story 1 - Scan the essentials at a glance (Priority: P1) 🎯 MVP

**Goal**: A first-time visitor loading `/start` sees checklist items grouped by theme, in stable order, fully legible at ~380px, all unchecked.

**Independent Test**: Load `/start` on a fresh browser/device (no prior storage state) and confirm groups/items render in a clear, legible, stable order at ~380px width — delivers value before any interaction happens.

### Implementation for User Story 1

- [ ] T012 [P] [US1] Implement `ChecklistItemRow` display (title, "what & why" detail, non-interactive checkbox indicator) in `components/checklist/ChecklistItemRow.tsx` (depends on T006)
- [ ] T013 [US1] Implement `ChecklistGroup` rendering a group heading + its items in `order` sequence in `components/checklist/ChecklistGroup.tsx` (depends on T012)
- [ ] T014 [US1] Implement `ChecklistPage` assembling groups in `GROUP_ORDER` sequence from `data/checklist.ts` in `components/checklist/ChecklistPage.tsx` (depends on T007, T013)
- [ ] T015 [US1] Wire `app/start/page.tsx` to render `<ChecklistPage />` (depends on T011, T014)
- [ ] T016 [US1] Apply mobile-first (~380px) styling across checklist components — spacing, text wrapping, no horizontal scroll (depends on T012, T013, T014)
- [ ] T017 [P] [US1] Component test: `/start` renders all groups/items in stable order, all items initially unchecked, in `tests/unit/checklist/ChecklistPage.test.tsx` (depends on T014)

**Checkpoint**: User Story 1 is fully functional and testable independently — the checklist is scannable, even with no interactivity yet.

---

## Phase 4: User Story 2 - Track progress across visits (Priority: P2)

**Goal**: Checking/unchecking an item updates immediately and survives reloads and full browser restarts on the same device; storage-unavailable cases degrade gracefully.

**Independent Test**: Check a subset of items, reload (and fully close/reopen the browser), and confirm the same items remain checked — independent of any other story.

### Implementation for User Story 2

- [ ] T018 [US2] Initialize `ChecklistPage`'s checked-state on mount from `storage.readCompletedIds()` filtered through `storage.filterToKnownIds()` in `components/checklist/ChecklistPage.tsx` (depends on T008, T014)
- [ ] T019 [US2] Wire toggle interaction in `ChecklistItemRow` (calls `storage.toggleItem`, updates visual state immediately) in `components/checklist/ChecklistItemRow.tsx` (depends on T012, T018)
- [ ] T020 [P] [US2] Component test: toggling an item persists across a simulated remount/reload in `tests/unit/checklist/ChecklistPage.test.tsx` (depends on T019)
- [ ] T021 [P] [US2] Component test: toggle still updates visual state with no thrown error when storage is mocked as unavailable/throwing, in `tests/unit/checklist/ChecklistPage.test.tsx` (depends on T019)

**Checkpoint**: User Stories 1 AND 2 both work independently — the checklist is scannable and progress persists.

---

## Phase 5: User Story 3 - Feel encouraged by visible progress (Priority: P3)

**Goal**: An overall progress summary updates immediately as items are toggled, with a distinct acknowledgment when everything is complete.

**Independent Test**: Check/uncheck items and confirm the progress summary updates immediately and accurately, independent of navigation to any guide.

### Implementation for User Story 3

- [ ] T022 [P] [US3] Implement progress computation (`completedCount`, `totalCount`, `isComplete`) in `lib/checklist/progress.ts` (depends on T006)
- [ ] T023 [US3] Implement `ProgressSummary` component (count display + distinct "all done" acknowledgment) in `components/checklist/ProgressSummary.tsx` (depends on T022)
- [ ] T024 [US3] Wire `ProgressSummary` into `ChecklistPage`, recomputing immediately on every toggle, in `components/checklist/ChecklistPage.tsx` (depends on T019, T023)
- [ ] T025 [P] [US3] Unit test progress computation at 0%, partial, and 100% completion in `tests/unit/checklist/progress.test.ts` (depends on T022)

**Checkpoint**: User Stories 1-3 all work independently — scannable, persistent, and encouraging.

---

## Phase 6: User Story 4 - Jump from a checklist item to deeper guidance (Priority: P4)

**Goal**: Tapping an item with a link navigates to it; items without a link show only their explanation with no attempted navigation.

**Independent Test**: Tap an item with a configured link and confirm navigation to the correct destination; tap an item without a link and confirm no navigation is attempted.

### Implementation for User Story 4

- [ ] T026 [US4] Add link rendering/navigation behavior to `ChecklistItemRow` — items with `link` render a working anchor to that destination; items without `link` render none — in `components/checklist/ChecklistItemRow.tsx` (depends on T012, T019)
- [ ] T027 [P] [US4] Component test: item with `link` renders correct `href`; item without `link` renders no navigational element, in `tests/unit/checklist/ChecklistItemRow.test.tsx` (depends on T026)

**Checkpoint**: All four user stories are independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates that span every story, per constitution Principle V (Mobile-First Quality).

- [ ] T028 [P] Add per-route metadata (title, meta description) for `/start` in `app/start/page.tsx`
- [ ] T029 [P] Accessibility pass: accessible labels/roles on checkbox controls, full keyboard navigability across `components/checklist/*.tsx`
- [ ] T030 Run all 8 manual validation scenarios in `quickstart.md` end-to-end and record results
- [ ] T031 [P] Run lint + typecheck across all new files (`npm run lint`, `npm run typecheck`)
- [ ] T032 Verify Lighthouse mobile scores for `/start` (Performance/Accessibility/SEO ≥ 90) per constitution Principle V

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories.
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion.
  - US1 has no dependency on other stories.
  - US2 depends on US1's `ChecklistItemRow`/`ChecklistPage` existing (adds interactivity to them).
  - US3 depends on US2's toggle wiring existing (progress recomputes on toggle).
  - US4 depends on US2's `ChecklistItemRow` interactivity existing (adds link behavior to the same component).
  - Despite this build-on relationship, each story's acceptance scenarios are independently verifiable once its phase is complete.
- **Polish (Phase 7)**: Depends on all four user stories being complete.

### Within Each User Story

- Foundational data/storage before story-specific components.
- Display-only rendering (US1) before interactive wiring (US2).
- Progress (US3) and deep-linking (US4) both build on US2's interactive `ChecklistItemRow`, but are independent of each other.

### Parallel Opportunities

- Setup: T002, T003, T004 in parallel (different config files).
- Foundational: T006, T007, T008 in parallel (different files); T009 follows T008.
- Within US1: T012 can start once T006 lands; T017 (test) follows T014.
- Within US3: T022 and T025 can run in parallel with US2 tasks once T006 is done, since progress math doesn't depend on the toggle UI itself — but `ProgressSummary` wiring (T024) still needs T019 from US2.
- Polish: T028, T029, T031 in parallel.

---

## Parallel Example: User Story 1

```bash
# Once T006 (data/checklist.ts) and T007 (groups.ts) are done:
Task: "Implement ChecklistItemRow display in components/checklist/ChecklistItemRow.tsx"
# then sequentially:
Task: "Implement ChecklistGroup in components/checklist/ChecklistGroup.tsx"
Task: "Implement ChecklistPage in components/checklist/ChecklistPage.tsx"
Task: "Wire app/start/page.tsx to render ChecklistPage"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: confirm the checklist scans well at ~380px with no prior state
5. Demo if ready — note interactivity (checking items) isn't present yet at this point

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add US1 → validate independently → demo (static, scannable checklist)
3. Add US2 → validate independently → demo (checking items persists)
4. Add US3 → validate independently → demo (progress summary + "all done")
5. Add US4 → validate independently → demo (deep links to guides/resources)
6. Polish → Lighthouse/accessibility/quickstart sign-off

---

## Notes

- [P] tasks = different files, no dependencies.
- [Story] label maps each task to its user story for traceability.
- Placeholder data (T006) intentionally ships only 2-3 items per group — real First 30 Days copy is separate, later content work (spec.md FR-014).
- Commit after each task or logical group, per repository convention (Conventional Commits).
- Stop at any checkpoint to validate a story independently before moving on.
