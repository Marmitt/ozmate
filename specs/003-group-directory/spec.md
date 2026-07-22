# Feature Specification: Group Directory

**Feature Branch**: `003-group-directory`

**Created**: 2026-07-22

**Status**: Draft

**Input**: User description: "Build the group directory — a clean, categorised, vetted listing of WhatsApp/Telegram/Facebook groups for newcomers, at the route /groups. Sydney-only for this launch (city is a stored field, not hardcoded, so other cities can be added later without a schema change). Each entry has: id, name, platform (whatsapp | telegram | facebook), category (e.g. hospo, cleaning, construction, warehouse, aged-care, jobs-general, community), city, link, description, verified (boolean), lastVerified (date). Users can filter by category. Per the constitution's Trust & Responsibility principle, entries MUST default to verified: false and must never be set to true without explicit human confirmation — no group should be auto-marked verified during implementation. Each entry needs a \"report a dead or dodgy link\" action — for this feature, implement it as a simple mailto link to a fixed contact address (no backend/form dependency). Data lives in a typed file at data/groups.ts matching this schema exactly."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse vetted job groups by category (Priority: P1)

A newcomer who just landed in Sydney visits `/groups` to find WhatsApp/Telegram/Facebook groups relevant to the kind of work they're looking for (e.g. hospitality, cleaning, warehouse work).

**Why this priority**: This is the entire point of the feature — without a browsable, categorised listing there is no directory. It is the MVP; everything else is a refinement on top of it.

**Independent Test**: Visit `/groups` with no filters applied and confirm every seeded group entry renders with its name, platform, category, description, and a visible verification status.

**Acceptance Scenarios**:

1. **Given** a newcomer opens `/groups`, **When** the page loads, **Then** all Sydney group entries are listed, each showing name, platform, category, description, and verification status.
2. **Given** the directory has entries across multiple categories, **When** the page renders, **Then** entries are visually grouped or clearly labeled by category so a user can scan for their trade.

---

### User Story 2 - Filter by category (Priority: P2)

A user looking specifically for construction work groups wants to narrow the list down instead of scanning every entry.

**Why this priority**: Meaningfully improves usability once there are more than a handful of groups, but the directory is still useful (via full scan) without it — so it's P2, not P1.

**Independent Test**: On `/groups`, select a single category filter (e.g. "construction") and confirm only entries matching that category remain visible, with a way to clear the filter and see all entries again.

**Acceptance Scenarios**:

1. **Given** the directory lists groups across several categories, **When** a user selects a category filter, **Then** only groups in that category are shown.
2. **Given** a category filter is active, **When** the user clears or resets the filter, **Then** all groups become visible again.
3. **Given** a user selects a category with zero groups, **When** the filter is applied, **Then** the page shows a clear empty state rather than a blank list.

---

### User Story 3 - Report a dead or dodgy link (Priority: P3)

A user finds that a group's invite link is broken, expired, or the group turned out to be a scam/spam channel, and wants to flag it.

**Why this priority**: Important for long-term trust and content integrity, but the directory delivers value on day one without it — reporting is a safety valve for after-launch, so it's the lowest priority of the three.

**Independent Test**: On any group entry, activate the "report a dead or dodgy link" action and confirm it opens a pre-filled email (mailto) addressed to a fixed contact, referencing the group so the maintainer knows which entry was reported.

**Acceptance Scenarios**:

1. **Given** a user is viewing a group entry, **When** they activate "report a dead or dodgy link", **Then** their email client opens a new message addressed to a fixed OZMate contact address.
2. **Given** the report action is triggered, **When** the email draft opens, **Then** the subject and/or body identifies which group entry (by name and/or id) is being reported, so no manual lookup is needed by the maintainer.

---

### Edge Cases

