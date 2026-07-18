import type { ChecklistProgress } from "@/lib/checklist/progress";

export interface ProgressSummaryProps {
  progress: ChecklistProgress;
}

export function ProgressSummary({ progress }: ProgressSummaryProps) {
  const { completedCount, totalCount, isComplete } = progress;
  const percent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div role="status" className="py-3">
      <div
        aria-hidden="true"
        className="h-3 w-full overflow-hidden rounded-full bg-surface"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>
      {isComplete ? (
        <p className="mt-2 font-semibold text-accent-text">
          All done! You&apos;ve completed everything on this checklist.
        </p>
      ) : (
        <p className="mt-2 text-ink-muted">
          {completedCount} of {totalCount} complete
        </p>
      )}
    </div>
  );
}
