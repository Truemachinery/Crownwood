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
        asphalt: "#111111",
        "safety-amber": "#FF9500",
        "high-vis-yellow": "#E6FF00",
        concrete: "#F5F3EE",
        industrial: "#1C1C1E",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        drama: ["var(--font-dm-serif)", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        bebas: ["var(--font-bebas-neue)", "sans-serif"],
        barlow: ["var(--font-barlow-condensed)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
