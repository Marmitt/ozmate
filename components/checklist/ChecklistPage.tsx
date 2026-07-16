"use client";

import { useEffect, useState } from "react";
import { checklistItems } from "@/data/checklist";
import { GROUP_ORDER } from "@/lib/checklist/groups";
import { computeProgress } from "@/lib/checklist/progress";
import {
  filterToKnownIds,
  readCompletedIds,
  toggleItem,
} from "@/lib/checklist/storage";
import { ChecklistGroup } from "@/components/checklist/ChecklistGroup";
import { ProgressSummary } from "@/components/checklist/ProgressSummary";

const knownIds = new Set(checklistItems.map((item) => item.id));

export function ChecklistPage() {
  const [completedIds, setCompletedIds] = useState<ReadonlySet<string>>(
    new Set()
  );

  useEffect(() => {
    setCompletedIds(filterToKnownIds(readCompletedIds(), knownIds));
  }, []);

  const handleToggle = (id: string) => {
    const currentlyCompleted = completedIds.has(id);
    const updated = toggleItem(id, currentlyCompleted);
    setCompletedIds(filterToKnownIds(updated, knownIds));
  };

  const progress = computeProgress(checklistItems.length, completedIds);

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900">
        First 30 Days Checklist
      </h1>
      <ProgressSummary progress={progress} />
      {GROUP_ORDER.map((group) => (
        <ChecklistGroup
          key={group.key}
          label={group.label}
          items={checklistItems.filter((item) => item.group === group.key)}
          completedIds={completedIds}
          onToggle={handleToggle}
        />
      ))}
    </main>
  );
}
