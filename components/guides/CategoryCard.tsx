import Link from "next/link";
import type { Category } from "@/data/categories";

export function CategoryCard({
  category,
  isLive,
}: {
  category: Category;
  isLive: boolean;
}) {
  if (isLive) {
    return (
      <Link
        href={`/guides/${category.key}`}
        className="block rounded-xl border border-accent bg-accent-soft/50 p-4 transition-colors hover:bg-accent-soft"
      >
        <h2 className="font-semibold text-ink">{category.name}</h2>
        <p className="mt-1 text-sm text-ink-muted">{category.description}</p>
      </Link>
    );
  }

  return (
    <div
      aria-disabled="true"
      className="rounded-xl border border-line bg-bg-alt p-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-ink-muted">{category.name}</h2>
        <span className="rounded-full bg-ochre-soft px-2 py-0.5 text-xs font-semibold text-ochre-text">
          Coming soon
        </span>
      </div>
      <p className="mt-1 text-sm text-ink-dim">{category.description}</p>
    </div>
  );
}
