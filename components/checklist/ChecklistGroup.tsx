import type { ChecklistItem } from "@/data/checklist";
import { ChecklistItemRow } from "@/components/checklist/ChecklistItemRow";

export interface ChecklistGroupProps {
  label: string;
  items: ChecklistItem[];
  completedIds: ReadonlySet<string>;
  onToggle: (id: string) => void;
}

export function ChecklistGroup({
  label,
  items,
  completedIds,
  onToggle,
}: ChecklistGroupProps) {
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <section className="py-4">
      <h2 className="text-lg font-semibold text-ink">{label}</h2>
      <ul className="mt-2 divide-y divide-line">
        {sortedItems.map((item) => (
          <ChecklistItemRow
            key={item.id}
            item={item}
            checked={completedIds.has(item.id)}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </section>
  );
}
