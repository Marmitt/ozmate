import type { Group } from "@/data/groups";
import { getCategoryLabel } from "@/lib/groups/categories";
import { VerifiedBadge } from "@/components/groups/VerifiedBadge";
import { ReportLinkAction } from "@/components/groups/ReportLinkAction";

const PLATFORM_LABELS: Record<Group["platform"], string> = {
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  facebook: "Facebook",
};

export function GroupCard({ group }: { group: Group }) {
  const hasLink = Boolean(group.link && group.link.trim().length > 0);

  return (
    <div className="rounded-xl border border-line bg-bg-alt p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-ink">{group.name}</h3>
        <VerifiedBadge verified={group.verified} />
      </div>
      <div className="mt-1 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-ochre-soft px-2 py-0.5 text-ochre-text">
          {PLATFORM_LABELS[group.platform]}
        </span>
        <span className="rounded-full bg-ochre-soft px-2 py-0.5 text-ochre-text">
          {getCategoryLabel(group.category)}
        </span>
      </div>
      <p className="mt-2 text-sm text-ink-muted">{group.description}</p>
      {hasLink && (
        <a
          href={group.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-accent-text underline"
        >
          Join group
        </a>
      )}
      <div>
        <ReportLinkAction group={group} />
      </div>
    </div>
  );
}
