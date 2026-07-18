# Feature Specification: Guides Hub

**Feature Branch**: `002-guides-hub`

**Created**: 2026-07-18

**Status**: Draft

**Input**: User description: "the guides hub"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read a guide that answers a real question (Priority: P1)

A newcomer searches the web for a practical question ("how to get an Opal card", "cheap workwear Sydney") or taps through from elsewhere in OZMate, lands on a single guide page, and gets a short, scannable answer: what to do, why, a concrete "do this now" action at the end, and links to the official sources that own the underlying facts.

**Why this priority**: The single guide page is the product's unit of value and the primary acquisition surface (search traffic lands here, not on the index). If only this exists, OZMate already helps people.

**Independent Test**: Publish one guide and visit its page directly by URL. The full journey — read, see freshness date, follow a source link, see the "do this now" action — works without any index or category pages existing.

**Acceptance Scenarios**:

1. **Given** a published guide, **When** a visitor opens its page, **Then** they see the guide title, summary, body content, a last-updated date, and the guide's cited source links.
2. **Given** a guide that touches visa, legal, or financial topics, **When** a visitor reads it, **Then** the content summarises in plain English and directs them to the official authority for decisions, never presenting itself as advice.
3. **Given** a guide page opened on a ~380px-wide phone screen, **When** the visitor reads it, **Then** all content is legible and usable without horizontal scrolling.
4. **Given** a visitor who has previously opened a guide, **When** they return to it without an internet connection, **Then** the previously visited guide still loads.

---

### User Story 2 - Browse guides by category (Priority: P2)

A newcomer who doesn't know exactly what to ask opens the guides hub, sees the seven life-area categories (arrival essentials, visas & work rights, jobs & income, shopping & saving, transport, housing, daily life & culture), picks the one matching their current problem, and scans the list of guides in it to find the right one.

**Why this priority**: Browsing is the discovery path for visitors already on the site (e.g. arriving from the home page or checklist). It multiplies the value of every guide but is worthless until guides exist — hence second.

**Independent Test**: Visit the hub index, navigate into a category, open a guide from its listing. Delivers value as soon as at least one category has one guide.

**Acceptance Scenarios**:

1. **Given** the guides hub index, **When** a visitor opens it, **Then** they see all seven categories with enough description to know what belongs in each.
2. **Given** a category with published guides, **When** the visitor opens the category listing, **Then** guides appear in their defined editorial order, each showing its title and summary.
3. **Given** a category with no published guides yet, **When** the visitor encounters it on the index, **Then** it is clearly marked as not yet available and does not lead to an empty or broken page.
4. **Given** any category listing or guide page, **When** the visitor wants to go back up a level, **Then** navigation back to the category and hub index is available without using browser controls.

---

### User Story 3 - Judge whether a guide is current (Priority: P3)

A newcomer burnt by stale forum posts checks whether a guide is up to date before acting on it. Every guide visibly shows when it was last updated, so the visitor can trust it — or discount it — at a glance.

**Why this priority**: Freshness transparency is OZMate's trust moat and differentiator, but it only matters once guides exist and are browsable.

**Independent Test**: Open any guide and any category listing; the last-updated date is visible in both places without any interaction.

**Acceptance Scenarios**:

1. **Given** a published guide, **When** a visitor views its page, **Then** the last-updated date is visible near the top of the guide without scrolling on a phone screen.
2. **Given** a category listing, **When** a visitor scans it, **Then** each guide's last-updated date is visible alongside its title and summary.

---

### Edge Cases

- A visitor follows an old or mistyped guide URL (guide renamed, moved category, or never existed) → they get a helpful not-found page that routes them to the hub index, not a blank error.
- A guide's category value doesn't match any of the seven known categories → the build/publish step fails loudly rather than silently hiding the guide.
- Two guides in the same category share the same sort order → listing order remains stable and deterministic between visits.
- A guide has no optional tags → the page renders normally without an empty tags area.
- A visitor lands directly on a category URL for a category that exists but has no guides → they see the same "not yet available" treatment as on the index, with a path back to the hub.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a guides hub index page listing all seven content categories: arrival essentials, visas & work rights, jobs & income, shopping & saving, transport, housing, daily life & culture.
- **FR-002**: The system MUST provide a listing page per category showing that category's published guides ordered by their editorial sort order, with each guide's title, summary, and last-updated date.
- **FR-003**: The system MUST provide a page per guide rendering its full content, title, summary, last-updated date, and source links.
- **FR-004**: Every guide MUST carry the established guide content fields — title, slug, category, summary, scope, order, last-updated date, tags, and sources — and the system MUST reject or fail loudly on guides missing required fields or using an unknown category.
- **FR-005**: Guide pages MUST display their cited authoritative sources as working links, and guides on visa, legal, or financial topics MUST link out to the relevant official authority.
- **FR-006**: Categories with no published guides MUST be visibly marked as not yet available and MUST NOT produce empty or broken listing pages.
- **FR-007**: Every hub, category, and guide page MUST have a distinct page title and a real meta description; guide meta descriptions MUST derive from the guide's summary.
- **FR-008**: Unknown guide or category URLs MUST return a not-found page that links back to the guides hub index.
- **FR-009**: Guide, category, and hub pages MUST be reachable by direct URL (shareable and indexable), with guide URLs structured under their category.
- **FR-010**: Previously visited guide pages MUST remain readable when the visitor is offline.
- **FR-011**: Publishing or updating a guide MUST require only adding or editing content files in the repository — no code changes and no manual steps beyond the standard publish flow.
- **FR-012**: All guides-hub pages MUST follow the existing site-wide visual design token system.

### Key Entities

- **Guide**: A single article. Carries title, URL slug, category, one-to-two-line summary, geographic scope (national or Sydney), editorial sort order, last-updated date, tags, and a list of cited sources (label + link). Belongs to exactly one category.
- **Category**: One of seven fixed life areas forming the content backbone. Carries a display name, a URL segment, and a short description. Contains zero or more guides.
- **Source**: An authoritative external reference cited by a guide (label + link) — e.g. Home Affairs, Fair Work, ATO, Transport NSW.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor landing on the hub index can reach any published guide in at most 2 taps (category → guide).
- **SC-002**: 100% of published guides display their last-updated date on both their own page and their category listing.
- **SC-003**: Every hub, category, and guide page scores ≥ 90 for Performance, Accessibility, and SEO on standard mobile audits.
- **SC-004**: A new guide can be published end-to-end (content written → live on the site) without any code changes, in under 15 minutes of non-writing effort.
- **SC-005**: 100% of guides touching visa, legal, or financial topics contain at least one link to the relevant official authority.
- **SC-006**: All pages are fully usable at ~380px viewport width with no horizontal scrolling.

## Assumptions

- **Scope of this feature is the hub infrastructure, not the article library.** It ships with a small number of real seed guides (at least one, so every page type is exercised by real content); the remaining ~10–15 articles are separate content issues per the project's issue-per-article workflow.
- The seven categories are fixed for v1; adding or renaming a category is an editorial/content-model decision outside this feature.
- Empty categories are shown on the index as "coming soon" (matching the home page's treatment of unbuilt pillars) rather than hidden, so visitors see the full shape of the content backbone.
- No search functionality — navigation is category-based only, per the project's v1 scope constraints.
- Guide body content is authored in the repository's established content format; the checklist's existing deep-link field may point at guide URLs, but wiring specific checklist items to specific guides is content work, not part of this feature.
- The existing site-wide offline shell mechanism is extended to cover guide pages; no new offline behaviour beyond "previously visited pages work offline" is in scope.
