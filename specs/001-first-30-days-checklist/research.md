# Phase 0 Research: First 30 Days Checklist

No open `NEEDS CLARIFICATION` markers remained in Technical Context — the stack and constraints are fixed by `CLAUDE.md` and the constitution. The decisions below resolve the implementation-level questions that were still open once those constraints were applied.

## Decision: Single-key JSON blob for localStorage, not one key per item

- **Decision**: Store all checklist completion state under one versioned `localStorage` key (e.g. `ozmate.checklist.v1`) whose value is a JSON object mapping `itemId -> true` for completed items (absent id = incomplete).
- **Rationale**: A single key makes read/write atomic from the app's perspective, makes "ignore stale ids" (FR-012) a one-line filter over the object's keys, and makes any future schema/versioning change a matter of bumping the key suffix rather than migrating N separate keys. It also keeps `localStorage` usage minimal, which matters for the "graceful when storage is unavailable" requirement (FR-009) — there's exactly one read and one write path to guard.
- **Alternatives considered**:
  - *One `localStorage` key per item id* — rejected: harder to enumerate/clean up stale ids, more storage calls, no benefit given item counts are small (10-18 items).
  - *IndexedDB* — rejected: unnecessary complexity for a small boolean map; `localStorage` is synchronous, simpler, and sufficient at this scale.

## Decision: Group display order is a code-level constant, not a data field

- **Decision**: Add a small ordered list of group keys (e.g. `['documents', 'money', 'phone', 'transport', 'health']`) in `lib/checklist/groups.ts`, separate from `data/checklist.ts`. Items reference a group by key; the constant list defines the order groups render in. Order *within* a group still comes from each item's `order` field, per the existing schema.
- **Rationale**: The constitution locks the checklist-item schema to exactly `id, group, title, detail, link?, order` (§ Content Model Compliance). Adding a `groupOrder` field to every item would duplicate the same value across every item in a group and would be a schema change requiring a constitution amendment. A single ordered constant satisfies FR-002's "stable, defined order" for groups without touching the schema.
- **Alternatives considered**:
  - *Alphabetical group order* — rejected: doesn't match "rough arrival priority" assumption in spec.md (Documents before Transport, etc.).
  - *Amend the schema to add `groupOrder`* — rejected: unnecessary schema change for something a constant list already solves cleanly.

## Decision: Placeholder items use a mix of external links and no-link items; avoid unbuilt internal guide links

- **Decision**: Of the 2-3 placeholder items per group, at most one per group links out, and only to a stable external/official resource (e.g. Home Affairs, Services Australia, Fair Work) rather than to an internal `/guides/...` page. The rest have no `link`.
- **Rationale**: The tips hub (`/guides/...`) doesn't exist yet in this repository (it's later work per `docs/OZMate_Project_Spec_v1_1.md` §B11, week 2). Pointing placeholder items at guide routes that 404 would misrepresent the feature as broken. Using real external links exercises the "item has a link, user can navigate to it" behavior (FR-007, User Story 4) without depending on unbuilt routes, and stays inside constitution Principle IV (link out to official sources rather than giving advice directly).
- **Alternatives considered**:
  - *Link every item to a placeholder internal guide slug* — rejected: would 404 today and doesn't validate real navigation behavior.
  - *Omit all links from placeholders* — rejected: User Story 4 (deep-link) would go untested by the placeholder data.

## Decision: Testing approach — Vitest + React Testing Library for logic, manual pass for device/visual criteria

- **Decision**: Unit/component test the `lib/checklist/storage.ts` module (toggle, read, stale-id filtering, storage-unavailable fallback) and the checklist components' check/uncheck + progress-count behavior with Vitest + React Testing Library. Verify ~380px layout, offline-shell behavior, and real-device behavior manually, per constitution Principle V, using `quickstart.md`.
- **Rationale**: The riskiest logic here is the persistence/edge-case handling (FR-006, FR-009, FR-012) — that's exactly what a fast unit-test layer is good at. Visual/mobile/PWA criteria (FR-013, SC-003, offline shell) are qualitative and device-dependent, and the constitution already mandates real-device testing before release rather than an automated visual-regression suite; introducing one now would be scope beyond what a solo, time-boxed build needs.
- **Alternatives considered**:
  - *No automated tests at all* — rejected: the persistence/edge-case logic is exactly the kind of thing that regresses silently without a test.
  - *Full Playwright e2e + visual regression suite* — rejected as premature for a single-feature, solo, time-boxed build; revisit if the project's test surface grows.
