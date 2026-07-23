import type { GuideSource } from "@/lib/guides/frontmatter";

export function SourcesList({ sources }: { sources: GuideSource[] }) {
  return (
    <section className="mt-10 border-t border-line pt-6">
      <h2 className="text-lg font-semibold text-ink">Sources</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-text underline"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
