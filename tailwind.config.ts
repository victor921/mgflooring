/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue',
  ],
  theme: {
    // Monochrome, architectural. One typeface, sharp corners, hairline rules.
    extend: {
      colors: {
        paper: '#FFFFFF',
        bg: '#F6F5F2', // off-white stone
        line: '#E2E0DA', // hairline rules
        ink: '#141414', // near-black
        stone: {
          DEFAULT: '#6E6E68',
          light: '#94938C',
          dark: '#3A3A36',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-0.01em',
        tighter: '-0.02em',
        tightest: '-0.035em',
        label: '0.18em',
      },
      maxWidth: {
        wrap: '88rem',
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
      },
    },
  },
  plugins: [],
}
