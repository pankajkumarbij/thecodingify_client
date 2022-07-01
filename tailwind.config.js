module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  variants: {
    display: ['responsive', 'group-hover', 'group-focus'],
  },
  theme: {
    extend: {
      colors: {
        'navblue': '#060238',
      },
    }
  },
  plugins: [],
}
