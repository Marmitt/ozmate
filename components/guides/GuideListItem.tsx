import Link from "next/link";
import type { GuideFrontmatter } from "@/lib/guides/frontmatter";
import { FreshnessDate } from "@/components/guides/FreshnessDate";

export function GuideListItem({ guide }: { guide: GuideFrontmatter }) {
  return (
    <Link
      href={`/guides/${guide.category}/${guide.slug}`}
      className="block rounded-xl border border-line bg-bg-alt p-4 transition-colors hover:border-line-strong hover:bg-surface"
    >
      <h3 className="font-semibold text-ink">{guide.title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{guide.summary}</p>
      <div className="mt-2">
        <FreshnessDate date={guide.lastUpdated} />
      </div>
    </Link>
  );
}
