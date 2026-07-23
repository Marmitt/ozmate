export type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "ozmate.theme.v1";

function getLocalStorage(): Storage | undefined {
  try {
    if (typeof window === "undefined") return undefined;
    return window.localStorage;
  } catch {
    return undefined;
  }
}

export function readStoredTheme(): ThemePreference {
  const storage = getLocalStorage();
  if (!storage) return "system";

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark") return raw;
    return "system";
  } catch {
    return "system";
  }
}

export function writeStoredTheme(theme: ThemePreference): void {
  const storage = getLocalStorage();
  if (!storage) return;

  try {
    if (theme === "system") {
      storage.removeItem(STORAGE_KEY);
    } else {
      storage.setItem(STORAGE_KEY, theme);
    }
  } catch {
    // Best-effort write. Quota exceeded or storage blocked must not
    // block the in-memory toggle from taking effect.
  }
}
