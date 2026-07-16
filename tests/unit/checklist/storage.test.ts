import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import {
  filterToKnownIds,
  readCompletedIds,
  toggleItem,
} from "@/lib/checklist/storage";

describe("checklist storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("readCompletedIds returns an empty set when nothing is stored", () => {
    expect(readCompletedIds()).toEqual(new Set());
  });

  it("toggleItem marks an incomplete item as complete and persists it", () => {
    const result = toggleItem("get-a-tax-file-number", false);

    expect(result.has("get-a-tax-file-number")).toBe(true);
    expect(readCompletedIds().has("get-a-tax-file-number")).toBe(true);
  });

  it("toggleItem marks a complete item as incomplete and persists it", () => {
    toggleItem("get-a-tax-file-number", false);
    const result = toggleItem("get-a-tax-file-number", true);

    expect(result.has("get-a-tax-file-number")).toBe(false);
    expect(readCompletedIds().has("get-a-tax-file-number")).toBe(false);
  });

  it("toggleItem preserves other previously completed ids", () => {
    toggleItem("get-a-tax-file-number", false);
    const result = toggleItem("open-an-australian-bank-account", false);

    expect(result.has("get-a-tax-file-number")).toBe(true);
    expect(result.has("open-an-australian-bank-account")).toBe(true);
  });

  it("filterToKnownIds drops ids not present in the known set", () => {
    const completed = new Set(["a", "b", "stale-id"]);
    const known = new Set(["a", "b", "c"]);

    expect(filterToKnownIds(completed, known)).toEqual(new Set(["a", "b"]));
  });

  it("readCompletedIds falls back to an empty set when storage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });

    expect(readCompletedIds()).toEqual(new Set());
  });

  it("readCompletedIds falls back to an empty set on corrupted JSON", () => {
    window.localStorage.setItem("ozmate.checklist.v1", "not-json{");

    expect(readCompletedIds()).toEqual(new Set());
  });

  it("toggleItem does not throw and still returns updated in-memory state when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });

    let result: ReadonlySet<string> | undefined;
    expect(() => {
      result = toggleItem("get-a-tax-file-number", false);
    }).not.toThrow();

    expect(result?.has("get-a-tax-file-number")).toBe(true);
  });
});
