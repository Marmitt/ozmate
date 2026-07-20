import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-start gap-4 px-4 py-16">
      <h1 className="text-2xl font-bold text-ink">Page not found</h1>
      <p className="text-ink-muted">
        That page doesn&apos;t exist — it may have moved or the link was
        mistyped.
      </p>
      <div className="flex gap-3">
        <Link
          href="/guides"
          className="rounded-xl border-2 border-line-strong px-4 py-2 font-semibold text-ink shadow-[0_4px_0_0_var(--border-strong)]"
        >
          Browse guides
        </Link>
        <Link
          href="/"
          className="rounded-xl bg-accent px-4 py-2 font-semibold text-white shadow-[0_4px_0_0_var(--accent-deep)]"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
