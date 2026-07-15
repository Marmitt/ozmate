# Feature Specification: First 30 Days Checklist

**Feature Branch**: `[001-first-30-days-checklist]`

**Created**: 2026-07-15

**Status**: Draft

**Input**: User description: "Build the \"First 30 Days\" checklist — an interactive, ordered checklist of essential setup actions for newcomers arriving in Australia. Items are grouped by theme (Documents, Money, Phone, Transport, Health, etc.). Each item has a title, a short \"what & why\" explanation, an optional link to a relevant guide or external resource, and a tick/checkbox state. Progress persists locally on the user's device using localStorage, keyed by a stable item id — no user accounts or backend involved. Tapping an item can optionally deep-link to a related guide in the tips hub. The checklist lives at the route /start. Data is stored in a typed file at data/checklist.ts following this shape: id, group, title, detail, link (optional), order. This is the primary entry point / hook of the app — it should feel simple, encouraging, and quick to scan on mobile (~380px width first)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scan the essentials at a glance (Priority: P1)

A newcomer who just landed in Australia opens the app for the first time and lands on the First 30 Days checklist. They immediately see what needs doing, grouped into clear themes (Documents, Money, Phone, Transport, Health, etc.), so they know where to start without reading a long guide first.

**Why this priority**: This is the app's primary entry point and hook. If the checklist isn't instantly scannable and understandable, the rest of the product never gets used.

**Independent Test**: Can be fully tested by loading `/start` on a fresh device/browser (no prior state) and confirming all groups and items render in a clear, legible, ordered layout at ~380px width — delivers value on its own even before any interaction happens.

**Acceptance Scenarios**:

1. **Given** a first-time visitor with no prior checklist state, **When** they navigate to `/start`, **Then** they see checklist items organized into named theme groups, each item showing a title and short "what & why" explanation, all items unchecked.
2. **Given** the checklist is loaded on a ~380px-wide screen, **When** the user scrolls through it, **Then** every group, title, and detail is fully legible without horizontal scrolling or clipped text.
3. **Given** items within a group, **When** the group renders, **Then** items appear in a stable, defined order (not randomized or reflowing between visits).

---

### User Story 2 - Track progress across visits (Priority: P2)

A user checks off items as they complete real-world tasks over their first weeks. When they come back to the app days later — possibly after closing the browser or restarting their phone — their previously completed items are still shown as done.

**Why this priority**: Persisted progress is what turns the checklist from a static list into a tool worth returning to. Without it, the "hook" nature of this feature (per CLAUDE.md) is lost.

**Independent Test**: Can be fully tested by checking a subset of items, reloading the page (and revisiting after closing/reopening the browser), and confirming the same items remain checked — delivers value independent of any other story.

**Acceptance Scenarios**:

1. **Given** an unchecked item, **When** the user taps its checkbox, **Then** the item immediately shows as complete.
2. **Given** a user has checked several items, **When** they close the app/browser and reopen `/start` later on the same device, **Then** exactly those items remain checked and all others remain unchecked.
3. **Given** an already-checked item, **When** the user taps its checkbox again, **Then** it reverts to incomplete and that reversal also persists.
4. **Given** the browser has local storage disabled or unavailable (e.g., private browsing), **When** the user checks an item, **Then** the interaction still works visually within the current session and no error is shown to the user, even though the state may not survive a reload.

---

### User Story 3 - Feel encouraged by visible progress (Priority: P3)

As a user checks off items, they see a running sense of how far along they are (e.g., "6 of 24 done"), which makes the sometimes-overwhelming process of settling in feel manageable and rewarding rather than like an endless to-do list.

**Why this priority**: Directly supports the "simple, encouraging, quick to scan" experience goal called out in the feature description. It's a smaller addition on top of Stories 1–2 but materially affects how the hook feels.

**Independent Test**: Can be fully tested by checking/unchecking items and confirming a progress indicator updates immediately and accurately, independent of navigation to any guide.

**Acceptance Scenarios**:

1. **Given** a checklist with no items checked, **When** the page loads, **Then** a progress summary reflects 0 completed out of the total.
2. **Given** the user checks or unchecks an item, **When** the action completes, **Then** the progress summary updates immediately to reflect the new count.
3. **Given** every item across every group is checked, **When** the last item is completed, **Then** the user sees a distinct "all done" acknowledgment rather than an unremarkable progress count.

---

### User Story 4 - Jump from a checklist item to deeper guidance (Priority: P4)

A user isn't sure exactly how to complete a task (e.g., "Get a tax file number") and taps the item to read more or follow a link straight to the relevant guide or official external resource, then returns to their checklist to keep going.

**Why this priority**: Adds discovery value connecting the checklist to the rest of the app's content, but the checklist is still useful without it — this is an enhancement on top of Stories 1–3.

**Independent Test**: Can be fully tested by tapping an item that has a configured link and confirming navigation occurs to the correct destination, then returning to `/start` with checklist state intact.

**Acceptance Scenarios**:

