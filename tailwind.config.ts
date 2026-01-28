import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // The New Premium System
        heading: ["var(--font-heading)", "serif"],
        ui: ["var(--font-ui)", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#FF7A18",
          dark: "#E66A12",
        },
        offwhite: "#FAFAFA", // Premium off-white
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0,0,0,0.04)',
        'float': '0 20px 40px -5px rgba(0,0,0,0.1)',
      },
      // --- Animation Config for Infinite Carousel ---
      animation: {
        scroll: "scroll 40s linear infinite", // Controls carousel speed
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;