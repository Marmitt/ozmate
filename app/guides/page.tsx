import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { getAllGuides } from "@/lib/guides/loader";
import { CategoryCard } from "@/components/guides/CategoryCard";

export const metadata: Metadata = {
  title: "Guides | OZMate",
  description:
    "Practical guides for newcomers to Australia — arrival essentials, visas, jobs, shopping, transport, housing, and daily life.",
};

export default async function GuidesHubPage() {
  const guides = await getAllGuides();
  const liveCategoryKeys = new Set(guides.map((guide) => guide.category));

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <Link href="/" className="text-sm text-ink-muted underline">
        Home
      </Link>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">
        Guides
      </h1>
      <p className="mt-2 text-ink-muted">
        Pick the life area that matches what you&apos;re sorting out right now.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {categories
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((category) => (
            <CategoryCard
              key={category.key}
              category={category}
              isLive={liveCategoryKeys.has(category.key)}
            />
          ))}
      </div>
    </main>
  );
}
