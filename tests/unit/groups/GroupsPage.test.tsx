import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/data/groups", () => ({
  groups: [
    {
      id: "hospo-one",
      name: "Hospo One",
      platform: "whatsapp",
      category: "hospo",
      city: "Sydney",
      link: "https://chat.whatsapp.com/hospo-one",
      description: "Hospitality group one.",
      verified: false,
      lastVerified: "2026-07-01",
    },
    {
      id: "cleaning-one",
      name: "Cleaning One",
      platform: "telegram",
      category: "cleaning",
      city: "Sydney",
      link: "https://t.me/cleaning-one",
      description: "Cleaning group one.",
      verified: true,
      lastVerified: "2026-07-02",
    },
  ],
}));

const { GroupsPage } = await import("@/components/groups/GroupsPage");

describe("GroupsPage", () => {
  it("renders all groups by default", () => {
    render(<GroupsPage />);

    expect(screen.getByText("Hospo One")).toBeInTheDocument();
    expect(screen.getByText("Cleaning One")).toBeInTheDocument();
  });

  it("filters to a single category when selected", async () => {
    const user = userEvent.setup();
    render(<GroupsPage />);

    await user.click(screen.getByRole("button", { name: "Hospitality" }));

    expect(screen.getByText("Hospo One")).toBeInTheDocument();
    expect(screen.queryByText("Cleaning One")).not.toBeInTheDocument();
  });

  it("restores all groups when 'All' is selected again", async () => {
    const user = userEvent.setup();
    render(<GroupsPage />);

    await user.click(screen.getByRole("button", { name: "Hospitality" }));
    await user.click(screen.getByRole("button", { name: "All" }));

    expect(screen.getByText("Hospo One")).toBeInTheDocument();
    expect(screen.getByText("Cleaning One")).toBeInTheDocument();
  });

  it("shows an empty state for a category with zero groups", async () => {
    const user = userEvent.setup();
    render(<GroupsPage />);

    await user.click(screen.getByRole("button", { name: "Construction" }));

    expect(
      screen.getByText("No groups in this category yet — try another category.")
    ).toBeInTheDocument();
  });
});

describe("GroupsPage with zero total entries", () => {
  it("shows the 'no groups yet' state", async () => {
    vi.resetModules();
    vi.doMock("@/data/groups", () => ({ groups: [] }));

    const { GroupsPage: EmptyGroupsPage } = await import(
      "@/components/groups/GroupsPage"
    );

    render(<EmptyGroupsPage />);

    expect(
      screen.getByText("No groups available yet — check back soon.")
    ).toBeInTheDocument();

    vi.doUnmock("@/data/groups");
  });
});
