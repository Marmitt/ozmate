import { describe, expect, it } from "vitest";
import { groups } from "@/data/groups";
import { groupCategories } from "@/lib/groups/categories";

const knownCategoryKeys = new Set(groupCategories.map((c) => c.key));

describe("groups data", () => {
  it("has at least one seed entry", () => {
    expect(groups.length).toBeGreaterThan(0);
  });

  it("every entry has all required fields populated", () => {
    for (const group of groups) {
      expect(group.id).toBeTruthy();
      expect(group.name).toBeTruthy();
      expect(["whatsapp", "telegram", "facebook"]).toContain(group.platform);
      expect(knownCategoryKeys.has(group.category)).toBe(true);
      expect(group.city).toBeTruthy();
      expect(group.link).toBeTruthy();
      expect(group.description).toBeTruthy();
      expect(typeof group.verified).toBe("boolean");
      expect(group.lastVerified).toBeTruthy();
      expect(group.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("has no duplicate ids", () => {
    const ids = groups.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("never ships an entry pre-marked verified: true (constitution IV, FR-011)", () => {
    const verifiedEntries = groups.filter((g) => g.verified === true);
    expect(verifiedEntries).toHaveLength(0);
  });
});
