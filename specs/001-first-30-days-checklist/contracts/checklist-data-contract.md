# Contract: `data/checklist.ts`

This feature has no network API — its "contract" is the shape of the static data module and the storage module that components depend on. This file covers the data export; `storage-contract.md` covers persistence.

## Export shape

```ts
export interface ChecklistItem {
  id: string;       // stable, unique, kebab-case — never reused or repurposed once published
  group: string;    // must match a key in lib/checklist/groups.ts's GROUP_ORDER
  title: string;
  detail: string;   // the "what & why" explanation
  link?: string;     // optional — external/official resource or (later) internal guide path
  order: number;    // sort key within the item's group
}

export const checklistItems: ChecklistItem[];
```

## Guarantees consumers can rely on

- `checklistItems` is a flat array — grouping and ordering are derived by consumers (via `lib/checklist/groups.ts` for group order, and each item's `order` field within a group), not pre-grouped in the data file.
- Every `id` in the array is unique across the whole array, not just within its group.
- Every `group` value has a corresponding entry in `lib/checklist/groups.ts`'s ordered group list — consumers do not need to handle an unknown group defensively; that is a data-authoring bug, not a runtime case.
- `link`, when present, is a non-empty string safe to pass to a standard link/anchor component (either an external absolute URL or an internal path).

## What is explicitly NOT guaranteed (v1)

- `checklistItems` is not the final, real First 30 Days content — v1 ships 2-3 representative placeholder items per group (per spec.md FR-014). Consumers must not assume a specific count or hardcode item ids beyond what's needed for tests.
- No `lastUpdated`/`lastVerified` field exists on this entity (unlike guides/groups) — do not add one without a constitution amendment.
