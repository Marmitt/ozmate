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
    },
  },
  plugins: [],
};

export default config;
