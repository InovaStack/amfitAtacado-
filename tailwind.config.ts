import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        am: {
          magenta: {
            DEFAULT: "#ff0055",
            hover: "#e6004c",
            light: "#fff1f5",
            border: "#ffd1df",
            dark: "#c40041",
          },
          black: {
            DEFAULT: "#0f0f11",
            surface: "#1a1a1e",
            muted: "#27272a",
          },
          gray: {
            50: "#fafafa",
            100: "#f4f4f5",
            200: "#e4e4e7",
            300: "#d4d4d8",
            400: "#a1a1aa",
            500: "#71717a",
            600: "#52525b",
            700: "#3f3f46",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        magenta: "0 10px 25px -5px rgba(255, 0, 85, 0.25)",
        "magenta-sm": "0 4px 12px -2px rgba(255, 0, 85, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
