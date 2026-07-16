import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChecklistPage } from "@/components/checklist/ChecklistPage";
import { checklistItems } from "@/data/checklist";
import { GROUP_ORDER } from "@/lib/checklist/groups";

describe("ChecklistPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders every group and item, all unchecked, in a stable order", () => {
    render(<ChecklistPage />);

    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.map((h) => h.textContent)).toEqual(
      GROUP_ORDER.map((g) => g.label)
    );

    for (const item of checklistItems) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(checklistItems.length);
    for (const checkbox of checkboxes) {
      expect(checkbox).not.toBeChecked();
    }
  });

  it("persists a toggled item's checked state across a remount", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<ChecklistPage />);

    const firstItem = checklistItems[0];
    const checkbox = screen.getByLabelText(firstItem.title);
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    unmount();

    render(<ChecklistPage />);
    expect(await screen.findByLabelText(firstItem.title)).toBeChecked();
  });

  it("still updates visual state without throwing when storage is unavailable", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });

    const user = userEvent.setup();
    render(<ChecklistPage />);

    const firstItem = checklistItems[0];
    const checkbox = screen.getByLabelText(firstItem.title);

    await expect(user.click(checkbox)).resolves.not.toThrow();
    expect(checkbox).toBeChecked();
  });

  it("updates the progress summary immediately when an item is toggled", async () => {
    const user = userEvent.setup();
    render(<ChecklistPage />);

    expect(
      screen.getByText(`0 of ${checklistItems.length} complete`)
    ).toBeInTheDocument();

    const firstItem = checklistItems[0];
    await user.click(screen.getByLabelText(firstItem.title));

    expect(
      screen.getByText(`1 of ${checklistItems.length} complete`)
    ).toBeInTheDocument();
  });
});
