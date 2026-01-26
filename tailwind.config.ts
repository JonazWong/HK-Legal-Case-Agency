import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "!./app/index-test-dashboard/client/**",
    "!./app/index-test-dashboard/server/**"
  ],
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
        "success-green": "#388E3C",
        // CSS variable colors for the landing page
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;