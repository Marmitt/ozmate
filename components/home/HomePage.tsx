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
    available: false,
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
    <main className="mx-auto max-w-md px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900">OZMate</h1>
      <p className="mt-2 text-gray-600">
        A practical survival guide for newcomers to Australia — what to sort
        out first, how to live cheap, and where to find work.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {pillars.map((pillar) =>
          pillar.available ? (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="block rounded-lg border border-gray-200 p-4 hover:border-gray-300"
            >
              <h2 className="font-semibold text-gray-900">{pillar.title}</h2>
              <p className="mt-1 text-sm text-gray-600">
                {pillar.description}
              </p>
            </Link>
          ) : (
            <div
              key={pillar.href}
              aria-disabled="true"
              className="rounded-lg border border-gray-100 p-4 opacity-60"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">
                  {pillar.title}
                </h2>
                <span className="text-xs font-medium text-gray-400">
                  Coming soon
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {pillar.description}
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
}
