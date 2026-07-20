import path from "node:path";
import { isCategoryKey, type CategoryKey } from "@/data/categories";

export type GuideScope = "national" | "sydney";

export interface GuideSource {
  label: string;
  url: string;
}

export interface GuideFrontmatter {
  title: string;
  slug: string;
  category: CategoryKey;
  summary: string;
  scope: GuideScope;
  order: number;
  lastUpdated: string;
  tags: string[];
  sources: GuideSource[];
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function fail(filePath: string, field: string, message: string): never {
  throw new Error(
    `Invalid guide frontmatter in ${filePath}: field "${field}" ${message}`
  );
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function parseFrontmatter(
  raw: unknown,
  filePath: string
): GuideFrontmatter {
  if (typeof raw !== "object" || raw === null) {
    throw new Error(`Invalid guide frontmatter in ${filePath}: not an object`);
  }

  const data = raw as Record<string, unknown>;
  const expectedSlug = path.basename(filePath, ".mdx");
  const expectedCategory = path.basename(path.dirname(filePath));

  if (!isNonEmptyString(data.title)) {
    fail(filePath, "title", "is required and must be a non-empty string");
  }

  if (!isNonEmptyString(data.slug)) {
    fail(filePath, "slug", "is required and must be a non-empty string");
  }
  if (data.slug !== expectedSlug) {
    fail(
      filePath,
      "slug",
      `must equal the filename "${expectedSlug}", got "${data.slug as string}"`
    );
  }

  if (!isNonEmptyString(data.category)) {
    fail(filePath, "category", "is required and must be a non-empty string");
  }
  if (data.category !== expectedCategory) {
    fail(
      filePath,
      "category",
      `must equal the parent directory "${expectedCategory}", got "${
        data.category as string
      }"`
    );
  }
  if (!isCategoryKey(data.category as string)) {
    fail(filePath, "category", `is not a known category: "${data.category as string}"`);
  }

  if (!isNonEmptyString(data.summary)) {
    fail(filePath, "summary", "is required and must be a non-empty string");
  }

  const scope = data.scope ?? "national";
  if (scope !== "national" && scope !== "sydney") {
    fail(filePath, "scope", `must be "national" or "sydney", got "${scope as string}"`);
  }

  if (typeof data.order !== "number" || !Number.isFinite(data.order)) {
    fail(filePath, "order", "is required and must be a number");
  }

  if (!isNonEmptyString(data.lastUpdated) || !DATE_PATTERN.test(data.lastUpdated)) {
    fail(filePath, "lastUpdated", "is required and must be a YYYY-MM-DD date string");
  }
  if (Number.isNaN(Date.parse(data.lastUpdated as string))) {
    fail(filePath, "lastUpdated", "is not a valid date");
  }

  if (!Array.isArray(data.tags) || !data.tags.every((t) => typeof t === "string")) {
    fail(filePath, "tags", "is required and must be an array of strings (may be empty)");
  }

  if (!Array.isArray(data.sources)) {
    fail(filePath, "sources", "is required and must be an array");
  }
  const sources = data.sources as unknown[];
  sources.forEach((source, index) => {
    if (
      typeof source !== "object" ||
      source === null ||
      !isNonEmptyString((source as Record<string, unknown>).label) ||
      !isNonEmptyString((source as Record<string, unknown>).url)
    ) {
      fail(
        filePath,
        "sources",
        `entry at index ${index} must have a non-empty "label" and "url"`
      );
    }
  });

  return {
    title: data.title as string,
    slug: data.slug as string,
    category: data.category as CategoryKey,
    summary: data.summary as string,
    scope,
    order: data.order as number,
    lastUpdated: data.lastUpdated as string,
    tags: data.tags as string[],
    sources: data.sources as GuideSource[],
  };
}
