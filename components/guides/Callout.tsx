import type { ReactNode } from "react";

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border-l-[3px] border-terracotta bg-terracotta-soft px-4 py-3 text-ink">
      {children}
    </div>
  );
}
