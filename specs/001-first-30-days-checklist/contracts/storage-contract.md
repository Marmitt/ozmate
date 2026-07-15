# Contract: `lib/checklist/storage.ts`

The persistence module's public surface. Components depend on this contract rather than touching `window.localStorage` directly, so storage-unavailable handling (FR-009) and stale-id handling (FR-012) live in one place.

## Interface

```ts
export function readCompletedIds(): ReadonlySet<string>;
// Reads and parses the persisted blob. Returns an empty set (never throws)
// if storage is unavailable, empty, or unparseable.

export function toggleItem(id: string, currentlyCompleted: boolean): ReadonlySet<string>;
// Flips the given id's completion state and persists the result (best-effort —
// a failed write is swallowed, not thrown). Returns the resulting in-memory
// set of completed ids so the caller can update UI state synchronously
// without a second read.

export function filterToKnownIds(
  completedIds: ReadonlySet<string>,
  knownIds: ReadonlySet<string>
): ReadonlySet<string>;
// Returns the subset of completedIds that are also present in knownIds.
// Used to compute progress/checked-state against the *current* data/checklist.ts
// contents, ignoring any stale ids left over from prior content edits (FR-012).
```

## Guarantees

- No function in this module throws under normal storage failure conditions (quota exceeded, storage disabled/blocked, corrupted JSON). All such conditions degrade to "treat as no persisted state" behavior.
- `toggleItem` and `readCompletedIds` are the only functions that touch `window.localStorage` directly; all other code goes through this module.
- The persisted representation (single JSON blob under one versioned key, mapping completed item ids to `true`) is an implementation detail of this module and is not part of the contract — callers only see `Set<string>` values in and out.

## Non-guarantees

- No cross-tab sync guarantee in v1 (e.g. via the `storage` event) — a change in one open tab is not required to live-update another open tab. Acceptable per spec.md's assumption that progress is local-device, not required to be perfectly real-time across simultaneously open tabs.
- No migration path is defined yet for a future `v2` storage key — if the persisted shape ever needs to change, that is new work, not covered here.
