# CLAUDE.md — OZMate

This file is read by Claude Code at the start of every session. It tells Claude what this project is, how it's built, and what rules to follow. Read this before making any changes.

---

## What this project is

OZMate is a mobile-first PWA — a practical survival guide for newcomers to Australia. It covers arrival essentials, visas (info only, not advice), jobs, cheap shopping, transport, housing, and daily life, plus a vetted directory of WhatsApp/Telegram job groups (Sydney-first).

Full product and engineering context lives in:
- `docs/OZMate_Project_Plan_v1.md` — original thinking doc (problem, audience, competitors, roadmap)
- `docs/OZMate_Project_Spec_v1.md` — the authoritative build spec (product + engineering requirements)

**Always check the spec doc before making architectural decisions.** This file is a summary and a rulebook, not a replacement for it.

---

## Spec Kit vocabulary (for this project)

This project uses **GitHub Spec Kit** in skills mode. Key facts:
- `.specify/` — Spec Kit's memory and templates. Do not hand-edit unless told to.
- `.claude/skills/` — the `/speckit-*` skills (constitution, specify, plan, tasks, implement, etc.)
- `specs/` (created as features are specified) — one folder per feature, each containing `spec.md`, `plan.md`, `tasks.md`. This is where feature-level detail lives, separate from the top-level docs above.
- The project constitution (once written via `/speckit-constitution`) lives at `.specify/memory/constitution.md` and is the non-negotiable ruleset — check it before proposing anything that conflicts with it.
- Workflow for every new feature: `/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`. Don't skip straight to implementation.

---

## Tech stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX for guides (`content/guides/`), typed TS/JSON data files for groups and checklist items (`data/`)
- **PWA:** Web app manifest + service worker for installability and offline shell
- **No database, no backend, no user accounts in v1.** Content is committed to the repo; publishing = a commit + auto-deploy.
- **Hosting:** [OPEN — Vercel or AWS Amplify, decide before first deploy]
- **Analytics:** [OPEN — Plausible or PostHog, privacy-friendly only]

## Content schemas

Follow these exactly — see `docs/OZMate_Project_Spec_v1.md` §B4 for full detail.

**Guide (MDX frontmatter):** `title`, `slug`, `category`, `summary`, `scope` (national | sydney), `order`, `lastUpdated`, `tags`, `sources[]`

**Group (`data/groups.ts`):** `id`, `name`, `platform`, `category`, `city`, `link`, `description`, `verified`, `lastVerified`

**Checklist item (`data/checklist.ts`):** `id`, `group`, `title`, `detail`, `link?`, `order`

`lastUpdated` / `lastVerified` fields are not decorative — they're the trust signal for the whole product. Never remove them when editing content; always update them when content changes.

---

## Routes (v1)

```
/                          Home
/start                     "First 30 Days" checklist
/guides                    Tips hub index
/guides/[category]         Category listing
/guides/[category]/[slug]  Single guide
/groups                    Group directory (Sydney, filterable)
/about                     About + disclaimer
```

---

## Hard rules — do not do these in v1

- **No user accounts, login, or auth.** Checklist progress uses `localStorage` only.
- **No monetisation, ads, or agency features.** Explicitly deferred to a later phase.
- **No multi-language / translation.** English only for now.
- **No push notifications.**
- **No "trails / things to do" content.** Deliberately out of scope — dilutes the survival-guide positioning. Do not add without an explicit instruction.
- **Never give visa, legal, or financial advice.** Guides on these topics summarise plainly and link out to official sources (e.g. Home Affairs, Fair Work). Do not write prescriptive advice.
- **Never invent group links or claim a group is "verified"** without being told it has actually been checked. The `verified` field and disclaimer exist to protect user trust — treat them as load-bearing, not decorative.

## Definition of done reminders

- Mobile-first design, tested at ~380px width first.
- Target Lighthouse mobile scores ≥ 90 for Performance, Accessibility, and SEO.
- Every guide needs a real meta description and should target a plausible real search query.
- PWA must be installable with a working offline shell for visited pages.

---

## Conventions

- **Commits:** Conventional Commits style (`feat:`, `fix:`, `docs:`, `chore:`, etc.)
- **Branching:** one feature branch per Spec Kit feature/issue → PR → preview deploy → merge to `main`.
- **`main` is always deployable.** Don't leave it broken between sessions.
- Keep components, content, and data cleanly separated per the structure in the spec (§B9) — don't hardcode guide or group content inside components.

---

## Working style for this project

- This is a **solo, time-boxed build** (~6 weeks). Favour simple, shippable solutions over elaborate abstractions. If a "proper" pattern and a "fast, good-enough" pattern both satisfy the spec, prefer fast-and-good-enough.
- If a request conflicts with the constitution, the spec, or the hard rules above, say so explicitly rather than quietly complying.
- If scope is ambiguous, check `docs/OZMate_Project_Spec_v1.md` first before asking — most answers are already in there.