- What happens when a group's `link` is missing or malformed? The entry MUST still render (name, category, description, report action) rather than breaking the page; the link action degrades gracefully (e.g. disabled or omitted) instead of producing a broken outbound link.
- How does the system handle a category with zero currently-verified groups? Unverified entries still display (per Assumptions, all launch entries are unverified) — the directory does not hide entries based on verification status, it only visually distinguishes them.
- How does the system handle an empty directory (zero entries) on first load, before any groups have been added to `data/groups.ts`? The page MUST show a clear "no groups yet" state rather than an error or blank screen.
- What happens if a user's device has no email client configured, so the mailto report action does nothing visible? This is an accepted platform limitation of the mailto approach (see Assumptions) — no in-app fallback is required for this feature.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a `/groups` route that lists every group entry from the group data source.
- **FR-002**: Each rendered group entry MUST display its name, platform, category, description, and verification status.
- **FR-003**: The system MUST visually distinguish verified entries from unverified entries (e.g. a badge or label), without hiding unverified entries from the listing.
- **FR-004**: The system MUST allow users to filter the visible entries by a single category at a time, and to clear the filter to see all entries again.
- **FR-005**: When a category filter yields zero matching entries, the system MUST display an explicit empty state rather than an empty blank area.
- **FR-006**: When the underlying group data set contains zero entries, the system MUST display an explicit "no groups available yet" state.
- **FR-007**: Each group entry MUST provide a "report a dead or dodgy link" action that opens a `mailto:` link addressed to a fixed OZMate contact address, with the group's name and/or id included in the subject or body so the report is identifiable without further lookup.
- **FR-008**: The system MUST source all group content from a single typed data file at `data/groups.ts`; group content MUST NOT be hardcoded into page or component markup.
- **FR-009**: Every group entry in `data/groups.ts` MUST conform exactly to the schema: `id`, `name`, `platform` (`whatsapp` | `telegram` | `facebook`), `category`, `city`, `link`, `description`, `verified` (boolean), `lastVerified` (date).
- **FR-010**: Every group entry MUST store a `city` value (not a hardcoded assumption elsewhere in the code); for this launch all seeded entries MUST use the same Sydney city value, and the directory UI MUST NOT hardcode "Sydney" in a way that would require a code change to support another city later.
- **FR-011**: Every group entry MUST default to `verified: false` at creation time. No entry MUST be set to `verified: true` as part of implementing this feature — flipping an entry to verified is a separate, explicit, human content action outside the scope of this build.
- **FR-012**: Every group entry MUST carry a `lastVerified` date value at all times (per the constitution's freshness principle), even while `verified` is `false`, so the field is never blank or dropped.
- **FR-013**: The category filter options presented to the user MUST be derived from the set of categories actually present in `data/groups.ts` (or an explicit known category list), covering at minimum: hospo, cleaning, construction, warehouse, aged-care, jobs-general, community.

### Key Entities

- **Group**: A single vetted (or pending-vetting) community group for job-seeking newcomers. Attributes: `id` (stable unique identifier), `name` (display name), `platform` (`whatsapp` | `telegram` | `facebook`), `category` (job/community category such as hospo, cleaning, construction, warehouse, aged-care, jobs-general, community), `city` (the city this group serves — Sydney for all launch entries), `link` (invite/join URL), `description` (plain-language summary of who the group is for), `verified` (boolean, defaults to `false`), `lastVerified` (date the group's status was last confirmed by a human).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A newcomer can find at least one group relevant to their trade/category within 10 seconds of landing on `/groups`, without needing to read every entry.
- **SC-002**: 100% of group entries display a verification status, so no user is ever left unsure whether a group has been vetted.
- **SC-003**: 100% of group entries in `data/groups.ts` conform to the required schema fields, with zero entries missing `city` or `lastVerified`.
- **SC-004**: A user can report a broken or suspicious group link in 2 actions or fewer (e.g. one tap/click to open the report action, then send in their email client).
- **SC-005**: Filtering to a single category updates the visible list with no full-page reload.

## Assumptions

- All group entries seeded for this initial launch are assumed unverified (`verified: false`) with a `lastVerified` date reflecting when the entry was authored/reviewed for accuracy of link and description — not a claim that the group's legitimacy has been personally confirmed. Marking any entry `verified: true` is an explicit human follow-up action outside this feature's scope, per the constitution.
- "Report a dead or dodgy link" is satisfied by a `mailto:` link to a fixed OZMate contact address for this launch; no in-app form, ticketing system, or backend is in scope. This is a deliberate simplification consistent with the project's static-first, no-backend architecture.
- City is Sydney-only for all seeded entries at launch (per the constitution's scope discipline), but the `city` field is a normal data value, not a hardcoded constant, so adding a second city later is a content change, not a code change.
- No search box is in scope (per the constitution's "no search in v1" rule) — category filtering is the only narrowing mechanism.
- No user accounts or saved/favourited groups — every visit to `/groups` shows the same directory to every visitor, per the static-first, no-accounts architecture.
- Category values are a fixed, known set for this launch (hospo, cleaning, construction, warehouse, aged-care, jobs-general, community); adding a new category is a content/data change.
