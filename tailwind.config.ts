import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ems: {
          yellow: "#C1913A",
          gold: "#C1913A",
          orange: "#F15A22",
          black: "#12161A",
          ink: "#1C1A17",
          stone: "#FAF8F4",
          cream: "#F4F1EA",
          sand: "#E8E2D4",
          card: "#FFFFFF",
          muted: "#5E584F",
          line: "#E4DDD0",
        },
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        changa: ["var(--font-changa)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(18, 22, 26, 0.08)",
      },
      maxWidth: {
        site: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