1. **Given** an item has a "what & why" explanation, **When** the user taps the item, **Then** that explanation is visible to them.
2. **Given** an item includes an optional related-guide or external-resource link, **When** the user activates that link, **Then** they are taken to that destination.
3. **Given** the user navigates from a checklist item to an internal guide and back, **When** they return to `/start`, **Then** their check states and scroll context are unaffected.
4. **Given** an item has no link configured, **When** the user taps it, **Then** only the "what & why" explanation is shown with no broken or dead navigation attempted.

### Edge Cases

- What happens when local storage is unavailable or blocked (e.g., private/incognito browsing, storage quota exceeded)? The checklist MUST remain usable for the current session; no error state should be surfaced to the user.
- What happens when a group in the data has no items? That group section MUST be omitted from display rather than shown empty.
- What happens when previously stored progress references an item id that no longer exists in the current checklist data (e.g., content was edited or removed)? That stale entry MUST be ignored and MUST NOT cause an error or affect display of current items.
- What happens at 0% and 100% completion? 0% MUST read as an inviting starting point rather than a discouraging empty state; 100% MUST be visibly acknowledged as a distinct "completed" state.
- What happens with very long item titles or detail text on a ~380px screen? Text MUST wrap and remain fully readable; it MUST NOT be truncated in a way that hides meaning.
- What happens if a user has multiple devices/browsers? Progress is local to each device/browser and is NOT expected to sync between them (no accounts, no backend).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the checklist at the route `/start`, with items organized into named theme groups (e.g., Documents, Money, Phone, Transport, Health).
- **FR-002**: Within each group, items MUST render in a stable, defined order rather than an arbitrary or changing order.
- **FR-003**: Each checklist item MUST display a title, a short "what & why" explanation, and a control reflecting its complete/incomplete state.
- **FR-004**: Users MUST be able to toggle any item between complete and incomplete by interacting with it.
- **FR-005**: System MUST persist each item's complete/incomplete state locally on the user's device, keyed by that item's stable identifier, without requiring an account, login, or backend service.
- **FR-006**: Persisted state MUST be restored and correctly reflected the next time the user opens `/start` on the same device/browser, including after the browser or app is fully closed and reopened.
- **FR-007**: When an item has an optional link to a related guide or external resource, the system MUST let the user navigate to it from that item.
- **FR-008**: When an item has no link configured, the system MUST NOT attempt any navigation when the item is activated — only its explanation is shown.
- **FR-009**: If local storage is unavailable, blocked, or fails, the checklist MUST remain fully interactive and usable for the current session, without surfacing an error to the user.
- **FR-010**: System MUST display an overall progress summary (e.g., completed count out of total) that updates immediately whenever an item's state changes.
- **FR-011**: System MUST visibly acknowledge when all items have been completed, distinct from the ordinary in-progress state.
- **FR-012**: System MUST ignore any persisted state associated with item identifiers that do not correspond to a current checklist item, without error.
- **FR-013**: The checklist MUST remain fully legible and usable at a ~380px viewport width, with no horizontal scrolling and no clipped or hidden text.
- **FR-014**: The initial release MUST ship the checklist mechanism (schema, grouping, persistence, progress, deep links) populated with a small set of representative placeholder items (2-3 per group) sufficient to demonstrate every behavior in this spec. Authoring the full, real "First 30 Days" checklist copy for every group is explicitly out of scope for this feature and is deferred to a separate, later content task once brand voice is finalized.

### Key Entities

- **Checklist Item**: Represents one actionable setup task shown on `/start`. Attributes: a stable identifier (used as the local-storage key and unaffected by reordering or copy edits), a theme group it belongs to (e.g., Documents, Money, Phone, Transport, Health), a title, a "what & why" detail explanation, an optional link to a related guide or external resource, and a display order value. Completion state is not part of this stored data — it is derived per-device from local persisted state, keyed by the item's identifier.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can locate and check off their first item within 30 seconds of the `/start` page finishing load.
- **SC-002**: 100% of a user's previously checked items are still shown as checked after closing and reopening the app on the same device.
- **SC-003**: The entire checklist (all groups, all items) is fully readable on a 380px-wide screen with zero instances of horizontal scrolling or clipped text.
- **SC-004**: At least 90% of users who load `/start` check off at least one item during that first session.
- **SC-005**: A user can go from a checklist item to its linked guide and back to their in-progress checklist in 2 taps or fewer, with no loss of check state.

## Assumptions

- The checklist presents a single, fixed, non-personalized set of items in v1; there is no per-user ability to hide, skip, or add custom items — only to check/uncheck the ones provided.
- No "reset all progress" control is included in v1; users can only toggle items individually.
- Groups display in a fixed, meaningful order defined by the underlying data (matching rough arrival priority, e.g. Documents before Transport), not alphabetically or randomly.
- Tapping/clicking a checklist item's checkbox toggles completion; tapping the item's title or detail area reveals the "what & why" explanation and, if present, the related link — these are treated as distinct interactions so a user cannot accidentally lose their checked state while reading more or following a link.
- Any analytics on checklist usage follow the project's existing privacy-friendly analytics approach (per `docs/OZMate_Project_Spec_v1.md`) and are out of scope for this spec.
- This spec defines the checklist mechanism, its data shape, and its UX behavior only. It ships with 2-3 representative placeholder items per group to prove out every behavior; authoring the full, real "First 30 Days" checklist copy is a separate, later content task deferred until brand voice is finalized.
