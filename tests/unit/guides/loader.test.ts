import path from "node:path";
import { describe, expect, it, vi } from "vitest";

const CONTENT_DIR = path.join(process.cwd(), "content", "guides");

interface FakeDirent {
  name: string;
  isDirectory: () => boolean;
  isFile: () => boolean;
}

function dir(name: string): FakeDirent {
  return { name, isDirectory: () => true, isFile: () => false };
}

function file(name: string): FakeDirent {
  return { name, isDirectory: () => false, isFile: () => true };
}

function guideSource(opts: {
  title: string;
  slug: string;
  category: string;
  order: number;
}) {
  return `---
title: "${opts.title}"
slug: "${opts.slug}"
category: "${opts.category}"
summary: "A short summary."
scope: "national"
order: ${opts.order}
lastUpdated: "2026-07-12"
tags: []
sources: [{ label: "Example Source", url: "https://example.com" }]
---

Body content for ${opts.title}.
`;
}

const FILES: Record<string, string> = {
  [path.join(CONTENT_DIR, "transport", "zed-guide.mdx")]: guideSource({
    title: "Zed Guide",
    slug: "zed-guide",
    category: "transport",
    order: 1,
  }),
  [path.join(CONTENT_DIR, "transport", "alpha-guide.mdx")]: guideSource({
    title: "Alpha Guide",
    slug: "alpha-guide",
    category: "transport",
    order: 1,
  }),
  [path.join(CONTENT_DIR, "transport", "second-order.mdx")]: guideSource({
    title: "Second Order Guide",
    slug: "second-order",
    category: "transport",
    order: 0,
  }),
};

vi.mock("node:fs", () => ({
  default: {
    existsSync: (p: string) =>
      p === CONTENT_DIR ||
      p === path.join(CONTENT_DIR, "housing") ||
      p === path.join(CONTENT_DIR, "transport") ||
      p in FILES,
    readdirSync: (p: string) => {
      if (p === CONTENT_DIR) return [dir("transport"), dir("housing")];
      if (p === path.join(CONTENT_DIR, "transport")) {
        return [
          file("zed-guide.mdx"),
          file("alpha-guide.mdx"),
          file("second-order.mdx"),
        ];
      }
      if (p === path.join(CONTENT_DIR, "housing")) return [];
      return [];
    },
    readFileSync: (p: string) => {
      if (p in FILES) return FILES[p];
      throw new Error(`unexpected read: ${p}`);
    },
  },
}));

const { getAllGuides, getGuidesByCategory, getGuide } = await import(
  "@/lib/guides/loader"
);

describe("guides loader", () => {
  it("getAllGuides sorts by order ascending, ties broken by slug", async () => {
    const guides = await getAllGuides();

    expect(guides.map((g) => g.slug)).toEqual([
      "second-order",
      "alpha-guide",
      "zed-guide",
    ]);
  });

  it("getGuidesByCategory returns only guides in that category", async () => {
    const transportGuides = await getGuidesByCategory("transport");
    const housingGuides = await getGuidesByCategory("housing");

    expect(transportGuides).toHaveLength(3);
    expect(housingGuides).toHaveLength(0);
  });

  it("getGuide resolves a known slug", async () => {
    const guide = await getGuide("transport", "alpha-guide");

    expect(guide?.frontmatter.title).toBe("Alpha Guide");
  });

  it("getGuide returns null for an unknown slug", async () => {
    const guide = await getGuide("transport", "does-not-exist");

    expect(guide).toBeNull();
  });
});
