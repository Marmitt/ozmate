import Link from "next/link";

type PillarLink = {
  href: string;
  title: string;
  description: string;
  available: boolean;
};

const pillars: PillarLink[] = [
  {
    href: "/start",
    title: "First 30 Days",
    description: "The checklist for getting sorted when you land.",
    available: true,
  },
  {
    href: "/guides",
    title: "Guides",
    description: "Cheap shopping, transport, housing, and daily life tips.",
    available: true,
  },
  {
    href: "/groups",
    title: "Job Groups",
    description: "Vetted WhatsApp & Telegram groups, Sydney-first.",
    available: false,
  },
];

export function HomePage() {
  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-ink">OZMate</h1>
      <p className="mt-2 text-ink-muted">
        A practical survival guide for newcomers to Australia — what to sort
        out first, how to live cheap, and where to find work.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {pillars.map((pillar) =>
          pillar.available ? (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="block rounded-xl border border-accent bg-accent-soft/50 p-4 transition-colors hover:bg-accent-soft"
            >
              <h2 className="font-semibold text-ink">{pillar.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">
                {pillar.description}
              </p>
            </Link>
          ) : (
            <div
              key={pillar.href}
              aria-disabled="true"
              className="rounded-xl border border-line bg-bg-alt p-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-ink-muted">
                  {pillar.title}
                </h2>
                <span className="rounded-full bg-ochre-soft px-2 py-0.5 text-xs font-semibold text-ochre-text">
                  Coming soon
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-dim">
                {pillar.description}
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
}
