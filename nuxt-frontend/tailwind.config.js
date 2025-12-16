/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  safelist: [
    'text-[8px]',
    'text-[9px]',
    'text-[10px]',
    'text-[11px]'
  ],

  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './error.vue',
    './app.vue',
  ],

  theme: {
    extend: {
      fontFamily: {
        siteName: ['Remachine', 'sans-serif'],
        heading: ['Roboto', 'sans-serif'], // Primary font (default)
        sans: ['Montserrat', 'sans-serif'], // Section titles
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};
