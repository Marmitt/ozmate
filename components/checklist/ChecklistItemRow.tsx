"use client";

import type { ChecklistItem } from "@/data/checklist";

export interface ChecklistItemRowProps {
  item: ChecklistItem;
  checked: boolean;
  onToggle: (id: string) => void;
}

export function ChecklistItemRow({
  item,
  checked,
  onToggle,
}: ChecklistItemRowProps) {
  const inputId = `checklist-item-${item.id}`;

  return (
    <li className="flex items-start gap-3 py-3">
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(item.id)}
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-accent"
      />
      <div className="min-w-0 flex-1">
        <label
          htmlFor={inputId}
          className="block cursor-pointer font-medium text-ink"
        >
          {item.title}
        </label>
        <p className="mt-0.5 text-sm text-ink-muted">{item.detail}</p>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm text-ochre-text underline"
          >
            Learn more
          </a>
        )}
      </div>
    </li>
  );
}
