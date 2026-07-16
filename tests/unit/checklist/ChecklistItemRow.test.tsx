import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChecklistItemRow } from "@/components/checklist/ChecklistItemRow";
import type { ChecklistItem } from "@/data/checklist";

const baseItem: ChecklistItem = {
  id: "test-item",
  group: "documents",
  title: "Test item",
  detail: "Test detail",
  order: 1,
};

describe("ChecklistItemRow", () => {
  it("renders a working link when the item has one", () => {
    const item: ChecklistItem = {
      ...baseItem,
      link: "https://example.com/resource",
    };

    render(
      <ChecklistItemRow item={item} checked={false} onToggle={() => {}} />
    );

    const link = screen.getByRole("link", { name: /learn more/i });
    expect(link).toHaveAttribute("href", "https://example.com/resource");
  });

  it("renders no navigational element when the item has no link", () => {
    render(
      <ChecklistItemRow item={baseItem} checked={false} onToggle={() => {}} />
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("calls onToggle with the item id when the checkbox is activated", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <ChecklistItemRow item={baseItem} checked={false} onToggle={onToggle} />
    );

    await user.click(screen.getByRole("checkbox"));

    expect(onToggle).toHaveBeenCalledWith("test-item");
  });

  it("reflects the checked prop on the checkbox", () => {
    render(
      <ChecklistItemRow item={baseItem} checked={true} onToggle={() => {}} />
    );

    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
