/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Instrument Serif"', '"Cormorant Garamond"', 'serif'],
        calligraphy: ['"Pinyon Script"', '"Instrument Serif"', 'cursive'],
        display: ['"Plus Jakarta Sans"', '"Syne"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        paper: {
          50: '#faf8f4',
          100: '#f5f2eb',
          200: '#ede8dd',
          300: '#dfd8c7',
          400: '#c5bca7',
          900: '#1c1b18',
          950: '#121210',
        },
        ink: {
          light: '#3d3b36',
          DEFAULT: '#1c1b18',
          dark: '#0d0d0b',
        }
      },
      boxShadow: {
        'paper': '0 20px 40px -15px rgba(28, 27, 24, 0.07)',
        'paper-sm': '0 4px 20px -2px rgba(28, 27, 24, 0.05)',
      }
    },
  },
  plugins: [],
}
