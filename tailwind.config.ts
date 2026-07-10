import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          900: "#3D0F16",
          700: "#7A2331",
          600: "#8F2A3B",
          500: "#A33449",
          100: "#F3E3E6",
        },
        slate: {
          900: "#20242A",
          800: "#2B3038",
          700: "#454C56",
          500: "#7A828C",
          200: "#E4E6E9",
          100: "#EEF0F2",
        },
        cream: "#FAF8F6",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 20px 40px -18px rgba(32,36,42,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
