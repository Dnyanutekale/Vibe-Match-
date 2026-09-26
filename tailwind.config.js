/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vibe: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        electric: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f472b6',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        neon: {
          cyan: '#06b6d4',
          amber: '#f59e0b',
          emerald: '#10b981',
          violet: '#8b5cf6',
          coral: '#ff6b6b',
        },
        dark: {
          950: '#090a0f',
          900: '#0f111a',
          850: '#151824',
          800: '#1b1f2e',
          700: '#262b3f',
          600: '#343b56',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'heart-burst': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '45%': { transform: 'scale(1.25)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float-gentle': 'float-gentle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'heart-burst': 'heart-burst 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      boxShadow: {
        'vibe-glow': '0 0 25px -5px rgba(244, 63, 94, 0.45)',
        'neon-glow': '0 0 25px -5px rgba(217, 70, 239, 0.45)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.45)',
        'inner-glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
