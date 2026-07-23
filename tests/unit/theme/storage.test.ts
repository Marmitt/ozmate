import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { readStoredTheme, writeStoredTheme } from "@/lib/theme/storage";

describe("theme storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("readStoredTheme defaults to system when nothing is stored", () => {
    expect(readStoredTheme()).toBe("system");
  });

  it("writeStoredTheme persists light and readStoredTheme returns it", () => {
    writeStoredTheme("light");
    expect(readStoredTheme()).toBe("light");
  });

  it("writeStoredTheme persists dark and readStoredTheme returns it", () => {
    writeStoredTheme("dark");
    expect(readStoredTheme()).toBe("dark");
  });

  it("writeStoredTheme with system clears any stored override", () => {
    writeStoredTheme("dark");
    writeStoredTheme("system");
    expect(readStoredTheme()).toBe("system");
  });

  it("readStoredTheme falls back to system on a corrupted value", () => {
    window.localStorage.setItem("ozmate.theme.v1", "not-a-theme");
    expect(readStoredTheme()).toBe("system");
  });

  it("readStoredTheme falls back to system when storage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });

    expect(readStoredTheme()).toBe("system");
  });

  it("writeStoredTheme does not throw when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });

    expect(() => writeStoredTheme("dark")).not.toThrow();
  });
});
