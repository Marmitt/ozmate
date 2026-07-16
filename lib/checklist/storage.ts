const STORAGE_KEY = "ozmate.checklist.v1";

function getLocalStorage(): Storage | undefined {
  try {
    if (typeof window === "undefined") return undefined;
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function readStoredIds(): Set<string> {
  const storage = getLocalStorage();
  if (!storage) return new Set();

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return new Set();

    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) return new Set();

    return new Set(Object.keys(parsed as Record<string, unknown>));
  } catch {
    return new Set();
  }
}

function writeStoredIds(ids: ReadonlySet<string>): void {
  const storage = getLocalStorage();
  if (!storage) return;

  try {
    const value = Object.fromEntries([...ids].map((id) => [id, true]));
    storage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Best-effort write — quota exceeded or storage blocked must not
    // block the in-memory toggle from taking effect.
  }
}

export function readCompletedIds(): ReadonlySet<string> {
  return readStoredIds();
}

export function toggleItem(
  id: string,
  currentlyCompleted: boolean
): ReadonlySet<string> {
  const ids = readStoredIds();

  if (currentlyCompleted) {
    ids.delete(id);
  } else {
    ids.add(id);
  }

  writeStoredIds(ids);
  return ids;
}

export function filterToKnownIds(
  completedIds: ReadonlySet<string>,
  knownIds: ReadonlySet<string>
): ReadonlySet<string> {
  return new Set([...completedIds].filter((id) => knownIds.has(id)));
}
