import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "teal-dark": "#004B5C",
        "mint-green": "#3BA19D",
        "subtle-gold": "#D4AF37",
        "charcoal": "#1A1A1A",
        "cool-gray": "#5A5A5A",
        "light-gray": "#E8E8E8",
        "off-white": "#FAFAFA",
        "info-blue": "#2E6FA8",
        "alert-red": "#D32F2F",
        "success-green": "#388E3C"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
};

export default config;