import { describe, expect, it } from "vitest";
import { computeProgress } from "@/lib/checklist/progress";

describe("computeProgress", () => {
  it("reports 0 of N and isComplete=false when nothing is completed", () => {
    const result = computeProgress(5, new Set());

    expect(result).toEqual({
      completedCount: 0,
      totalCount: 5,
      isComplete: false,
    });
  });

  it("reports a partial count and isComplete=false when some items are completed", () => {
    const result = computeProgress(5, new Set(["a", "b"]));

    expect(result).toEqual({
      completedCount: 2,
      totalCount: 5,
      isComplete: false,
    });
  });

  it("reports isComplete=true when every item is completed", () => {
    const result = computeProgress(3, new Set(["a", "b", "c"]));

    expect(result).toEqual({
      completedCount: 3,
      totalCount: 3,
      isComplete: true,
    });
  });

  it("never reports isComplete=true when totalCount is 0", () => {
    const result = computeProgress(0, new Set());

    expect(result.isComplete).toBe(false);
  });
});
