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
        background: '#050508',
        card: {
          DEFAULT: '#0B0C12',
          hover: '#11131C',
          border: 'rgba(255, 255, 255, 0.07)'
        },
        brand: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF5E00',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          glow: '#FF8000',
        },
        accent: {
          cyan: '#00F0FF',
          green: '#10B981',
          red: '#EF4444',
          purple: '#8B5CF6',
          gold: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 94, 0, 0.4)',
        'glow-orange-lg': '0 0 50px -10px rgba(255, 94, 0, 0.5)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
        'glass-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 4px 20px 0 rgba(255, 94, 0, 0.15)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(255, 94, 0, 0.15) 0%, rgba(5, 5, 8, 0) 70%)',
        'hero-gradient': 'radial-gradient(ellipse at top, rgba(255, 94, 0, 0.18), rgba(5, 5, 8, 0.95) 75%)',
        'orange-gradient': 'linear-gradient(135deg, #FF8000 0%, #FF3300 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 35s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
};
