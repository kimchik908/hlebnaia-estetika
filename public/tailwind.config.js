
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bread: {
          50: "#FAF6F0",
          100: "#F2E8DA",
          200: "#E5D2BA",
          300: "#D2B394",
          400: "#B98B65",
          500: "#9A6A47",
          600: "#795036",
          700: "#5C3C2B",
          800: "#402A20",
          900: "#2B1C16",
        },
        cream: "#FCF9F4",
        terracotta: "#B85C38",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 12px 35px rgba(64, 42, 32, 0.08)",
        card: "0 4px 20px rgba(64, 42, 32, 0.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        "float-slow": "floatSlow 5s ease-in-out infinite",
        "pop-in": "popIn 0.25s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
