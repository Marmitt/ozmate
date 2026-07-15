# Phase 1 Data Model: First 30 Days Checklist

## ChecklistItem (static, repo-committed — `data/checklist.ts`)

Matches the constitution's locked schema (`Content Model Compliance`) exactly — no fields added or removed.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | `string` | yes | Stable, unique, kebab-case (e.g. `"get-a-tax-file-number"`). Used as the key into persisted completion state. MUST NOT change once published — it's the `localStorage` key. |
| `group` | `string` | yes | Theme key (e.g. `"documents"`, `"money"`, `"phone"`, `"transport"`, `"health"`). Must match one of the keys defined in `lib/checklist/groups.ts`'s ordered list. |
| `title` | `string` | yes | Short task label shown at a glance (e.g. "Get a tax file number"). |
| `detail` | `string` | yes | The "what & why" explanation. Plain language; for Money/Documents items adjacent to visa/financial/legal topics, MUST stay descriptive and MUST NOT give prescriptive advice (constitution Principle IV) — link out instead. |
| `link` | `string` | no | Optional URL to a related guide or external/official resource. Per research.md, v1 placeholder data only uses external/official links, never unbuilt internal guide routes. |
| `order` | `number` | yes | Sort key within the item's group. Lower renders first. |

**Validation rules**:
- `id` values are unique across the entire dataset (not just within a group).
- `group` must be one of the known group keys — an unknown group key is a data bug, not a runtime case to handle gracefully.
- `order` values need only be unique within a group (cross-group ordering comes from the group's position in the fixed group order, not from `order`).

## GroupOrder (static, code-level constant — `lib/checklist/groups.ts`)

Not part of the persisted or content schema — a small ordered lookup used only for rendering sequence.

| Field | Type | Notes |
|---|---|---|
| `key` | `string` | Matches `ChecklistItem.group`. |
| `label` | `string` | Display label for the theme heading (e.g. "Documents"). |
| *(array position)* | — | Defines render order: the array's index order **is** the group display order. |

## ChecklistProgress (runtime-only, client-derived — never committed to the repo)

Not a schema entity — derived at runtime from `localStorage`. Documented here because FR-005/FR-006/FR-009/FR-012 all constrain its shape and behavior.

| Aspect | Shape |
|---|---|
| Storage key | Single versioned key, e.g. `ozmate.checklist.v1` (see research.md). |
| Stored value | JSON object: `{ [itemId: string]: true }`. Absence of a key means "incomplete" — completed-only ids are stored, not a full `{ [id]: boolean }` map, to keep the persisted blob small and to make "unknown ids" trivially detectable (any key not present in the current dataset is stale). |
| Read | On mount, parse the stored object; if parsing fails or storage is unavailable, fall back to an empty in-memory object (all items render unchecked) without throwing or surfacing an error (FR-009). |
| Write | On every toggle, recompute the full object from current in-memory state and write it back under the same key. Writes MUST be best-effort — a failed write (quota exceeded, storage blocked) MUST NOT block the UI toggle from updating in-memory state (FR-009). |
| Stale-id handling | When computing progress counts and rendering checked state, only ids present in the current `data/checklist.ts` are considered; any other id in the stored object is ignored and left untouched in storage (FR-012) — it is not actively purged, just never read or counted. |

### State transitions

```
incomplete --(user toggles item)--> complete
complete   --(user toggles item)--> incomplete
```

Both transitions are synchronous, symmetric, and immediately reflected in (a) the item's visual state, (b) the progress summary count, and (c) the persisted storage blob.

## Derived progress summary (UI-only, not persisted)

Computed on every render from `(data/checklist.ts` item count, current completion map):

- `completedCount` = number of current items whose id is marked complete.
- `totalCount` = total number of current items across all groups.
- `isComplete` = `completedCount === totalCount && totalCount > 0` → drives the distinct "all done" acknowledgment (FR-011).
