import fs from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import type { CategoryKey } from "@/data/categories";
import { mdxComponents } from "@/components/guides/mdx-components";
import { parseFrontmatter, type GuideFrontmatter } from "@/lib/guides/frontmatter";

const CONTENT_DIR = path.join(process.cwd(), "content", "guides");

function listMdxFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files: string[] = [];
  for (const entry of fs.readdirSync(CONTENT_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const categoryDir = path.join(CONTENT_DIR, entry.name);
    for (const file of fs.readdirSync(categoryDir, { withFileTypes: true })) {
      if (file.isFile() && file.name.endsWith(".mdx")) {
        files.push(path.join(categoryDir, file.name));
      }
    }
  }
  return files;
}

function sortByOrderThenSlug(guides: GuideFrontmatter[]): GuideFrontmatter[] {
  return [...guides].sort(
    (a, b) => a.order - b.order || a.slug.localeCompare(b.slug)
  );
}

export async function getAllGuides(): Promise<GuideFrontmatter[]> {
  const files = listMdxFiles();
  const guides = await Promise.all(
    files.map(async (filePath) => {
      const source = fs.readFileSync(filePath, "utf8");
      const { frontmatter } = await compileMDX<Record<string, unknown>>({
        source,
        options: { parseFrontmatter: true },
      });
      return parseFrontmatter(frontmatter, filePath);
    })
  );
  return sortByOrderThenSlug(guides);
}

export async function getGuidesByCategory(
  category: CategoryKey
): Promise<GuideFrontmatter[]> {
  const all = await getAllGuides();
  return all.filter((guide) => guide.category === category);
}

export async function getGuide(
  category: string,
  slug: string
): Promise<{ frontmatter: GuideFrontmatter; content: ReactElement } | null> {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  return { frontmatter: parseFrontmatter(frontmatter, filePath), content };
}
