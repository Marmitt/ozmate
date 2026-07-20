import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "@/lib/guides/frontmatter";

const FILE_PATH = "content/guides/transport/opal-card.mdx";

function validFrontmatter(overrides: Record<string, unknown> = {}) {
  return {
    title: "How to get an Opal card",
    slug: "opal-card",
    category: "transport",
    summary: "Everything you need to get moving in Sydney.",
    scope: "sydney",
    order: 1,
    lastUpdated: "2026-07-12",
    tags: ["transport", "sydney"],
    sources: [{ label: "Transport NSW", url: "https://transportnsw.info" }],
    ...overrides,
  };
}

describe("parseFrontmatter", () => {
  it("returns a typed frontmatter object for valid input", () => {
    const result = parseFrontmatter(validFrontmatter(), FILE_PATH);

    expect(result.title).toBe("How to get an Opal card");
    expect(result.category).toBe("transport");
    expect(result.tags).toEqual(["transport", "sydney"]);
  });

  it("defaults scope to national when omitted", () => {
    const { scope, ...rest } = validFrontmatter();
    const result = parseFrontmatter(rest, FILE_PATH);

    expect(result.scope).toBe("national");
  });

  it("allows an empty tags array", () => {
    const result = parseFrontmatter(validFrontmatter({ tags: [] }), FILE_PATH);

    expect(result.tags).toEqual([]);
  });

  it("throws a descriptive error when a required field is missing", () => {
    const { title, ...rest } = validFrontmatter();

    expect(() => parseFrontmatter(rest, FILE_PATH)).toThrow(
      /title.*is required/i
    );
  });

  it("throws a descriptive error for an unknown category", () => {
    expect(() =>
      parseFrontmatter(
        validFrontmatter({ category: "bikes", slug: "opal-card" }),
        "content/guides/bikes/opal-card.mdx"
      )
    ).toThrow(/category.*not a known category/i);
  });

  it("throws a descriptive error when the date does not parse", () => {
    expect(() =>
      parseFrontmatter(
        validFrontmatter({ lastUpdated: "12th July 2026" }),
        FILE_PATH
      )
    ).toThrow(/lastUpdated/i);
  });

  it("throws a descriptive error when slug does not match the filename", () => {
    expect(() =>
      parseFrontmatter(validFrontmatter({ slug: "wrong-slug" }), FILE_PATH)
    ).toThrow(/slug.*must equal the filename/i);
  });

  it("throws a descriptive error when category does not match the parent directory", () => {
    expect(() =>
      parseFrontmatter(
        validFrontmatter({ category: "transport" }),
        "content/guides/housing/opal-card.mdx"
      )
    ).toThrow(/category.*must equal the parent directory/i);
  });
});
