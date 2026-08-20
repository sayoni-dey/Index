import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0058be",
        "primary-container": "#2170e4",
        "on-primary": "#ffffff",
        secondary: "#565e74",
        "secondary-container": "#dae2fd",
        "on-secondary-container": "#5c647a",
        surface: "#FFFFFF",
        "surface-container": "#F1F5F9",
        "surface-container-low": "#f2f3fd",
        "on-surface": "#191b23",
        "on-surface-variant": "#424754",
        outline: "#727785",
        "outline-variant": "rgba(194, 198, 214, 0.5)",
        error: "#DC2626",
        success: "#059669",
        background: "#f9f9ff",
      },
      fontFamily: {
        geist: ["Geist", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;