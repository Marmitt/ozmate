import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { readStoredTheme } from "@/lib/theme/storage";

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("defaults to Auto selected when nothing is stored", () => {
    render(<ThemeToggle />);

    expect(screen.getByRole("button", { name: "Auto" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("selecting Light persists the choice and sets data-theme", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "Light" }));

    expect(document.documentElement.getAttribute("data-theme")).toBe(
      "light"
    );
    expect(readStoredTheme()).toBe("light");
    expect(screen.getByRole("button", { name: "Light" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("selecting Dark persists the choice and sets data-theme", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "Dark" }));

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(readStoredTheme()).toBe("dark");
  });

  it("selecting Auto after Dark clears data-theme and the stored override", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "Dark" }));
    await user.click(screen.getByRole("button", { name: "Auto" }));

    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
    expect(readStoredTheme()).toBe("system");
  });
});
