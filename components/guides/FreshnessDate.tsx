const formatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function FreshnessDate({ date }: { date: string }) {
  return (
    <time dateTime={date} className="text-sm text-ink-muted">
      Updated {formatter.format(new Date(`${date}T00:00:00Z`))}
    </time>
  );
}
