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
        // Extended teal scale for modern UI (維持向後兼容)
        teal: {
          50: '#E6F7F7',
          100: '#CCEFEF',
          200: '#99DFDF',
          300: '#66CFCF',
          400: '#33BFBF',
          500: '#3BA19D', // mint-green
          600: '#008B8B',
          700: '#006868',
          800: '#004B5C', // teal-dark
          900: '#003D47',
        },
        // Legacy color names (maintain backward compatibility)
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
        // Premier Design System - "Black Veil Empress" Palette
        premier: {
          // Deep blacks with subtle gradients
          black: {
            DEFAULT: '#0a0a0a',
            light: '#1a1a1a',
            medium: '#0f0f0f',
          },
          // Luxurious golds
          gold: {
            DEFAULT: '#D4AF37',    // Royal gold
            rose: '#B8860B',       // Rose gold
            champagne: '#F7E7CE',  // Champagne
            dark: '#9A7B2F',       // Dark gold
          },
          // Mysterious accents
          mystery: {
            violet: '#4A148C',     // Deep violet
            purple: '#6A1B9A',     // Royal purple
            blue: '#1A237E',       // Midnight blue
            indigo: '#283593',     // Deep indigo
          },
          // Elegant neutrals
          pearl: {
            DEFAULT: '#F5F5F5',    // Pearl white
            gray: '#C0C0C0',       // Silver gray
            cream: '#FAFAF8',      // Cream
          },
        },
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
        sans: ["Inter", "Noto Sans TC", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Noto Serif TC", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        // Premier border radius - larger, more elegant
        'premier-sm': '8px',
        'premier-md': '12px',
        'premier-lg': '16px',
        'premier-xl': '20px',
        'premier-2xl': '24px',
      },
      fontSize: {
        // Display sizes
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        // Elegant hierarchy
        'premier-xl': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'premier-lg': ['1.5rem', { lineHeight: '1.4' }],
        'premier-md': ['1.125rem', { lineHeight: '1.6' }],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 32px rgba(0, 0, 0, 0.16)',
        'glow': '0 0 24px rgba(59, 161, 157, 0.3)',
        'glow-gold': '0 0 24px rgba(212, 175, 55, 0.3)',
        // Premier shadow system
        'premier-xs': '0 1px 4px rgba(212,175,55,0.08)',
        'premier-sm': '0 2px 8px rgba(212,175,55,0.12)',
        'premier-md': '0 4px 16px rgba(212,175,55,0.15), 0 2px 8px rgba(212,175,55,0.1)',
        'premier-lg': '0 8px 32px rgba(212,175,55,0.2), 0 4px 16px rgba(212,175,55,0.15)',
        'premier-xl': '0 12px 48px rgba(212,175,55,0.25), 0 8px 24px rgba(212,175,55,0.18)',
        'premier-2xl': '0 24px 64px rgba(212,175,55,0.3), 0 12px 32px rgba(212,175,55,0.2)',
        'premier-glow': '0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.15)',
        'premier-glow-lg': '0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.2)',
        'premier-inner': 'inset 0 1px 2px rgba(255,255,255,0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        // Premier animations
        'gradient-rotate': 'gradient-rotate 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        // Premier keyframes
        'gradient-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        // Premier gradients
        'premier-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'premier-gold': 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
        'premier-mystery': 'linear-gradient(135deg, #4A148C 0%, #1A237E 100%)',
        'premier-veil': 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};

export default config;