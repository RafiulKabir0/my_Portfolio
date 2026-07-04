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
        slate: {
          50: 'rgba(var(--color-slate-50), <alpha-value>)',
          100: 'rgba(var(--color-slate-100), <alpha-value>)',
          200: 'rgba(var(--color-slate-200), <alpha-value>)',
          300: 'rgba(var(--color-slate-300), <alpha-value>)',
          400: 'rgba(var(--color-slate-400), <alpha-value>)',
          500: 'rgba(var(--color-slate-500), <alpha-value>)',
          600: 'rgba(var(--color-slate-600), <alpha-value>)',
          700: 'rgba(var(--color-slate-700), <alpha-value>)',
          800: 'rgba(var(--color-slate-800), <alpha-value>)',
          900: 'rgba(var(--color-slate-900), <alpha-value>)',
          950: 'rgba(var(--color-slate-950), <alpha-value>)',
        },
        white: 'rgba(var(--color-white), <alpha-value>)',
        primary: 'rgba(var(--color-slate-50), <alpha-value>)',
        secondary: 'rgba(var(--color-secondary), <alpha-value>)',
        accent: "#2563eb",
        accentHover: "#1d4ed8",
        glow: "rgba(37, 99, 235, 0.05)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9))',
      },
      boxShadow: {
        'neon': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'glass': '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        'premium': '0 10px 40px -10px rgba(0,0,0,0.08)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
