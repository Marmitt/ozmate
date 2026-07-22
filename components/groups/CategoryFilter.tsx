import type { GroupCategory } from "@/lib/groups/categories";
import { groupCategories } from "@/lib/groups/categories";

export type CategoryFilterValue = GroupCategory | "all";

export interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange("all")}
        aria-pressed={value === "all"}
        className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
          value === "all"
            ? "bg-accent-soft text-accent-text"
            : "bg-surface text-ink-muted hover:bg-line"
        }`}
      >
        All
      </button>
      {groupCategories.map((category) => (
        <button
          key={category.key}
          type="button"
          onClick={() => onChange(category.key)}
          aria-pressed={value === category.key}
          className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
            value === category.key
              ? "bg-accent-soft text-accent-text"
              : "bg-surface text-ink-muted hover:bg-line"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
