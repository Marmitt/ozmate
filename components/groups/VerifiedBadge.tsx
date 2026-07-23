export function VerifiedBadge({ verified }: { verified: boolean }) {
  if (!verified) {
    return null;
  }

  return (
    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent-text">
      Verified
    </span>
  );
}
