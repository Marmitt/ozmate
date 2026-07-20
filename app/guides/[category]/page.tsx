import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, isCategoryKey } from "@/data/categories";
import { getAllGuides, getGuidesByCategory } from "@/lib/guides/loader";
import { GuideListItem } from "@/components/guides/GuideListItem";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const guides = await getAllGuides();
  const liveCategories = new Set(guides.map((guide) => guide.category));
  return Array.from(liveCategories).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = isCategoryKey(category) ? getCategory(category) : undefined;
  if (!meta) return {};

  return {
    title: `${meta.name} | OZMate`,
    description: meta.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  if (!isCategoryKey(category)) notFound();

  const meta = getCategory(category);
  const guides = await getGuidesByCategory(category);
  if (!meta || guides.length === 0) notFound();

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <Link href="/guides" className="text-sm text-ink-muted underline">
        Guides
      </Link>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">
        {meta.name}
      </h1>
      <p className="mt-2 text-ink-muted">{meta.description}</p>

      <div className="mt-6 flex flex-col gap-3">
        {guides.map((guide) => (
          <GuideListItem key={guide.slug} guide={guide} />
        ))}
      </div>
    </main>
  );
}
