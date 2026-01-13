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
        // New Primary Palette - Warmer, more playful
        primary: {
          DEFAULT: "#6C5CE7", // Vibrant purple
          light: "#A29BFE",
          dark: "#5849C2",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
        },
        secondary: {
          DEFAULT: "#00B894", // Fresh teal-green
          light: "#55EFC4",
          dark: "#00A383",
        },
        coral: {
          DEFAULT: "#FF7675", // Warm coral
          light: "#FAB1A0",
          dark: "#E05655",
        },
        sunny: {
          DEFAULT: "#FDCB6E", // Warm yellow
          light: "#FFEAA7",
          dark: "#E0B35E",
        },
        sky: {
          DEFAULT: "#74B9FF", // Friendly blue
          light: "#A8D8FF",
          dark: "#5A9FE6",
        },
        // Age Group Colors - More vibrant and distinct
        age: {
          baby: { bg: "#FFEEF1", text: "#E84A72", accent: "#FFD1DA" },      // 0-2
          toddler: { bg: "#FFF8E7", text: "#E6A23C", accent: "#FFEBB3" },   // 2-4
          preschool: { bg: "#E8F8F0", text: "#27AE60", accent: "#C8F7DC" }, // 4-6
          school: { bg: "#EBF4FF", text: "#3498DB", accent: "#C9E2FF" },    // 6-8
          tween: { bg: "#F5EEFF", text: "#9B59B6", accent: "#E4D4F4" },     // 8-10
        },
        // UI Colors
        background: "#FAFBFC",
        surface: "#FFFFFF",
        text: {
          DEFAULT: "#2C3E50",
          muted: "#7F8C8D",
          light: "#BDC3C7",
        },
        border: {
          DEFAULT: "#E8ECF0",
          light: "#F4F6F8",
        },
        // Status Colors
        success: "#27AE60",
        warning: "#F39C12",
        error: "#E74C3C",
      },
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
        display: ["Fredoka", "sans-serif"],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(108, 92, 231, 0.3)',
        'glow-lg': '0 0 40px rgba(108, 92, 231, 0.4)',
        'glow-sm': '0 0 10px rgba(108, 92, 231, 0.2)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)',
        'card-active': '0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(108, 92, 231, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-playful': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'dots-pattern': 'radial-gradient(circle, #E8ECF0 1px, transparent 1px)',
      },
      backgroundSize: {
        'dots': '20px 20px',
      },
    },
  },
  plugins: [],
};
export default config;
