import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        surface: "var(--surface)",
        "on-accent": "var(--on-accent)",
        ink: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          dim: "var(--text-dim)",
        },
        line: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          deep: "var(--accent-deep)",
          soft: "var(--accent-soft)",
          text: "var(--accent-text)",
        },
        ochre: {
          DEFAULT: "var(--ochre)",
          soft: "var(--ochre-soft)",
          text: "var(--ochre-text)",
        },
        terracotta: {
          DEFAULT: "var(--terracotta)",
          soft: "var(--terracotta-soft)",
        },
        danger: "var(--danger)",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--text)",
            "--tw-prose-headings": "var(--text)",
            "--tw-prose-links": "var(--accent-text)",
            "--tw-prose-bold": "var(--text)",
            "--tw-prose-counters": "var(--text-muted)",
            "--tw-prose-bullets": "var(--border-strong)",
            "--tw-prose-hr": "var(--border)",
            "--tw-prose-quotes": "var(--text-muted)",
            "--tw-prose-quote-borders": "var(--ochre)",
            "--tw-prose-captions": "var(--text-muted)",
            "--tw-prose-code": "var(--text)",
            "--tw-prose-th-borders": "var(--border-strong)",
            "--tw-prose-td-borders": "var(--border)",
            maxWidth: "45rem",
            fontSize: "1rem",
            lineHeight: "1.6",
            a: {
              fontWeight: "600",
              textDecoration: "underline",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
