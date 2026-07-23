"use client";

import { useEffect, useState } from "react";
import { applyTheme } from "@/lib/theme/apply";
import { readStoredTheme, writeStoredTheme } from "@/lib/theme/storage";
import type { ThemePreference } from "@/lib/theme/storage";

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference>("system");

  useEffect(() => {
    setTheme(readStoredTheme());
  }, []);

  const handleSelect = (value: ThemePreference) => {
    setTheme(value);
    writeStoredTheme(value);
    applyTheme(value);
  };

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex gap-1 rounded-full border border-line bg-bg-alt p-1"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleSelect(option.value)}
          aria-pressed={theme === option.value}
          className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
            theme === option.value
              ? "bg-accent-soft text-accent-text"
              : "text-ink-muted hover:bg-surface"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
