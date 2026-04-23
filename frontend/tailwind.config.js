/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e6e9ef',
          100: '#c0c8d8',
          200: '#96a4be',
          300: '#6c80a4',
          400: '#4d6591',
          500: '#2d4a7e',
          600: '#274376',
          700: '#1f3a6b',
          800: '#183261',
          900: '#0A1628',
          950: '#060e1a',
        },
        teal: {
          50: '#e0f7f1',
          100: '#b3ecdb',
          200: '#80e0c3',
          300: '#4dd4ab',
          400: '#26cb99',
          500: '#00BFA6',
          600: '#00b09a',
          700: '#009d8b',
          800: '#008b7d',
          900: '#006b61',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
      },
    },
  },
  plugins: [],
}
