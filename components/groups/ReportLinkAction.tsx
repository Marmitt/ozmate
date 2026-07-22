import type { Group } from "@/data/groups";

// TODO: replace with real OZMate contact address before launch — see docs/pre-launch-checklist.md
const REPORT_CONTACT_ADDRESS = "hello@ozmate.app";

export function ReportLinkAction({ group }: { group: Group }) {
  const subject = encodeURIComponent(`Dead or dodgy link: ${group.name}`);
  const body = encodeURIComponent(
    `Group: ${group.name}\nID: ${group.id}\n\nWhat's wrong with this group?\n`
  );
  const href = `mailto:${REPORT_CONTACT_ADDRESS}?subject=${subject}&body=${body}`;

  return (
    <a href={href} className="mt-2 inline-block text-xs text-ink-muted underline">
      Report a dead or dodgy link
    </a>
  );
}
