<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 1.1.0
Bump type: MINOR — new rule added to an existing principle section.

Modified principles:
  - IV. Trust & Responsibility: added explicit rule prohibiting Claude Code
    from setting or assuming verified: true on group entries.

Added sections: none
Removed sections: none

Templates checked:
  ✅ .specify/templates/plan-template.md — no edits needed.
  ✅ .specify/templates/spec-template.md — no edits needed.
  ✅ .specify/templates/tasks-template.md — no edits needed.

Deferred TODOs: none.
-->

# OZMate Constitution

## Core Principles

### I. Static-First Architecture

OZMate MUST remain a statically generated, database-free PWA in v1. No backend
server, no user database, and no server-side authentication are permitted.

- Content lives in the repository as MDX files (`content/guides/`) and typed
  TypeScript/JSON data files (`data/`). Publishing equals a commit plus
  auto-deploy — this is the freshness engine.
- Checklist progress MUST persist via `localStorage` only, keyed by stable
  checklist item `id` values. The "no storage / private mode" case MUST be
  handled gracefully.
- Any proposal to introduce a database, a backend service, or user accounts
  MUST be explicitly approved and constitutes a MAJOR version amendment.

**Rationale:** Static generation keeps the site fast, cheap, instantly
updatable, SEO-friendly, and maintainable by a solo developer. The architecture
constraint is the simplicity guarantee.

### II. Content Integrity & Freshness

The `lastUpdated` (guides) and `lastVerified` (groups) fields are the primary
trust signal for users. They are load-bearing, not decorative.

- `lastUpdated` MUST be updated whenever a guide's substantive content changes.
- `lastVerified` MUST be updated whenever a group entry is confirmed still
  active and legitimate.
- Neither field MUST ever be removed from the data schema.
- Group links and `verified` status MUST NOT be fabricated or assumed.
  A group MUST only be marked `verified: true` when it has been explicitly
  and personally confirmed as legitimate and active.
- Stale content (unreviewed > ~90 days) SHOULD be flagged for review before
  any re-deployment cycle.

**Rationale:** Freshness and honesty are OZMate's competitive moat. Broken or
unverified links destroy user trust permanently.

### III. Scope Discipline

The following are hard out-of-scope constraints for v1. No feature work MUST
cross these lines without an explicit constitution amendment:

- **No user accounts, login, or authentication** of any kind.
- **No monetisation, advertising, or agency-listing features.**
- **No multi-language support or translation.** English only.
- **No push notifications.**
- **No "trails / things to do / explore your city" content.** This dilutes the
  survival-guide positioning and is explicitly deferred.
- **Group directory: Sydney only in v1.** All other content is Australia-wide.
  Additional cities are a content addition, not a code change, deferred to v2.
- **No search in v1.** Navigation relies on clear category structure.

**Rationale:** A time-boxed solo build (~6 weeks) succeeds by staying narrow
and deep. Each out-of-scope item is tracked in the spec for a future phase.

### IV. Trust & Responsibility

OZMate MUST NOT give visa, legal, or financial advice under any circumstances.

- Guides that touch visa, legal, or financial topics MUST summarise plainly in
  plain English and MUST link out to official, authoritative sources (e.g.
  Home Affairs, VEVO, Fair Work, ATO).
- A clear disclaimer stating that OZMate provides general information, not
  professional advice, MUST appear on `/about` and in the site footer.
- Analytics MUST be privacy-friendly (Plausible or PostHog only). No personal
  data MUST be collected beyond what these tools provide in aggregate.
- Australian Privacy Principles apply; a short privacy note MUST be present.
- Group directory entries MUST NOT be marked `verified: true` unless a human
  has explicitly confirmed the group is active and legitimate. Claude Code MUST
  never set or assume this flag when generating, importing, or editing group
  data — an unverified group MUST default to `verified: false` and remain
  unverified until a human changes it.

**Rationale:** Trust is the product. Legal exposure and user harm from bad
advice would end the project. Official sources own accuracy; OZMate owns the
practical layer on top.

### V. Mobile-First Quality

OZMate MUST be designed mobile-first at ~380px width. Desktop is an
enhancement, not the baseline.

- Target Lighthouse mobile scores: Performance ≥ 90, Accessibility ≥ 90,
  SEO ≥ 90.
- The PWA MUST be installable ("Add to Home Screen") and MUST provide an
  offline shell for previously visited pages.
- Every guide MUST have a real, distinct meta description targeting a plausible
  user search query (e.g., "how to get an Opal card", "cheap workwear Sydney").
- Open Graph / Twitter card metadata and `sitemap.xml` / `robots.txt` MUST
  be present at launch.
- The site MUST be tested on real iOS and Android devices before any release.

**Rationale:** Newcomers reach OZMate on a phone, often with limited data.
SEO discoverability via Google is the primary acquisition channel — quality
gates directly protect growth.

## Content Model Compliance

All content artifacts MUST conform to the schemas defined in
`docs/OZMate_Project_Spec_v1_1.md` §B4. Summaries for quick reference:

**Guide (MDX frontmatter):** `title`, `slug`, `category` (arrival | visas |
jobs | shopping | transport | housing | daily-life), `summary`, `scope`
(national | sydney), `order`, `lastUpdated`, `tags`, `sources[]`.

**Group (`data/groups.ts`):** `id`, `name`, `platform` (whatsapp | telegram |
facebook), `category`, `city`, `link`, `description`, `verified`, `lastVerified`.

**Checklist item (`data/checklist.ts`):** `id`, `group`, `title`, `detail`,
`link?`, `order`.

No schema field MUST be silently dropped. Adding fields requires updating the
spec and this constitution's content model summary in a MINOR version bump.

## Development Workflow

- **Commits:** Conventional Commits style (`feat:`, `fix:`, `docs:`,
  `chore:`, `content:`, etc.).
- **Branching:** one feature/issue branch per Spec Kit feature → PR → preview
  deploy → merge to `main`. `main` MUST always be deployable.
- **Issue-based development:** each Claude Code session MUST target one issue
  to keep scope focused and PRs reviewable.
- **Spec Kit workflow:** for every new feature, the sequence is
  `/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`.
  Skipping straight to implementation is not permitted.
- **Components, content, and data MUST remain cleanly separated** per the
  project structure in `docs/OZMate_Project_Spec_v1_1.md` §B9. Guide or group
  content MUST NOT be hardcoded inside components.

## Governance

This constitution supersedes all other practices, instructions, and defaults
for the OZMate repository. In any conflict between CLAUDE.md, a feature spec,
or a task list and this constitution, this document wins.

**Amendment procedure:**
1. Open a PR with the proposed change to `.specify/memory/constitution.md`.
2. Bump `CONSTITUTION_VERSION` per semantic versioning:
   - MAJOR: principle removed, redefined, or scope boundary crossed.
   - MINOR: new principle or section added; schema field added.
   - PATCH: wording clarification, typo fix, non-semantic refinement.
3. Update `LAST_AMENDED_DATE` to the amendment date.
4. Re-run `/speckit-constitution` to propagate changes to dependent templates.
5. Include rationale in the PR description.

**Compliance review:** every feature plan (produced by `/speckit-plan`) MUST
include a Constitution Check gate before Phase 0 research and after Phase 1
design. Tasks that violate a principle MUST NOT be merged.

**Version**: 1.1.0 | **Ratified**: 2026-07-15 | **Last Amended**: 2026-07-15
