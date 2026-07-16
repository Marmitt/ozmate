export interface ChecklistProgress {
  completedCount: number;
  totalCount: number;
  isComplete: boolean;
}

export function computeProgress(
  totalCount: number,
  completedIds: ReadonlySet<string>
): ChecklistProgress {
  const completedCount = completedIds.size;

  return {
    completedCount,
    totalCount,
    isComplete: totalCount > 0 && completedCount === totalCount,
  };
}
