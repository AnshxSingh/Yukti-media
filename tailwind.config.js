/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a855f7",
        // CSS Variable mapped colors for seamless Light/Dark toggle
        cream: "var(--cream, #09090b)",
        creamsoft: "var(--creamsoft, #141418)",
        creamcard: "var(--creamcard, #111114)",
        espresso: "var(--espresso, #fafafa)",
        mocha: "var(--mocha, #a1a1aa)",
        // Purple accent with full palette preserved
        purple: {
          DEFAULT: "#a855f7",
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        purpledeep: "var(--purpledeep, #c084fc)",
        purplelight: "var(--purplelight, #e9d5ff)",
        purpleborder: "var(--purpleborder, rgba(255, 255, 255, 0.09))",
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 8px 30px rgba(168, 85, 247, 0.14)',
        warmlg: '0 20px 50px rgba(168, 85, 247, 0.2)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
      },
    },
  },
  plugins: [],
};