# Data Model: Group Directory

Schema mirrors the constitution's Content Model Compliance section exactly. No fields added or dropped.

## Group

Typed static data in `data/groups.ts`. One array entry per community group.

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | string | yes | Stable, unique, kebab-case. Used as the React list key and in the `mailto:` report body so an entry is identifiable without lookup (FR-007). |
| `name` | string | yes | Display name of the group/channel. |
| `platform` | enum | yes | `whatsapp` \| `telegram` \| `facebook`. Drives a small platform icon/label on the card. |
| `category` | enum | yes | One of the fixed `GroupCategory` keys (below). Unknown value is a TypeScript compile error, not a runtime concern (R5). |
| `city` | string | yes | Stored value, not a hardcoded constant. All launch entries use the same Sydney value (constitution III), but the field exists so a second city is a content change later (FR-010). |
| `link` | string | yes | Invite/join URL. May be empty/malformed for a not-yet-obtained link; card still renders per Edge Cases, link action degrades gracefully. |
| `description` | string | yes | Plain-language summary of who the group is for. |
| `verified` | boolean | yes | **MUST default to `false`** at authoring time (constitution IV, FR-011). This feature's seed data MUST NOT set any entry to `true`. |
| `lastVerified` | date | yes | `YYYY-MM-DD`. Always present, even while `verified` is `false` — records when the entry's link/description were last authored or reviewed (constitution II, FR-012). |

**No runtime validation library**: the array is hand-authored TypeScript (same convention as `data/checklist.ts`/`data/categories.ts`); the `Group` interface makes a missing/malformed field a compile-time error (R5).

## GroupCategory (`lib/groups/categories.ts`)

Fixed list, mirroring the `data/categories.ts` convention for guides. Changing the set is a content-model amendment, not routine feature work.

| Field | Type | Rules |
|-------|------|-------|
| `key` | enum | `hospo` \| `cleaning` \| `construction` \| `warehouse` \| `aged-care` \| `jobs-general` \| `community`. |
| `label` | string | Display name for the filter control, e.g. "Hospitality". |

## Relationships

- **GroupCategory 1 → 0..n Group**: a group belongs to exactly one category via `category` key; the filter narrows the rendered list to entries matching the selected key, or shows all when `"all"` is selected.

## Derived states

- **Filter: "all"** (default) — every entry renders, grouped/labeled by category per FR-002.
- **Filter: a specific category with ≥ 1 matching entry** — only matching entries render.
- **Filter: a specific category with 0 matching entries** — explicit empty state rendered instead of a blank list (FR-005).
- **Zero entries in `data/groups.ts`** — explicit "no groups available yet" state (FR-006), independent of filter state.
- **Verified vs unverified entry** — both render identically except verified entries additionally show the `VerifiedBadge` (FR-003); unverified is never hidden or suppressed.

## Report contract (`ReportLinkAction`)

- Renders a `mailto:` anchor per entry; no component state, no network call.
- `mailto:` target: fixed OZMate contact address. **TODO**: currently a placeholder (`hello@ozmate.app`) — see `docs/pre-launch-checklist.md`; must be swapped for the real inbox before `ReportLinkAction` ships to production.
- Subject/body include the entry's `name` and `id` (FR-007), URL-encoded.
