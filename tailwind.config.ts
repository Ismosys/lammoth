import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "var(--void)",
        deep: "var(--deep)",
        raised: "var(--raised)",
        paper: "var(--paper)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        accent2: "var(--accent-2)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
        label: "var(--font-label)",
      },
    },
  },
  plugins: [],
} satisfies Config;
