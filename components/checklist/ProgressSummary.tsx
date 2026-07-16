import type { ChecklistProgress } from "@/lib/checklist/progress";

export interface ProgressSummaryProps {
  progress: ChecklistProgress;
}

export function ProgressSummary({ progress }: ProgressSummaryProps) {
  const { completedCount, totalCount, isComplete } = progress;

  return (
    <div role="status" className="py-3">
      {isComplete ? (
        <p className="font-semibold text-green-700">
          All done! You&apos;ve completed everything on this checklist.
        </p>
      ) : (
        <p className="text-gray-700">
          {completedCount} of {totalCount} complete
        </p>
      )}
    </div>
  );
}
