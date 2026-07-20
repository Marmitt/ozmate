import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FreshnessDate } from "@/components/guides/FreshnessDate";

describe("FreshnessDate", () => {
  it("renders an en-AU long date and a matching dateTime attribute", () => {
    render(<FreshnessDate date="2026-07-12" />);

    const time = screen.getByText(/Updated/);
    expect(time.textContent).toBe("Updated 12 July 2026");
    expect(time.tagName).toBe("TIME");
    expect(time.getAttribute("dateTime")).toBe("2026-07-12");
  });

  it("renders the same output regardless of caller — guide page and listing row can't drift", () => {
    const { container: a } = render(<FreshnessDate date="2026-01-05" />);
    const { container: b } = render(<FreshnessDate date="2026-01-05" />);

    expect(a.innerHTML).toBe(b.innerHTML);
  });
});
