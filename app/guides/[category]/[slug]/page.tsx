import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGuides, getGuide } from "@/lib/guides/loader";
import { getCategory } from "@/data/categories";
import { FreshnessDate } from "@/components/guides/FreshnessDate";
import { SourcesList } from "@/components/guides/SourcesList";

interface GuidePageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const guides = await getAllGuides();
  return guides.map((guide) => ({
    category: guide.category,
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const guide = await getGuide(category, slug);
  if (!guide) return {};

  return {
    title: `${guide.frontmatter.title} | OZMate`,
    description: guide.frontmatter.summary,
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { category, slug } = await params;
  const guide = await getGuide(category, slug);
  if (!guide) notFound();

  const { frontmatter, content } = guide;
  const categoryMeta = getCategory(frontmatter.category);

  return (
    <main className="mx-auto max-w-[45rem] px-4 py-8">
      <nav className="flex gap-2 text-sm text-ink-muted">
        <Link href="/guides" className="underline">
          Guides
        </Link>
        {categoryMeta && (
          <>
            <span>/</span>
            <Link href={`/guides/${categoryMeta.key}`} className="underline">
              {categoryMeta.name}
            </Link>
          </>
        )}
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">
        {frontmatter.title}
      </h1>
      <p className="mt-2 text-ink-muted">{frontmatter.summary}</p>
      <div className="mt-2">
        <FreshnessDate date={frontmatter.lastUpdated} />
      </div>

      {frontmatter.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ochre bg-ochre-soft px-3 py-1 text-xs font-bold text-ochre-text"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose mt-8 max-w-none">{content}</div>

      <SourcesList sources={frontmatter.sources} />
    </main>
  );
}
