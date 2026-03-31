/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
      },
      colors: {
        // Obsidian (V1) palette
        obsidian: {
          base: '#0c0d10',
          raised: '#14161a',
          overlay: '#1c1e23',
          accent: '#7b8aff',
          'accent-hover': '#8e9bff',
        },
        // Aurora (V2) palette
        aurora: {
          base: '#0a0a0f',
          raised: '#12121a',
          overlay: '#1a1a25',
          accent: '#635bff',
          pink: '#ff80b5',
          cyan: '#00d4aa',
          blue: '#80e9ff',
        },
        // Daylight (V3) palette
        daylight: {
          base: '#ffffff',
          raised: '#f8f9fb',
          overlay: '#f0f2f5',
          accent: '#4f5bd5',
          'accent-dark': '#3d4bc4',
          text: '#0a1628',
          'text-secondary': '#4a5568',
        },
        // Shared semantic
        neet: {
          easy: '#4ade80',
          medium: '#f5a623',
          hard: '#f87171',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'scale-up': 'scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-right': 'slideRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'counter': 'counter 2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

